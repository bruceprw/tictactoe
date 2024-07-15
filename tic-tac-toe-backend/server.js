const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/tic-tac-toe', { useNewUrlParser: true, useUnifiedTopology: true });

const gameSchema = new mongoose.Schema({
    winner: String,
    loser: String,
    draw: Boolean
});

const Game = mongoose.model('Game', gameSchema);

app.post('/api/saveGame', async (req, res) => {
    console.log('Received saveGame request:', req.body);
    const { winner, loser, draw } = req.body;

    const game = new Game({ winner, loser, draw });
    await game.save();

    res.send({ message: 'Game result saved' });
});

app.get('/api/stats', async (req, res) => {
    console.log('Received stats request');
    const wins = await Game.aggregate([
        { $match: { draw: false } },
        { $group: { _id: '$winner', count: { $sum: 1 } } }
    ]);

    const losses = await Game.aggregate([
        { $match: { draw: false } },
        { $group: { _id: '$loser', count: { $sum: 1 } } }
    ]);

    const draws = await Game.countDocuments({ draw: true });

    res.send({ wins, losses, draws });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
