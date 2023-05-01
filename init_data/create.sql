CREATE DATABASE reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  item TEXT NOT NULL,
  review TEXT NOT NULL,
  review_date TIMESTAMP DEFAULT NOW()
);