import React,{Component} from 'react';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      city:"",
      key:"0685c4e8066b577d449babf619cf4ab4",
  
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {    
        
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+ this.state.value + "&appid=" + this.state.key)
    .then(res => res.json())
    .then((data) => {
      this.setState({ todos: data })      
      var temperature = this.state.todos.main.temp;
      var tempC = temperature - 273.15;
      var tempF = (temperature * 9) / 5 - 459.67;
      var p = document.querySelector("#temperature");
      p.innerHTML = tempC.toFixed(0) + "C / " + tempF.toFixed(0) + "F";
      p.className = "";
      if (tempC < 5) {
        p.className = "cold";
      }
      if (tempC > 30) {
        p.className = "hot";
      }
    })
    .catch(console.log)

    
    event.preventDefault();
  }
  
  
  render(){
    return (
      <div className="container">
        <h1 className="heading">Simple Weather App</h1>

        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              id="cityname"
              type="text"
              placeholder="Search for a city"
              autoFocus
              onChange={this.handleChange}
              required
            />
          </label>

          <input id="btnGetWeather" type="submit" value="Get Weather" />
        </form>
        <div className="section">
          <section id="output" className="section">
            <p id="temperature"></p>
          </section>
        </div>
      </div>
    );
  }
}


export default App;
