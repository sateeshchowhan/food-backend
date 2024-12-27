const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sateeshchowhan:sateesh18@cluster0.fkuss0m.mongodb.net/food', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Food Entry Schema
const foodSchema = new mongoose.Schema({
  food: String,
  calories: Number,
  date: { type: Date, default: Date.now },
});

// Create Model
const FoodEntry = mongoose.model('FoodEntry', foodSchema);

// Routes
app.post('/api/food', async (req, res) => {
  const { food, calories } = req.body;
  const newFoodEntry = new FoodEntry({ food, calories });
  await newFoodEntry.save();
  res.status(200).send('Food entry added!');
});

app.get('/api/food', async (req, res) => {
  const entries = await FoodEntry.find().sort({ date: -1 });
  res.status(200).json(entries);
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
