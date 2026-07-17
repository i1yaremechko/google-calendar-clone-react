import Modal from '@components/Calendar/Modal';
import { useState } from 'react';
import CreateEvent from './CreateEvent';

const UpdateEvent = ({ event, onClose, onUpdateEvent, onDeleteEvent }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!event) return null;

  const handleFormSubmit = (updatedData) => {
    onUpdateEvent(event.id, updatedData);
    setIsEditing(false);
    onClose();
  };

  return (
    <>
      {!isEditing ? (
        <>
          <div className="overlay" onClick={onClose}></div>
          <div className="modal">
            <div className="modal__content popup__content" style={{ display: 'flex', gap: '10px' }}>
              <button
                className="edit-event-btn"
                style={{ backgroundColor: '#4285f4', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
                onClick={() => setIsEditing(true)}
              >
                Edit Event
              </button>
              <button
                  className="delete-event-btn"
                  style={{ backgroundColor: '#d93025', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
                  onClick={() => {
                    onDeleteEvent(event.id);
                    onClose();
                  }}
                >
                  Delete Event
                </button>
            </div>
          </div>
        </>
      ) : (
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <CreateEvent
            initialData={event}
            onClose={() => setIsEditing(false)}
            onSubmitEvent={handleFormSubmit}
          />
        </Modal>
      )}
    </>
  );
};

export default UpdateEvent;