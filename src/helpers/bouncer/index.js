import {useRef} from 'react';

const BOUNCE_RATE = 20000;

export const useDebounce = () => {
  const busy = useRef(false);

  async function debounce(callback) {
    setTimeout(() => {
      busy.current = false;
    }, BOUNCE_RATE);

    if (!busy.current) {
      busy.current = true;
      callback();
    }
  }

  return {debounce};
};
