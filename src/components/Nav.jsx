/* eslint-disable react/prop-types */
import { useState } from 'react';
import Input from './Input';

const Nav = ({
  input,
  setInput,
  fetchData,
  setLat,
  setLon,
  setWeatherData,
}) => {
  const handleInputChange = ({ target }) => {
    setInput(target.value);
  };
  const handleClick = () => {
    if (input.length) {
      fetchData();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.length) {
      fetchData();
    }
  };

  const handleClear = () => {
    setInput('');
    setLat(0);
    setLon(0);
    setWeatherData(null);
  };

  return (
    <>
      <nav className='nav'>
        <p className='title'>WEATHER APP</p>
        <Input
          onChange={handleInputChange}
          text={input}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          onClear={handleClear}
        />
      </nav>
    </>
  );
};

export default Nav;
