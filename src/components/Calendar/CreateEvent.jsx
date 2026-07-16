import { useState } from "react";

const CreateEvent = ({ onClose, onCreateEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#42855f4');

  const handleSubmit = (e) => {
    e.preventDefault();

    const [startH, startM] = startTime.split(':');
    const [endH, endM] = endTime.split(':');

    const dateFrom = new Date(date);
    dateFrom.setHours(Number(startH), Number(startM), 0, 0);

    const dateTo = new Date(date);
    dateTo.setHours(Number(endH), Number(endM), 0, 0);

    if (dateTo <= dateFrom) {
      alert('start time must be less than end time');
      return;
    }

    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: title || 'No Title',
      description,
      dateFrom,
      dateTo,
      color,
    };

    onCreateEvent(newEvent);
    onClose();
  };

  return (
    <div className="create-event">
      <button className="create-event__close-btn" onClick={onClose}>
        +
      </button>
      
      <form className="event-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="event-form__field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <div className="event-form__time">
          <input
            type="date"
            name="date"
            className="event-form__field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            name="startTime"
            className="event-form__field"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <span>-</span>
          <input
            type="time"
            name="endTime"
            className="event-form__field"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          className="event-form__field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="popup__color-picker" style={{ padding: '0 10px' }}>
          <label className="event-form__label">Color</label>
          <input
            type="color"
            name="color"
            className="event-form__color-input"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <button type="submit" className="event-form__submit-btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;