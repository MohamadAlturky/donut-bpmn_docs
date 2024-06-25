---
sidebar_position: 2
---

# Activity marker

extracts the sentences where the activities appeared in the process description.

```python
class ActivitySentence(BaseModel):
    sentence: str
```

```python
class ActivityExtractionMarker(BaseTask):
    def __init__(self,llm):

        marker = Agent(
            role="business process modeling expert",
            goal="Your objective is to identify the place where the activity {activity} mentioned in the business process description {process_description}",
            backstory="You're working on this proccess description to collect the places where the activity {activity} appeared",
            allow_delegation=False,
            verbose=True,
            llm = llm
        )

        marking = Task(
            description=(
                "\n"
                "1. Extract the sentence where the activity in the process description appeared.\n"
                "2. return the same sentence from the process description don't edit it.\n"
                "3. if the activity doesn't directly mentioned in the process description return not found directly.\n"
            ),
            expected_output=(
                "the sentences where the activity appeared"
            ),
            output_json=ActivitySentence,
            agent=marker,
        )
        self.crew = Crew(
            agents=[marker],
            tasks=[marking],
            verbose=2
        )

    def handle(self, inputs):
        return self.crew.kickoff(inputs=inputs)
```
