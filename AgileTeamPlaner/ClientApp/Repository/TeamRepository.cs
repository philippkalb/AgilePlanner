using AutoMapper;
using MongoDB.Bson;
using MongoDB.Driver;
using ScrumTeamPlanner.Repository.Models;
using System.Threading.Tasks;

namespace ScrumTeamPlanner.ClientApp.Repository
{
    public class TeamRepository : ITeamRepository {

        private readonly IMapper _mapper;
        private readonly IMongoClient _client;
        private string MongoDbCollectionName = "TeamMember";
        private string dbname = "AgilePlanner";

        public TeamRepository(IMapper mapper, IMongoClient client) {
            _mapper = mapper;
            _client = client;
        }


        public Task<bool> AddTeamMemberToPlan(string Nickname, string Fullname, string Image) {
            var db = _client.GetDatabase(dbname);
            var collection = db.GetCollection<ScrumTeamPlanner.Repository.Models.TeamMember>(MongoDbCollectionName);

            var newMember = new ScrumTeamPlanner.Repository.Models.TeamMember() {
                Fullname = Fullname,
                Nickname = Nickname,
                Image = Image
            };
           
            collection.InsertOne(newMember);
            return Task.FromResult(true); //does not really tell us if the update was ok. It tells us that the find was ok 
        }


        public Task<ScrumTeamPlanner.Models.TeamMember[]> GetAllTeamMembers() {
            var db = _client.GetDatabase(dbname);
            var collection = db.GetCollection<TeamMember>(MongoDbCollectionName);
             var elements = collection.Find(new BsonDocument()).ToList();

            var result = _mapper.Map<Models.TeamMember[]>(elements);
            return Task.FromResult(result);            
        }

    }
}
