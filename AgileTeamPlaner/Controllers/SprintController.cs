using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ScrumTeamPlanner.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ScrumTeamPlanner.Controllers {

    [Route("api/[controller]")]
    public class SprintController : Controller {
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get() {
            return new string[] { "Sprint 1" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public SprintPlan Get(int id) {

            var plan = new SprintPlan {
                SprintId = "Sprint 1",
                SprintLenght = 14,
                StartDate = new DateTime(2018, 11, 1),
                UserStories = new UserStory[] {
                    new UserStory {
                        Link = "http://testi",
                        Name = "MyEp 1",
                        StoryPoints = 5,
                        Persons = new PersonInStory[] {
                            new PersonInStory {
                                Day = 1,
                                PersonId = 1
                            },
                              new PersonInStory {
                                Day = 2,
                                PersonId = 1
                            },
                             new PersonInStory {
                                Day = 3,
                                PersonId = 1
                            },
                              new PersonInStory {
                                Day = 3,
                                PersonId = 2
                            }
                        }
                    },
                    new UserStory {
                        Link = "http://t423424",
                        Name = "MyEp 2",
                        StoryPoints = 2,
                        Persons = new PersonInStory[] {
                            new PersonInStory {
                                Day = 3,
                                PersonId = 3
                            },
                              new PersonInStory {
                                Day = 4,
                                PersonId = 3
                            },
                             new PersonInStory {
                                Day = 5,
                                PersonId = 4
                            },
                              new PersonInStory {
                                Day = 5,
                                PersonId = 4
                            }
                        }
                         }
                }
            };


            return plan;
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]RemoveTeamMemberInput test) {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]AddToUserstoryAndDayInput value) {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id) {
        }
    }
}
