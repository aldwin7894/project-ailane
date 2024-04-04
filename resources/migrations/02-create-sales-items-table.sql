CREATE TABLE IF NOT EXISTS sales_items (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name      TEXT NOT NULL,
  quantity          REAL NOT NULL,
  unit_price        REAL DEFAULT 0,
  total_amount      REAL DEFAULT 0,
  discount_amount   REAL DEFAULT 0,
  tax_amount        REAL DEFAULT 0,
  created_at        DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),

  CONSTRAINT sales_id
    FOREIGN KEY (sales_id)
    REFERENCES sales (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
)
