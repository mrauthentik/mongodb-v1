const express = require('express');
const app = express();
const User = require('./models/User'); // Assuming you have defined the User model correctly
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mrauthentik:Master@cluster0.inuzhbm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log('MongoDB Connected Error: ', err)
});

app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index", { name: 'Kyle' });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            location: req.body.location,
            street: req.body.street
        });

        await newUser.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/register');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(3400, () => {
    console.log(`Server is running on http://localhost:3400`);
});
