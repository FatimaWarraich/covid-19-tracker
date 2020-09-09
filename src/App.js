import React,{useState,useEffect} from 'react';
import './App.css';
//import MenuItem from './components/MenuItem';
//import DropDownMenu from './components/DropDownMenu';
import InfoBox from './components/InfoBox';
//import Map from './components/Map';
import { FormControl,Select,MenuItem,Card,CardContent } from '@material-ui/core';
import Table from './components/Table';
import { sortData} from "./components/Util";
import LineGraph from './components/LineGraph';
//import PieChart from './components/PieChart';
import { Pie } from 'react-chartjs-2';






function App() {
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [country, setInputCountry] = useState("worldwide");
  const [tableData,setTableData]= useState([]);



  const data = {
    labels: [
        'Total Cases',                                    
        'Total Deaths',
        'Total Recovered',
        'Active Cases'
    ],
    datasets: [{
        data: [countryInfo.cases,countryInfo.deaths,countryInfo.recovered,countryInfo.active],
        backgroundColor: [
            '#799cff',                
            '#ec8b37',
            '#4dbb6f',
            '#cc4646'
        ],
        hoverBackgroundColor: [
            '#799cff',                
            '#ec8b37',
            '#4dbb6f',
            '#cc4646'
        ]
    }]
};

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          let sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);
     
     const onCountryChange = async (e) => {
        const countryCode = e.target.value;
    
        const url =
          countryCode === "worldwide"
            ? "https://disease.sh/v3/covid-19/all"
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setInputCountry(countryCode);
            setCountryInfo(data);
            console.log("country info",countryInfo)
            
          });
      };

  return (
  <div className="app">
         <div className="app_left">
           <div className="app_header">
           < h1> Covid-19-App </h1>
           <FormControl className="app__dropdown">
        <Select variant ="outlined" value={country} onChange={onCountryChange}>
        <MenuItem value ="worldwide">world wide</MenuItem>
        {
            countries.map((country,ind)=>(
                <MenuItem value ={country.value} key={ind}>{country.name}</MenuItem>
            ))
        }       
    
      </Select>

        </FormControl>
          
           </div>
          <div className="app_stats">
           <InfoBox 
           title="CoronaVirus Today's Cases" 
           cases={countryInfo.todayCases}
           total={countryInfo.cases} />
           <InfoBox 
           title="Today's Deaths" 
           cases={countryInfo.todayDeaths}
           total={countryInfo.deaths} />
           <InfoBox 
           title="Today's Recovered" 
           cases={countryInfo.todayRecovered}
           total={countryInfo.recovered} />
           <InfoBox 
           title="Active Cases" 
           cases={0}
           total={countryInfo.active} />
           
           
           </div>
           <div>
            <h2>Pie Visuals</h2>
            <Pie data={data} height={100} />
           </div>
           
           
         </div>
        <Card className="app_right">
         <CardContent>
           <h3> Live Cases by country</h3> 
           <Table countries={tableData}/>
           <h3> World Wide</h3>
           <LineGraph/>
         </CardContent>
        </Card>
        
  </div>

  );
}

export default App;
