import { generateWeekRange } from '@common/utils/time.utils.js';
import Day from './Day.jsx';

const Week = ({ weekStartDate, events }) => {
  const weekDays = generateWeekRange(weekStartDate);

  return (
    <div className="calendar__week">
      {weekDays.map((dayDate) => {
        const key = dayDate.getTime();
        const dayOfMonth = dayDate.getDate();

        return (
          <Day 
            key={key} 
            dataDay={dayOfMonth}
            dayDate={dayDate}
            dayEvents={events} 
          />
        );
      })}
    </div>
  );
};

export default Week;