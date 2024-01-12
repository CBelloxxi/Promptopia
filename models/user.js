// Import necessary dependencies
import { connectToDB } from '@utils/database';
import { Schema, model, models } from 'mongoose';

// Connect to the database
await connectToDB();
console.log('User Model is Ready!');

// Define the schema for the User model
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"
    ]
  },
  image: {
    type: String,
  }
});

// Create the User model based on the schema
const User = models.User || model('User', UserSchema);

// Export the User model
export default User;

// Explanation

// Module Import:

// Import the connectToDB function from the @utils/database module.
// Import necessary functionalities (Schema, model, models) from the mongoose library.

// Database Connection:
// Use the await connectToDB(); statement to connect to the database.
// Log a message to the console indicating that the User model is ready.

// User Schema Definition:
// Define the schema for the User model using the Schema constructor from mongoose. The schema includes fields like email (a required, unique string), username (a required string with a specified regex pattern for validation), and image (a string).

// Model Creation:
// Create the User model using models.User || model('User', UserSchema). If the model already exists, use the existing model; otherwise, create a new one.

// Export Default:
// Export the User model as the default export.

// In summary, this code connects to the database, defines a schema for the User model with certain fields and validations, creates the model, and exports it for use in other parts of the application. The logging statement helps in tracking when the model is ready.
