import { getStartOfWeek } from '@common/utils/time.utils';
import Header from "@components/Header";
import { useState } from 'react';
import CreateEvent from './components/Calendar/CreateEvent';
import Modal from './components/Calendar/Modal';
import Navigation from './components/Calendar/Navigation';
import Timescale from './components/Calendar/Timescale';
import Week from './components/Calendar/Week';

const testEvents = [
  {
    id: '1',
    title: 'Test 1',
    description: 'testing',
    dateFrom: new Date(new Date().setHours(9, 0, 0, 0)),
    dateTo: new Date(new Date().setHours(10, 0, 0, 0)),
    color: '#34a853',
  },
  {
    id: '2',
    title: 'Test 2',
    description: 'testing',
    dateFrom: new Date(new Date().setHours(14, 30, 0, 0)),
    dateTo: new Date(new Date().setHours(16, 0, 0, 0)),
    color: '#4285f4',
  }
];

function App() {
  const [weekStartDate, setWeekStartDate] = useState(getStartOfWeek(new Date()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState(testEvents);

  const handleCreateEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
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
            <Week weekStartDate={weekStartDate} events={events} />
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateEvent
          onClose={() => setIsModalOpen(false)}
          onCreateEvent={handleCreateEvent}
        />
      </Modal>
    </div>
  );
}

export default App;