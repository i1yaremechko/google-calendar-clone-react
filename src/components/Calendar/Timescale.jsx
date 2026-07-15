const createNumbersArray = (from, to) => {
  const result = [];
  for (let i = from; i <= to; i += 1) {
    result.push(i);
  }
  return result;
};

const Timescale = () => {
  const hours = createNumbersArray(0, 23);

  return (
    <div className="calendar__time-scale">
      {hours.map((hour) => {
        const formattedHour = hour < 10 ? `0${hour}` : hour;

        return (
          <div key={hour} className="time-slot">
            <span className="time-slot__time">{formattedHour}:00</span>
          </div>
        );
      })}
    </div>
  );
};

export default Timescale;