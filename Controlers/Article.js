const ARTICLE = require("../Models/Articles");
const express = require("express");
const isAuth = require("../Utils/Auth");
const node_Cache = require('node-cache');
const router = express.Router();
const nodeCache = new node_Cache()
const articles = router.post("/createarticle", isAuth, async (req, res) => {

  try {
    const art = await ARTICLE.create({
      name: req.body.name,
      text: req.body.text,
    });
    if (art) {
      nodeCache.del("data");
      res.status(201).json({
        success: true,
        art,
      });
    } else {
      res.status(401).json({
        message: "Not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
})
  .get("/:id", async (req, res) => {
    try {
      const ids = req.params.id.replaceAll('-', " ");
      const art = await ARTICLE.findOne({ name: ids });
      if (art) {
        res.status(200).json({
          art,
        });
      } else {
        res.status(401).json({
          message: "Not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .delete("/:id", isAuth, async (req, res) => {
    try {
      const art = await ARTICLE.findByIdAndDelete(req.params.id);
      if (art) {
        res.status(200).json({
          art,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .patch("/:id", isAuth, async (req, res) => {
    try {
      const ids = req.params.id.replaceAll('-', " ");
      const art = await ARTICLE.findOneAndUpdate(
        { name: ids },
        {
          name: req.body.name,
          text: req.body.text,
        }
      );
      if (art) {
        res.status(201).json({
          art,
        });
      } else {
        res.status(401).json({
          message: "Not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })
  .get("/search/data", async (req, res) => {
    const { page, limit, search } = req.query;
    try {
      const encoded = decodeURIComponent(search);
      const skip = (page - 1) * limit;

      const data = await ARTICLE.find({
        $or: [{ name: { $regex: encoded, $options: "i" } }],
      })
        .skip(skip)
        .limit(parseInt(limit));
      const totalcount = await ARTICLE.countDocuments();
      const pagination = {};
      pagination.totalPages = Math.ceil(totalcount / limit);
      if (page * limit < totalcount) {
        pagination.next = {
          page: page + 1,
        };
      }
      if ((page - 1) * limit > 0) {
        pagination.prev = {
          page: page - 1,
        };
      }

      if (data) {
        res.status(200).json({
          message: "got search data",
          pagination,
          data,
        });
      } else {
        res.status(404).json({
          message: "NOTHING FOUND!",
        });
      }
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  });

module.exports = articles;
