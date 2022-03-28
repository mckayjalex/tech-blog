const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const postData = require('./postData.json');

const seed = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData);
    await Comment.bulkCreate(commentData);
    await Post.bulkCreate(postData);

    process.exit(0);
}
seed();