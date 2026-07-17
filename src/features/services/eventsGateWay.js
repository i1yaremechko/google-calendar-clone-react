import { API_BASE_URL } from "@common/constants";

const baseUrl = `${API_BASE_URL}/events`;

const handleResponse = res => {
  if (res.ok) {
    return res.json();
  }
  throw new Error('Internal Server Error');
};

const mapToServerData = (eventData) => ({
  title: eventData.title,
  description: eventData.description,
  color: eventData.color,
  start: eventData.dateFrom.toISOString(),
  end: eventData.dateTo.toISOString(),
  date: eventData.dateFrom.toISOString().split('T')[0],
});

export const getEventsList = () => 
  fetch(baseUrl)
    .then(handleResponse)
    .then((events) =>{
      return events.map((event) => ({
        ...event,
        dateFrom: new Date(event.start),
        dateTo: new Date(event.end),
      }))
    });

export const createEvent = eventData => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapToServerData(eventData)),
  }).then(handleResponse);
};

export const updateEvent = (id, eventData) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapToServerData(eventData)),
  }).then(handleResponse);
};

export const deleteEvent = id => 
  fetch(`${baseUrl}/${id}`, { method: 'DELETE' }).then(handleResponse);
