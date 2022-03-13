"use strict";

import express from "express";
import * as Messages from "./controllers/messages.js";

const router = express.Router();

router.post("/api/message/add", Messages.addMessage);
router.get("/api/message/sync", Messages.getChannelMessages);

export default router;
