import React,{ Component } from 'react';
import './Weather.css';
import keys from "../../keys";



const api = {
    key: keys.API_KEY,
    base: keys.BASE_URL,
    location_api:keys.Location_API
  };
export default class Weather extends  Component{
    state = {
        query:"",
        weather:{}
    }; 
  
          componentDidMount(){
            fetch("https://geolocation-db.com/json/"+api.location_api)
            .then((res) => res.json())
            .then((result) => {
             
              console.log(result);
              fetch(`${api.base}weather?q=${result.city}&units=metric&APPID=${api.key}`)
              .then((res) => res.json())
              .then((result) => {
                this.setState({ query:"",weather:{...result}});
                
                console.log(result);
              });
            });
          }
     dateBuild = (d) => {
        let date = String(new window.Date());
        date = date.slice(3, 15);
        return date;
      };
    
     
       search = (e) => {
        if (e.key === "Enter") {
           
          fetch(`${api.base}weather?q=${this.state.query}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                this.setState({ query:"",weather:{...result}});
              console.log(result);
            });
        }
      };

     render(){
       
        return (
          
            <div
              className={
                typeof this.state.weather.main != "undefined"
                  ? this.state.weather.main.temp > 18
                    ? "hot"
                    : "cold"
                  : ""
              }
            >
          
              <main>
                <div className="search-container">
               
                  <input
                    type="text"
                    placeholder="Search..."
                    className="search-bar"
                    onChange={(e) =>  this.setState({ query:e.target.value})}
                    value={this.state.query}
                    onKeyPress={this.search}
                  />
                </div>
                {typeof this.state.weather.main != "undefined" ? (
                  <div>
                    <div className="location-container">
                      <div className="location">
                        {this.state.weather.name}, {this.state.weather.sys.country}
                      </div>
                      <div className="date"> {this.dateBuild(new Date())}</div>
                    </div>
                    <div className="weather-container">
                      <div className="temperature">
                      Current Temparature: {Math.round(this.state.weather.main.temp)}°C
                      </div>
                      <div className="temperature">
                      High: {Math.round(this.state.weather.main.temp_max)}°C / Low: {Math.round(this.state.weather.main.temp_min)}°C
                      </div>
                      <div className="weather">{this.state.weather.weather[0].main}</div>
                      <div className="weather-desc">{this.state.weather.weather[0].description} , wind speed is {this.state.weather.wind.speed}</div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </main>
            </div>
          );
     } 
    }
    