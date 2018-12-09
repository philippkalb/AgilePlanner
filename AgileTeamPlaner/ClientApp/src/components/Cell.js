import React from 'react';
import { Image } from './Image';
import { ContentCell } from './ContentCell';
import './SprintPlan.css';
import PropTypes from 'prop-types';
import './SprintPlan.css';
import { StatusUpdateAction } from './actions'

export const CellTypes = {
    empty: 'empty',
    images: 'images',
    nonCalc: 'nonCalc'
}

export class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = { addClass: false, toggle: false }
        this.DisplayName = 'Cell';
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
        StatusUpdateAction(true, collIndex, rowIndex, this.props.text );
    }

    render() {
        let boxClass = ["cellStyle"];
        if (this.state.addClass && (Array.isArray(this.props.images) || this.props.images === 'empty')) {
            boxClass.push('dragStyle');
        }
        if (this.props.color === 1) {
            boxClass.push("btn-success")
        } else if (this.props.color === 2) {
            boxClass.push("btn-danger")
        }

        if (this.props.cellType === CellTypes.images) {
            return (
                <td key={this.props.key}
                    onDragOver={(e) => this.onDragOver(e)}
                    onDragLeave={(e) => this.onDragLeave(e)}
                    onDragEnd={(e) => this.onDragEnd(e)}                    
                    className={boxClass.join(' ')} >
                    <div className="note" onClick={(e) => this.onClick(e)}>
                        {this.props.images.map(this.renderCell)}
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
