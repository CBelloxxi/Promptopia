// Import necessary modules and components
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@models/user';

// Define the NextAuth handler
const handler = NextAuth({
  // Configure authentication providers, in this case, Google
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Define authentication callbacks
  callbacks: {
    // Session callback executed whenever a session is created or updated
    async session({ session }) {
      // Find the user in the database based on the session user's email
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      // Set the user id in the session
      session.user.id = sessionUser._id.toString();

      // Return the updated session
      return session;
    },
    // SignIn callback executed when a user signs in
    async signIn({ profile }) {
      try {
        // Connect to the MongoDB database
        await connectToDB();

        // Check if the user already exists in the database based on their email
        const userExists = await User.findOne({
          email: profile.email,
        });

        // If the user doesn't exist, create a new user and save it to the database
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        // Return true to indicate successful sign-in
        return true;
      } catch (error) {
        // Log any errors that occur during the sign-in process
        console.log(error);
        // Return false to indicate a failed sign-in
        return false;
      }
    },
  },
});

// Export the NextAuth handler for both GET and POST requests
export { handler as GET, handler as POST };

// Explanation:

// Here's a breakdown of what each part of the code does:

// Import Statements: Import necessary modules and components, including NextAuth, the Google provider for NextAuth, a database connection function (connectToDB), and the User model.

// NextAuth Configuration: Define the NextAuth handler by providing configuration options. In this case, it configures a Google authentication provider with the specified client ID and client secret.

// Callbacks:

// Session Callback: This callback is executed whenever a session is created or updated. It finds the user in the database based on the session user's email and updates the session with the user's MongoDB ID.

// SignIn Callback: This callback is executed when a user signs in. It connects to the MongoDB database, checks if the user already exists based on their email, and creates a new user if they don't exist. It returns true for a successful sign-in and false for a failed sign-in.

// Export: Export the NextAuth handler for both GET and POST requests. The exported handler can be used in Next.js API routes.

// Overall, this code sets up authentication using NextAuth with Google as the provider, and it includes custom callbacks to handle session creation/update and user sign-in. It integrates with MongoDB to store user information in a User collection.
