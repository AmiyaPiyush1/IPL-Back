const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// MongoDB Connection
const mongoURL = 'mongodb+srv://Piyush:Piyush1@cluster0.erzialc.mongodb.net/IPL';

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Root Route
app.get('/', (req, res) => {
  res.send('Server is running and ready to handle requests!');
});

// User Schema and Model
const userSchema = new mongoose.Schema({
  form: { type: String, index: true },
  password: String
});

const User = mongoose.model('User', userSchema);

// User Signup
app.post("/user_name", async (req, res) => {
  const { form, password } = req.body;
  try {
    const existingUser = await User.findOne({ form });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this username already exists' });
    }

    const newUser = new User({ form, password });
    await newUser.save();
    res.status(201).json('User saved successfully');
  } catch (error) {
    res.status(500).json('Error saving user: ' + error.message);
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { form, password } = req.body;
  try {
    const existingUser = await User.findOne({ form, password });
    if (existingUser) {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in: ' + error.message });
  }
});

// Team Schema and Model
const teamSchema = new mongoose.Schema({
  username: { type: String, index: true },
  team: String,
  color: String,  // Team color
  logo: String    // Team logo URL
});

const Team = mongoose.model('Team', teamSchema);

// Seed Initial Team Data
const seedTeams = async () => {
  const teamsData = [
      {
        team: 'RCB',
        color: '#D21A28',
        logo: 'https://logowik.com/royal-challengers-bangalore-logo-vector-svg-pdf-ai-eps-cdr-free-download-13717.html',
      },
      {
        team: 'MI',
        color: '#045193',
        logo: 'https://logowik.com/content/uploads/images/mumbai-indians2544.jpg',
      },
      {
        team: 'CSK',
        color: '#F8CD33',
        logo: 'https://logowik.com/content/uploads/images/chennai-super-kings3461.jpg',
      },
      {
        team: 'KKR',
        color: '#3C0D6E',
        logo: 'https://logowik.com/content/uploads/images/kolkata-knight-riders6292.jpg',
      },
      {
        team: 'DC',
        color: '#0057B8',
        logo: 'https://logowik.com/content/uploads/images/delhi-capitals3041.jpg',
      },
    
    
    // Add more teams as needed
  ];

  for (const teamData of teamsData) {
    await Team.updateOne(
      { team: teamData.team },
      teamData,
      { upsert: true }
    );
  }
  console.log('Teams seeded successfully!');
};

mongoose.connection.once('open', seedTeams);

// Team Assignment
app.post("/teamassigned", async (req, res) => {
  const { username, team } = req.body;

  try {
    // Find the assigned team's details
    const teamDetails = await Team.findOne({ team });

    if (!teamDetails) {
      return res.status(400).json({ error: 'Invalid team name' });
    }

    // Update or create the team assignment for the user
    const userTeam = await Team.updateOne(
      { username }, // Match the user
      {
        username,
        team: teamDetails.team,
        color: teamDetails.color,
        logo: teamDetails.logo
      },
      { upsert: true } // Insert if not found
    );

    res.status(201).json('Team assigned successfully');
  } catch (error) {
    res.status(500).json({ error: 'Error assigning team: ' + error.message });
  }
});

// Team Retrieval
app.get("/teamassigned", async (req, res) => {
  const { username } = req.query;
  try {
    const userTeam = await Team.findOne({ username });
    if (!userTeam) {
      return res.status(404).json({ error: 'Team not found for this user' });
    }

    res.status(200).json({
      team: userTeam.team,
      color: userTeam.color,
      logo: userTeam.logo
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching team: ' + error.message });
  }
});

// Start Server
const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port: ${PORT}`);
});
