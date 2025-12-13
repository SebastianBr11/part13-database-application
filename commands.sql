CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

insert into
  blogs (author, url, title)
values
  (
    'Sebastian',
    'https://sebastian.de',
    'Sebastian''s Blog'
  );

insert into
  blogs (author, url, title)
values
  ('Peter', 'https://peter.de', 'Peter''s Blog');
