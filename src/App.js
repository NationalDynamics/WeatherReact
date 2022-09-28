import {useState,useEffect} from 'react'
import './App.css'

const axios = require('axios')

function App() {
  const [city,setCity] = useState(null);
  const [todayWeather,setTodayWeather] = useState(null)
  const [forcast,setForcast] = useState(null)
  const [Location,setLocation] = useState(null)
  const [astronomy,setAstronomy] = useState(null)
  const [recentSearch,setRecentSearch] = useState([])

  const options = {
    method: 'GET',
    url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    params: {location: 'nashville', format: 'json', u: 'f'},
    headers: {
      'X-RapidAPI-Key': 'ea34784bfdmsh60311cc2a958b92p16fdbdjsn4b982e7e63fa',
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
  };

  var loadWeather = () => {

    let params = {}

    if(city == undefined || city == null){
      params = {location: 'nashville', format: 'json', u: 'f'}

    }
    else{

      params = {location: `${city}`, format: 'json', u: 'f'}
    }

    const options = {
      method: 'GET',
      url: 'https://yahoo-weather5.p.rapidapi.com/weather',
      params: params,
      headers: {
        'X-RapidAPI-Key': 'ea34784bfdmsh60311cc2a958b92p16fdbdjsn4b982e7e63fa',
        'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      var response_forcast = response.data.forecasts
      setForcast(response_forcast.slice(0,7))
      setLocation(response.data.location)
      setTodayWeather(response.data.forecasts[0])
      setAstronomy(response.data.current_observation.astronomy)

      var recentBody = {
        temp : response.data.forecasts[0].high,
        description : response.data.forecasts[0].text,
        sunRise : response.data.current_observation.astronomy.sunrise,
        sunSet : response.data.current_observation.astronomy.sunset
      }

      console.log(recentSearch)
      var updatedRecent = recentSearch.push(recentBody)

      console.log(updatedRecent)
      setRecentSearch(updatedRecent)

      console.log(updatedRecent)
    }).catch(function (error) {
      console.error(error);
    });
  }


  useEffect(() => {
    loadWeather()
  }, []);


  var getDateName = (date) => {
    switch(date){
      case "Mon":
        return "Monday"
      case "Tue":
        return "Tuesday"
      case "Wed":
        return "Wednesday"
      case "Thu":
        return "Thursday"
      case "Fri":
        return "Friday"
      case "Sat":
        return "Saturday"
      case "Sun":
        return "Sunday"
    }
  }


  var handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log("HI", city)
      loadWeather()
    }
  }

  return (
  <div className='MainContainer'>
    <div className="Header flex row a_center j_between">
      <div className="title">
        <p className="heading">iWeather</p>
      </div>
      <div className="searchBox flex a_center">
        <input type="text" className="search" placeholder='Search City' onKeyDown={handleKeyDown} onChange={(e) => setCity(e.target.value)} />
      </div>
    </div>

    <div className="currentSection flex col">
      {Location != null && (
      <p>{Location.city} - {Location.country}</p>
      )}
      <div className="resultBody flex row a_center">
        {
          todayWeather != null && (
        <div className="todayResult flex col">
          <div className="resultHeader">
            <p>Today</p>
          </div>
          <div className="resultItemBody flex row a_center">
            <h1 className='degree'>{todayWeather.high}°</h1>
            {
              (todayWeather.text == 'Sunny' || todayWeather.text == 'Mostly Sunny') && (
                <img className='tempImg' src={require('./Assets/Sunny.png')} alt="" />
              )
            }
                        {
              (todayWeather.text == 'Cloudy' || todayWeather.text == 'Mostly Cloudy') && (
                <img className='tempImg' src={require('./Assets/Cloud.png')} alt="" />
              )
            }
                        {
              todayWeather.text == 'Partly Cloudy' && (
                <img className='tempImg' src={require('./Assets/PartlyCloudy.png')} alt="" />
              )
            }
            
            {
              todayWeather.text == 'Rain' || todayWeather.text == 'Showers' && (
                <img className='tempImg' src={require('./Assets/Rain.png')} alt="" />
              )
            }
                      {
              todayWeather.text == 'Scattered Showers' && (
                <img className='tempImg' src={require('./Assets/Rain.png')} alt="" />
              )
            }
          </div>
          <div className="resultFooter flex col">
            <div className="footerItem flex row j_between">
              <p className="subheading">Descrption:</p>
              <p>   {todayWeather.text}</p>
            </div>
            <div className="footerItem flex row j_between">
              <p className="subheading">Sunrise:</p>
              <p>{astronomy.sunrise}</p>
            </div>
            <div className="footerItem flex row j_between">
              <p className="subheading">Sunset:</p>
              <p>{astronomy.sunset}</p>
            </div>
          </div>
        </div>
          )
        }
        {
          forcast != null && forcast.map((obj) => (
        <div className="forcastItems flex col a_center">
          <div className="fitemHeader flex a_center j_center">
            <p>{getDateName(obj.day)}</p>
          </div>
          <div className="fitemBody flex col a_center j_center">
          {
              (obj.text == 'Sunny'|| obj.text == 'Mostly Sunny') && (
                <img className='tempImg' src={require('./Assets/Sunny.png')} alt="" />
              )
            }
                        {
              (obj.text == 'Cloudy' || obj.text == 'Mostly Cloudy') && (
                <img className='tempImg' src={require('./Assets/PartlyCloudy.png')} alt="" />
              )
            }
                        {
              obj.text == 'Partly Cloudy' && (
                <img className='tempImg' src={require('./Assets/PartlyCloudy.png')} alt="" />
              )
            }
            
            {
              obj.text == 'Rain' || obj.text == 'Showers' && (
                <img className='tempImg' src={require('./Assets/Rain.png')} alt="" />
              )
            }
                      {
              obj.text == 'Scattered Showers' && (
                <img className='tempImg' src={require('./Assets/Rain.png')} alt="" />
              )
            }
                      <p>{obj.text}</p>
                      
          </div>
          <div className="fitemFooter flex col a_center j_center">
          <h1 className='degree'>{obj.high}°</h1>
          <h1 className='smallDegree'>{obj.low}°</h1>
          </div>
        </div>
          ))
        }
      </div>
    </div>
    {/* <div className="currentSection flex col">
      <p>Recent Searches</p>
      <div className="resultBody flex row a_center">
        {
          (recentSearch != [] && recentSearch != null) && recentSearch.map((obj) => (
            <div className="todayResult flex col">
            <div className="resultHeader">
              <p>Today</p>
            </div>
            <div className="resultItemBody flex row a_center">
              <h1 className='degree'>{obj.high}°</h1>
              {
                (obj.description == 'Sunny' || obj.description == 'Mostly Sunny') && (
                  <img className='tempImg' src={require('./Assets/Sunny.png')} alt="" />
                )
              }
                          {
                (obj.description == 'Cloudy' || obj.description == 'Mostly Cloudy') && (
                  <img className='tempImg' src={require('./Assets/Cloud.png')} alt="" />
                )
              }
                          {
                obj.description == 'Partly Cloudy' && (
                  <img className='tempImg' src={require('./Assets/PartlyCloudy.png')} alt="" />
                )
              }
              
              {
                obj.description == 'Rain' || obj.description == 'Showers' && (
                  <img className='tempImg' src={require('./Assets/Rain.png')} alt="" />
                )
              }
                        {
                obj.description == 'Scattered Showers' && (
                  <img className='tempImg' src={require('./Assets/Rain.png')} alt="" />
                )
              }
            </div>
            <div className="resultFooter flex col">
              <div className="footerItem flex row j_between">
                <p className="subheading">Descrption:</p>
                <p>   {obj.description}</p>
              </div>
              <div className="footerItem flex row j_between">
                <p className="subheading">Sunrise:</p>
                <p>{obj.sunrise}</p>
              </div>
              <div className="footerItem flex row j_between">
                <p className="subheading">Sunset:</p>
                <p>{obj.sunset}</p>
              </div>
            </div>
          </div>
          )) 
        }
      </div>
    </div> */}

  </div>
  );
}

export default App;