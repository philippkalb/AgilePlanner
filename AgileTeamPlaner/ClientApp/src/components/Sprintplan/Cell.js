import React from 'react';
import Reflux from 'reflux';
import { Image } from './Image';
import { ContentCell } from './ContentCell';
import './SprintPlan.css';
import PropTypes from 'prop-types';
import './SprintPlan.css';
import { StatusUpdateAction } from './../actions'

export const CellTypes = {
    empty: 'empty',
    images: 'images',
    nonCalc: 'nonCalc'
}

export class Cell extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = { addClass: false, toggle: false, percent: this.props.percent, text: this.props.text }
        this.DisplayName = 'Cell';

        this.onClick.bind(this);
    }

    start() {
        this.setState({ addClass: true });
    }

    stop() {
        this.setState({ addClass: false });
    }

    renderCell = (content) =>  {
        // do something with a movie here
        var callBack = this.props.removeMemberFromDay;
        return (<Image removeMemberFromDay={callBack} imagenumber={content} />);
    }

    onDragOver = (ev) => {
        this.start();
        ev.preventDefault();
    }

    onDragLeave = (ev) => {
        this.stop();
        ev.preventDefault();
    }

    onDragEnd = (ev) => {
        this.stop();
    }

    onClick = (ev) => {
        var collIndex = ev.target.closest("td").cellIndex;
        var rowIndex = ev.target.closest("tr").rowIndex;
        StatusUpdateAction(true, collIndex, rowIndex, this.state.text, this.state.percent);
    }

    render() {
        let boxClass = ["cellStyle"];
        if (this.state.addClass && (this.props.cellType !== CellTypes.ContentCell)) {
            boxClass.push('dragStyle');
        }
        if (this.props.color === 1) {
            boxClass.push("successCell")
        } else if (this.props.color === 2) {
            boxClass.push("failedCell")
        }

        if (this.props.cellType === CellTypes.images) {
            return (
                <td key={this.props.key}
                    onDragOver={(e) => this.onDragOver(e)}
                    onDragLeave={(e) => this.onDragLeave(e)}
                    onDragEnd={(e) => this.onDragEnd(e)}                    
                    className={boxClass.join(' ')} >
                   
                    <div className="note">
                        <div className="top"> {this.state.percent} %</div>
                            {this.props.images.map(this.renderCell)}
                       <i onClick={(e) => this.onClick(e)} className="glyphicon glyphicon-edit noteIcon"></i>
                    </div>
                </td>
            )
        } else if (this.props.cellType === CellTypes.empty) {
            return (
                <td key={this.props.key}
                    onDragOver={(e) => this.onDragOver(e)}
                    onDragLeave={(e) => this.onDragLeave(e)}
                    onDragEnd={(e) => this.onDragEnd(e)}
                    className={boxClass.join(' ')}>   
                    <div className="note">
                        <div className="top"> {this.state.percent} %</div>
                        <i onClick={(e) => this.onClick(e)} className="glyphicon glyphicon-edit noteIcon"></i>
                    </div>
                </td>
            )
        } else {
            return (
                <td>               
                  <ContentCell key={this.props.context.story} userstory={this.props.context.story} points={this.props.context.points} workdays={this.props.context.workdays}></ContentCell>
               </td>
            )
        }
    }
};

Cell.propTypes = {
    cellType: PropTypes.oneOf(Object.keys(CellTypes))
}
