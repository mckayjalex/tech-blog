const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    // Render home.handlebars to screen (includeded data: posts object & logged_in)
    res.render('home', {
      posts,
      logged_in: req.session.logged_in
    });
    // Catch error and return status 500 with error message in json format
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const data = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
        }
      ]
    });

    const posts = data.map((post) => post.get({ plain: true }));
    // Render home.handlebars to screen (includeded data: posts object & logged_in)
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in
    });
    // Catch error and return status 500 with error message in json format
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If session.logged_in = true then redirect to "/"
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // else it will load the login handlebar
  res.render('login');
});
router.get('/signup', (req, res) => {
  // If session.logged_in = true then redirect to "/"
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // else it will load the login handlebar
  res.render('signup');
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      },
      include: {
        model: Post
      }
    });

    const user = userData.get({ plain: true });
    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in
    });
    if (!req.session.logged_in) {

    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newpost', withAuth, (req, res) => {
  try {
    res.render('newPost', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{
        model: Comment,
      }]
    });
    const posts = postData.get({ plain: true });
    res.render('post', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/comment/:id', withAuth,  async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{
        model: Comment,
      },
      {
        model: User,
        attributes: ['username']
      }]
    });
    const posts = postData.get({ plain: true });

    res.render('comment', {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.userName
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;