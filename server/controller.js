const pool = require('./db');
const query = require('./query');


const getBooks = (req,res)=>{
    pool.query(query.getBookInfo, (error,result)=>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
};

const addBook = (req,res)=>{
    const {name,author,description} = req.body;
    pool.query(query.addBook,[name,author,description], (error,result)=>{
        if (error) throw error;
        res.status(200).json(result.rows);
    })
};
const deleteBook = (req,res)=>{
    const {id} = req.body;
    pool.query(query.deleteBook, [id], (error,result)=>{
        if (error) throw error;
        res.status(200).json(result.rows);
    });
}
const updateBook = (req,res)=>{
    const {name,author,description,id} = req.body;
    pool.query(query.updateBook,[name,author,description,id], (error,result)=>{
        if (error) throw error;
        res.status(200).json(result.rows);
    })
}

module.exports = {
    getBooks,
    addBook,
    deleteBook,
    updateBook
};