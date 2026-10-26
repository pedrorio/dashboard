CREATE TABLE census_learn_sql (
  age INT NOT NULL,
  education VARCHAR(32) NOT NULL,
  sex VARCHAR(16) NOT NULL
);

INSERT INTO census_learn_sql (age, education, sex) VALUES
  (35, 'Bachelors', 'Female'),
  (42, 'Bachelors', 'Male'),
  (28, 'HS-grad', 'Female'),
  (51, 'HS-grad', 'Male'),
  (33, 'Masters', 'Female'),
  (47, 'Masters', 'Male'),
  (23, 'HS-grad', 'Female'),
  (39, 'Bachelors', 'Male');
