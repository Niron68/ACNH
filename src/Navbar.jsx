/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Navbar extends Component {
    state = {
        color: 'blue'
    };

    handleTabChange = (color) => {
        this.setState({ color });
    }

    handleHemChange = () => {
        const hem = this.props.hemisphere;
        if(hem === 'Nord'){
            this.props.onHemChange('Sud');
        }else{
            this.props.onHemChange('Nord');
        }
    }

    handleHidePossess = () => {
        if(this.props.hidePossess){
            this.props.onHidePossess(false);
        }else{
            this.props.onHidePossess(true);
        }
    }

    render(){
        return (
        <nav className={`nav-extended ${this.state.color}`} id="topbar">
            <div className="nav-wrapper">
                <a className="brand-logo">ACNH</a>
                <ul>
        <li onClick={this.handleHidePossess}><a className="hide-on-med-and-up"><i className="material-icons">{this.props.hidePossess ? 'visibility_off' : 'visibility'}</i></a></li>
                    <ul className="right">
                        <li onClick={this.handleHidePossess}><a><i className="material-icons hide-on-small-only">{this.props.hidePossess ? 'visibility_off' : 'visibility'}</i></a></li>
                        <li onClick={this.handleHemChange}><a>{this.props.hemisphere}</a></li>
                    </ul>
                </ul>
            </div>
            <div className="nav-content">
                <ul className="tabs tabs-transparent">
                    <li className="tab" id="fishTab" onClick={() => this.handleTabChange('blue')}><a href="#fish">Poisson</a></li>
                    <li className="tab" id="bugTab"onClick={() => this.handleTabChange('green')}><a href="#bug">Insecte</a></li>
                    <li className="tab" id="seaTab"onClick={() => this.handleTabChange('indigo')}><a href="#sea">Créature</a></li>
                </ul>
            </div>
        </nav>)
    }
}

export default Navbar;