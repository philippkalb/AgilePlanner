import React, { Component } from 'react';
import * as moment from 'moment';
import { Image } from './Image';
import { Cell } from './Cell';
import { CellTypes } from './Cell';
import { Team } from './Team';
import './SprintPlan.css';
import { ModalStore } from './ModalStore';
import {
    Col, Grid, Row, Modal, Button, ButtonGroup,
    ButtonToolbar, ToggleButtonGroup, ToggleButton,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import Reflux from 'reflux';
import { StatusUpdateAction } from './actions'

const modalStyle = {
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
    ...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
}

/**
 * This is the main class that renders the sprint plan. Currently, it contains lots of strange and duplicated code but hopefully this becomes better.
 */

const EMPTY = 'empty';
var table;
export class SprintPlanner extends Reflux.Component {

    constructor(props, context) {
        super(props, context);
        this._columns = [];
        this.store = ModalStore;
        table = this;
        this.state = {
            matrix: [],
            plan: null,
            isLoading: false,
            currentSelectedColor:1
        };

        fetch('api/Sprint/' + this.props.sprintName)
            .then(response => response.json())
            .then(data => {
                this.setState({ plan: data, loading: false });
                this.prepareColums();
                this.createTable();
            });
    }
    
    //prepare the number and the type of the column.
    prepareColums = () => {
        var colums = [];
        var date = new moment(this.state.plan.startDate);

        colums.push({
            key: 'id',
            name: 'User Story'
        });
        for (var c = 0; c < this.state.plan.sprintLenght; c++) {
            colums.push({
                key: date.format('dddd'),
                name: date.format('dddd')
            });
           date.add(1, 'days');
        }
        this._columns = colums;
    }

    /*Prepare the data for the table which results in a matrix. The matrix is then rendered in the render function*/
    createTable = () => {
        let table = []
        let headerrows = []
        let rows = []
        let matrix = []
      
        //get current sprint and create date from now
        for (let rownumber = 0; rownumber < this.state.plan.userStories.length; rownumber++) {
            let children = []
            let story = this.state.plan.userStories[rownumber];
            var peoplePerDay = {};
            var statesPerDay = {};

            //prepare a dictionary that contains as key the day and as value the list of employees
            for (var i = 0, emp; i < story.persons.length; i++) {
                emp = story.persons[i];
                if (!peoplePerDay[emp.day]) {
                    peoplePerDay[emp.day] = [];
                }
                peoplePerDay[emp.day].push(emp.personId);
            }

            for (var i = 0, state; i < story.states.length; i++) {
                state = story.states[i];
                if (!statesPerDay[state.day]) {
                    statesPerDay[state.day] = [];
                }
                statesPerDay[state.day] = state;
            }
          
            //Inner loop to create children
            for (let colnumber = 0; colnumber <= this.state.plan.sprintLenght; colnumber++) {
                if (colnumber === 0) {
                    children.push({
                        id: colnumber,
                        story: story.name,
                        points: story.storyPoints,
                        workdays: 0,
                        type: CellTypes.nonCalc,
                        people: [],
                        color: 1,
                        text: ''
                    });
                } else {
                    if (peoplePerDay[colnumber]) {
                        var text = '';
                        var color = 1;
                        if (statesPerDay[colnumber] && statesPerDay[colnumber].text) {
                            text = statesPerDay[colnumber].text;
                        }

                        if (statesPerDay[colnumber] && statesPerDay[colnumber].color) {
                            color = statesPerDay[colnumber].color;
                        }

                        var people = peoplePerDay[colnumber];
                        children.push({
                            type: CellTypes.images,
                            people: people,
                            color: color,
                            text: text
                        });
                    } else {
                        children.push({
                            type: CellTypes.images,
                            people: [],
                            color: 1,
                            text: ''
                        });
                    }
                }               
            }
            //add row to matrix. it contains a list of children (colums) for a certain row.
            //this is used to render the table
            matrix.push({
                row: rownumber,
                children: children
            });
        }

        this.setState({ matrix: matrix });
        return table
    }

    renderTable = () => {
        let table = []
        let headerrows = []
        let rows = []

        for (let j = 0; j < this._columns.length; j++) {
            headerrows.push(<th>{`${this._columns[j].name}`}</th>)
        }

        for (let key in this.state.matrix) {
            var row = this.state.matrix[key];
            let children = []
            //Inner loop to create children
            var totalpeople = 0;
            for (let colkey in row.children) {

                let rowContent = row.children[colkey];
                if ((rowContent.type == CellTypes.images) && (rowContent.people.length > 0)) {
                    children.push(<Cell removeMemberFromDay={this.onRemoveMemberFromDay} cellType={CellTypes.images} images={rowContent.people} color={rowContent.color} text={rowContent.text} ></Cell>)
                } else if ((rowContent.type == CellTypes.images) && (rowContent.people.length == 0)) {
                    children.push(<Cell key={this.state.sprintName + " " + row + " " + colkey} cellType={CellTypes.empty} images={rowContent.people} text={rowContent.text} ></Cell>)
                } else {
                    children.push(<Cell key={this.state.sprintName + " " + row + " " + colkey} cellType={CellTypes.context} context={rowContent} text={rowContent.text}></Cell>)
                }               

                if (colkey != 0 && (rowContent.people.length > 0)) {
                    totalpeople += rowContent.people.length;
                }
            }
            row.children[0].workdays = totalpeople;
            rows.push(<tr>{children}</tr>)
        }
        table.push(<thead><tr>{headerrows}</tr></thead>)
        table.push(<tbody>{rows}</tbody>)
        return table
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onRemoveMemberFromDay = (ev, index) => {
        ev.preventDefault();
        var collIndex = ev.target.closest("td").cellIndex;
        var rowIndex = ev.target.closest("tr").rowIndex;
        var matrix = this.state.matrix;
        var row = matrix[rowIndex - 1];
        var cell = row.children[collIndex];
        
        if (cell.type == CellTypes.images) {
            fetch('api/Sprint/RemoveTeammember', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sprintName: this.props.sprintName,
                    storyName: row.children[0].story,
                    day: collIndex,
                    teamMember: index
                })
            }).then(response => {
                cell.people.splice(cell.people.indexOf(index), 1);
                this.setState({
                    matrix: matrix
                });
            });
        }
    }

    onDrop = (ev, cat) => {        
        ev.preventDefault();
        var collIndex = ev.target.closest("td").cellIndex;
        var rowIndex = ev.target.closest("tr").rowIndex;
        var id = ev.dataTransfer.getData('id');
        var matrix = this.state.matrix;
        var row = matrix[rowIndex - 1];
        var cell = row.children[collIndex];

        //if its a normal cell with images, add the image
        if (cell.type == CellTypes.images && cell.people.length > 0 && cell.people.indexOf(id) < 0) {
            fetch('api/Sprint/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sprintName: this.props.sprintName,
                    storyName: row.children[0].story,
                    day: collIndex,
                })
            }).then(response => {
                cell.people.push(id);
                this.setState({
                    matrix: matrix
                });
            });
        }
        //if the cell was empty before add an array with the image/convert the cell
        if (cell.type == CellTypes.images && cell.people.length == 0) {
            fetch('api/Sprint/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sprintName: this.props.sprintName,
                    storyName: row.children[0].story,
                    day: collIndex,
                })
            }).then(response => {
                row.children[collIndex].people.push(id);
                this.setState({
                    matrix: matrix
                });
            });
        }
    }


    onSaveAndCloseClick = (ev) => {
        const CurrentCollIndex = this.state.CurrentCollIndex;
        const CurrentRowIndex = this.state.CurrentRowIndex;
        var matrix = this.state.matrix;
        var row = matrix[CurrentRowIndex - 1];
        var cell = row.children[CurrentCollIndex];
        StatusUpdateAction(false);
        
        if (cell.type == CellTypes.images) {
            fetch('api/Sprint/AddStateToPlanAndDay', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sprintName: this.props.sprintName,
                    storyName: row.children[0].story,
                    day: CurrentCollIndex,
                    color: table.state.currentSelectedColor,
                    text: table.state.currentInputText
                })
            }).then(response => {
                cell.color = table.state.currentSelectedColor;
                cell.text = table.state.currentInputText;
                this.setState({
                    matrix: matrix
                });
            });
        }
    }

    onAbortClick() {
        StatusUpdateAction(false);
    }

    handleChangeOfColor(color) {
        table.setState({
            currentSelectedColor: color
        });
    }

    handleTextFieldChange(event) {
        let fieldValue = event.target.value;
        table.setState({ currentInputText: fieldValue })
    }

    render() {
        const open = this.state.openDialog;
        return (
            <div >
                <h1>Plan Your Sprint {this.props.sprintName}</h1>
                <table
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, "complete")} 
                    className="table table-bordered table-striped planningTable">
                    {this.renderTable()}
                </table>
                <Team />
                <Modal show={open}
                    aria-labelledby='modal-label'
                    style={modalStyle}
                    backdropStyle={backdropStyle}
                    onHide ={this.onAbortClick} >
                    <Modal.Header closeButton>
                        <Modal.Title>Change State</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>
                            State of the current Story in the Sprint:
                        </h4>
                        <ButtonToolbar>
                            <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={this.handleChangeOfColor}>
                                <ToggleButton bsStyle="success" value={1}>Success</ToggleButton>
                                <ToggleButton bsStyle="danger" value={2}>Failed</ToggleButton>
                                <ToggleButton value={3}>Reset</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                        <h4>
                            Further comments:
                        </h4>
                        <FormGroup controlId="formControlsTextarea">
                            <FormControl componentClass="textarea" placeholder={this.state.cellText} onChange={this.handleTextFieldChange.bind(this)} />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={(e) => this.onSaveAndCloseClick(e)} > Close and Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
