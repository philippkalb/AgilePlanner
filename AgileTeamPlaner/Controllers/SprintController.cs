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
        public IEnumerable<string> Get() {
            return new string[] { "Sprint 1" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<SprintPlan> Get(int id) {
            //for the first version use the models also directly in the repo. Currently, we do not need 200 levels
            var plan = await _sprintPlan.GetPlan("Sprint 1");
            return plan;
        }

        [HttpPost]
        [Route("RemoveTeammember")]
        public void RemoveTeammember([FromBody]RemoveTeamMemberInput test) {
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
