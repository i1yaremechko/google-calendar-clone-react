export const validateEvent = (newEvent, existingEvents) => {
  const start = new Date(newEvent.dateFrom);
  const end = new Date(newEvent.dateTo);

  if (start >= end) {
    return { isValid: false, message: "Start time must be less than end time!" };
  }

  if (start.toDateString() !== end.toDateString()) {
    return { isValid: false, message: "The event must start and end within the same day!" };
  }

  const isOverlapping = existingEvents.some(event => {
    const eventStart = new Date(event.dateFrom);
    const eventEnd = new Date(event.dateTo);

    return start < eventEnd && end > eventStart;
  });

  if (isOverlapping) {
    return { isValid: false, message: "Another event is already planned for this time!" };
  }

  return { isValid: true };
};