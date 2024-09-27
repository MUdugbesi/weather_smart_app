import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineClear } from 'react-icons/md';

const Input = ({ onClick, onChange, text, onKeyDown, onClear }) => {
  return (
    <>
      <div className='input_ctn'>
        <FiSearch className='search' onClick={onClick} />
        <input
          className='input'
          onChange={onChange}
          placeholder='Search Location'
          value={text}
          onKeyDown={onKeyDown}
        />
        {text ? <MdOutlineClear className='clear' onClick={onClear} /> : ''}
      </div>
    </>
  );
};

export default Input;
