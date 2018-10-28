import React, { Component } from 'react';
import * as moment from 'moment';
import { Image } from './Image';
import { Cell } from './Cell';
import { CellTypes } from './Cell';
import { Team } from './Team';
import './SprintPlan.css';

/**
 * This is the main class that renders the sprint plan. Currently, it contains lots of strange and duplicated code but hopefully this becomes better.
 */

const EMPTY = 'empty';
export class Home extends React.Component {

    constructor(props, context) {
        super(props, context);
        this._columns = [];

        this.state = {
            matrix: [],
            plan: null,
            isLoading: false,
        };

        // get the first one.. 1 is not correct but this is now only a test
        fetch('api/Sprint/1')
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

            //prepare a dictionary that contains as key the day and as value the list of employees
            for (var i = 0, emp; i < story.persons.length; i++) {
                emp = story.persons[i];
                if (!peoplePerDay[emp.day]) {
                    peoplePerDay[emp.day] = [];
                }
                peoplePerDay[emp.day].push(emp.personId);
            }
          
            //Inner loop to create children
            for (let colnumber = 0; colnumber <= this.state.plan.sprintLenght; colnumber++) {
                if (colnumber === 0) {
                    children.push({
                        id: colnumber,
                        story: story.name,
                        points: story.storyPoints,
                        workdays: 0
                    });
                } else {
                    if (peoplePerDay[colnumber]) {
                        var people = peoplePerDay[colnumber];
                        children.push(people)
                    } else {
                        children.push(this.EMPTY);
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

                if (Array.isArray(rowContent)) {
                    children.push(<Cell removeMemberFromDay={this.onRemoveMemberFromDay} cellType={CellTypes.images} images={row.children[colkey]}></Cell>)
                } else if (rowContent == this.EMPTY) {
                    children.push(<Cell cellType={CellTypes.empty} images={row.children[colkey]}></Cell>)
                } else {
                    children.push(<Cell cellType={CellTypes.context} context={row.children[colkey]}></Cell>)
                }                

                if (colkey != 0 && Array.isArray(row.children[colkey])) {
                    totalpeople += row.children[colkey].length;
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
        console.debug("test intern", index);
        var collIndex = ev.target.closest("td").cellIndex;
        var rowIndex = ev.target.closest("tr").rowIndex;
        var matrix = this.state.matrix;
        var row = matrix[rowIndex - 1];
        var cell = row.children[collIndex];

        if (Array.isArray(cell) && cell.indexOf(index) >= 0) {
            fetch('api/Sprint/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storyNumber: rowIndex,
                    day: collIndex,
                    teamMember: index
                })
            }).then(response => {
                cell.splice(cell.indexOf(index), 1);
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
        if (Array.isArray(cell) && cell.indexOf(id) < 0) {
            fetch('api/Sprint/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storyNumber: rowIndex,
                    day: collIndex,
                })
            }).then(response => {
                cell.push(id);
                this.setState({
                    matrix: matrix
                });
            });
        }
        //if the cell was empty before add an array with the image/convert the cell
        if (cell == this.EMPTY) {

            fetch('api/Sprint/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storyNumber: rowIndex,
                    day: collIndex,
                })
            }).then(response => {
                row.children[collIndex] = [id];
                this.setState({
                    matrix: matrix
                });
            });

        }
    }

    render() {
        return (
            <div >
                <h1>Plan Your Sprint</h1>

                <table
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, "complete")} 
                    className="table table-bordered table-striped planningTable">
                    {this.renderTable()}
                </table>
                <Team />
            </div>
        );
    }
}
