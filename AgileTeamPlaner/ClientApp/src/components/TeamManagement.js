import React from 'react';
import './SprintPlan.css';
import { AddTeamMember } from './Team/AddTeamMember';
import { TeamMembers } from './Team/TeamMembers';

export class TeamManagement extends React.Component {

    TeamManagement() {
        this.DisplayName = 'TeamManagement';
    }
 
   
    render() {
        return (
            <div className="container">
                <h1>Team Management</h1>
                <AddTeamMember />    
                <TeamMembers />
            </div>
        );
    }
}
