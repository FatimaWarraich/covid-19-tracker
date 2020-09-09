import React,{useState} from 'react';
import { Pie } from 'react-chartjs-2';


function PieChart(props) {

    const data = {
        labels: [
            'Total Cases',                                    
            'Total Deaths',
            'Total Recovered',
            'Serious Cases'
        ],
        datasets: [{
            data: [countryInfo.cases,countryInfo.recovered,countryInfo.deaths],
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

    const [countryInfo, setCountryInfo] = useState({});

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;
    
        const url =
          countryCode === "worldwide"
            ? "https://disease.sh/v3/covid-19/all"
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            //setInputCountry(countryCode);
            setCountryInfo(data);
            console.log("country info",countryInfo)
            
          });
      };

       
    return (
        <div>
            <h2>Pie Visuals</h2>
            <Pie data={data} height={200} />
        </div>
    );
};

export default PieChart