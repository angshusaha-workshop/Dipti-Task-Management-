const mongoose = require("mongoose");

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const mongoUrl = process.env.MONGO_URL || "mongodb://angshusaha777_db_user:eyJYSzaXTZY6u3GQ@ac-2hafdsx-shard-00-00.jfgggac.mongodb.net:27017,ac-2hafdsx-shard-00-01.jfgggac.mongodb.net:27017,ac-2hafdsx-shard-00-02.jfgggac.mongodb.net:27017/?ssl=true&replicaSet=atlas-eoaumh-shard-0&authSource=admin&appName=Cluster0";

  if (!cachedConnection) {
    cachedConnection = mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    await cachedConnection;
    console.log("Database connected successfully");
  } catch (err) {
    cachedConnection = null;
    console.error("MongoDB connection failed:", err.message);
    throw err;
  }

  return cachedConnection;
};

module.exports = connectDB;
