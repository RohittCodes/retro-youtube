import Link from 'next/link';
import { auth } from '@/lib/auth';
import RetroLogo from './retro-logo';
import SignIn from '../auth/sign-in';
import SearchComponent from './search-component';
import ProfileDropdown from './porfile-dropdown';

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
          <SearchComponent />
        </div>
        <div className="flex items-center space-x-4">
          {session && session.user && session.user.name && session.user.image ? (
            <ProfileDropdown user={session.user} />
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </header>
  );
}