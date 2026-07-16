import CurrentTimeLine from "./CUrrentTimeLine";

const Day = ({ dataDay, dayEvents, dayDate }) => {
  const isToday = new Date().toDateString() === dayDate.toDateString();

  return (
    <div className="calendar__day" data-day={dataDay}>
      {isToday && <CurrentTimeLine />}
    </div>
  );
};

export default Day;