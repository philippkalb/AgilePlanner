using ScrumTeamPlanner.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ScrumTeamPlanner.ClientApp.Repository {
    public interface ISprintPlanRepository {

        Task<string[]> GetAllSprintPlanIds();

        Task<SprintPlan> GetPlan(string id);

        Task<bool> AddTeamMemberToPlan(string planId, string storyId, int day, int memberId);

        Task<bool> RemoveTeamMemberFromPlan(string planId, string storyId, int day, int memberId);

        Task<bool> AddStateToPlanAndDay(string planId, string storyId, int day, int color, string text);
    }
}
