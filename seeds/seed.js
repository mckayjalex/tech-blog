const sequelize = require('../config/connection');
const { User, Comment, Project } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const projectData = require('./projectData.json');

const seed = async () => {
    await sequelize.sync({ force: true });

    const users = await User.create(userData);
    const comments = await Comment.create(commentData);
    const projects = await Project.create(projectData);

    process.exit(0);
}
sequelize.sync();
seed();