import { getStartOfWeek } from '@common/utils/time.utils';
import Header from "@components/Header";
import { useState } from 'react';
import Navigation from './components/Calendar/Navigation';
import Timescale from './components/Calendar/Timescale';
import Week from './components/Calendar/Week';

function App() {
  const [weekStartDate, setWeekStartDate] = useState(getStartOfWeek(new Date()));
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <Week weekStartDate={weekStartDate} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;