require('dotenv').config();
const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const allFileRoutes = require('./routes/allFilesRoute');
const app = express();
const cors = require('cors')

app.use(express.json());
// Enable CORS for all routes and specify allowed origins
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests only from the frontend
  methods: 'GET, POST, PUT, DELETE',  // Allow specific HTTP methods
  allowedHeaders: 'Content-Type',  // Allow specific headers
}));

app.use('/api', fileRoutes);
app.use('/api', allFileRoutes);
app.get('/', (req, res) => {
  res.send('Hello World');  
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
