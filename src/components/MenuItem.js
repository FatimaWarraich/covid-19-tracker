import React,{useState,useEffect} from 'react';
import { MenuItem, Select, FormControl } from "@material-ui/core";


export default function Menu_Item() {
  


  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [country, setInputCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
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
    <div className="app_header">
        <FormControl className="app__dropdown">
        <Select variant ="outlined" value={country} onChange={onCountryChange}>
        <MenuItem value ="worldwide">world wide</MenuItem>
        {
            countries.map((country)=>(
                <MenuItem value ={country.value}>{country.name}</MenuItem>
            ))
        }       
    
      </Select>

        </FormControl>
      
      
     
    </div>
  );
}
