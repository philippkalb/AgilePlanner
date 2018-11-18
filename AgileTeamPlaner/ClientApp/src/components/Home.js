import React, { Component } from 'react';
import * as moment from 'moment';
import { Image } from './Image';
import { SprintPlanner } from './SprintPlanner';

import './SprintPlan.css';

/**
 * This is the main class that renders the sprint plan. Currently, it contains lots of strange and duplicated code but hopefully this becomes better.
 */

export class Home extends React.Component {

    constructor(props, context) {
        super(props, context);
        this._columns = [];

        this.state = {
            isLoading: false,
            plans: null,
            currentSprint: null
        };

        // get the first one.. 1 is not correct but this is now only a test
        fetch('api/Sprint/')
            .then(response => response.json())
            .then(data => {
                this.setState({ plans: data, loading: true });
            });
    }

    onSprintButtonClick = (ev) => {
        this.setState({
            currentSprint: ev.sprintName
        });
    }

    render() {
        let listItems = null;
        let sprintComponent = null;

        if (this.state.plans == null) {
            listItems = "no sprints found";
        } else {
            listItems = this.state.plans.map((sprintName) =>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.onSprintButtonClick({ sprintName })} >
                    {sprintName}
                </button>);
        }

        if (this.state.currentSprint != null) {
            sprintComponent = <SprintPlanner key={this.state.currentSprint} sprintName={this.state.currentSprint} />;
        } else {
            sprintComponent = <div className="col-md-5 col-md-offset-3"> <div className="alert alert-warning" role="alert">Please select a sprint to start planning</div> </div>;
        }

        return (
            <div>
                <div className="container">
                    <div className="page-header">
                        <h1>Welcome to the Sprintplaner!</h1>
                    </div>
                    
                    <p> To start planning select a sprint in the following list: </p>
                    <div className="btn-group" role="group">
                        {listItems}
                    </div>   
                  
                </div>
                <div className="container-fluid">
                    <div className="row ">
                        {sprintComponent}
                </div>
                </div>
            </div>
        );
    }
}