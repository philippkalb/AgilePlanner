import React from 'react';

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
                <div className="col-xs-12 boxedArea">
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