import React, { Component } from 'react';
import { Image } from './Image';
import { ContentCell } from './ContentCell';
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
import './SprintPlan.css';
import PropTypes from 'prop-types';

export const CellTypes = {
    empty: 'empty',
    images: 'images',
    nonCalc: 'nonCalc'
}

export class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = { addClass: false }
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

    


    render() {
        let boxClass = ["cellStyle"];
        if (this.state.addClass && (Array.isArray(this.props.images) || this.props.images == 'empty')) {
            boxClass.push('dragStyle');
        }

        if (this.props.cellType == CellTypes.images) {
            return (
                <td key={this.props.key}
                    onDragOver={(e) => this.onDragOver(e)}
                    onDragLeave={(e) => this.onDragLeave(e)}
                    onDragEnd={(e) => this.onDragEnd(e)}
                    className={boxClass.join(' ')} >
                    {this.props.images.map(this.renderCell)}
                </td>
            )
        } else if (this.props.cellType == CellTypes.empty) {
            return (
                <td key={this.props.key}
                    onDragOver={(e) => this.onDragOver(e)}
                    onDragLeave={(e) => this.onDragLeave(e)}
                    onDragEnd={(e) => this.onDragEnd(e)}
                    className={boxClass.join(' ')} >
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
