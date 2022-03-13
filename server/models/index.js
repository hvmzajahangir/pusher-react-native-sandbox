"use strict";

import mongoose from "mongoose";
import Pusher from "pusher";
import dotenv from "dotenv";

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const pusher = new Pusher({
  appId: "1360488",
  key: "10b8f07c1a28d2afe9d3",
  secret: "5d81fab2ca4d3eab2f61",
  cluster: "eu",
  useTLS: true,
});

(async () => {
  await mongoose.connect(CONNECTION_STRING);
})();

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to DB...");
  // Trigger pusher based on MongoDB change stream 'insert' event
  const messageCollection = db.collection("messages");
  const changeStream = messageCollection.watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
      });
    }
  });
});

export default mongoose;
