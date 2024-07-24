-- Table for Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Table for Members
CREATE TABLE IF NOT EXISTS members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

-- Table for Transactions
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  member_id INTEGER REFERENCES members(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
