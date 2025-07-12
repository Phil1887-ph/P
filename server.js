const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// MongoDB connection (replace <password> with your real password)
mongoose.connect('mongodb+srv://philipAdmin:<password>@cluster0.xxxxx.mongodb.net/philipTechDB?retryWrites=true&w=majority')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (name && email && message) {
    try {
      const contact = new Contact({ name, email, message });
      await contact.save();
      res.status(200).send("Message saved to database!");
    } catch (err) {
      console.error("Error saving message:", err);
      res.status(500).send("Error saving message.");
    }
  } else {
    res.status(400).send("All fields are required.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
