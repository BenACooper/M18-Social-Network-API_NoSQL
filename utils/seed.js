const connection = require('../config/connection')
const { User, Thought } = require('../models')

const userSeed = [
    {
      username: "coolcat123",
      email: "coolcat123@example.com",
    },
    {
      username: "techwizard45",
      email: "techwizard45@gmail.com",
    },
    {
      username: "codingking7",
      email: "codingking7@outlook.com",
    },
    {
      username: "musiclover88",
      email: "musiclover88@yahoo.com",
    },
    {
      username: "adventureseeker",
      email: "adventureseeker@mail.com",
    },
  ];
  
  const thoughtSeed = [
    {
      thoughtText: "Life is full of surprises.",
      username: "coolcat123",
    },
    {
      thoughtText: "Kindness goes a long way.",
      username: "coolcat123",
    },
    {
      thoughtText: "The best time to start something new is now.",
      username: "techwizard45",
    },
    {
      thoughtText: "Learning is a lifelong journey.",
      username: "codingking7",
    },
    {
      thoughtText: "Nature is a great source of inspiration.",
      username: "adventureseeker",
    },
    {
      thoughtText: "Music has the power to change moods.",
      username: "musiclover88",
    },
    {
      thoughtText: "A smile can brighten someone's day.",
      username: "musiclover88",
    },
  ];

connection.on('error', (err) => {
    console.error(err);
    console.log("Logging error:", 'err')
});

connection.once('open', async () => {
    console.log('connected');
    try {
        // Delete the collections
        await User.collection.drop();
        await Thought.collection.drop();

        // Add users and thoughts to the collections
        const users = await User.insertMany(userSeed);
        const thoughts = await Thought.insertMany(thoughtSeed);

        // Log the seed data to indicate what should appear in the database
        console.table(users.map(user => user.toObject()));
        console.table(thoughts.map(thought => thought.toObject()));
                console.info('Seeding complete! 🌱');
      }  catch (error) {
        console.error('Seeding error:', error);
      }
    process.exit(0);
  });