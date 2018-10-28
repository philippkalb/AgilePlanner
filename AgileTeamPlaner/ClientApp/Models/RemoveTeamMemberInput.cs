namespace ScrumTeamPlanner.Models {
    
    public class RemoveTeamMemberInput {
        public int StoryNumber { get; set; }
        public int Day { get; set; }
        public int TeamMember { get; set; }
    }
}