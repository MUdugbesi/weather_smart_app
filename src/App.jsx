/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import { generateDateFromTxt, parseDate } from './utilities/weatherUtils';
import { MainCard, MiniCard } from './components';

const App = () => {
  const [input, setInput] = useState('');
  const [mainData, setMainData] = useState(null);
  const [miniData, setMiniData] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [dateLists, setDateLists] = useState([]);
  const [dateArr, setDateArr] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [generatedDateArry, setGeneratedDataArray] = useState([]);
  const [originalMiniData, setOriginalMiniData] = useState(null);

  const API_ID = import.meta.env.VITE_API_ID;

  useEffect(() => {
    const fetchWeatherCoordinates = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_ID}`
        );
        const data = await response.json();
        if (data) {
          setLat(data[0].lat);
          setLon(data[0].lon);
        } else {
          return;
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (input.length) {
      fetchWeatherCoordinates();
    }
  }, [input]);

  const fetchWeatherData = async () => {
    try {
      const responseWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_ID}`
      );
      const dataWeather = await responseWeather.json();
      if (dataWeather) {
        setWeatherData(dataWeather);
        setDateLists(dataWeather.list);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (lat && lon && input) {
      fetchWeatherData();
    } else {
      setMainData([]);
      setMiniData([]);
    }
  }, [lat, lon, input]);

  // get all dates from a given weather result
  useEffect(() => {
    if (dateLists.length) {
      const dates = dateLists.map((list) => list.dt_txt);
      setDateArr(dates);
    }
  }, [dateLists]);

  // get all needed data once datalist change
  useEffect(() => {
    if (dateArr.length > 0) {
      const generatedDateArry = generateDateFromTxt(dateArr);
      setGeneratedDataArray(generatedDateArry);

      // Filter the weather data for each unique date
      const filteredData = getAllDates(generatedDateArry);
      setMainData(filteredData[0]);
      setMiniData(filteredData.slice(1));
    }
  }, [dateArr]);

  useEffect(() => {
    setOriginalMiniData(miniData);
  }, [miniData]);

  const getAllDates = (array) => {
    const objArr = [];
    for (const char of array) {
      for (const data of dateLists) {
        const parsedDate = parseDate(data.dt_txt);
        if (
          parsedDate === char &&
          !objArr.some((item) => parseDate(item.dt_txt) === parsedDate)
        ) {
          objArr.push(data);
        }
      }
    }
    return objArr;
  };

  const handleMiniCard = (selectedData) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const currentMainData = selectedData.dt_txt.slice(0, 10);

    let filteredMiniData = originalMiniData.filter(
      (item) => item !== selectedData
    );
    if (mainData) {
      filteredMiniData.push(mainData);
    }

    if (currentDate !== currentMainData) {
      filteredMiniData.sort((a, b) => new Date(a.dt_txt) - new Date(b.dt_txt));
      setMiniData(filteredMiniData);
    } else {
      const filtered = originalMiniData.filter(
        (item) => item.dt_txt.slice(0, 10) !== currentDate
      );
      if (mainData) {
        filtered.push(mainData);
      }
      filtered.sort((a, b) => new Date(a.dt_txt) - new Date(b.dt_txt));
      setMiniData(filtered);
    }
    setMainData(selectedData);
  };

  return (
    <>
      <div className='overlay'></div>
      <div className='content'>
        <Nav
          input={input}
          setInput={setInput}
          fetchData={fetchWeatherData}
          setLat={setLat}
          setLon={setLon}
        />

        {weatherData && originalMiniData ? (
          <>
            <div className='grid mt-14 grid-cols-2 w-[80%] mx-auto gap-10 min-h-[65vh] p-4'>
              {' '}
              <div className='relative flex justify-center'>
                <MainCard data={mainData} weatherData={weatherData} />
              </div>
              <div className='grid gap-8 grid-cols-3 justify-center items-center'>
                {originalMiniData.map((data) => {
                  return (
                    <MiniCard
                      data={data}
                      key={data.dt}
                      onClick={() => handleMiniCard(data)}
                      
                    />
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default App;
