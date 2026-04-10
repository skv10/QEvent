"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Tag from "@/components/Tag";

export default function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://qevent-backend.labs.crio.do/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) return <p className="text-center mt-10">Loading event...</p>;
  if (!event) return <p className="text-center mt-10">Event not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={event.image}
        alt={event.name}
        className="w-full h-72 object-cover rounded-lg mb-6 shadow-lg"
      />
      <div className="flex gap-2 mb-4">
        {event.tags?.map((tag) => <Tag key={tag} text={tag} />)}
      </div>
      <h1 className="text-4xl font-bold mb-2">{event.name}</h1>
      <p className="text-lg mb-1">{new Date(event.date).toDateString()} | {event.time}</p>
      <p className="text-lg mb-1">{event.location}</p>
      <p className="text-lg mb-4">
        Artist: <span className="font-semibold">{event.artist}</span>
      </p>
      <p className="text-2xl font-bold mb-4">
        {event.price > 0 ? `$ ${event.price.toLocaleString()}` : "FREE"}
      </p>
      <p className="text-base leading-relaxed">{event.description}</p>
    </div>
  );
}
