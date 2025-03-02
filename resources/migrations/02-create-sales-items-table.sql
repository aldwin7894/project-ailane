CREATE TABLE IF NOT EXISTS sales_items (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  sales_id          INTEGER,
  product_name      TEXT,
  quantity          REAL DEFAULT 0,
  uom               TEXT,
  unit_price        REAL DEFAULT 0,
  sale_price        REAL DEFAULT 0,
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
