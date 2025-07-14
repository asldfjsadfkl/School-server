const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pdf: {
        publicId: { type: String, required: true },
        url: { type: String, required: true }
    },
});

module.exports = mongoose.model('PDF', pdfSchema);
