// Import necessary functions and models
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// Define a POST endpoint handler
export const POST = async (req, res) => {
  // Destructure properties from the request's JSON body
  const { userId, prompt, tag } = await req.json();

  try {
    // Connect to the MongoDB database
    await connectToDB();

    // Create a new instance of the Prompt model with provided data
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    // Save the new prompt to the database
    await newPrompt.save();

    // Return a JSON response with the newly created prompt and a 201 status (Created)
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    // If an error occurs during the process, log the error and return a 500 response
    console.error('Error creating new prompt:', error);
    return new Response("Failed to create new prompt", { status: 500 });
  }
}

// Log a message indicating that a new prompt has been submitted
console.log('New prompt submitted');

// Explanation:

// Imports (import { connectToDB } from '@utils/database';, import Prompt from '@models/prompt';):

// Imports the connectToDB function from the @utils/database module.
// Imports the Prompt model from the @models/prompt module.

// POST Endpoint Handler (export const POST = async (req, res) => {):

// Defines a POST endpoint handler that will handle incoming POST requests.
// Destructures userId, prompt, and tag from the JSON body of the incoming request.

// Try-Catch Block:

// try Block:
// Connects to the MongoDB database using the connectToDB function.
// Creates a new instance of the Prompt model with the provided data.
// Saves the new prompt to the database using await newPrompt.save().
// Returns a JSON response with the newly created prompt and a 201 status (Created).
// catch Block:
// Logs an error message if an error occurs during the process.
// Returns a JSON response indicating the failure to create a new prompt and a 500 status (Internal Server Error).

// Console Log (console.log('New prompt submitted');):

// Logs a message to the console indicating that a new prompt has been submitted.
// This log statement will be executed regardless of the success or failure of the POST request.

// Overall, this code defines a serverless function (likely for a serverless framework like Vercel or AWS Lambda) that handles incoming POST requests to create new prompts in a MongoDB database using the Mongoose Prompt model. It logs a message to the console indicating the submission of a new prompt.
