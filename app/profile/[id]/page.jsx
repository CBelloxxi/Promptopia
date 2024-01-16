"use client";

// Import necessary modules and components
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

// Define a React functional component named UserProfile
const UserProfile = ({ params }) => {
  // Search parameters initialization
  const searchParams = useSearchParams();

  // UserName initialization
  const userName = searchParams.get("name");

  // Initialize a state variable using the useState hook to store user's posts
  const [userPosts, setUserPosts] = useState([]);

  // Fetch user's posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      // Fetch posts data from the serverless function at `/api/users/${params?.id}/posts`
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      // Update the state variable with the fetched posts data
      setUserPosts(data);
    };

    // Check if the parameters exist and select by id said post (params?.id) fetchPosts();
    if (params?.id) fetchPosts();
  }, [params.id]);

  // Render the Profile component with appropriate props
  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  )
}

// Export the UserProfile component as the default export
export default UserProfile;


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
