"use client";

import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading events...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Events</h1>

      <div className="flex flex-wrap justify-center">
        {events.map((event) => (
          <EventCard key={event.id} eventData={event} />
        ))}
      </div>
    </div>
  );
}
