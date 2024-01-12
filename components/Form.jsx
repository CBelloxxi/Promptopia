// Import the Link component from the 'next/link' module
import Link from 'next/link';

// Define a functional component named Form
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    // Create a section with specific styling
    <section className="w-full max-w-full flex-start flex-col">

      {/* Heading */}
      <h1 className="head_text text-left">
        {/* Display the type of post with a styled span */}
        <span className="blue_gradient">{type} Post</span>
      </h1>

      {/* Description */}
      <p className="desc text-left max-w-md">
        {/* Display a description based on the type of post */}
        {type} and share amazing prompts with the world and let your imagination run wild with any AI-Powered platform.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/* Prompt Textarea */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          {/* Textarea for entering the prompt */}
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        {/* Tag Input */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{` `}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          {/* Input for entering tags */}
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        {/* Cancel and Submit Buttons */}
        <div className="flex-end mx-3 mb-5 gap-4">
          {/* Cancel Button with a Link */}
          <Link href='/' className="text-gray-500 text-sm">
            Cancel
          </Link>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {/* Display different content based on the submitting status */}
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}

// Export the Form component as the default export
export default Form;

// Explanation

// Component Import:

// Imports the Link component from the 'next/link' module.

// Functional Component Definition:
// Defines a functional component named Form that receives several props (type, post, setPost, submitting, handleSubmit).

// HTML Structure:
// Returns a section with specific styling (w-full max-w-full flex-start flex-col).

// Heading:
// Displays an h1 heading with a styled span based on the provided type.

// Description:
// Displays a paragraph with a description based on the provided type.

// Form:
// Renders a form element with specific styling and a glassmorphism effect.
// Includes form elements for entering a prompt and tags.

// Prompt Textarea:
// Renders a label for the prompt textarea with a description.
// Includes a textarea element for entering the prompt.

// Tag Input:
// Renders a label for the tag input with a description.
// Includes an input element for entering tags.

// Cancel and Submit Buttons:
// Displays a div containing a Link for canceling and a button for submitting the form.
// The button content changes based on the submitting status.

// Export Default:
// Exports the Form component as the default export.

// In summary, the Form component is a reusable form for creating or editing prompts, with fields for entering the prompt and tags. It also provides buttons for canceling or submitting the form.
