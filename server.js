const express= require('express');
const mongoose = require ('mongoose');
const dotenv= require('dotenv');
const cors = require('cors');
const userSchema = require('./models/user'); // Import the DB memory
const aiLogic = require('./routes/airoutes'); // Import the AI brain

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Blossomfoods database connected!!"))
.catch(err=> console.log(err));

app.listen(3000, ()=> console.log("sever is running on port 3000"));