
import Event from "@features/Events/Event";
import CurrentTimeLine from "./CurrentTimeLine";

const Day = ({ dataDay, dayEvents, dayDate, onEventClick }) => {
  const isToday = new Date().toDateString() === dayDate.toDateString();

  const filteredEvents = dayEvents.filter(
    (event) => new Date(event.dateFrom).toDateString() === dayDate.toDateString()
  );

  return (
    <div className="calendar__day" data-day={dataDay}>
      {isToday && <CurrentTimeLine />}

      {filteredEvents.map((event) => {
        const from = new Date(event.dateFrom);
        const to = new Date(event.dateTo);

        const top = from.getHours() * 60 + from.getMinutes();
        const height = (to.getTime() - from.getTime()) / (1000 * 60);

        const formatTime = (date) => {
          const hh = String(date.getHours()).padStart(2, '0');
          const mm = String(date.getMinutes()).padStart(2, '0');
          return `${hh}:${mm}`;
        };
        const timeInterval = `${formatTime(from)} - ${formatTime(to)}`;

        return (
          <Event
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            time={timeInterval}
            top={top}
            height={height}
            color={event.color}
            onClick={() => onEventClick(event.id)}
          />
        );
      })}
    </div>
  );
};

export default Day;