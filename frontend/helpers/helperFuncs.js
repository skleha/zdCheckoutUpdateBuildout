import React, { useState, useEffect } from 'react';

export const validateSeatNum = seats => {
  const typeConvertedSeats = Number(seats);
  return Number.isInteger(typeConvertedSeats) && typeConvertedSeats > 0;
}

export const hasSubscriptionChanged = (selectedSub, currentSub) => {
  const hasPlanChanged = selectedSub.plan !== currentSub.plan;
  const hasSeatsChanged = Number(selectedSub.seats) !== Number(currentSub.seats);
  const hasCostChanged = selectedSub.cost !== currentSub.cost;
  return { hasPlanChanged, hasSeatsChanged, hasCostChanged }
};

export const useDebounce = (value, delay) => {

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    }
      
    }, [value]
  );

  return debouncedValue;

}