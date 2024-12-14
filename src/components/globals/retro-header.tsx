import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import RetroLogo from './retro-logo'
import SignIn from '../auth/sign-in';
import { auth } from '@/lib/auth'
import Image from 'next/image'

export default async function RetroHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 bg-retro-bg border-b border-retro-primary p-2 bg-black">
      <div className="flex items-center justify-between">
        <div className="flex items-center ml-12 md:ml-0">
          <Link href="/" className="text-2xl font-bold text-retro-secondary flex items-center hover:text-retro-primary transition-colors">
            <RetroLogo />
            <span className="ml-2 glitch" data-text="RetroTube">RetroTube</span>
          </Link>
        </div>
        <div className="flex-grow mx-4 max-w-xl">
          <div className="flex">
            <Input
              type="search"
              placeholder="Search..."
              className="retro-input w-full"
            />
            <Button className="retro-button ml-2">
              <Search />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
            {
              session && session.user && session.user.name && session.user.image ? (
                <div className="flex items-center">
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-retro-text ml-2">{session.user.name}</span>
                </div>
              ) : (
                <SignIn />
              )
            }
        </div>
      </div>
    </header>
  )
}

