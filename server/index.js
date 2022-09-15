import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.route.js';

const app = express();
dotenv.config('.env');



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//what this does is sets every route to start with /posts, not just '/'
app.use('/posts', postRoutes);
app.get('/', (req, res) => {
    res.send('Hello to Memories API');
})
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

//this is done so we do not get warnings in the console
//wouldn't run when i did it, ignore
// mongoose.set('useFindAndModify', false);

// mongodb.com/cloud/atlas
