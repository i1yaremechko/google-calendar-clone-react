const Event = ({ id, title, description, time, top, height, color }) => {
  const eventStyle = {
    top: `${top}px`,
    height: `${height}px`,
    backgroundColor: color || '#4285f4',
  };

  return (
    <div className="event" style={eventStyle} data-event-id={id}>
      <div className="event__title">{title}</div>
      <div className="event__description">{description}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

export default Event;