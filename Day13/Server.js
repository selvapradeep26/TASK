
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/school', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String, required: true },
  section: { type: String },
});

const Student = mongoose.model('Student', studentSchema);

app.post('/students', async (req, res) => {
  try {
    const { name, age, class: studentClass, section } = req.body;

    if (!name || !age || !studentClass) {
      return res.status(400).json({ error: 'Name, age, and class are required.' });
    }

    const student = new Student({ name, age, class: studentClass, section });
    await student.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add student.' });
  }
});
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students.' });
  }
});

app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student.' });
  }
});

app.put('/students/:id', async (req, res) => {
  try {
    const { name, age, class: studentClass, section } = req.body;

    if (!name || !age || !studentClass) {
      return res.status(400).json({ error: 'Name, age, and class are required.' });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, class: studentClass, section },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student.' });
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
