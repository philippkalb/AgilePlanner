using System;
using System.Collections.Generic;

namespace ScrumTeamPlanner.Models {

    public class SprintPlan {
        public string SprintId { get; set; }

        public double Velocity { get; set; }
        
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

        public DayState[] States { get; set; }
    }

    public class PersonInStory {

        public int Day { get; set; }

        public string PersonId { get; set; }
    }


    public class DayState {

        public int Day { get; set; }

        public int Color { get; set; }

        public string Text { get; set; }

        public string Percent { get; set; }
    }
}


