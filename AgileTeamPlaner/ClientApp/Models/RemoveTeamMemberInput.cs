﻿namespace ScrumTeamPlanner.Models {
    
    public class RemoveTeamMemberInput {
        public string SprintName { get; set; }
        public string StoryName { get; set; }
        public int Day { get; set; }
        public int TeamMember { get; set; }
    }
}