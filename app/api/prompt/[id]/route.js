// Import necessary functions and models
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET read
export const GET = async (request, { params }) => {
  try {
    // Connect to the MongoDB database
    await connectToDB();

    // Find a prompt by its ID and populate the 'creator' field
    const prompt = await Prompt.findById(params.id).populate('creator');

    // If the prompt is not found, return a 404 response
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    // Return a JSON response with the found prompt and a 200 status
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    // If an error occurs, return a 500 response
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
}

// PATCH update
export const PATCH = async (request, { params }) => {
  // Extract 'prompt' and 'tag' from the request's JSON body
  const { prompt, tag } = await request.json();

  try {
    // Connect to the MongoDB database
    await connectToDB();

    // Find an existing prompt by its ID
    const existingPrompt = await Prompt.findById(params.id);

    // If the prompt is not found, return a 404 response
    if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

    // Update the prompt's 'prompt' and 'tag' fields
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    // Save the changes to the prompt
    await existingPrompt.save();

    // Return a JSON response with the updated prompt and a 200 status
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    // If an error occurs, return a 500 response
    return new Response("Failed to update prompt", { status: 500 });
  }
}

// DELETE delete
export const DELETE = async (request, { params }) => {
  try {
    // Connect to the MongoDB database
    await connectToDB();

    // Find and delete a prompt by its ID
    await Prompt.findByIdAndDelete(params.id);

    // Return a success message with a 200 status
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    // If an error occurs, return a 500 response
    return new Response("Failed to delete prompt", { status: 500 });
  }
}

// Explanation:

// GET Endpoint (GET function):
// Connects to the MongoDB database.
// Finds a prompt by its ID and populates the 'creator' field.
// If the prompt is not found, returns a 404 response.
// Returns a JSON response with the found prompt and a 200 status.

// PATCH Endpoint (PATCH function):
// Connects to the MongoDB database.
// Finds an existing prompt by its ID.
// If the prompt is not found, returns a 404 response.
// Updates the 'prompt' and 'tag' fields based on the request's JSON body.
// Saves the changes to the prompt.
// Returns a JSON response with the updated prompt and a 200 status.

// DELETE Endpoint (DELETE function):
// Connects to the MongoDB database.
// Finds and deletes a prompt by its ID.
// Returns a success message with a 200 status.

// These endpoints are designed for reading, updating, and deleting prompts in a MongoDB database using the Prompt model. They are part of a RESTful API for managing prompts.
