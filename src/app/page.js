'use client';

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: '/login' });
  };

  useEffect(() => {
    console.log(session);

    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Solo se muestra si el usuario está autenticado
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Bienvenido, {session?.user?.nombres} {session?.user?.apellidos}</h1>
      <div className="mt-4">
        <a href="/clients" className="text-blue-500 hover:underline">
          Ir a Clientes
        </a>
        <button
          onClick={handleLogout}
          className="text-blue-500 hover:underline ml-4 bg-transparent border-none cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}