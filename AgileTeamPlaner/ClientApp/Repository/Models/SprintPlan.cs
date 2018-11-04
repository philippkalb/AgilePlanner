using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace ScrumTeamPlanner.Repository.Models {

    public class SprintPlan {

        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("sprintId")]
        public string SprintId { get; set; }

        [BsonElement("startDate")]
        public DateTime StartDate { get; set; }

        [BsonElement("sprintLenght")]
        public int SprintLenght { get; set; }

        [BsonElement("userStories")]
        public UserStory[] UserStories { get; set; }

        [BsonElement("teamMembers")]
        public int[] TeamMembers { get; set; }

    }

    public class UserStory {

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("link")]
        public string Link { get; set; }

        [BsonElement("storyPoints")]
        public int StoryPoints { get; set; }

        [BsonElement("persons")]
        public PersonInStory[] Persons { get; set; }
    }

    public class PersonInStory {

        [BsonElement("day")]
        public int Day { get; set; }

        [BsonElement("personId")]
        public int PersonId { get; set; }
    }
}


