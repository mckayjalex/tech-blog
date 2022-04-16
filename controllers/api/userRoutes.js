// IMPORTS
const router = require('express').Router();
const { User } = require('../../models');

// /login POST
router.post('/login', async (req, res) => {
    try {
        // FIND ONE USER MATCHING WITH REQ EMAIL 
        const userData = await User.findOne({ where: { email: req.body.email }});
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        // CHECK IF PASSWORD IS VALID
        const validPassword = req.body.password == userData.password;
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        };
        // SESSION SAVE 
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.userName = userData.username;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// /logout POST
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

router.post('/signup', async (req, res) => {
    try {
        User.create({
            ...req.body,
        });
        res.status(200).json();
    } catch (err) {
        res.status(500).json(err);
    }
})

// EXPORTS
module.exports = router;