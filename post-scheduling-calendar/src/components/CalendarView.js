import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// Sample Events
const events = [
  {
    id: "1",
    title: "📸 Instagram",
    date: "2026-08-05",
    color: "#E1306C",
  },
  {
    id: "2",
    title: "💼 LinkedIn",
    date: "2026-08-08",
    color: "#0A66C2",
  },
  {
    id: "3",
    title: "📘 Facebook",
    date: "2026-08-12",
    color: "#1877F2",
  },
  {
    id: "4",
    title: "🎥 YouTube",
    date: "2026-08-16",
    color: "#FF0000",
  },
  {
    id: "5",
    title: "🐦 Twitter",
    date: "2026-08-22",
    color: "#1DA1F2",
  },
];

// Click Event
const handleEventClick = (info) => {
  alert(
`📅 ${info.event.title}

📆 ${info.event.start.toDateString()}

Status : Scheduled`
);
};

// Drag & Drop Event
const handleEventDrop = (info) => {
  alert(
`✅ Schedule Updated

${info.event.title}

New Date

${info.event.start.toDateString()}`
);
};

function CalendarView() {
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={events}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        height="auto"
      />
    </div>
  );
}

export default CalendarView;