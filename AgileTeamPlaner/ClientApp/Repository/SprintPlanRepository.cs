using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Driver;
using ScrumTeamPlanner.Models;

namespace ScrumTeamPlanner.ClientApp.Repository {
    public class SprintPlanRepository : ISprintPlanRepository {
        private readonly IMapper _mapper;
        private readonly IMongoClient _client;
        private string MongoDbCollectionName = "SprintConfiguration";
        private string dbname = "AgilePlanner";

        public SprintPlanRepository(IMapper mapper, IMongoClient client) {
            _mapper = mapper;
            _client = client;
        }

        public Task<bool> AddTeamMemberToPlan(string planId, string storyId, int day, string memberId) {
            var db = _client.GetDatabase(dbname);
            var collection = db.GetCollection<ScrumTeamPlanner.Repository.Models.SprintPlan>(MongoDbCollectionName);

            var item = new ScrumTeamPlanner.Repository.Models.PersonInStory {
                Day = day,
                PersonId =  memberId
            };

            var builder = Builders<ScrumTeamPlanner.Repository.Models.SprintPlan>.Filter;
            var itemFilter = builder.Eq("sprintId", planId) & builder.Eq("userStories.name", storyId);
            var update = Builders<ScrumTeamPlanner.Repository.Models.SprintPlan>.Update.AddToSet("userStories.$.persons", item);

            var result = collection.FindOneAndUpdate<ScrumTeamPlanner.Repository.Models.SprintPlan>(itemFilter, update);
            return  Task.FromResult(result != null); //does not really tell us if the update was ok. It tells us that the find was ok 
        }

        public Task<string[]> GetAllSprintPlanIds() {
            var db = _client.GetDatabase(dbname);
            var collection = db.GetCollection<ScrumTeamPlanner.Repository.Models.SprintPlan>(MongoDbCollectionName);
            var sprintIdProjection = Builders<ScrumTeamPlanner.Repository.Models.SprintPlan>.Projection.Include(x => x.SprintId);

            var elements = collection.Find(new BsonDocument()).SortByDescending(bson => bson.StartDate).Project(sprintIdProjection).ToList().Select(x => x.GetElement("sprintId").Value.ToString()).ToArray();
            return Task.FromResult(elements);
        }

        public Task<SprintPlan> GetPlan(string id) { 
            var db = _client.GetDatabase(dbname);
            var collection = db.GetCollection<ScrumTeamPlanner.Repository.Models.SprintPlan>(MongoDbCollectionName);
            
            var filter = new BsonDocument("sprintId", id);
            var sprint = collection.Find(filter).FirstOrDefault();
            var result = _mapper.Map<SprintPlan>(sprint);

            return Task.FromResult<SprintPlan>(result);
        }

        public Task<bool> RemoveTeamMemberFromPlan(string planId, string storyId, int day, string memberId) {
            var db = _client.GetDatabase(dbname);
            var collection = db.GetCollection<ScrumTeamPlanner.Repository.Models.SprintPlan>(MongoDbCollectionName);

            var builder = Builders<ScrumTeamPlanner.Repository.Models.SprintPlan>.Filter;
            var itemFilter = builder.Eq("sprintId", planId) & builder.Eq("userStories.name", storyId);

            var item = new ScrumTeamPlanner.Repository.Models.PersonInStory {
                Day = day,
                PersonId = memberId
            };

            var update = Builders<ScrumTeamPlanner.Repository.Models.SprintPlan>.Update.Pull("userStories.$.persons", item);
            var result = collection.FindOneAndUpdate<ScrumTeamPlanner.Repository.Models.SprintPlan>(itemFilter, update);
            return Task.FromResult(result != null); //does not really tell us if the update was ok. It tells us that the find was ok 
        }


        /// <summary>
        /// TODO test that was just the very basic idea
        /// </summary>
        /// <param name="planId"></param>
        /// <param name="storyId"></param>
        /// <param name="day"></param>
        /// <param name="color"></param>
        /// <param name="text"></param>
        /// <returns></returns>
        public Task<bool> AddStateToPlanAndDay(string planId, string storyId, int day, int color, string text, int percent) {
            var db = _client.GetDatabase(dbname);
            var collection = db.GetCollection<ScrumTeamPlanner.Repository.Models.SprintPlan>(MongoDbCollectionName);

            var item = new ScrumTeamPlanner.Repository.Models.DayState {
                Day = day,
                Color = color,
                Text = text,
                Percent = percent
            };

            var builder = Builders<ScrumTeamPlanner.Repository.Models.SprintPlan>.Filter;
            var itemFilter = builder.Eq("sprintId", planId) & builder.Eq("userStories.name", storyId);

            var pullfilter = builder.Eq("day", day);
            var deleteStatements = Builders<ScrumTeamPlanner.Repository.Models.SprintPlan>.Update.PullFilter("userStories.$.states", pullfilter);
            var deleteResult = collection.FindOneAndUpdate<ScrumTeamPlanner.Repository.Models.SprintPlan>(itemFilter, deleteStatements);

            //add new config but remove old one first
            var update = Builders<ScrumTeamPlanner.Repository.Models.SprintPlan>.Update.AddToSet("userStories.$.states", item);

            var result = collection.FindOneAndUpdate<ScrumTeamPlanner.Repository.Models.SprintPlan>(itemFilter, update);
            return Task.FromResult(result != null); //does not really tell us if the update was ok. It tells us that the find was ok 
        }

    }
}
