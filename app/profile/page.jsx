"use client";

// Import necessary modules and components
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

// Define a React functional component named MyProfile
const MyProfile = () => {
  // Access the NextAuth session
  const { data: session } = useSession();

  // Access the Next.js router
  const router = useRouter();

  // Initialize a state variable using the useState hook to store user's posts
  const [myPosts, setMyPosts] = useState([]);

  // Fetch user's posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      // Fetch posts data from the serverless function at `/api/users/${session?.user.id}/posts`
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      // Update the state variable with the fetched posts data
      setMyPosts(data);
    };

    // Check if the user is logged in (session?.user.id exists) before fetching posts
    if(session?.user.id) fetchPosts();
  }, [session?.user.id]);

  // Handle the navigation to the edit prompt page
  const handleEdit = (post) => {
    // Navigate to the update-prompt page with the post id as a query parameter
    router.push(`/update-prompt?id=${post._id}`);
  }

  // Handle the prompt deletion
  const handleDelete = async (post) => {
    // Confirm the user's intention to delete the prompt
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if(hasConfirmed) {
      try {
        // Send a DELETE request to the serverless function at `/api/prompt/${post._id.toString()}`
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });

        // Filter out the deleted post from the local posts state
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);

      } catch (error) {
        // Log any errors that occur during the deletion process
        console.log(error);
      }
    }
  }

  // Render the Profile component with appropriate props
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

// Export the MyProfile component as the default export
export default MyProfile;


// Explanation

// Import Statements:
// Imports the necessary modules and components, including React, the useState and useEffect hooks, useSession from NextAuth, useRouter from Next.js, and a custom Profile component.

// Functional Component (MyProfile) Definition:
// Defines a React functional component named MyProfile.

// Access NextAuth Session (useSession) and Next.js Router (useRouter):
// Uses the useSession hook to access the NextAuth session and extract user data.
// Uses the useRouter hook to access the Next.js router.

// Initialize State (useState) and Fetch User's Posts (useEffect):
// Initializes a state variable (posts) using the useState hook to store user posts.
// Uses the useEffect hook to fetch user posts when the component mounts. It sends a GET request to the serverless function at /api/users/${session?.user.id}/posts and updates the posts state with the fetched data.

// Handle Edit (handleEdit) Function:
// Defines a function (handleEdit) to navigate to the edit prompt page (/update-prompt) when called. It uses the Next.js router to push the user to the new page with the post id as a query parameter.

// Handle Delete (handleDelete) Function:
// Defines a function (handleDelete) to handle the deletion of a prompt. It confirms the user's intention and sends a DELETE request to the serverless function at /api/prompt/${post._id.toString()}. It then filters out the deleted post from the local posts state.

// Render Profile Component:
// Renders the Profile component, passing appropriate props (name, desc, data, handleEdit, handleDelete).

// Default Export:
// Exports the MyProfile component as the default export.

// Overall, this code represents a React component (MyProfile) that fetches and displays user-specific posts, allowing the user to edit or delete their own prompts. The user's posts are fetched from the serverless functions, and the Profile component is used for rendering the UI with user-specific data and actions.
