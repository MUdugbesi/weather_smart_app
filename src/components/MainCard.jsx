/* eslint-disable react/prop-types */
import React from 'react';
import {
  convertKelvinToCelcius,
  convertMsToKh,
  parseDate,
} from '../utilities/weatherUtils';
import WeatherIcon from './Icon';

const MainCard = ({ data, weatherData }) => {
  return (
    <>
      {weatherData.cod && data.dt ? (
        <>
          <div className='w-[65%] mx-auto h-full p-5 rounded-lg mainCard absolute'></div>
          <div className='main_card_content w-[65%] hover:scale-[1.01] transition-all delay-0 duration-300 ease-linear'>
            <div className='temp'>
              <WeatherIcon
                val={data.weather[0].icon}
                className='weather_icon size-36'
              />
              <p className='text-white font-[700] text-[60px]'>
                {convertKelvinToCelcius(data.main.temp)}
              </p>
            </div>{' '}
            <p className='text-center text-[22px]'>
              {weatherData.city.name}, {weatherData.city.country}
            </p>
            <aside className='flex justify-center items-center gap-3 italic'>
              <small> Lat - {weatherData.city.coord.lat}</small>
              <small>Lon - {weatherData.city.coord.lon}</small>
            </aside>
            <div className='dateAndTime'>
              <p>{parseDate(data.dt_txt)}</p>
              {parseDate(data.dt_txt) === parseDate(Date.now()) ? (
                <p>{new Date().toLocaleTimeString().slice(0, -3)}</p>
              ) : (
                <p>{data.dt_txt.slice(10)}</p>
              )}
            </div>
            <div className='grid grid-cols-2 gap-4 p-6 '>
              <div className='windSpeed bg-[#2626ea]'>
                <p title='Wind Speed'>Wind Speed</p>
                <small>{convertMsToKh(data.wind.speed)} km/h</small>
              </div>
              <div className='humidity bg-[#16b416]'>
                <p title='Humidity'>Humdity</p>
                <small>
                  {data.main.humidity} gm/m<sup>3</sup>
                </small>
              </div>
            </div>
            <div className='flex items-center w-[70%] mx-auto justify-between mt-4'>
              <p className='font-[500] text-[22px] font-roboto'>Heat Index</p>
              <p>{convertKelvinToCelcius(data.main.feels_like)}</p>
            </div>
            <hr className='mt-4' />
            <div className='description'>{data.weather[0].description}</div>
          </div>
        </>
      ) : (
        <>
          <div className='flex flex-col justify-center items-center text-[white]'>
            <p className='font-mono text-[56px]'>
              Hi <span className='font-[700]'>User!</span>
            </p>
            <p className=' text-[30px] mb-4'>
              Welcome to the{' '}
              <span className='italic font-[600]'>smart weather app</span>
            </p>
            <p className='text-[white] text-[20px] font-roboto'>
              Enter a search location to get weather reports
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default MainCard;
