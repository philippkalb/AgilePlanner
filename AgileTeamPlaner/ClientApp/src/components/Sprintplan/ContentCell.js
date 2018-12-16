import React from 'react';

export class ContentCell extends React.Component {

    render() {
        return (
            <div>
                <div><b>{this.props.userstory}</b></div>
                <div><i>Points {this.props.points}</i></div>
                <div>{this.props.workdays}</div>                
            </div>
        );
    }

}