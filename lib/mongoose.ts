import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    console.log("Missing MongoDB URL");
    return;
  }

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true; // Set the connection status to true
    console.log("MongoDB connected");

    // Drop the existing index on the email field if it exists
    const User = mongoose.model("User");
    await User.collection.dropIndex("email_1").catch((error) => {
      if (error.code !== 27) {
        console.log("Error dropping index:", error);
      } else {
        console.log("Index does not exist, skipping drop.");
      }
    });

    // Create a new sparse unique index on the email field
    await User.collection.createIndex({ email: 1 }, { unique: true, sparse: true });
    console.log("Sparse unique index on email field created");

  } catch (error) {
    console.log(error);
  }
};
