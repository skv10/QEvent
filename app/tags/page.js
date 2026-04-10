"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Tag from "@/components/Tag";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://qevent-backend.labs.crio.do/tags")
      .then((res) => res.json())
      .then(setTags);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Tags</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            text={tag.name}
            onClick={() => router.push(`/events?tag=${encodeURIComponent(tag.name)}`)}
          />
        ))}
      </div>
    </div>
  );
}
