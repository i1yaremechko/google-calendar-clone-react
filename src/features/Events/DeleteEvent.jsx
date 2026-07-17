const DeleteEventModal = ({ selectedEventId, onClose, onDelete }) => {
  if (!selectedEventId) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal__content popup__content">
          <button
            className="delete-event-btn"
            onClick={() => onDelete(selectedEventId)}
          >
            Delete Event
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteEventModal;