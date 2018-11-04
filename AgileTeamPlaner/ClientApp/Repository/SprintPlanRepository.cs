using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Driver;
using ScrumTeamPlanner.Models;

namespace ScrumTeamPlanner.ClientApp.Repository
{
    public class SprintPlanRepository : ISprintPlanRepository {
        private readonly IMapper _mapper;

        public SprintPlanRepository(IMapper mapper) {
            _mapper = mapper;
        }

        public Task<bool> AddTeamMemberToPlan(string planId, string storyId, string memberId) {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<string>> GetAllSprintPlanIds() {
            throw new NotImplementedException();
        }

        public Task<SprintPlan> GetPlan(string id) {
            //in the future configure this via DI in startup
            var mongoClient = new MongoClient();
            // Using a connection-string
            mongoClient = new MongoClient("mongodb://root:example@localhost:27017");

            var db = mongoClient.GetDatabase("Sprints");
            var collection = db.GetCollection<ScrumTeamPlanner.Repository.Models.SprintPlan>("Configuration");
            
            var filter = new BsonDocument("sprintId", id);
            var sprint = collection.Find(filter).FirstOrDefault();
            var result = _mapper.Map<SprintPlan>(sprint);

            return Task.FromResult<SprintPlan>(result);
        }

        public Task<bool> RemoveTeamMemberFromPlan(string planId, string storyId, string memberId) {
            throw new NotImplementedException();
        }
    }
}
