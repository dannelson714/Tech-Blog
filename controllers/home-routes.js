const router = require('express').Router();
const { Post, Comment, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
        {
          model: Comment,
          attributes: ['content'],
        },
      ],
    });

    const posts = dbBlogPosts.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
// Use the custom middleware before allowing the user to access the post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const dbBlogPosts = await Post.findByPk(req.params.id, {
      include: [
        {
            model: User,
            attributes: ['user_name'],
          },
          {
            model: Comment,
            attributes: ['content'],
          },
      ],
    });
    req.session.save(() => {
      //Create session variable to track the current comment
      req.session.currentComment = dbBlogPosts.id;
    const posts = dbBlogPosts.get({ plain: true });
    res.render('post', { posts, loggedIn: req.session.loggedIn });
  });
} catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;