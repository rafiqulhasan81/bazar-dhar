// import { betterAuth } from "better-auth";

// export const auth = betterAuth({
//   //...
// });


// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
// const db = client.db("test-auth2");

// export const auth = betterAuth({
//   emailAndPassword: { 
//     enabled: true, 
//   },
//   database: mongodbAdapter(db
//     // Optional: if you don't provide a client, database transactions won't be enabled.
    
//   ),
// });




// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// // MongoDB connection
// const client = new MongoClient(
//   process.env.BETTER_AUTH_DB_URL as string
// );

// // Database selection
// const db = client.db("bazar-dhar");

// // Better Auth configuration
// export const auth = betterAuth({
//   // Application base URL
//   baseURL:
//     process.env.BETTER_AUTH_URL ||
//     "http://localhost:3000",

//   // Database adapter
//   database: mongodbAdapter(db),

//   // Email and password authentication
//   emailAndPassword: {
//     enabled: true,
//   },

//   // Google and GitHub social authentication
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     },

//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     },
//   },
// });

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// 1. Read MongoDB connection URL
const mongoUrl = process.env.BETTER_AUTH_DB_URL;

if (!mongoUrl) {
  throw new Error(
    "BETTER_AUTH_DB_URL is missing. Please check your .env.local file."
  );
}

// 2. Create MongoDB client
const client = new MongoClient(mongoUrl);

// 3. Select database
const db = client.db("bazar-dhar");

// 4. Better Auth configuration
export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000",

  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});



