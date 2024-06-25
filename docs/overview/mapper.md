---
sidebar_position: 3
---

# Mapping Agent

this agent responsible for return a strongly typed python object from llms responses.

## What is the Mapping Agent doing?

- it gets the response from the llm and returns a python object.
- the python object has a specific schema.

## Why should we return strongly typed objects?

- this will help in the automation process to generate bpmn diagrams.

## Why not use CrewAI model binding techniques?

### Crewai model binding

this library offers a great solution to return a json response from the llm generated answers.

```python title="example for model binding in crewai"
from pydantic import BaseModel
from crewai import Agent, Task, Crew

# definition of the desired response
class ActivityList(BaseModel):
    activities: list[str]


# the agent

extractor = Agent(
    role="proccess modeling expert",
    goal="Your objective is to identify and list all ...",
    backstory="You're working on this proccess description....",
    llm = llm
)

extraction = Task(
    description=("1. Extract all activit..."),
    expected_output=("list of extracted activities from the..." ),
    # highlight-start
    output_json=ActivityList,
    # highlight-end
    agent=extractor,
)

```

the highlighted section in the code above demonstrates how crewai gives the responsibility of create the returned json model to the task.

### Crewai model binding limitations

- if the task is hard the llm can't bind the answer to the json format
  > which will lead to stop the execution with undesirable error.

### Mapper Class Pros

- we can use a llm expert in bpmn to solve the task and use the mapping agent to return the json with a llm expert in json like `codgemma`.
- the mapping task is single and small task that will result in a greate performance
- we can handle the errors by re-ask the llm to fix its output.

### Mapper Class Cons

- more round trips calls to the llm, may cause some latency issues.

## The Mapper Class

in the `src/mapping/mapper.py`:

```python title="src/llm/factory.py"

from crewai import Agent, Task, Crew
from typing import TypeVar, Generic
from llm.ollama_factory import OllamaFactory

class Mapper():
    def __init__(self,binding_type:TypeVar):
        ollamaFactory = OllamaFactory()
        codegemma = ollamaFactory.create("codegemma")
        mapper = Agent(
            role="json formating expert",
            goal="Your objective is to extract a json object from the provided text {text}",
            backstory="You're working to convert text containing data to json format with this format {json_descriptor}",
            allow_delegation=False,
            verbose=True,
            llm = codegemma
        )

        mapping = Task(
            description=(
                "\n"
                "1. Extract the data from the {text} and represent it in this format {json_descriptor}.\n"
            ),
            expected_output=(
                "json format representing the text."
            ),
            output_json=binding_type,
            agent=mapper,
        )
        self.crew = Crew(
            agents=[mapper],
            tasks=[mapping],
            verbose=2
        )

    def map(self, response, schema_descriptor):
        res = self.crew.kickoff(inputs={"text":response,"json_descriptor":schema_descriptor})
        result : self.mapping_type = json.loads(res, object_hook=lambda d: self.mapping_type(**d))
        return result
```
