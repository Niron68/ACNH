/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Navbar from './Navbar';
import Animal from './Animal';
import Fish from './Fish';
import Bug from './Bug';
import Sea from './Sea';

class App extends React.Component {

  state = {
    fishs: [],
    bugs: [],
    sea: [],
    actualHours: 0,
    hemisphere: 'Nord',
    searchBar: '',
    hidePossess: false
  };

  saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  handleTextChange = (event) => {
    let searchBar = event.currentTarget.value;
    this.setState({searchBar});
  }

  handleHemisphere = (hemisphere) => {
    this.setState({hemisphere}, this.saveStateToLocalStorage);
  }

  handlePossess = (animal, possessed, type) => {
    if(type === 'fish'){
      const fishs = [...this.state.fishs];
      fishs.find(item => item.id === animal.id).possessed = possessed;
      this.setState({fishs}, this.saveStateToLocalStorage);
    }else if(type === 'bug'){
      const bugs = [...this.state.bugs];
      bugs.find(item => item.id === animal.id).possessed = possessed;
      this.setState({bugs}, this.saveStateToLocalStorage);
    }else{
      const sea = [...this.state.sea];
      sea.find(item => item.id === animal.id).possessed = possessed;
      this.setState({sea}, this.saveStateToLocalStorage);
    }
  }

  handleHidePossess = (hidePossess) => {
    this.setState({hidePossess}, this.saveStateToLocalStorage);
  }

  updateTable(ta, tn){
    let tf = [];
    tn.forEach(element => {
      let oldEl = ta.find(it => it.id === tn.id);
      if(oldEl){
        console.log(oldEl.name);
        let finEl = JSON.parse(JSON.stringify(element));
        if(oldEl.possessed)
          console.log(oldEl.name);
        finEl.possessed = oldEl.possessed;
        tf.push(finEl);
      }else{
        tf.push(JSON.parse(JSON.stringify(element)));
      }
    });
    return tf;
  }

  initialize(){
    fetch('https://acnhapi.com/v1/fish')
    .then(r => r.json())
    .then(json => {
      let fishs = [];
      for(var it in json){
        fishs.push(new Animal(json[it]));
      }
      fishs = this.updateTable(this.state.fishs, fishs);
      this.setState({ fishs: fishs }, this.saveStateToLocalStorage);
    });
    fetch('https://acnhapi.com/v1/bugs')
    .then(r => r.json())
    .then(json => {
      const bugs = [];
      for(var it in json){
        bugs.push(new Animal(json[it]));
      }
      if(this.state.bugs.length < bugs.length)
        this.setState({ bugs }, this.saveStateToLocalStorage);
    });
    fetch('https://acnhapi.com/v1/sea')
    .then(r => r.json())
    .then(json => {
      const sea = [];
      for(var it in json){
        sea.push(new Animal(json[it]));
      }
      if(this.state.sea.length < sea.length)
        this.setState({ sea }, this.saveStateToLocalStorage);
    });
  }

  componentDidMount(){
    const state = localStorage.getItem('state');
    if(state){
      this.setState(JSON.parse(state));
    }
    this.initialize();
    this.setState({actualHours: new Date().getHours()})
    setInterval(() => {
      let date = new Date();
      if(this.state.actualHours !== date.getHours()){
        this.setState({actualHours: date.getHours()});
      }
    }, 1000);
  }

  render(){
    return (
      <div className="App">
        <Navbar hemisphere={this.state.hemisphere} hidePossess={this.state.hidePossess} onHemChange={this.handleHemisphere} onHidePossess={this.handleHidePossess}/>
        <div className="container">
          <input type="text" value={this.state.searchBar} placeholder="Entrez le nom d'un animal" onChange={this.handleTextChange}/>
          <ul className="collection" id="fish">
            {this.state.fishs.sort((a, b) => b.price - a.price).map(item => <Fish animal={item} time={this.state.actualHours} hemisphere={this.state.hemisphere} search={this.state.searchBar} onPossess={this.handlePossess} hidePossess={this.state.hidePossess} key={item.id}/>)}
          </ul>
          <ul className="collection" id="bug">
            {this.state.bugs.sort((a, b) => b.price - a.price).map(item => <Bug animal={item} time={this.state.actualHours} hemisphere={this.state.hemisphere} search={this.state.searchBar} onPossess={this.handlePossess} hidePossess={this.state.hidePossess} key={item.id}/>)}
          </ul>
          <ul className="collection" id="sea">
            {this.state.sea.sort((a, b) => b.price - a.price).map(item => <Sea animal={item} time={this.state.actualHours} hemisphere={this.state.hemisphere} search={this.state.searchBar} onPossess={this.handlePossess} hidePossess={this.state.hidePossess} key={item.id}/>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
