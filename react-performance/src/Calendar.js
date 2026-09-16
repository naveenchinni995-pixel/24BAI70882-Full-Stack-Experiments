import React, { useState, useMemo, useCallback } from "react";

const Calendar = React.memo(function Calendar() {

  const [search, setSearch] = useState("");

  const events = [
    {
      id: 1,
      title: "Meeting",
      date: "Today",
      time: "10:00 AM",
      color: "blue"
    },
    {
      id: 2,
      title: "React Workshop",
      date: "Tomorrow",
      time: "2:00 PM",
      color: "green"
    },
    {
      id: 3,
      title: "Hackathon",
      date: "Friday",
      time: "9:00 AM",
      color: "orange"
    },
    {
      id: 4,
      title: "Project Review",
      date: "Saturday",
      time: "11:00 AM",
      color: "purple"
    },
    {
      id: 5,
      title: "Coding Contest",
      date: "Sunday",
      time: "3:00 PM",
      color: "red"
    }
  ];

  const filteredEvents = useMemo(() => {

    return events.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );

  }, [events, search]);

  const handleEventClick = useCallback((event) => {

    alert(
      `${event.title}

${event.date}

${event.time}`
    );

  }, []);

  return (

    <div className="calendar">

      <h1>📅 Post Calendar</h1>

      <p className="subtitle">
        Smart Event Scheduler Dashboard
      </p>

      <input
        type="text"
        placeholder="🔍 Search Events..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      <div className="stats">

        <h2>{filteredEvents.length}</h2>

        <p>Total Events</p>

      </div>

      <div className="event-list">

        {filteredEvents.map((event)=>(

          <div
            key={event.id}
            className={`event-card ${event.color}`}
            onClick={()=>handleEventClick(event)}
          >

            <h3>{event.title}</h3>

            <p>{event.date} • {event.time}</p>

            <span>Scheduled</span>

          </div>

        ))}

      </div>

      <div className="footer">

        <h4>Performance Optimized</h4>

        <p>

          ✔ React.memo &nbsp;&nbsp;

          ✔ useMemo &nbsp;&nbsp;

          ✔ useCallback

        </p>

      </div>

    </div>

  );

});

export default Calendar;