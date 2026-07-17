import {
  STORAGE_KEY_DISPLAYED_WEEK_START,
  STORAGE_KEY_EVENTS,
  STORAGE_KEY_SELECTED_EVENT_ID
} from '@common/constants';

const storage = {
  [STORAGE_KEY_SELECTED_EVENT_ID]: null,
  [STORAGE_KEY_EVENTS]: [],
};

export const setItem = (key, value) => {
  if (key === STORAGE_KEY_DISPLAYED_WEEK_START || key === STORAGE_KEY_EVENTS) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    storage[key] = value;
  }
};

export const getItem = (key) => {
  if (key === STORAGE_KEY_DISPLAYED_WEEK_START || key === STORAGE_KEY_EVENTS) {
    const value = localStorage.getItem(key);
    if (!value) return null;
    
    const parsedValue = JSON.parse(value);
    if (key === STORAGE_KEY_DISPLAYED_WEEK_START) {
      return new Date(parsedValue); 
    }

    if (key === STORAGE_KEY_EVENTS) {
      return parsedValue.map(event => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      }));
    }
    
    return parsedValue;
  }
  return storage[key];
};