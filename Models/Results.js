const mongoose = require('mongoose');
const resultSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'STUDENT', required: true },
    admissionNumber: { type: String, required: true },
    newClass: { type: String, required: true },
    OM: Number,
    exam: { type: String, required: true },
    firstTrmsubjects: {
        eng: Number,
        math: Number,
        isl: Number,
        pst: Number,
        phy: Number,
        che: Number,
        urdu: Number,
        arabic: Number,
        hist: Number,
        science: Number,
    },
});

module.exports = mongoose.model('RESULTS', resultSchema);