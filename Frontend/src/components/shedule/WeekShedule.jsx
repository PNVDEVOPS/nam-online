import React, { useState } from 'react';

const WeekSchedule = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ startTime: '', endTime: '', title: '' });

  const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  const showSessionsForDay = (day) => {
    setSelectedDay(day);
  };

  const addSession = () => {
    setSessions([...sessions, { ...newSession, id: Date.now() }]);
    setNewSession({ startTime: '', endTime: '', title: '' });
  };

  const deleteSession = (sessionId) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
  };

  return (
    <div>
      <h2>Расписание на неделю</h2>
      <div>
        {daysOfWeek.map(day => (
          <button key={day} onClick={() => showSessionsForDay(day)}>
            {day}
          </button>
        ))}
      </div>
      <div>
        {selectedDay && (
          <div>
            <h3>{selectedDay}</h3>
            <ul>
              {sessions.map(session => (
                <li key={session.id}>
                  {session.startTime} - {session.endTime}: {session.title}
                  <button onClick={() => deleteSession(session.id)}>Удалить</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <h3>Добавить сеанс</h3>
        <input
          type="text"
          placeholder="Время начала"
          value={newSession.startTime}
          onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
        />
        <input
          type="text"
          placeholder="Время окончания"
          value={newSession.endTime}
          onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
        />
        <input
          type="text"
          placeholder="Название сеанса"
          value={newSession.title}
          onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
        />
        <button onClick={addSession}>Добавить</button>
      </div>
    </div>
  );
};

export default WeekSchedule;