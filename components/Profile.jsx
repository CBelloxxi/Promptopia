// Import PromptCard component
import PromptCard from './PromptCard';

// Define the Profile component
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {

  // Return JSX for the Profile component
  return (
    <section className="w-full">
      {/* Header with user name */}
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      {/* Description of the profile */}
      <p className="desc text-left">
        {desc}
      </p>

      {/* PromptCard layout for displaying user's data */}
      <div className="text-sm mt-10 prompt_layout">
        {/* Map through each post in the data array and render a PromptCard for each */}
        {data.map((post) => (
          <PromptCard
            key={post._id} // Use post._id as the key for each PromptCard
            post={post} // Pass the post data as props to the PromptCard
            handleEdit={() => handleEdit && handleEdit(post)} // Attach handleEdit function if available
            handleDelete={() => handleDelete && handleDelete(post)} // Attach handleDelete function if available
          />
        ))}
      </div>
    </section>
  )
}

// Export the Profile component as the default export
export default Profile;

// Explanation

// Module Import:

// Import the PromptCard component.

// Component Definition:
// Define the Profile component.

// Component Props:
// Receive props (name, desc, data, handleEdit, handleDelete) from the parent component.

// Return JSX:
// Return a JSX structure for the Profile component.

// Header:
// Display a header with the user's name, styled with a blue gradient.

// Description:
// Display a paragraph with the description of the profile.

// PromptCard Layout:
// Use a div with text-sm mt-10 prompt_layout classes to style the layout of PromptCards.

// Map through Data Array:
// Use the map function to iterate over each item in the data array.

// PromptCard Component:
// For each post in the data array, render a PromptCard component.
// Pass the post data as props to the PromptCard.
// Attach handleEdit and handleDelete functions as props if available.

// Key Prop:
// Use the post._id as the key prop for each PromptCard to ensure a unique identifier.

// Export Default:
// Export the Profile component as the default export.

// In summary, the Profile component is a reusable component that takes user profile information (name, desc) and an array of data (data). It maps through the data array and renders a PromptCard for each post. The handleEdit and handleDelete functions can be attached as props to provide interaction options for each post.
