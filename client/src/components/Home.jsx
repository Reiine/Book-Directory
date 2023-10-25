import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import Books from "./Books";
import Pagination from "./Pagination";
import {toast} from 'react-toastify';
function MyVerticallyCenteredModal(props) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

    const handleSubmit = async () =>{
        setLoading(true);
        try {
            console.log(name,author,description);
            if (name !=='' && author !== '' && description !== ''){
                const response = await axios.post(`http://localhost:3001/add`,{
                name,author,description
            })
                toast.success("Successfully added");
                setName('');
                setAuthor('');
                setDescription('');
            }else{
                toast.error("Please fill the values correctly")
            }
        } catch (error) {
            toast.error("Error submitting");
        }
        setLoading(false);
        props.onHide();
        props.onAddBook();

    }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add A Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="name">Name:</label>
        <input type="text" onChange={(e)=>setName(e.target.value)} />
        <label htmlFor="author">Author:</label>
        <input type="text" onChange={(e)=>setAuthor(e.target.value)} />
        <label htmlFor="description">Description:</label><br />
        <textarea name="description" id="description" cols="81" rows="2" onChange={(e)=>setDescription(e.target.value)} ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>{loading? "Loading...": "Add"}</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Home() {
    const [modalShow, setModalShow] = useState(false);
    const [booksData, setBooksData] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 999 ? 4 : 3);
    const lastPageIndex = currentPageIndex * itemsPerPage;
    const firstPageIndex = lastPageIndex - itemsPerPage;
    const currentPage = booksData.slice(firstPageIndex,lastPageIndex);
  
    useEffect(() => {
      const getBookData = async () => {
        const response = await axios.get(`http://localhost:3001/get-book-data`);
        setBooksData(response.data);
      };
      getBookData();
    }, []); 
  
    const handleAddBook = async () => {
      const response = await axios.get(`http://localhost:3001/get-book-data`);
      setBooksData(response.data);
    };
    useEffect(() => {
        const handleResize = () => {
          setItemsPerPage(window.innerWidth < 999 ? 4 : 3);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

  return (
    <div className="cover">
      <h1 className="title">Books Directory</h1>
      <button
        variant="success"
        onClick={() => setModalShow(true)}
        className="home-add"
      >
        Add
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onAddBook={handleAddBook}
      />
        <div className="books-cover">
            {currentPage.map((data,index)=>{
                return(
                    <Books key={index} name={data.name} author={data.author} description={data.description} id={data.id} handleAddBook={handleAddBook} />
                );
            })}
        </div>
        <Pagination totalItems={booksData.length} itemsPerPage={itemsPerPage} setCurrentPageIndex={setCurrentPageIndex}/>
    </div>
    
  );
}

export default Home;
