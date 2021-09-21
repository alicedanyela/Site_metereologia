import React, {useState} from 'react';

const api={
  key:"29279200c80e2e0bec6f43eff866b918",
  base:"https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery]= useState('');

  const [weather, setWeather]= useState({});

  const [forecast,setForecast]=useState([]);

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=> res.json())
      .then(result=> {setWeather(result); 
        setQuery('');
      console.log(result);
      }) 
      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=> res.json())
      .then((result)=> {setForecast(result.list.filter((item) => item.dt_txt.match(/18:00:00/))); 
        setQuery('');
      console.log(forecast);
      })
    }
  }

  const dateBuilder= (d) =>{
    const months=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro",
    "Outubro","Novembro","Dezembro"];
    const days = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];

    const day= days[d.getDay()];
    const date=d.getDate();
    const month = months[d.getMonth()];
    const year= d.getFullYear();

    return `${day}, ${date} de ${month} de ${year}`
  }

  return (
    <div className="App">
      <main>
        <h1>Previsão Metereológica</h1>
        <div className="search-box">
          <input type="text" 
           className="search-bar" 
           placeholder="Escreva o nome da cidade" 
           onChange={e=> setQuery(e.target.value)}
           value={query}
           onKeyPress={search}>
          </input>
        </div>
        {(typeof weather.main !="undefined")?(
          <div className="actual-temp">
            <div>
              <p>{weather.name}, {weather.sys.country}</p>
              <p>{dateBuilder(new Date())}</p>
              <h3>Temperatura actual:</h3>
              <p id="temp">Mín: {Math.round(weather.main.temp_min)}°c<br/>
                 Máx: {Math.round(weather.main.temp_max)}°c
              </p>
            </div>
          <h3>Temperatura nos próximos 5 dias:</h3>
          </div>
        ) :('')}
        <div className="array-box">
          <ul id="grid">
            {
              forecast.map((item)=>(
                <li key={item.dt} id="grid-item">{`${item.dt_txt.substring(0,10).split('-').reverse().join('-')}\n
                Mín: ${Math.round(item.main.temp_min)}°c\n
                Máx: ${Math.round(item.main.temp_max)}°c`}</li>
              ))
            }
          </ul>
        </div>  
      </main>
    </div>
  );
}

export default App;
