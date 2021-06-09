import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Line, Chart } from 'react-chartjs-2';
const axios = require('axios');

function App() {
  const [temp, setTemp] = useState(undefined);
  const [humidity, setHumidity] = useState(undefined);
  const [speed, setSpeed] = useState(undefined);
  const [weather, setWeather] = useState(undefined);
  const [completeDate, setCompleteDate] = useState(undefined);
  const [weatherIcon, setWeatherIcon] = useState(undefined);
  const [time, seTtime] = useState(undefined);
  const [geo, seGeo] = useState(undefined);
  const [city, setCity] = useState("Delhi");
  const apiXuApiKey = "d3876dbcb2f80c57f4189c418b91e2ba";
  const txtRef = useRef();
  const daybyNumber = (no) => {
    switch (no) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  }
  const monthbyNumber = (no) => {
    switch (no) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
    }
  }

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${apiXuApiKey}&query=${city}`).then(res => {
      setTemp(res.data.current.temperature);
      setHumidity(res.data.current.humidity);
      setSpeed(res.data.current.wind_speed);
      setWeather(res.data.current.weather_descriptions);
      setWeatherIcon(res.data.current.weather_icons);
      seTtime(res.data.current.observation_time)
    })
      .catch(error => {
        console.log(error);
      })

    const date = new Date();
    const time = date.getHours() + ":" + (parseInt(date.getMinutes()) + 1) + ":" + (parseInt(date.getSeconds()) + 1);
    const CurrentDate = time + " " + daybyNumber(date.getDay()) + " " + monthbyNumber(date.getMonth()) + " " + date.getDate() + "," + date.getFullYear();
    setCompleteDate(CurrentDate);
  }, [city])
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Looping tension',
      data: [65, 59, 80, 81, 26, 55, 40],
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };

  const options = {
    "tooltips": {
      "enabled": false,
      "mode": "x",
      "intersect": false,
      "custom": (tooltipModel) => {
        // hide the tooltip
        if (tooltipModel.opacity === 0) {
          this.hide();
          return;
        }
        const position = this.refs.chart.chart_instance.canvas.getBoundingClientRect();

        // set position of tooltip
        const left = position.left + tooltipModel.caretX;
        const top = position.top + tooltipModel.caretY;

        // set values
        const date = tooltipModel.dataPoints[0].xLabel;
        const value = tooltipModel.dataPoints[0].yLabel;

        this.setPositionAndData({ top, left, date, value });
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
  }
  return (
    <div className="App">
      <div className="left">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
          <p style={{ color: 'black', paddingRight: 10 }}>Your city</p>
          <input type="text" style={{ height: '35px', outline: 'none', borderColor: '#D2D2D2', borderRadius: 5, borderWidth: '1.5px', borderStyle: 'solid', backgroundColor: 'white' }} onChange={event => setCity(event.target.value)} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
          <p style={{ color: '#716F6F', fontWeight: '400' }}>{completeDate}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <img src={weatherIcon} alt="icon" />
            <h1 style={{ color: 'black', fontWeight: 'bold', paddingLeft: 10 }}>{temp} &#8451;</h1>
          </div>
          <h1 style={{ color: 'black', fontWeight: 'bold' }}>{weather}</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h3 style={{ color: '#716F6F', fontWeight: '400' }}>Humidity</h3>
            <p1 style={{ fontWeight: 'bold' }}>{humidity}%</p1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 50 }}>
            <h3 style={{ color: '#716F6F', fontWeight: '400' }}>wind</h3>
            <p1 style={{ fontWeight: 'bold' }}>{speed} km/h</p1>
          </div>
        </div>
      </div>
      <div className="right">
        <h3 style={{ color: '#716F6F', fontWeight: '400' }}>Tempereture</h3>
        <div style={{ display: 'flex', height: 400, }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default App;
