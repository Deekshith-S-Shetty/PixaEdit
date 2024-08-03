import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

const Home = () => {
  return (
    <main>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
      <div>Home</div>
    </main>
  );
};

export default Home;
