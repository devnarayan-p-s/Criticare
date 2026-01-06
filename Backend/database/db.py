import os
import sqlite3


def _init_sqlite_db(conn: sqlite3.Connection):
    """Create required tables if they don't exist."""
    conn.execute("""
    CREATE TABLE IF NOT EXISTS patients (
      patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT,
      contact TEXT,
      address TEXT,
      dr_name TEXT,
      disease TEXT DEFAULT NULL,
      symptoms TEXT DEFAULT NULL,
      emergency INTEGER DEFAULT 0,
      discharged INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)
    conn.commit()


def get_db():
    """Return a sqlite3 Connection. If DB file doesn't exist, initialize schema.

    Use env var `CRITICARE_DB_PATH` to set a custom sqlite file path.
    """
    db_path = os.getenv("CRITICARE_DB_PATH")
    if not db_path:
        base = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
        db_path = os.path.join(base, "database.sqlite3")

    # ensure parent dir exists
    os.makedirs(os.path.dirname(db_path), exist_ok=True)

    conn = sqlite3.connect(db_path, check_same_thread=False)
    conn.row_factory = sqlite3.Row

    # initialize schema if needed
    _init_sqlite_db(conn)

    return conn