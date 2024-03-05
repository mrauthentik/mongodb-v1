const express = require('express');
const app = express();
const User = require('./models/User'); // Assuming you have defined the User model correctly
const path = require('path');
const mongoose = require('mongoose');
const workersRoutes = require('./routes/workers')
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
    res.render("index", { name: 'User' });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {

                // Calculation for Years of Experince field
        const yearsOfExperience = req.body.YoE

        //Calculating Lv1 and Lv2 base on experience

        let lvl2;
        let lvl3;

        //calculating for level 2
        if (yearsOfExperience >= 5) {
            lvl2 = 'Experienced';
        } else if (yearsOfExperience >= 2) {
            lvl2 = 'Intermediate';
        } else {
            lvl2 = 'Beginner';
        }

        // calculating for Level 3
        if (yearsOfExperience >= 10) {
            lvl3 = 'Senior';
        } else if (yearsOfExperience >= 5) {
            lvl3 = 'Mid-level';
        } else {
            lvl3 = 'Junior';
        }


        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            location: req.body.location,
            street: req.body.street,
            lvl2:lvl2,
            lvl3:lvl3
        });

       const savedUser = await newUser.save();
        console.log('User ID:', savedUser._id)
       
        res.redirect('/');
    } catch (error) {
        console.error(error);
       
        res.redirect('/register');
    }
});

// Middleware
app.use(express.json())

app.use('/workers', workersRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(3400, () => {
    console.log(`Server is running on http://localhost:3400`);
});
