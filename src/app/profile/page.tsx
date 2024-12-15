import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Tv } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-retro-bg border border-retro-primary rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <Image
            src={user.image || "/placeholder-avatar.png"}
            alt={user.name || "User"}
            width={128}
            height={128}
            className="rounded-full border-4 border-retro-primary mb-4 md:mb-0 md:mr-6"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-retro-secondary mb-2">
              {user.name}
            </h1>
            <p className="text-retro-text mb-4">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
