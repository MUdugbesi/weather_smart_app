/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  convertKelvinToCelcius,
  convertDateToDay,
} from '../utilities/weatherUtils';
convertKelvinToCelcius;
import WeatherIcon from './Icon';

const MiniCard = ({ data, onClick }) => {
  const [toggleMiniDisplay, setToggleMiniDisplay] = useState(false);

  const handleMouseHover = () => {
    setToggleMiniDisplay(!toggleMiniDisplay);
  };
  const handleMouseLeave = () => {
    setToggleMiniDisplay(!toggleMiniDisplay);
  };
  return (
    <>
      {data ? (
        <div
          className='relative h-[180px]'
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseLeave}
        >
          <div className='h-[inherit] w-full rounded-xl miniCard absolute shadow-sm shadow-black'></div>
          <div
            className={`mini-display ${
              !toggleMiniDisplay ? 'h-0 opacity-0' : 'opacity-100'
            }`}
            onClick={onClick}
          >
            Click to view
          </div>
          <div className='flex flex-col justify-center items-center pt-4 mini_card_content'>
            <p className='font-roboto text-[18px] font-[600] tracking-wide mb-2 z10'>
              {convertDateToDay(data.dt_txt)}
            </p>
            <hr className='hr' />
            <div className='mt-2 h-[70px] flex justify-center items-center z10'>
              <WeatherIcon
                val={data.weather[0].icon}
                className='weather_icon z10 size-16'
              />
            </div>

            <p className='z10 mt-3 font-[700] text-[20px]'>
              {convertKelvinToCelcius(data.main.temp)}
            </p>
          </div>
        </div>
      ) : (
        'eded'
      )}
    </>
  );
};

export default MiniCard;
