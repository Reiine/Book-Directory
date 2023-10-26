const getBookInfo = "SELECT * FROM booksinfo WHERE Email = $1";
const addBook = "INSERT INTO booksinfo (Name, Author, Description,Email) VALUES ($1, $2, $3,$4)";
const deleteBook = "DELETE FROM booksinfo WHERE id = $1";
const updateBook ="UPDATE booksinfo SET Name = $1, Author = $2, Description = $3  WHERE id = $4";
const registerUser = "INSERT INTO users (Name,Email,Password) VALUES ($1,$2,$3)";
const logInPassCheck = "SELECT * FROM users WHERE Email = $1";

module.exports = {
    getBookInfo,
    addBook,
    deleteBook,
    updateBook,
    registerUser,
    logInPassCheck
}