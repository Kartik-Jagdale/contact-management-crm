CREATE DATABASE contacts;

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  company VARCHAR(255),
  job_title VARCHAR(255)
);

