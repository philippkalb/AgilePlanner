import React from 'react';
import logo1 from '../Images/1.png';
import logo2 from '../Images/2.png';
import logo3 from '../Images/3.png';
import logo4 from '../Images/4.png';
import logo5 from '../Images/5.png';
import logo6 from '../Images/6.png';
import logo7 from '../Images/7.png';
import logo8 from '../Images/8.png';
import logo9 from '../Images/9.png';
import logo10 from '../Images/10.png';

export class Team extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            team: null,
            loading: true
        };

        fetch('api/Team/')
            .then(response => response.json())
            .then(data => {
                this.setState({ team: data, loading: false });
            });
    }

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    render() {

        if (this.state.team != null) {
            return (
                <div className="col-xs-12">
                    <div className="row">
                        {this.state.team.map((teammember) =>
                            <div className="col-md-1">
                                <div className="teamMember">
                                    <img onDragStart={(e) => this.onDragStart(e, teammember.nickname)}
                                        draggable alt="test" style={{ width: '50px', height: '50px' }}
                                        src={teammember.image} /><br />{teammember.nickname}</div>
                            </div>
                        )
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <p> no data or still loading </p>
            );
        }
    }
};