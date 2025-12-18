const router = require("express").Router();

const { Blog } = require("../models");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  return res.json(blogs);
});

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
  } catch (error) {
    return res.status(400).json({ error });
  }
  if (!req.blog) {
    return res.status(404).end();
  }
  next();
};

router.put("/:id", blogFinder, async (req, res) => {
  if (req.body.likes === undefined) {
    return res.status(400).json({ error: "Likes missing" });
  }
  req.blog.likes = req.body.likes;
  req.blog.save();
  return res.json({ likes: req.blog.likes });
});

router.delete("/:id", blogFinder, async (req, res) => {
  req.blog.destroy();
  return res.status(204).end();
});

module.exports = router;
