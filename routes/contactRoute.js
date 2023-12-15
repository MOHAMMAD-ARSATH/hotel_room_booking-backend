const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Get all contacts
router.get('/', contactController.getAllContacts);

// Add a new contact
router.post('/', contactController.addContact);

// Delete a contact
router.delete('/:id', contactController.deleteContact);

module.exports = router;
