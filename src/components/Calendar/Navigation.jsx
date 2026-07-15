import { generateWeekRange } from '@common/utils/time.utils.js';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Navigation = ({ weekStartDate }) => {
  const weekDays = generateWeekRange(weekStartDate);

  return (
    <div className="calendar__header-days-container" style={{ display: 'flex', flex: 1 }}>
      {weekDays.map((date) => {
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = date.getDate();
        const key = date.getTime();

        const isToday = new Date().toDateString() === date.toDateString();

        return (
          <div key={key} className="calendar__header-day">
            <span className="day-name">{dayOfWeek}</span>
            <span className={`day-number ${isToday ? 'day-number_today' : ''}`}>
              {dayOfMonth}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;