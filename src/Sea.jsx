import React, { Component } from 'react';

class Sea extends Component{

    state = {
        minute: 0
    }

    componentDidMount(){
        setTimeout(() => {
            if(60 - new Date().getMinutes() !== this.state.minute){
                this.setState({minute: 60 - new Date().getMinutes()});
            }
        },1000);
    }

    handlePossess = (event) => {
        if(event.currentTarget.checked){
            this.props.onPossess(this.props.animal, true, 'sea');
        }else{
            this.props.onPossess(this.props.animal, false, 'sea');
        }
    }

    render(){
        const {animal, time, hemisphere, search, hidePossess} = this.props;
        const month = new Date().getMonth() + 1;
        let hide = !animal.time.includes(time);
        if(hemisphere === 'Nord'){
            hide = hide || !animal.northernMonth.includes(month);
        }else{
            hide = hide || !animal.southernMonth.includes(month);
        }
        hide = hide || !animal.name.toLowerCase().includes(search.toLowerCase());
        hide = hide || (hidePossess && animal.possessed);
        hide = hide ? 'hide' : '';
        let hideMin = animal.time.includes((time + 1)%24) ? 'hide' : '';
        return <li className={`collection-item row valign-wrapper ${hide}`}>
            <img src={animal.icon} className="responsive-img col s2 l1" width="32" alt=""/>
            <div className="col s10 l11">
                <p>{animal.name}<span className="right"><strong>{animal.price}</strong> <img src="BellBag.png" className="responsive-img" style={{height: '1em'}} alt=""/></span></p>
                <p>{`${animal.speed} (${animal.shadow})`}
                <span className="right">
                <span className={`red-text left valign-wrapper ${hideMin}`}><i className="material-icons">schedule</i><span className="lastHrs">{`${this.state.minute} m.`}</span></span>
                    <label className="right">
                        <input type="checkbox" checked={animal.possessed} onChange={this.handlePossess}/>
                        <span></span>
                    </label>
                </span></p>
            </div>
        </li>
    }

}

export default Sea;