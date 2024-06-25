---
sidebar_position: 1
---

# Activity extraction

extracts the activities from the process description as a list.

```python
class ActivityList(BaseModel):
    activities: list[str]

class ActivitySentence(BaseModel):
    sentence: str
```

```python
class ActivityExtraction(BaseTask):
    def __init__(self,llm):

        extractor = Agent(
            role="business process modeling expert",
            goal="Your objective is to identify and list all the distinct activities mentioned in the business process description {process_description}",
            backstory="You're working on this proccess description to collect activities that helps your team to generate bpmn digrams",
            allow_delegation=False,
            verbose=True,
            llm = llm
        )

        extraction = Task(
            description=(
                "\n"
                "1. Extract all activities in the process description.\n"
                "2. Don't miss any of the activites.\n"
                "3. Don't mention any activity twice.\n"
                "4. Make the activity name short and concise.\n"
            ),
            expected_output=(
                "list of extracted activities from the process description,"
                "give me the list with json format."
            ),
            output_json=ActivityList,
            output_file="activities.json",
            agent=extractor,
        )
        self.crew = Crew(
            agents=[extractor],
            tasks=[extraction],
            verbose=2
        )

    def handle(self, inputs):
        return self.crew.kickoff(inputs=inputs)

```
