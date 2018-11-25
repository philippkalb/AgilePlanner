import React, { Component } from 'react';
import Reflux from 'reflux';
import { StatusUpdateAction } from './actions'


export class ModalStore extends Reflux.Store {
    constructor() {
        super();
        this.state = { openDialog: false }; // <- set store's default state much like in React
        this.listenTo(StatusUpdateAction, this.onStatusUpdate); // listen to the statu
       }

    onLoadCompleted(data) {
        // use the data here
    }

    onLoadFailed(message) {
        // failed, with whatever message you sent
    }

    onStatusUpdate(status, collIndex, rowIndex, text) {
        this.setState({
            openDialog: status,
            CurrentCollIndex: collIndex,
            CurrentRowIndex: rowIndex,
            cellText: text
        });
    }
}