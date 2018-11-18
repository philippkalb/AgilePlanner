using System;
using System.Collections.Generic;

namespace ScrumTeamPlanner.Models {

    public class SprintPlan {
        public string SprintId { get; set; }

        public DateTime StartDate { get; set; }

        public int SprintLenght { get; set; }

        public UserStory[] UserStories { get; set; }

        public int[] TeamMembers { get; set; }

    }

    public class UserStory {
        public string Name { get; set; }

        public string Link { get; set; }

        public int StoryPoints { get; set; }

        public List<PersonInStory> Persons { get; set; }
    }

    public class PersonInStory {

        public int Day { get; set; }

        public int PersonId { get; set; }
    }
}


