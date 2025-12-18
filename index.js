require("dotenv").config();
const { Blog } = require("./src/sequelize");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  return res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  const amountDeleted = await Blog.destroy({ where: { id: req.params.id } });
  if (amountDeleted === 0) {
    return res.status(404).end();
  }
  return res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
