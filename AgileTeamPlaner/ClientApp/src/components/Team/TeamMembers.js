import React from 'react';
import './MemberStyles.css';
import { TeamMember } from './TeamMember'
import { ShowAddteamMemberAction, UpdateTeamMembersList } from './../actions'
import Reflux from 'reflux';
import { TeammembersStore } from './TeammembersStore';

const paddingtop = {
    paddingTop: '10px',
    marginTop: '5px'
};

export class TeamMembers extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = { team: null}
        this.DisplayName = 'TeamMembers';
        this.store = TeammembersStore;
        fetch('api/Team/')
            .then(response => response.json())
            .then(data => {
                this.setState({ team: data, loading: false });                
            });
    }


    render() {
        if (this.state.team !== null) {
            return (
                <div className="boxedArea" style={paddingtop}>
                    <ul className='thumpnailliststyle'>
                        {this.state.team.map((teammember) =>
                            <TeamMember
                                key={teammember.name}
                                image={teammember.image}
                                nickname={teammember.nickname}
                                fullname={teammember.fullname}
                            >
                            </TeamMember>)}

                    </ul>
                </div>
            )
        } else {
            return (<h1> no data </h1>);
        }
    }
};