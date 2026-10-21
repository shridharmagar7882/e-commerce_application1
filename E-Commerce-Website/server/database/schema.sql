PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100),
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  category VARCHAR(100) DEFAULT 'General'
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending','Processing','Shipped','Delivered','Cancelled')),
  tracking_number VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS order_updates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  message VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

INSERT INTO products (name, price, description, image, category) VALUES
('Premium Wireless Headphones', 1299.00, 'High quality sound with active noise cancellation.', 'electronic1.jpeg', 'Electronics'),
('Smart Fitness Watch', 2499.00, 'Tracks heart rate, steps, and sleep monitor.', 'electronic2.jpeg', 'Electronics'),
('HD Bluetooth Speaker', 899.00, 'Portable speaker with deep bass and 12h battery.', 'electronic3.jpeg', 'Electronics'),
('Ultra HD Action Camera', 3499.00, 'Waterproof 4K camera for sports and outdoor recording.', 'electronic4.jpeg', 'Electronics'),
('Men Classic Cotton Shirt', 799.00, '100% breathable cotton slim fit shirt.', 'Fashion1.jpeg', 'Fashion'),
('Women Floral Summer Dress', 1199.00, 'Lightweight and elegant casual dress.', 'Fashion2.jpeg', 'Fashion'),
('Running Sports Shoes', 1499.00, 'Durable cushioned running sneakers.', 'shows1.jpeg', 'Footwear'),
('Casual Leather Loafers', 1899.00, 'Comfortable slip-on leather footwear.', 'shows2.jpeg', 'Footwear'),
('High-Top Basketball Shoes', 2299.00, 'Ankle support basketball sneakers.', 'shows3.jpeg', 'Footwear'),
('Professional Football', 599.00, 'Official size and weight match football.', 'sports1.jpeg', 'Sports'),
('Badminton Racket Set', 899.00, 'Includes 2 lightweight rackets and 3 shuttles.', 'sports2.jpeg', 'Sports'),
('Adjustable Dumbbell Set', 1999.00, 'Solid grip dumbbells for home workout.', 'sports3.jpeg', 'Sports');