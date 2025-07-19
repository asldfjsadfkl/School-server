const express = require('express');
const NOTIFICATION = require('../Models/Setting.js');
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');
const PDF = require('../Models/PdfFile')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const pdffileRoute = express.Router();
const nodeCache = require('node-cache');// cache 
const redisClient = require('../Utils/Redis.js');
const nodecache = new nodeCache({ stdTTL: 0 });

pdffileRoute.post('/pdffile', upload.single('pdf'), async (req, res) => {
    const { name } = req.body;
    try {
        redisClient.del('positionh');
        if (!req.file) res.status(200).json({ message: "file is not found!" });
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                resource_type: 'raw',
                folder: "pdfs",
                public_id: `${Date.now()}${name}`,
                filename_override: name,
                format: "pdf",
                overwrite: true
            },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                })
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
        const downloadUrl = result.secure_url.replace('/upload/', '/upload/fl_attachment/');
        if (result) {
            await PDF.create({
                name: name,
                pdf: { publicId: result.public_id, url: downloadUrl }
            })
            res.status(200).json('pdf saved!');
        }
        else res.status(200).json('Not saved!');
    } catch (error) {
    }
}).get('/allpdfs', async (req, res) => {
    try {
        const pdf = await redisClient.get('pdf');
        if (pdf) return res.status(200).json({ data: JSON.parse(pdf) });

        const data = await PDF.find({});
        await redisClient.set('pdf', JSON.stringify(data));
        res.status(200).json({ data });
    } catch (error) {
    }
}).delete('/pdffile', async (req, res) => {
    try {
        redisClient.del('pdf');
        const pdf = await cloudinary.uploader.destroy(req.query.public_id, {
            resource_type: 'raw',
            type: 'upload',
            invalidate: true
        });
        if (pdf) {
            await PDF.findByIdAndDelete(req.query.id);
            res.status(200).json({ message: 'deleted successfully' });
        } else {
            res.status(200).json({ message: 'something wrong!' });
        }

    } catch (error) {
    }
}).get("/notification", async (req, res) => {
    try {
        let std;
        if (nodecache.has('notify')) {
            std = nodecache.get('notify');
        } else {
            std = await NOTIFICATION.find();
            nodecache.set('notify', std);
        }

        res.status(200).json({ std })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = pdffileRoute;