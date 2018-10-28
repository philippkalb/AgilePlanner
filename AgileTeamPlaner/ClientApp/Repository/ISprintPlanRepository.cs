using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScrumTeamPlanner.ClientApp.Repository
{
    public  interface ISprintPlanRepository {

        Task<IEnumerable<string>> GetAllSprintPlanIds();

        Task<SprintPlan> GetPlan(string id);

        Task<bool> AddTeamMemberToPlan(string planId, string storyId, string memberId );

        Task<bool> RemoveTeamMemberFromPlan(string planId, string storyId, string memberId);
    }
}
