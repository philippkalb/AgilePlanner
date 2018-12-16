import React from 'react';

export class Image extends React.Component {


    constructor(props) {
        super(props);
        this.state = { image: null, loading: true }
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
            if (this.state.loading) {
                return (<h6>loading..</h6>);
            }
            return (<h6>no data </h6>);
        }      
    }

}