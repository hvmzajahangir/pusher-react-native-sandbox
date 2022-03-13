"use strict";

import mongoose from "./index.js";

const messageSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

export default mongoose.model("messages", messageSchema);
