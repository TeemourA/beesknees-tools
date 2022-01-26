import express from 'express';

import { auth } from '../middleware/auth';
import { CardSet, cardSetAllowedUpdates } from '../models/CardSet';

export const cardSetRouter = express.Router();

cardSetRouter.post('/sets', auth, async (req, res) => {
  const cardSet = new CardSet({
    ...req.body,
  });

  try {
    await cardSet.save();
    res.status(200).send(cardSet);
  } catch (error) {
    res.status(404).send();
  }
});

// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:asc/desc
cardSetRouter.get('/sets', auth, async (req, res) => {
  try {
    const cardSets = await CardSet.find({});

    res.status(200).send(cardSets);
  } catch (error) {
    res.status(400).send();
  }
});

cardSetRouter.get('/sets/:id', auth, async (req, res) => {
  try {
    const cardSet = await CardSet.findOne({
      _id: req.params.id,
    });
    if (!cardSet) return res.status(404).send();

    res.status(200).send(cardSet);
  } catch (err) {
    res.status(500).send(err);
  }
});

cardSetRouter.patch('/sets/:id', auth, async (req, res) => {
  const requestedUpdates = Object.keys(req.body);
  const isUpdateAllowed = requestedUpdates.every((update) =>
    cardSetAllowedUpdates.includes(update)
  );

  if (!isUpdateAllowed)
    return res.status(400).send({ error: 'Invalid updates requested' });

  try {
    const updatedCardSet = await CardSet.findOne({
      _id: req.params.id,
    });

    if (!updatedCardSet) return res.status(404).send();

    requestedUpdates.forEach(
      (updateKey) => (updatedCardSet[updateKey] = req.body[updateKey])
    );

    await updatedCardSet.save();
    res.status(201).send(updatedCardSet);
  } catch (err) {
    res.status(400).send(err);
  }
});

cardSetRouter.delete('/sets/:id', auth, async (req, res) => {
  try {
    const cardSet = await CardSet.findOneAndDelete({
      _id: req.params.id,
    });

    if (!cardSet) return res.status(404).send();

    res.status(200).send(cardSet);
  } catch (err) {
    res.status(500).send(err);
  }
});
