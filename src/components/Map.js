import React,{useState, useEffect} from 'react';


function Map() {
    
   
   const [globalData, setGlobalData] = useState([{}]);

    useEffect(() => {
        async function getData() {
            const response = await fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL");
            let data = await response.json();
            setGlobalData(Object.values(Object.values(data.countryitems)[0]));
            //console.log("1st display", data.countryitems[0])
            //console.log("2ndDisplay", Object.values(data.countryitems)[0])
            //console.log("3rd display",Object.values(Object.values(data.countryitems)[0]))
        }
        getData();
        
    }, [])
  return (
    
    <div >
            <table >
                <thead>
                    <tr >
                        <th>Country Name</th>
                        <th>Total deaths</th>
                        <th>Total Cases</th>
                        <th>Total Recovered</th> 
                        
                    </tr>
                </thead>
                <tbody>
                    {globalData.map((key, ind) => {
                        return (
                            <tr key={ind}>
                                <th>
                                    {globalData[ind].title}
                                </th>
                                <th>
                                  {globalData[ind].total_deaths}
                                </th>
                                <th>
                                  {globalData[ind].total_cases}
                                </th>
                                <th>
                                    {globalData[ind].total_recovered}
                                </th>
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    
   
    
  );
}

export default Map;
