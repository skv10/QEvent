"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArtistCard from "@/components/ArtistCard";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://qevent-backend.labs.crio.do/artists")
      .then((res) => res.json())
      .then(setArtists);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Artists</h1>
      <div className="flex flex-wrap justify-center">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.name}
            artistData={artist}
            onClick={() => router.push(`/events?artist=${encodeURIComponent(artist.name)}`)}
          />
        ))}
      </div>
    </div>
  );
}
