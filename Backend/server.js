require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

const cors = require("cors");
app.use(cors());







app.listen(3000, () => {
  console.log('Server is running on port 3000');
});