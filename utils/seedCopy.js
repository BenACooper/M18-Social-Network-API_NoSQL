// const connection = require("../config/connection");
// const { User, Thought } = require("../models");

// // Function to generate random unique thoughts
// function randomUniqueThoughts() {
//   const thoughtNumber = Math.floor(Math.random() * 2) + 1; // Generate 1 or 2 thoughts per user
//   const randomThoughts = [];
//   const possibleThoughts = [
//     "What if we could travel through time?",
//     "The universe is so vast and mysterious.",
//     "Kindness is the key to a better world.",
//     "I wonder what lies beyond the stars.",
//     "Music has the power to heal.",
//     "Nature is a great source of inspiration.",
//     "Life is full of surprises.",
//     "Exploring new horizons is exciting.",
//     "Laughter is the best medicine.",
//     "The beauty of art is in its diversity.",
//   ];

//   const usedIndices = [];

//   for (let i = 0; i < thoughtNumber; i++) {
//     let randomIndex;
//     do {
//       randomIndex = Math.floor(Math.random() * possibleThoughts.length);
//     } while (usedIndices.includes(randomIndex));

//     const thoughtText = possibleThoughts[randomIndex];
//     randomThoughts.push(thoughtText);
//     usedIndices.push(randomIndex);
//   }

//   return randomThoughts;
// }

// const thoughtTexts = randomUniqueThoughts();
// const thoughtDocuments = thoughtTexts.map((thoughtText) => new Thought({ thoughtText }));
// await Promise.all(thoughtDocuments.map((thought) => thought.save()));

// const userSeed = [
//   {
//     username: "coolcat123",
//     email: "coolcat123@example.com",
//     thoughts: randomUniqueThoughts(),
//   },
//   {
//     username: "techwizard45",
//     email: "techwizard45@gmail.com",
//     thoughts: randomUniqueThoughts(),
//   },
//   {
//     username: "codingking7",
//     email: "codingking7@outlook.com",
//     thoughts: randomUniqueThoughts(),
//   },
//   {
//     username: "musiclover88",
//     email: "musiclover88@yahoo.com",
//     thoughts: randomUniqueThoughts(),
//   },
//   {
//     username: "adventureseeker",
//     email: "adventureseeker@mail.com",
//     thoughts: randomUniqueThoughts(),
//   },
// ];

// connection.on("error", (err) => {
//   console.error(err);
//   console.log("Logging error:", "err");
// });

// connection.once("open", async () => {
//   console.log("connected");
//   try {
//     // Delete the collections
//     await User.collection.drop();
//     await Thought.collection.drop();

//     // Add users and thoughts to the collections
//     const users = await User.insertMany(userSeed);

//     // Log the seed data to indicate what should appear in the database
//     console.table(users.map((user) => user.toObject()));
//     console.info("Seeding complete! 🌱");
//   } catch (error) {
//     console.error("Seeding error:", error);
//   }
//   process.exit(0);
// });
