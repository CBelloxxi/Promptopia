// Import necessary functions and models
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// Define a GET endpoint handler with parameters
export const GET = async (request, { params }) => {
  try {
    // Connect to the MongoDB database
    await connectToDB();

    // Retrieve prompts from the database where the 'creator' field matches the provided 'id'
    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator');

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

// GET Endpoint Handler (export const GET = async (request, { params }) => {):
// Defines a GET endpoint handler that will handle incoming GET requests.

// Try-Catch Block:
// try Block:
// Connects to the MongoDB database using the connectToDB function.
// Retrieves prompts from the database where the 'creator' field matches the provided 'id' (params.id).
// The populate('creator') method is used to populate the 'creator' field with the corresponding user details.
// Returns a JSON response with the retrieved prompts and a 200 status (OK).
// catch Block:
// If an error occurs during the process, returns a JSON response indicating the failure to fetch prompts and a 500 status (Internal Server Error).

// Response Object (return new Response(JSON.stringify(prompts), { status: 200 });):
// Creates a new Response object containing the JSON representation of the retrieved prompts.
// Sets the HTTP status code to 200 (OK).

// Overall, this code defines a serverless function (likely for a serverless framework like Vercel or AWS Lambda) that handles incoming GET requests to fetch prompts from a MongoDB database where the 'creator' field matches the provided 'id'. The prompts are then returned as a JSON response with a 200 status. If any errors occur during the process, a JSON response with a 500 status is returned.
