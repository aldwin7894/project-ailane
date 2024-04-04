CREATE TABLE IF NOT EXISTS sales (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_number    TEXT NOT NULL,
  total_amount      REAL DEFAULT 0,
  discount_amount   REAL DEFAULT 0,
  tax_amount        REAL DEFAULT 0,
  created_at        DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
)
