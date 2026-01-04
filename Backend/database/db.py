import mysql.connector

def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Od(GOki1)",
        database="Criticare_db"
    )
