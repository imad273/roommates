const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/Users');
const placesRoute = require('./routes/Places');

app.use(express.json());
app.use(cors());

app.use(userRoute);

app.use(placesRoute);

app.listen(3001, () => console.log("it's live in 3001 Port"));