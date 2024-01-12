// Import necessary dependencies
import { connectToDB } from '@utils/database';
import mongoose, { Schema, model, models } from 'mongoose';

// Connect to the database
await connectToDB();
console.log('Prompt Model is Ready!');

// Clear existing models to prevent duplication
mongoose.models = {};

// Define the schema for the Prompt model
const PromptSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
  }
});

// Create the Prompt model based on the schema
const Prompt = models.Prompt || model('prompt', PromptSchema);

// Export the Prompt model
export default Prompt;

// Explanation

// Module Import:
// Import the connectToDB function from the @utils/database module.
// Import necessary functionalities (Schema, model, models) from the mongoose library.

// Database Connection:
// Use the await connectToDB(); statement to connect to the database.
// Log a message to the console indicating that the Prompt model is ready.

// Clear Existing Models:
// Reset the mongoose.models object to an empty object. This is done to prevent model duplication.

// Prompt Schema Definition:
// Define the schema for the Prompt model using the Schema constructor from mongoose. The schema includes fields like creator (a reference to the 'User' model), prompt (a required string), and tag (a required string).

// Model Creation:
// Create the Prompt model using models.Prompt || model('prompt', PromptSchema). If the model already exists, use the existing model; otherwise, create a new one.

// Export Default:
// Export the Prompt model as the default export.

// In summary, this code connects to the database, defines a schema for the Prompt model with certain fields, creates the model, and exports it for use in other parts of the application. The logging statement helps in tracking when the model is ready.
