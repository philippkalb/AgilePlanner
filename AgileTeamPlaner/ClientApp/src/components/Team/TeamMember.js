import React from 'react';
import './MemberStyles.css';



export class TeamMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            nickname: props.nickname,
            fullname: props.fullname,
        }; 
     
        this.DisplayName = 'TeamMember';
    }

    
    render() {
        return (<li>
            <div className="row">
                <div className="col-md-2 text-center "><img src={this.state.image} className='thumpnailImage' /></div>
                <div className="col-md-10">
                    <blockquote>
                        <p>{this.state.nickname}</p>
                        <footer>Also known as <cite title="Long Name">{this.state.fullname}</cite></footer>
                    </blockquote>
                </div>
            </div>
        </li>);
    };

};
