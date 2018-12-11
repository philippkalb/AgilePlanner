import React from 'react';
import {
    Button, Collapse, Glyphicon, FormGroup, ControlLabel, FormControl, HelpBlock, Modal } from 'react-bootstrap';
import Avatar from 'react-avatar-edit'
import { ShowAddteamMemberAction, UpdateTeamMembersList } from './../actions'
import Reflux from 'reflux';
import './MemberStyles.css';
import { TeamStore } from './TeamStore';


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

export class AddTeamMember extends Reflux.Component {


    constructor(props) {
        super(props);
        this.store = TeamStore;
        this.state = {
            preview: null,
            src: null,
            Nickname: '',
            Fullname: ''
        };

        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSaveAndCloseClick = this.onSaveAndCloseClick.bind(this);
        this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleChangeNickname = this.handleChangeNickname.bind(this);
        this.onAbortClick = this.onAbortClick.bind(this);

    }


    onSaveAndCloseClick = (ev) => {
         ev.preventDefault();
         if (this.getValidationState() === 'success' && this.getValidationStateFullname() === 'success' && this.state.preview != null) {
             fetch('api/Team/AddNewMember', {
                 method: 'POST',
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                     Nickname: this.state.Nickname,
                     Fullname: this.state.Fullname,
                     Image: this.state.preview
                 })
             }).then(response => {
                 ShowAddteamMemberAction(false);
                 UpdateTeamMembersList();
             });
             
         }
    }

    onClose() {
        this.setState({ preview: null })
    }

    onCrop(preview) {
        this.setState({ preview })
    }


    handleChangeNickname(event) {
        this.setState({ Nickname: event.target.value });
    }

    handleChangeFullname(event) {
        this.setState({ Fullname: event.target.value });
    }

    onNewMemberButtonClick = (ev) => {
        ev.preventDefault();
        
        ShowAddteamMemberAction(!this.state.showAdd);
    }


    getValidationState() {
        const length = this.state.Nickname.length;
        if (length > 10) return 'error';
        else if (length > 0) return 'success';
        if (length <= 10) return 'error';
        return null;
    }

    getValidationStateFullname() {
        const length = this.state.Fullname.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    onAbortClick() {
        ShowAddteamMemberAction(!this.state.showAdd);
    }

    render() {

        var buttonicon = "glyphicon glyphicon-plus";
        if (this.state.showAdd === true) {
            buttonicon = "glyphicon glyphicon-minus"
        }

        return (
            <div className="boxedArea">
                <div className="row">
                    <div className="col-md-8">
                        <h4>Add a new teammember</h4>
                    </div>
                    <div className="col-md-4">
                        <Button bsStyle="primary" onClick={this.onNewMemberButtonClick} className="pull-right" ><Glyphicon glyph={buttonicon} /></Button>
                    </div>
                </div>
                <Modal show={this.state.showAdd}
                    aria-labelledby='modal-label'
                    style={modalStyle}
                    backdropStyle={backdropStyle}
                    onHide={this.onAbortClick} >
                    <Modal.Header closeButton>
                        <Modal.Title>Add a New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>
                            State of the current Story in the Sprint:
                        </h4>
                        <div className="row">
                        <div className="col-md-8">
                            <Avatar
                                width={300}
                                height={295}
                                onCrop={this.onCrop}
                                onClose={this.onClose} />
                        </div>
                        <div className="col-md-4">
                            <img src={this.state.preview} alt="Preview" />
                        </div>
                        </div>
                        <form onSubmit={this.onSaveAndCloseClick}>
                            <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
                                <ControlLabel>Enter the nick name of the new team member</ControlLabel>
                                <FormControl type="text" value={this.state.value} placeholder="Enter the Nickname" onChange={this.handleChangeNickname} />
                                <FormControl.Feedback />
                                <HelpBlock>Required, enter a Nickname with maximum 10 characters</HelpBlock>

                            </FormGroup>
                            <FormGroup controlId="formBasic2Text" validationState={this.getValidationStateFullname()}>
                                <ControlLabel>Enter the fullname of the new team member</ControlLabel>
                                <FormControl type="text" value={this.state.value} placeholder="Enter the Fullname" onChange={this.handleChangeFullname} />
                                <FormControl.Feedback />
                                <HelpBlock>Required, enter a name with at least 10 characters</HelpBlock>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={(e) => this.onSaveAndCloseClick(e)} > Add and Close</Button>
                    </Modal.Footer>
                </Modal>        
            </div>
        );
    }
};
