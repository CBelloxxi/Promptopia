// Import the global styles file and custom components
import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

// Define metadata for the application
export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts"
}

// Define a functional component named RootLayout
const RootLayout = ({ children }) => {
  return (
    // Define the structure of the HTML document with lang attribute set to "en"
    <html lang="en">
      <body>
        {/* Wrap the content in a Provider component */}
        <Provider>
          {/* Create a container div with a gradient background */}
          <div className="main">
            <div className="gradient"/>
          </div>

          {/* Create the main content area of the application */}
          <main className="app">
            {/* Render the Nav component */}
            <Nav />
            {/* Render the child components passed to RootLayout */}
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

// Export the RootLayout component as the default export
export default RootLayout;

// Explanation

// Global Styles and Component Imports:

// Imports the global styles ('@styles/globals.css') and two custom components (Nav and Provider) from specific paths.

// Metadata Export:
// Exports metadata for the application, providing a title and description. This metadata can be used for SEO purposes or other informational needs.

// RootLayout Component Definition:
// Defines a functional component named RootLayout that takes a children prop. The children prop represents the content that will be wrapped by this layout.

// HTML Structure:
// Returns an HTML structure with the html and body tags. The lang attribute of the html tag is set to "en".

// Provider Component:
// Wraps the content in a Provider component. This suggests that there is some kind of state or context management provided by the Provider component for its children.

// Container with Gradient Background:
// Creates a container div with the class name "main" and a nested div with the class name "gradient". This suggests the presence of a gradient background in the UI.

// Main Content Area:
// Defines the main content area with the class name "app". This area includes the Nav component and renders the child components (children) passed to RootLayout.

// Export Default:
// Exports the RootLayout component as the default export. This means that when importing this file elsewhere, the default export will be the RootLayout component.

// In summary, the RootLayout component defines the overall structure of the HTML document, wraps its content with a context provider (Provider), includes a gradient background, and renders the navigation component (Nav) along with the child components passed to it. The exported metadata provides additional information about the application.
