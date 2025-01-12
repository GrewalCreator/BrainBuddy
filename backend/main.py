from app import create_app, create_database

app = create_app()

with app.app_context():
    create_database(app)

if __name__ == "__main__":
    app.run(debug=True)