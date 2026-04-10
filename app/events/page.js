"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "../../components/EventCard";

function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const artist = searchParams.get("artist");
  const tag = searchParams.get("tag");

  useEffect(() => {
    fetch("https://qevent-backend.labs.crio.do/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading events...</p>;

  const filtered = events.filter((e) => {
    if (artist) return e.artist === artist;
    if (tag) return e.tags?.some((t) => (t?.name ?? t) === tag);
    return true;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {artist ? `Events by ${artist}` : tag ? `Events tagged #${tag}` : "Events"}
      </h1>
      <div className="flex flex-wrap justify-center">
        {filtered.length > 0 ? (
          filtered.map((event) => <EventCard key={event.id} eventData={event} />)
        ) : (
          <p className="text-center mt-10">No events found.</p>
        )}
      </div>
    </div>
  );
}

export default function Events() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <EventsList />
    </Suspense>
  );
}
