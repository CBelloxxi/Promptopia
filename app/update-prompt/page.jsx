'use client';

// Import necessary modules and components
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

// Define a React functional component named EditPrompt
const EditPrompt = () => {
  // Access the Next.js router and search parameters
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  // Initialize state variables using the useState hook
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  // Use the useEffect hook to fetch prompt details when the component mounts
  useEffect(() => {
    const getPromptDetails = async () => {
      // Fetch prompt details from the serverless function at `/api/prompt/${promptId}`
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      // Update the state variable with the fetched prompt details
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    // Check if promptId exists before fetching prompt details
    if (promptId) getPromptDetails();
  }, [promptId]);

  // Define a function to handle the update of a prompt
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Check if promptId exists; if not, show an alert and return
    if (!promptId) return alert('Prompt ID not found');

    try {
      // Send a PATCH request to update the prompt at `/api/prompt/${promptId}`
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // If the response is okay, navigate back to the home page
      if (response.ok) {
        router.push('/');
      }

      // Log the response to the console
      console.log(response);
    } catch (error) {
      // Log any errors that occur during the update process
      console.error(error);
    } finally {
      // Set submitting back to false after the update process is complete
      setSubmitting(false);
    }
  };

  // Render the Form component with appropriate props
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

// Export the EditPrompt component as the default export
export default EditPrompt;

// Explanation

// Import Statements:

// Imports the necessary modules and components, including React, the useEffect and useState hooks, useRouter and useSearchParams from Next.js, and a custom Form component.

// Functional Component (EditPrompt) Definition:
// Defines a React functional component named EditPrompt.

// Access Next.js Router and Search Parameters:
// Uses the useRouter hook to access the Next.js router.
// Uses the useSearchParams hook to access search parameters from the URL.

// Initialize State (useState) and Fetch Prompt Details (useEffect):
// Initializes state variables (submitting and post) using the useState hook.
// Uses the useEffect hook to fetch prompt details when the component mounts. It sends a GET request to the serverless function at /api/prompt/${promptId} and updates the post state with the fetched data.

// Handle Update Prompt (updatePrompt) Function:
// Defines a function (updatePrompt) to handle the update of a prompt. It sends a PATCH request to the serverless function at /api/prompt/${promptId} with the updated prompt data. If the response is okay, it navigates back to the home page (/). It logs the response to the console.

// Render Form Component:
// Renders the Form component, passing appropriate props (type, post, setPost, submitting, handleSubmit).

// Default Export:
// Exports the EditPrompt component as the default export.

// Overall, this code represents a React component (EditPrompt) that fetches and displays the details of a specific prompt for editing. The user can update the prompt details, and the component uses the Form component to handle the UI for editing and submitting the form.
