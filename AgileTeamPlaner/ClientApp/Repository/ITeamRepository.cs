
using System.Threading.Tasks;

namespace ScrumTeamPlanner.ClientApp.Repository {
    public interface ITeamRepository  {

        Task<bool> AddTeamMemberToPlan(string Nickname, string Fullname, string Image);
        
        Task<Models.TeamMember[]> GetAllTeamMembers();

        Task<ScrumTeamPlanner.Models.TeamMember> GetTeamMemberByNickName(string nickname);
    }
}
