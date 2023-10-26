# Book-Directory
[CRUD] Created a book directory that can create, read, update and delete books information using Postgresql.

# Setup
1. In terminal, navigate to server folder and run the command "npm install" or "npm i" to download the dependencies.
2. Do the same with the client folder.
3. Now navigate to the server folder and create a .env file.
4. Inside the file create 2 variables POSTGRES_PASS and ACCESS_TOKEN (caps) and set it's value with your postgresql password and a random secret key (for eg: my_secret_key) respectively.
5. POSTGRES_PASS is used in the db.js file. ACCESS_TOKEN is used in the controller.js file while signing the jwt token. 
6. Go to the db.js file and configure the db info according to your postgres configuration.
7. Open 2 terminals one with client folder's path and the other with server folder's path.
8. Run the command "npm start" on both the terminals.
9. The website should now be accesible at http://localhost:3000.
