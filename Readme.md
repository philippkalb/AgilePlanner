# Agile Team Planner

The aim of this project is to create a small planning tool to see which person is working on which user story. The context of this is agile project management.

We want to achive a small project that is able to replace planning excels but does not have the same functionality as JIRA. Not all feature will be configured via UI (but mongodb with Robo3T).

Furthermore, its of course a project to learn how react.js works and to see if mongodb can be applied in such a project.

> And yes.. we can optimze the code and we need more tests
> - the developer


## Technologies used

* Dotnet Core (WebAPI)
* React.js
* MongoDb (with Docker)

## Setup

Install a mongo db or use the provided docker-compose file. *appsettings.json* is already preconfigured for the mongodb provided by the docker-compose. In the mongo db configure 2 databases *SprintConfiguration* *Teammember*.

Fill the *SprintConfiguration* with a first document that descrips one sprint.

```json
{
    "sprintId" : "Sprint 1",
    "startDate" : "2018-11-01T00:00:00",
    "sprintLenght" : 14,
    "userStories" : [ 
        {
            "name" : "MyEp 1",
            "link" : "http://teststory.at/id=1",
            "storyPoints" : 5,
            "persons" : [],
            "states" : [ 
                {
                    "day" : 2,
                    "color" : 2,
                    "text" : null
                }, 
                {
                    "day" : 5,
                    "color" : 1,
                    "text" : null
                }, 
                {
                    "day" : 1,
                    "color" : 1,
                    "text" : null
                }, 
                {
                    "day" : 3,
                    "color" : 1,
                    "text" : "90"
                }
            ]
        }, 
        {
            "name" : "MyEp 2",
            "link" : "http://teststory.at/id=2",
            "storyPoints" : 2,
            "persons" : [],
            "states" : [ 
                {
                    "day" : 2,
                    "color" : 3,
                    "text" : null
                }, 
                {
                    "day" : 6,
                    "color" : 1,
                    "text" : null
                }, 
                {
                    "day" : 4,
                    "color" : 1,
                    "text" : "90"
                }
            ]
        }
    ],
    "teamMembers" : null
}

Start the application and begin to add some team members to your project
