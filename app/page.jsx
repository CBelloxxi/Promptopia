// Import the Feed component from the specified path
import Feed from '@components/Feed';

// Define a functional component named Home
const Home = () => {
  return (
    // Return a section with a specific class and flex layout
    <section className="w-full  flex-center flex-col">
      {/* Render an h1 element with a specific class */}
      <h1 className="head_text text-center">
        {/* Display the main heading with line breaks and a span with a specific class */}
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
        {/* Display a paragraph with a specific class */}
        <p className="desc text-center">Promptopia is an open-source AI prompting tool for the modern world to discover, create, and share creative prompts</p>

        {/* Render the Feed component */}
        <Feed />
      </h1>
    </section>
  );
}

// Export the Home component as the default export
export default Home;

// Component Import:

// Imports the Feed component from the specified path (@components/Feed).

// Functional Component Definition:
// Defines a functional component named Home using an arrow function.

// HTML Structure:
// Returns an HTML structure within the section element.
// The section has classes for width (w-full), centering both horizontally and vertically (flex-center flex-col).

// Heading and Text:
// An h1 element is rendered with specific classes (head_text text-center).
// Inside the h1, there's the main heading ("Discover & Share") with a line break hidden on small screens.
// A span element with classes (orange_gradient text-center) containing "AI-Powered Prompts" for styling.
// A p element with classes (desc text-center) displaying a description about Promptopia.

// Feed Component:
// Renders the Feed component inside the h1. This likely includes a list of prompts or content related to AI-powered prompts.

// Export Default:
// Exports the Home component as the default export. This means that when importing this file elsewhere, the default export will be the Home component.

// In summary, the Home component renders a section with a heading, a span for styled text, a description, and includes the Feed component, which is likely responsible for displaying a feed of AI-powered prompts.
