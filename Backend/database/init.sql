-- Initialize Criticare database and patients table
-- Run as a MySQL user with CREATE DATABASE privileges

CREATE DATABASE IF NOT EXISTS Criticare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE Criticare_db;

CREATE TABLE IF NOT EXISTS patients (
  patient_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(50),
  contact VARCHAR(100),
  address TEXT,
  dr_name VARCHAR(255),
  disease TEXT DEFAULT NULL,
  symptoms TEXT DEFAULT NULL,
  emergency TINYINT(1) DEFAULT 0,
  discharged TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
