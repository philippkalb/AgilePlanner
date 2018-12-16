using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace ScrumTeamPlanner.Repository.Models {

    [BsonIgnoreExtraElements]
    public class SprintPlan {

        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("sprintId")]
        public string SprintId { get; set; }

        [BsonElement("velocity")]
        public double Velocity { get; set; }
        
        [BsonElement("startDate")]
        public DateTime StartDate { get; set; }

        [BsonElement("sprintLenght")]
        public int SprintLenght { get; set; }

        [BsonElement("userStories")]
        public UserStory[] UserStories { get; set; }

        [BsonElement("teamMembers")]
        public int[] TeamMembers { get; set; }

    }

    [BsonIgnoreExtraElements]
    public class UserStory {

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("link")]
        public string Link { get; set; }

        [BsonElement("storyPoints")]
        public int StoryPoints { get; set; }

        [BsonElement("persons")]
        public PersonInStory[] Persons { get; set; }

        [BsonElement("states")]
        public DayState[] States { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class PersonInStory {

        [BsonElement("day")]
        public int Day { get; set; }

        [BsonElement("personId")]
        public string PersonId { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class DayState {

        [BsonElement("day")]
        public int Day { get; set; }

        [BsonElement("color")]
        public int Color { get; set; }

        [BsonElement("text")]
        public string Text { get; set; }

        [BsonElement("percent")]
        public int Percent { get; set; }
    }
}


