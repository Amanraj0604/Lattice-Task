const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const hospitalRoutes = require('./routes/hospital');
const psychiatristRoutes = require('./routes/psychiatrist');
const Patient=require('./routes/patient')
const cors = require('cors');

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB connected");
})
.catch((err) => {
    console.log("DB Connection error", err);
});

app.use('/api/lattice', hospitalRoutes);
app.use('/api/lattice', psychiatristRoutes);
app.use('/api/lattice', Patient);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
