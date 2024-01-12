// Import necessary modules and components
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

// Define the Nav component
const Nav = () => {
  // Retrieve the user session information
  const { data: session } = useSession();

  // State to store authentication providers
  const [providers, setProviders] = useState(null);

  // State to manage the mobile navigation dropdown
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // Effect to fetch and set up authentication providers
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  // Return the navigation component
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* Promptopia Logo and Text with Link to Home */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          // If the user is signed in
          <div className="flex gap-3 md:gap-5">
            {/* Link to create a new prompt */}
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            {/* Button to sign out */}
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            {/* Link to user profile with profile image */}
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          // If the user is not signed in
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                // Display sign-in button for each authentication provider
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          // If the user is signed in
          <div className="flex">
            {/* Profile image with dropdown trigger */}
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {/* Dropdown menu for signed-in user */}
            {toggleDropdown && (
              <div className="dropdown">
                {/* Links in the dropdown */}
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                {/* Sign-out button in the dropdown */}
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          // If the user is not signed in
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                // Display sign-in button for each authentication provider
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

// Export the Nav component as the default export
export default Nav;

// Explanation

// Module Imports:
// Import necessary modules and components, including Next.js modules and components related to authentication (useSession, signIn, signOut, getProviders).

// Component Definition:
// Define the Nav component.

// State Initialization:
// Initialize state variables using the useState hook (providers and toggleDropdown).

// Effect Hook for Providers:
// Use the useEffect hook to fetch and set up authentication providers.

// Navigation HTML Structure:
// Structure the navigation section using Flexbox (flex-between, flex-center, hidden, relative, etc.).

// Promptopia Logo and Text:
// Display the Promptopia logo and text with a link to the home page.

// Desktop Navigation:
// Display different elements based on the user's sign-in status.
// If signed in, show links for creating a post, signing out, and the user's profile image.
// If not signed in, show sign-in buttons for available authentication providers.

// Mobile Navigation:
// Similar to desktop navigation but with a responsive design for smaller screens.
// Include a dropdown menu for signed-in users, triggered by clicking on the profile image.

// Export Default:
// Export the Nav component as the default export.

// In summary, the Nav component handles navigation elements, including the Promptopia logo, links, and buttons for signing in, signing out, and creating a post. It also adapts its layout based on the user's sign-in status and the screen size.
