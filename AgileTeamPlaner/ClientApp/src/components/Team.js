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

export class Team extends React.Component {

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    render() {
        return (
            <div className="col-xs-12">
                <div className="row">
                    <div className="col-md-1"><div className="teamMember"><img onDragStart={(e) => this.onDragStart(e, 1)} draggable alt="test" style={{ width: '50px', height: '50px' }} src={logo1} /><br />Philipp</div></div>
                    <div className="col-md-1"><div className="teamMember"><img onDragStart={(e) => this.onDragStart(e, 2)} draggable alt="test" style={{ width: '50px', height: '50px' }} src={logo2} /><br />Mike</div></div>
                    <div className="col-md-1"><div className="teamMember"><img onDragStart={(e) => this.onDragStart(e, 3)} draggable alt="test" style={{ width: '50px', height: '50px' }} src={logo3} /><br />Dmitryo</div ></div>

                    <div className="col-md-1"><div className="teamMember"><img onDragStart={(e) => this.onDragStart(e, 4)} draggable alt="test" style={{ width: '50px', height: '50px' }} src={logo4} /><br />Max</div ></div>
                    <div className="col-md-1"><div className="teamMember"><img onDragStart={(e) => this.onDragStart(e, 5)} draggable alt="test" style={{ width: '50px', height: '50px' }} src={logo5} /><br />Benny</div ></div>
                    <div className="col-md-1"><div className="teamMember"><img onDragStart={(e) => this.onDragStart(e, 6)} draggable alt="test" style={{ width: '50px', height: '50px' }} src={logo6} /><br />Hannes</div ></div>

                    <div className="col-md-1"><div className="teamMember"><img onDragStart={(e) => this.onDragStart(e, 7)} draggable alt="test" style={{ width: '50px', height: '50px' }} src={logo7} /><br />Julia</div ></div>
                    <div className="col-md-1"><div className="teamMember"><img onDragStart={(e) => this.onDragStart(e, 8)} draggable alt="test" style={{ width: '50px', height: '50px' }} src={logo8} /><br />Nataliya</div ></div>
                    <div className="col-md-1"><div className="teamMember"><img onDragStart={(e) => this.onDragStart(e, 9)} draggable alt="test" style={{ width: '50px', height: '50px' }} src={logo9} /><br />Alex</div ></div>
                    <div className="col-md-1"><div className="teamMember"><img onDragStart={(e) => this.onDragStart(e, 10)} draggable alt="test" style={{ width: '50px', height: '50px' }} src={logo10} /><br />Franz</div ></div>
                </div>
            </div>
        )
    }
};