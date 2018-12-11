using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ScrumTeamPlanner.Repository.Models {

    [BsonIgnoreExtraElements]
    public class TeamMember {

        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("image")]
        public string Image { get; set; }

        [BsonElement("fullname")]
        public string Fullname { get; set; }

        [BsonElement("nickname")]
        public string Nickname { get; set; }
    }  
}
