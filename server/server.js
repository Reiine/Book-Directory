const express = require("express");
const cors = require("cors");
const controller = require("./controller");

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register',controller.register);
app.post('/login',controller.login);
app.post("/get-book-data",controller.verifyUser, controller.getBooks);
app.post("/add",controller.verifyUser, controller.addBook);
app.put('/update',controller.updateBook);
app.post("/delete", controller.deleteBook);

app.listen(port,()=>{
  console.log(`Server listening on port ${port}` );
});
