const connection = require('../config/connection');
const { User, Thought } = require('../models');

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
        thoughtText: "Sample thought for coolcat123",
        username: "coolcat123",
    },
    {
        thoughtText: "Sample thought for techwizard45",
        username: "techwizard45",
    },
    {
        thoughtText: "Sample thought for codingking7",
        username: "codingking7",
    },
    {
        thoughtText: "Sample thought for musiclover88",
        username: "musiclover88",
    },
    {
        thoughtText: "Sample thought for adventureseeker",
        username: "adventureseeker",
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

        // Add users to the collections
        const users = await User.insertMany(userSeed);

        // Add thoughts to the collections        
        const thoughts = await Thought.insertMany(thoughtSeed);

        // Update each user to include the ObjectIDs of their thoughts
        for (const user of users) {
            user.thoughts = thoughts
                .filter(thought => thought.username === user.username)
                .map(thought => thought._id);

            await user.save();
        }

        // Log the seed data to indicate what should appear in the database
        console.table(users.map(user => user.toObject()));
        console.table(thoughts.map(thought => thought.toObject()));
        console.info('Seeding complete! 🌱');
    } catch (error) {
        console.error('Seeding error:', error);
    }
    process.exit(0);
});
