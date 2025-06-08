import { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'day'
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (date) => {
    setSelectedEvent({ date, title: '', description: '' });
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleSaveEvent = (eventData) => {
    if (modalMode === 'add') {
      setEvents([...events, { ...eventData, id: Date.now() }]);
    } else {
      setEvents(events.map(event => 
        event.id === eventData.id ? eventData : event
      ));
    }
    setIsModalOpen(false);
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const days = eachDayOfInterval({ start: startDate, end: addDays(startDate, 41) });

    return (
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-semibold text-gray-700 dark:text-gray-300">
            {day}
          </div>
        ))}
        {days.map(day => {
          const dayEvents = events.filter(event => isSameDay(new Date(event.date), day));
          return (
            <div
              key={day.toString()}
              className={`p-2 min-h-[100px] border border-gray-200 dark:border-gray-700 ${
                !isSameMonth(day, monthStart) ? 'bg-gray-50 dark:bg-gray-800' : ''
              }`}
              onClick={() => handleAddEvent(day)}
            >
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {format(day, 'd')}
              </div>
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className="mt-1 p-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditEvent(event);
                  }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const days = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });

    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const dayEvents = events.filter(event => isSameDay(new Date(event.date), day));
          return (
            <div
              key={day.toString()}
              className="p-2 min-h-[200px] border border-gray-200 dark:border-gray-700"
              onClick={() => handleAddEvent(day)}
            >
              <div className="font-semibold text-gray-700 dark:text-gray-300">
                {format(day, 'EEE d')}
              </div>
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className="mt-1 p-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditEvent(event);
                  }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = events.filter(event => isSameDay(new Date(event.date), currentDate));
    
    return (
      <div className="p-4">
        <div className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-4">
          {format(currentDate, 'EEEE, MMMM d, yyyy')}
        </div>
        <div className="space-y-2">
          {dayEvents.map(event => (
            <div
              key={event.id}
              className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded cursor-pointer"
              onClick={() => handleEditEvent(event)}
            >
              <div className="font-semibold">{event.title}</div>
              <div className="text-sm">{event.description}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentDate(addDays(currentDate, -1))}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate(addDays(currentDate, 1))}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            Next
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('month')}
            className={`px-3 py-1 rounded ${
              view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-3 py-1 rounded ${
              view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView('day')}
            className={`px-3 py-1 rounded ${
              view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Day
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {modalMode === 'add' ? 'Add Event' : 'Edit Event'}
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveEvent({
                ...selectedEvent,
                title: e.target.title.value,
                description: e.target.description.value,
              });
            }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedEvent.title}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedEvent.description}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-2">
                {modalMode === 'edit' && (
                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage; 