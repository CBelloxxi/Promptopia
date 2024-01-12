// Import necessary modules and components
'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

// Define a React functional component named CreatePrompt
const CreatePrompt = () => {
  // Access the NextAuth session
  const { data: session } = useSession();

  // Initialize local state variables using the useState hook
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  // Access the Next.js router
  const router = useRouter();

  // Define a function to handle the creation of a new prompt
  const createPrompt = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setSubmitting(true); // Set submitting state to true

    try {
      // Send a POST request to the '/api/prompt/new' endpoint
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id, // Access the user id from the session (if available)
          tag: post.tag,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check the status of the server response
      if (response.status === 201) {
        // If the prompt is created successfully (status code 201), redirect to the home page
        router.push('/');
      } else {
        // If the response status is not 201, log the server response error
        console.error('Server response:', response);
      }

    } catch (error) {
      // If an error occurs during the process, log the error
      console.error('Error creating prompt:', error);
    } finally {
      // Set submitting state back to false after completion (success or failure)
      setSubmitting(false);
    }
  };

  // Render the Form component with appropriate props
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

// Export the CreatePrompt component as the default export
export default CreatePrompt;

// Explanation

// Import Statements:
// Imports the necessary modules and components, including React, the useState hook, useSession from NextAuth, useRouter from Next.js, and a custom Form component.

// Functional Component (CreatePrompt) Definition:
// Defines a React functional component named CreatePrompt.

// State Initialization:
// Uses the useState hook to initialize local state variables: submitting (to track form submission status) and post (to store prompt-related data).

// Access NextAuth Session (useSession) and Next.js Router (useRouter):
// Uses the useSession hook to access the NextAuth session and extract user data.
// Uses the useRouter hook to access the Next.js router.

// Create Prompt Function (createPrompt):
// Defines an asynchronous function to handle the creation of a new prompt.
// Sends a POST request to the /api/prompt/new endpoint with prompt data in the request body.
// Redirects to the home page ('/') if the prompt is created successfully.
// Logs server response errors if the response status is not 201.
// Logs any errors that occur during the process.
// Sets the submitting state back to false after the completion of the process.

// Form Component Rendering:
// Renders the Form component, passing appropriate props (type, post, setPost, submitting, handleSubmit).

// Default Export:
// Exports the CreatePrompt component as the default export.

// Overall, this code represents a React component for creating prompts. It uses NextAuth for session management, Next.js for routing, and a custom Form component for rendering the form UI. The createPrompt function handles the form submission, sending a POST request to the serverless function at /api/prompt/new.
