import React from 'react';
import Countdown from 'react-countdown';
import Opened from './Opened';
import CountingDown from './CountingDown';

const opensIn = 1657929600000;
//const opensIn = 1649980800000; // UTC unixtimestamp

//const opensIn = Date.now() + 20000;

const renderer = ({ days, hours, minutes, seconds, completed }) => {

  if (completed)
    return <Opened />

  return <CountingDown 
    counter={`${days}:${hours}:${minutes}:${seconds}`} 
    opensIn={opensIn}
  />
  
};

const PhaseI = () => {
  return <Countdown
    date={opensIn}
    renderer={renderer}
  />;
}
 
export default PhaseI;