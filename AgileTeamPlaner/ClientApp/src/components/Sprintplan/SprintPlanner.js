import React  from 'react';
import * as moment from 'moment';
import { Cell } from './Cell';
import { CellTypes } from './Cell';
import { Team } from './Team';
import './SprintPlan.css';
import { ModalStore } from './ModalStore';
import { Modal, Button, ButtonToolbar, ToggleButtonGroup, ToggleButton, FormGroup,  FormControl} from 'react-bootstrap';
import Reflux from 'reflux';
import { StatusUpdateAction } from './../actions';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


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
            currentSelectedColor: 1,
            currentValue : 0
        };

        fetch('api/Sprint/' + this.props.sprintName)
            .then(response => response.json())
            .then(data => {
                table.state = {
                    plan: data,
                    loading: false,
                    velocity: data.velocity
                }
                
                table.prepareColums();
                table.createTable();
            });

        this.changeValue.bind(this);
    }
    
    //prepare the number and the type of the column.
    prepareColums = () => {
        var colums = [];
        var date = new moment(table.state.plan.startDate);

        colums.push({
            key: 'id',
            name: 'User Story'
        });
        for (var c = 0; c < table.state.plan.sprintLenght; c++) {
            if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
                colums.push({
                    key: date.format('dddd'),
                    name: date.format('dddd')
                });
            }
           date.add(1, 'days');
        }
        this._columns = colums;
    }

    /*Prepare the data for the table which results in a matrix. The matrix is then rendered in the render function*/
    createTable = () => {
        let matrix = []
        //get current sprint and create date from now
        for (let rownumber = 0; rownumber < table.state.plan.userStories.length; rownumber++) {
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

            //load the color, the text and the percent
            for (var j = 0,  state; j < story.states.length; j++) {
                state = story.states[j];
                if (!statesPerDay[state.day]) {
                    statesPerDay[state.day] = [];
                }
                statesPerDay[state.day] = state;
            }

            var date = new moment(table.state.plan.startDate);
            //Inner loop to create children
            for (let colnumber = 0; colnumber <= table.state.plan.sprintLenght; colnumber++) {
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
                    //check if its a weekend, if it is do not add it
                    if (date.isoWeekday() === 6 || date.isoWeekday() === 7) {
                        date.add(1, 'days');
                        continue;
                    }
                    date.add(1, 'days');
                    if (peoplePerDay[colnumber]) {
                        var text = '';
                        var color = 1;
                        var percent = 0;
                        if (statesPerDay[colnumber] && statesPerDay[colnumber].text) {
                            text = statesPerDay[colnumber].text;
                        }

                        if (statesPerDay[colnumber] && statesPerDay[colnumber].color) {
                            color = statesPerDay[colnumber].color;
                        }

                        if (statesPerDay[colnumber] && statesPerDay[colnumber].percent) {
                            percent = statesPerDay[colnumber].percent;
                        }

                        var people = peoplePerDay[colnumber];
                        children.push({
                            type: CellTypes.images,
                            people: people,
                            color: color,
                            text: text,
                            percent: percent
                        });
                    } else {
                        children.push({
                            type: CellTypes.images,
                            people: [],
                            color: 3,
                            text: '',
                            percent: 0
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

        table.setState({ matrix: matrix, velocity: table.state.plan.velocity });
        return table
    }

    renderTable = () => {
       
        let headerrows = []
        let rows = []

        for (let j = 0; j < this._columns.length; j++) {
            headerrows.push(<th>{`${this._columns[j].name}`}</th>)
        }
        for (let key in table.state.matrix) {
            var row = table.state.matrix[key];
            let children = []
            //Inner loop to create children
            var totalpeople = 0;
            for (let colkey in row.children) {

                let rowContent = row.children[colkey];
                if ((rowContent.type === CellTypes.images) && (rowContent.people.length > 0)) {
                    children.push(<Cell key={table.state.sprintName + " " + row + " " + colkey + "" + rowContent.percent} removeMemberFromDay={this.onRemoveMemberFromDay} cellType={CellTypes.images} images={rowContent.people} color={rowContent.color} text={rowContent.text} percent={rowContent.percent} ></Cell>)
                } else if ((rowContent.type === CellTypes.images) && (rowContent.people.length === 0)) {
                    children.push(<Cell key={table.state.sprintName + " " + row + " " + colkey + "" + rowContent.percent} removeMemberFromDay={this.onRemoveMemberFromDay} cellType={CellTypes.empty} images={rowContent.people} text={rowContent.text} color={rowContent.color} percent={rowContent.percent}></Cell>)
                } else {
                    children.push(<Cell key={table.state.sprintName + " " + row + " " + colkey} cellType={CellTypes.context} context={rowContent} text={rowContent.text}></Cell>)
                }               

                if (colkey !== 0 && (rowContent.people.length > 0)) {
                    totalpeople += rowContent.people.length;
                }
            }
            row.children[0].workdays = totalpeople;
            rows.push(<tr>{children}</tr>)
        }
        let tableBody = []
        tableBody.push(<thead><tr>{headerrows}</tr></thead>)
        tableBody.push(<tbody>{rows}</tbody>)
        return tableBody
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
        
        if (cell.type === CellTypes.images) {
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
        if (cell.type === CellTypes.images && cell.people.length > 0 && cell.people.indexOf(id) < 0) {
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
        if (cell.type === CellTypes.images && cell.people.length === 0) {
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
      
        
        if (cell.type === CellTypes.images) {
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
                    text: table.state.currentInputText,
                    percent: this.state.percentValue
                })
            }).then(response => {
                cell.color = table.state.currentSelectedColor;
                cell.text = table.state.currentInputText;
                cell.percent = table.state.percentValue;
                table.setState({
                    matrix: matrix
                });
                debugger;
                StatusUpdateAction(false, CurrentCollIndex, CurrentRowIndex, table.state.currentInputText, table.state.percentValue);
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

    changeValue(event) {
        let fieldValue = event;
        table.setState({ percentValue: fieldValue });
    }   


    render() {
        const open = this.state.openDialog;
           
        return (
            <div >
                <h1>Plan Your Sprint {this.props.sprintName}<small>velocity {table.state.velocity}</small></h1>
                <table
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, "complete")} 
                    className="table table-bordered table-striped planningTable ">
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
                            <ToggleButtonGroup type="radio" name="options" defaultValue={3} onChange={this.handleChangeOfColor}>
                                <ToggleButton bsStyle="success" value={1}>Success</ToggleButton>
                                <ToggleButton bsStyle="danger" value={2}>Failed</ToggleButton>
                                <ToggleButton value={3}>Reset</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                        <h4>
                            Progress for today: {this.state.percentValue} %
                        </h4>
                        <Slider min={0} max={100} step={10} onChange={this.changeValue} value={this.state.percentValue} />
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
