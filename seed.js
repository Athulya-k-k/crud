const { MongoClient } = require("mongodb");

// Replace with your actual MongoDB Atlas connection string
const uri = "mongodb+srv://athulyaathuuk:nmqiAYphmJvqQLAp@cluster0.mborvxh.mongodb.net/";
const client = new MongoClient(uri);

async function insertDummyData() {
    try {
        await client.connect();
        const db = client.db("test"); // Replace with your database name
        const collection = db.collection("topics"); // Replace with your collection name

        const dummyData = [];

        for (let i = 1; i <= 100; i++) {
            dummyData.push({
                title: `Book Title ${i}`,
                subtitle: `Subtitle for Book ${i}`,
                description: `This is a description for Book ${i}. It contains random text to showcase how data insertion works.`,
                author: `Author ${i}`,
                price: (Math.random() * 100).toFixed(2) // Random price between 0-100
            });
        }

        const result = await collection.insertMany(dummyData);
        console.log(`${result.insertedCount} records inserted successfully!`);
    } catch (error) {
        console.error("Error inserting dummy data:", error);
    } finally {
        await client.close();
    }
}

insertDummyData();
