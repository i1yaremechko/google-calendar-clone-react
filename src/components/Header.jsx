import shmoment from '@common/utils/shmoment';
import { getDisplayedMonth, getStartOfWeek } from '@common/utils/time.utils';

const Header = ({ weekStartDate, setWeekStartDate, onOpenModal }) => {
  const handleNavigation = (direction) => {
    if (direction === 'today') {
      setWeekStartDate(getStartOfWeek(new Date()));
    } else if (direction === 'next') {
      setWeekStartDate(shmoment(weekStartDate).add('days', 7).result());
    } else if (direction === 'prev') {
      setWeekStartDate(shmoment(weekStartDate).subtract('days', 7).result());
    }
  };

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={onOpenModal}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      
      <nav className="navigation">
        <button 
          onClick={() => handleNavigation('today')} 
          className="navigation__today-btn button"
        >
          Today
        </button>
        
        <button 
          onClick={() => handleNavigation('prev')} 
          className="icon-button navigation__nav-icon"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <button 
          onClick={() => handleNavigation('next')} 
          className="icon-button navigation__nav-icon"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        
        <span className="navigation__displayed-month">
          {getDisplayedMonth(weekStartDate)}
        </span>
      </nav>
    </header>
  );
};

export default Header;