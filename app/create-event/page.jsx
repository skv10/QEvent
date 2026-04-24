"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If not logged in → redirect
    if (status === "unauthenticated") {
      router.push("/events");
    }
  }, [status, router]);

  // Optional loading state
  if (status === "loading") {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Create Event Page</h1>

      <p>Only logged in users can access this page.</p>
    </div>
  );
}
