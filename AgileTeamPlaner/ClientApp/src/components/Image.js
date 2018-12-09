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


    onClick = (ev) => {
        ev.preventDefault();
        this.props.removeMemberFromDay(ev, this.props.imagenumber); 
    }

    render() {
        var image = null;

        if (parseInt(this.props.imagenumber,10) === 1) {
            image = <img alt="test" draggable="false" style={{ width: '50px', height: '50px' }} src={logo1} />
        }

        if (parseInt(this.props.imagenumber, 10) === 2) {
           image = <img alt="test" draggable="false" style={{ width: '50px', height: '50px' }} src={logo2} />
        }

        if (parseInt(this.props.imagenumber, 10) === 3) {
            image = <img alt="test" draggable="false" style={{ width: '50px', height: '50px' }} src={logo3} />
        }

        if (parseInt(this.props.imagenumber, 10) === 4) {
            image = <img alt="test" draggable="false" style={{ width: '50px', height: '50px' }} src={logo4} />
        }

        if (parseInt(this.props.imagenumber, 10) === 5) {
            image = <img alt="test" draggable="false" style={{ width: '50px', height: '50px' }} src={logo5} />
        }

        if (parseInt(this.props.imagenumber, 10) === 6) {
            image = <img alt="test" draggable="false" style={{ width: '50px', height: '50px' }} src={logo6} />
        }

        if (parseInt(this.props.imagenumber, 10) === 7) {
            image = <img alt="test" draggable="false" style={{ width: '50px', height: '50px' }} src={logo7} />
        }
        if (parseInt(this.props.imagenumber, 10) === 8) {
            image = <img alt="test" draggable="false" style={{ width: '50px', height: '50px' }} src={logo8} />
        }
        if (parseInt(this.props.imagenumber, 10) === 9) {
            image = <img alt="test" draggable="false" style={{ width: '50px', height: '50px' }} src={logo9} />
        }

        if (parseInt(this.props.imagenumber, 10) === 10) {
            image = <img alt="test" draggable="false" style={{ width: '50px', height: '50px' }} src={logo10} />
        }

        return (
            <div className="image">
                <div className="img">
                    {image}
                    <i onClick={(e) => this.onClick(e)}  className="icon-remove blue delete"></i>
                </div>
            </div>
        );
    }

}