// IMPORTS
const User = require('./User');
const Project = require('./Project');
// Users have many projects
User.hasMany(Project, {
    foreignKey: 'user_id',
    onDelete: CASCADE
})
// A Project only belongs to one user 
Project.belongsTo(User, {
    foreignKey: 'user_id'
});
// Projects have many comments 
Project.hasMany(Comment, {
    foreignKey: 'project_id',
    onDelete: CASCADE
});
// Comments only belong to one project
Comment.belongsTo(Project, {
    foreignKey: 'project_id'
});
// Comments only belong to one user 
Comment.belongsTo(User, {
    foreignKey: 'user_id', 
});
// User hasMany comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: CASCADE
});
// EXPORTS
module.exports = { User, Project }