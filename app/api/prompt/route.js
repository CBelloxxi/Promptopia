// Import necessary functions and models
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// Define a GET endpoint handler
export const GET = async (request) => {
  try {
    // Connect to the MongoDB database
    await connectToDB();

    // Retrieve all prompts from the database and populate the 'creator' field
    const prompts = await Prompt.find({}).populate('creator');

    // Return a JSON response with the retrieved prompts and a 200 status (OK)
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    // If an error occurs during the process, return a JSON response with a 500 status (Internal Server Error)
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
}

// Explanation

// Imports (import { connectToDB } from '@utils/database';, import Prompt from '@models/prompt';):
// Imports the connectToDB function from the @utils/database module.
// Imports the Prompt model from the @models/prompt module.

// GET Endpoint Handler (export const GET = async (request) => {):
// Defines a GET endpoint handler that will handle incoming GET requests.

// Try-Catch Block:
// try Block:
// Connects to the MongoDB database using the connectToDB function.
// Retrieves all prompts from the database using await Prompt.find({}).populate('creator').
// The populate('creator') method is used to populate the 'creator' field with the corresponding user details.
// Returns a JSON response with the retrieved prompts and a 200 status (OK).
// catch Block:
// If an error occurs during the process, returns a JSON response indicating the failure to fetch prompts and a 500 status (Internal Server Error).

// Response Object (return new Response(JSON.stringify(prompts), { status: 200 });):
// Creates a new Response object containing the JSON representation of the retrieved prompts.
// Sets the HTTP status code to 200 (OK).

// Overall, this code defines a serverless function (likely for a serverless framework like Vercel or AWS Lambda) that handles incoming GET requests to fetch all prompts from a MongoDB database using the Mongoose Prompt model. The prompts are then returned as a JSON response with a 200 status. If any errors occur during the process, a JSON response with a 500 status is returned.
