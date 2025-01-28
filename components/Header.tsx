'use client';

import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import BreadCrumb from './BreadCrumb';
import { Button } from "./ui/button";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <h1 className="text-2xl">
          {user?.firstName}
          {`'s`} Space
        </h1>
      )}

     
      <BreadCrumb />

      <div>
        <SignedOut>
          <SignInButton>
            {/* Custom Button */}
            <Button className="bg-black text-white px-4 py-2 rounded">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>

        {/* If user is signed in, show User Button */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
