"use strict";

import Messages from "../models/messages.js";

export const getChannelMessages = (req, res) => {
  Messages.find((error, data) => {
    if (error) res.status(500).send(error);
    else res.status(200).send(data);
  });
};

export const addMessage = (req, res) => {
  const message = req.body;
  Messages.create(message, (error, data) => {
    if (error) res.status(500).send(error);
    else res.status(201).send(data);
  });
};
