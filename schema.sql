CREATE TABLE IF NOT EXISTS pickup_slots (
  pickup_date TEXT NOT NULL,
  pickup_time TEXT NOT NULL,
  reserved INTEGER NOT NULL DEFAULT 0 CHECK(reserved BETWEEN 0 AND 4),
  PRIMARY KEY (pickup_date, pickup_time)
);
CREATE TABLE IF NOT EXISTS pickup_requests (
  id TEXT PRIMARY KEY,
  pickup_date TEXT NOT NULL,
  pickup_time TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS pickup_requests_slot ON pickup_requests(pickup_date,pickup_time);
