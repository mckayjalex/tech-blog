const sequelize = require('../config/connection');
const { User, Comment, Project } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const projectData = require('./projectData.json');

const seed = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData);
    await Comment.bulkCreate(commentData);
    await Project.bulkCreate(projectData);

    process.exit(0);
}
seed();