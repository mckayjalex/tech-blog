const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment');

User.hasMany(Project, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Project.belongsTo(User);

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User);

Project.hasMany(Comment, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Project);

module.exports = { User, Project, Comment};

