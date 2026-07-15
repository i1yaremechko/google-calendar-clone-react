import { getStartOfWeek } from '@common/utils/time.utils.js';
import Header from "@components/Header";
import { useState } from 'react';

function App() {
  const [weekStartDate, setWeekStartDate] = useState(getStartOfWeek(new Date()));

  return (
    <>
      <Header 
        weekStartDate={weekStartDate} 
        setWeekStartDate={setWeekStartDate} 
      />
      <main className="calendar">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Google Calendar React Clone Under Construction 🚀</h1>
        </div>
      </main>
    </>
  );
}

export default App;