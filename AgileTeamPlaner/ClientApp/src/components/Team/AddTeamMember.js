import React from 'react';
import { Button,  Collapse,  Glyphicon,  FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Avatar from 'react-avatar-edit'
import { ShowAddteamMemberAction } from './../actions'
import Reflux from 'reflux';
import './MemberStyles.css';
import { TeamStore } from './TeamStore';


export class AddTeamMember extends Reflux.Component {


    constructor(props) {
        super(props);
        this.store = TeamStore;
        this.state = {
            preview: null,
            src: null
        };

        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSaveAndCloseClick = this.onSaveAndCloseClick.bind(this);
        this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleChangeNickname = this.handleChangeNickname.bind(this);

    }


    onSaveAndCloseClick = (ev) => {
        ev.preventDefault();
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
        });
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
                <Collapse in={this.state.showAdd}>
                    <div>
                        <div className="row">
                            <div className="col-md-8">
                                <Avatar
                                    width={390}
                                    height={295}
                                    onCrop={this.onCrop}
                                    onClose={this.onClose} />
                            </div>
                            <div className="col-md-4">
                                <img src={this.state.preview} alt="Preview" />
                            </div>
                        </div>
                        <form>
                            <FormGroup controlId="formBasicText" >
                                <ControlLabel>Enter the nick name of the new team member</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.value}
                                    placeholder="Enter the Nickname"
                                    onChange={this.handleChangeNickname}
                                />
                                <ControlLabel>Enter the fullname of the new team member</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.value}
                                    placeholder="Enter the Fullname"
                                    onChange={this.handleChangeFullname}
                                />
                            </FormGroup>
                            <Button type="submit" bsStyle="primary" onClick={this.onSaveAndCloseClick}>Create the Teammember</Button>
                        </form>

                    </div>
                </Collapse>
            </div>
        );
    }
};
