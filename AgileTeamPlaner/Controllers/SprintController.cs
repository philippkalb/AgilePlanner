using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ScrumTeamPlanner.ClientApp.Repository;
using ScrumTeamPlanner.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ScrumTeamPlanner.Controllers {

    [Route("api/[controller]")]
    public class SprintController : Controller {
        ISprintPlanRepository _sprintPlan;

        public SprintController(ISprintPlanRepository sprintPlan) {
            _sprintPlan = sprintPlan;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<IEnumerable<string>> Get() {

            var allPlans = await _sprintPlan.GetAllSprintPlanIds();
            return allPlans;
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<SprintPlan> Get(string id) {
            //for the first version use the models also directly in the repo. Currently, we do not need 200 levels
            var plan = await _sprintPlan.GetPlan(id);
            return plan;
        }

        [HttpPost]
        [Route("RemoveTeammember")]
        public async Task RemoveTeammember([FromBody]RemoveTeamMemberInput value) {
            await _sprintPlan.RemoveTeamMemberFromPlan(value.SprintName, value.StoryName, value.Day, value.TeamMember);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task Put(string id, [FromBody]AddToUserstoryAndDayInput value) {
            //id => user id
            await _sprintPlan.AddTeamMemberToPlan(value.SprintName, value.StoryName, value.Day, id);
        }

        [HttpPost("{id}")]
        public async Task AddStateToPlanAndDay(int id, [FromBody]AddStateToPlanAndDay value) {
            //id => user id
            await _sprintPlan.AddStateToPlanAndDay(value.SprintName, value.StoryName, value.Day, value.Color, value.Text,  value.Percent);
        }        

    }

}
