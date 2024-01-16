// Import necessary dependencies
"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

// Define the PromptCard component
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  // Access session data
  const { data: session } = useSession();

  // Get current pathname and router
  const pathName = usePathname();
  const router = useRouter();

  // State to manage the copied state for the copy button
  const [copied, setCopied] = useState("");

  //Handle the router push to UserProfile of clicked user to their profile with their created posts
  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  // Function to handle copying the prompt text to the clipboard
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  // Return JSX for the PromptCard component
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        {/* Display user's image, name, and email */}
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        {/* Copy button with dynamic icon based on copied state */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      {/* Display the prompt text */}
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>

      {/* Display the prompt tag with a clickable link to handleTagClick function */}
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {/* Display edit and delete options for the current user on the profile page */}
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

// Export the PromptCard component as the default export
export default PromptCard;

// Explanation

// Module Import:
// Import necessary dependencies, including useState, Image, useSession, usePathname, and useRouter.

// Component Definition:
// Define the PromptCard component, which takes several props (post, handleTagClick, handleEdit, handleDelete).

// State Initialization:
// Initialize the state variable copied using the useState hook.

// Copy Handling Function:
// Define a function handleCopy to handle copying the prompt text to the clipboard. It updates the copied state and sets a timeout to reset it after 3 seconds.

// Return JSX:
// Return a JSX structure for the PromptCard component.

// User Information Section:
// Display user information, including image, name, and email.

// Copy Button Section:
// Display a copy button with a dynamic icon based on the copied state.

// Prompt Text Section:
// Display the prompt text.

// Prompt Tag Section:
// Display the prompt tag as a clickable link to handleTagClick function.

// Edit and Delete Section:
// Display the edit and delete options only for the current user on the profile page.

// Export Default:
// Export the PromptCard component as the default export.

// In summary, the PromptCard component is a reusable component that displays information about a prompt, including the user's image, name, and email, the prompt text, and a copy button.
