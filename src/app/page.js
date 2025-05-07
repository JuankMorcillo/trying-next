'use client';

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);

    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      router.push("/alerts");
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Solo se muestra si el usuario está autenticado
  return (
    <div className="p-8">


    </div>
  );
}