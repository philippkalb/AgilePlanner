import React, { Component } from 'react';
import { SprintPlanner } from './SprintPlanner';

export class FetchData extends Component {
  displayName = FetchData.name

  constructor(props) {
    super(props);
    this.state = {
        sprintName: "Sprint 1",
        loading: true
    };   
  }
    

  render() {

    return (
      <div>
        <SprintPlanner sprintName="Sprint 1" />
      </div>
    );
  }
}
