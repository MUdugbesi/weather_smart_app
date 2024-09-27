import React from 'react';
import { FaCloud, FaSnowflake } from 'react-icons/fa6';
import { WiDayRain } from 'react-icons/wi';
import { IoPartlySunnySharp, IoSunny } from 'react-icons/io5';
import {
  BsCloudsFill,
  BsCloudRainFill,
  BsCloudLightningFill,
} from 'react-icons/bs';
import { RiMistLine } from 'react-icons/ri';

const WeatherIcon = ({ val, className }) => {
  return (
    <div>
      {(val === '01d' || val === '01n') && (
        <IoSunny
          className={`${val === '01n' ? 'text-[#000000bc]' : ''} ${className}`}
        />
      )}
      {(val === '02d' || val === '02n') && (
        <IoPartlySunnySharp
          className={`${val === '02n' ? 'text-[#000000bc]' : ''} ${className}`}
        />
      )}
      {(val === '03d' || val === '03n') && (
        <FaCloud
          className={`${val === '03n' ? 'text-[#000000bc]' : ''} ${className}`}
        />
      )}
      {(val === '04d' || val === '04n') && (
        <BsCloudsFill
          className={`${val === '04n' ? 'text-[#000000bc]' : ''} ${className}`}
        />
      )}
      {(val === '09d' || val === '09n') && (
        <BsCloudRainFill
          className={`${val === '09n' ? 'text-[#000000bc]' : ''} ${className}`}
        />
      )}
      {(val === '10d' || val === '10n') && <WiDayRain className={className} />}
      {(val === '11d' || val === '11n') && (
        <BsCloudLightningFill
          className={`${val === '11n' ? 'text-[#000000bc]' : ''} ${className}`}
        />
      )}
      {(val === '13d' || val === '13n') && (
        <FaSnowflake
          className={`${val === '13n' ? 'text-[#000000bc]' : ''} ${className}`}
        />
      )}
      {(val === '50d' || val === '50n') && (
        <RiMistLine
          className={`${val === '50n' ? 'text-[#000000bc]' : ''} ${className}`}
        />
      )}
    </div>
  );
};

export default WeatherIcon;
