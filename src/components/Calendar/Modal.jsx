const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal__content">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;