import React from 'react';
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


export class Image extends React.Component {


    constructor(props) {
        super(props);
        this.state = { image: null }
        this.DisplayName = 'Image';
       
        fetch('api/Team/' + this.props.imagenumber)
            .then(response => response.json())
            .then(data => {
                this.setState({ image: data.image, loading: false });
            });
    }


    onClick = (ev) => {
        ev.preventDefault();
        this.props.removeMemberFromDay(ev, this.props.imagenumber); 
    }

    render() {
        if (this.state.image !== null) {
            return (
                <div className="image">
                    <div className="img">                        
                        <img src={this.state.image} draggable="false" style={{ width: '50px', height: '50px' }}  />
                        <i onClick={(e) => this.onClick(e)} className="icon-remove blue delete"></i>
                    </div>
                </div>
            );
        } else {
            return (<h6>no data </h6>);
        }      
    }

}