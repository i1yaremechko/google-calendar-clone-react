import { useState } from "react";

const CreateEvent = ({ onClose, onSubmitEvent, initialData }) => {
  const isEditMode = !!initialData;

  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  
  const [date, setDate] = useState(() => {
    if (initialData?.dateFrom) {
      return new Date(initialData.dateFrom).toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  });
  
  const [startTime, setStartTime] = useState(() => {
    if (initialData?.dateFrom) {
      return new Date(initialData.dateFrom).toTimeString().slice(0, 5);
    }
    return '10:00';
  });
  
  const [endTime, setEndTime] = useState(() => {
    if (initialData?.dateTo) {
      return new Date(initialData.dateTo).toTimeString().slice(0, 5);
    }
    return '11:00';
  });
  
  const [color, setColor] = useState(initialData?.color || '#4285f4');

  const handleSubmit = (e) => {
    e.preventDefault();

    const dateFrom = new Date(`${date}T${startTime}`);
    const dateTo = new Date(`${date}T${endTime}`);

    onSubmitEvent({
      title,
      description,
      dateFrom,
      dateTo,
      color,
    });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <button type="button" className="create-event__close-btn" onClick={onClose}>
        +
      </button>
      
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

      <div className="event-form__color-picker" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
        <label htmlFor="event-color" style={{ fontSize: '14px', color: '#5f6368' }}>Color:</label>
        <input
          id="event-color"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            border: 'none',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            padding: 0,
            backgroundColor: 'transparent'
          }}
        />
      </div>

      <button type="submit" className="event-form__submit-btn">
        {isEditMode ? 'Save Changes' : 'Create'}
      </button>
    </form>
  );
};

export default CreateEvent;