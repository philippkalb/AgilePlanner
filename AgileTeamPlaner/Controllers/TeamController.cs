using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ScrumTeamPlanner.ClientApp.Repository;
using ScrumTeamPlanner.Models;
using ScrumTeamPlanner.Repository.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ScrumTeamPlanner.Controllers
{
    [Route("api/[controller]")]
    public class TeamController : Controller     {
        ITeamRepository _teamRepository;

        public TeamController(ITeamRepository teamRepository) {
            _teamRepository = teamRepository;
        }


        [HttpPost]
        [Route("AddNewMember")]
        public async Task<bool> AddNewMember([FromBody] AddNewMember value) {
            await _teamRepository.AddTeamMemberToPlan(value.Nickname, value.Fullname, value.Image);
            return true;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<IEnumerable<Models.TeamMember>> Get() {
            var allTeamMembers = await _teamRepository.GetAllTeamMembers();
            
            return allTeamMembers;
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<Models.TeamMember> Get(string id)     {
            var member = await _teamRepository.GetTeamMemberByNickName(id);            
            return member;
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
