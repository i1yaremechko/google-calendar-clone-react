import { generateWeekRange } from '@common/utils/time.utils.js';
import Day from './Day.jsx';

const Week = ({ weekStartDate }) => {
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
            dayEvents={[]} 
          />
        );
      })}
    </div>
  );
};

export default Week;