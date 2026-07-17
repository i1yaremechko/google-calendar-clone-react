import {
  STORAGE_KEY_DISPLAYED_WEEK_START,
  STORAGE_KEY_EVENTS,
  STORAGE_KEY_SELECTED_EVENT_ID
} from '@common/constants';
import { getStartOfWeek } from '@common/utils/time.utils';
import { validateEvent } from '@common/utils/validate.util';
import Modal from '@components/Calendar/Modal';
import Navigation from '@components/Calendar/Navigation';
import Timescale from '@components/Calendar/Timescale';
import Week from '@components/Calendar/Week';
import Header from "@components/Header";
import CreateEvent from '@features/Events/CreateEvent';
import UpdateEvent from '@features/Events/UpdateEvent';
import { createEvent, deleteEvent, getEventsList, updateEvent } from '@features/services/eventsGateWay';
import { getItem, setItem } from '@features/services/eventsStorage';
import { useEffect, useState } from 'react';

function App() {
  const [weekStartDate, setWeekStartDate] = useState(() => {
    return getItem(STORAGE_KEY_DISPLAYED_WEEK_START) || getStartOfWeek(new Date());
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState(() => {
    return getItem(STORAGE_KEY_EVENTS) || [];
  });
  const [selectedEventId, setSelectedEventId] = useState(() => {
    return getItem(STORAGE_KEY_SELECTED_EVENT_ID);
  });

  const selectedEvent = events.find(event => event.id === selectedEventId);

  useEffect(() => {
    getEventsList().then((eventsData) => setEvents(eventsData));
  }, []);

  useEffect(() => {
    setItem(STORAGE_KEY_DISPLAYED_WEEK_START, weekStartDate);
  }, [weekStartDate]);

  useEffect(() => {
    setItem(STORAGE_KEY_EVENTS, events);
  }, [events]);

  const handleSelectEvent = (id) => {
    setSelectedEventId(id);
    setItem(STORAGE_KEY_SELECTED_EVENT_ID, id);
  };

  const handleCreateEvent = (newEvent) => {
    const validation = validateEvent(newEvent, events);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    createEvent(newEvent).then((createdEventFromServer) => {
      const adaptedEvent = {
        ...createdEventFromServer,
        dateFrom: new Date(createdEventFromServer.start || createdEventFromServer.dateFrom),
        dateTo: new Date(createdEventFromServer.end || createdEventFromServer.dateTo),
      };
      setEvents((prevEvents) => [...prevEvents, adaptedEvent]);
      setIsModalOpen(false);
    });
  };

  const handleUpdateEvent = (id, updatedData) => {
    const otherEvents = events.filter(event => event.id !== id);
    const validation = validateEvent(updatedData, otherEvents);
    
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    updateEvent(id, updatedData).then((updatedEventFromServer) => {
      const adaptedEvent = {
        ...updatedEventFromServer,
        dateFrom: new Date(updatedEventFromServer.start || updatedEventFromServer.dateFrom),
        dateTo: new Date(updatedEventFromServer.end || updatedEventFromServer.dateTo),
      };
      
      setEvents((prevEvents) => prevEvents.map(event => event.id === id ? adaptedEvent : event));
      handleSelectEvent(null);
    });
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id)
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
        handleSelectEvent(null);
      });
  };

  return (
    <div className="page">
      <Header 
        weekStartDate={weekStartDate} 
        setWeekStartDate={setWeekStartDate}
        onOpenModal={() => setIsModalOpen(true)}
      />
      <section className="calendar">
        <header className="calendar__header">
          <div className="calendar__gmt-label">GMT+03</div>
          <Navigation weekStartDate={weekStartDate} />
        </header>
        
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Timescale />
            <Week 
              weekStartDate={weekStartDate}
              events={events} 
              onEventClick={handleSelectEvent}
            />
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateEvent
          onClose={() => setIsModalOpen(false)}
          onSubmitEvent={handleCreateEvent}
        />
      </Modal>

      <UpdateEvent 
        event={selectedEvent}
        onClose={() => handleSelectEvent(null)}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
}

export default App;