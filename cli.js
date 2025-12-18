require("dotenv").config();
const { Blog } = require("./models");

async function main() {
  const blogs = await Blog.findAll();
  blogs.forEach((blog) => {
    console.log(...[blog.author + ":", blog.title, blog.likes, "likes"]);
  });
}

main();
