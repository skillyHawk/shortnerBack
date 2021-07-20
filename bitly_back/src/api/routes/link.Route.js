const linkController = require('../controllers/link.Controller');

module.exports = (app) => {
    app.route('/link')
        .get(linkController.findAll) // Retrieve all links
        .post(linkController.create);// Create a new link

    app.route('/link/:id')
        .get(linkController.findById) // Retrieve a single link with id
        .put(linkController.update) // Update a link with id
        .delete(linkController.delete); // Delete a link with id
}