import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Books from "./Books";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


function MyVerticallyCenteredModal(props) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(name, author, description);
      if (name !== "" && author !== "" && description !== "") {
        const response = await axios.post(`http://localhost:3001/add`, {
          name,
          author,
          description,
        },{
          headers: {
            Authorization: `Bearer ${props.authToken}`,
          },
        });
        toast.success("Successfully added");
        setName("");
        setAuthor("");
        setDescription("");
      } else {
        toast.error("Please fill the values correctly");
      }
    } catch (error) {
      toast.error("Error submitting");
    }
    setLoading(false);
    props.onHide();
    props.onAddBook();
  };

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
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <label htmlFor="author">Author:</label>
        <input type="text" onChange={(e) => setAuthor(e.target.value)} />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          name="description"
          id="description"
          cols="81"
          rows="2"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>
          {loading ? "Loading..." : "Add"}
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Home({ user, authToken ,handleIsLogin }) {
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [booksData, setBooksData] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth < 999 ? 4 : 3
  );
  const lastPageIndex = currentPageIndex * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const currentPage = booksData!==undefined && booksData.length !== 0
    ? booksData.slice(firstPageIndex, lastPageIndex)
    : [];

  useEffect(() => {
    try {
      const getBookData = async () => {
        console.log(authToken);
        await axios.post(
          "http://localhost:3001/get-book-data",
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        ).then((res)=>{
          setBooksData(res.data.result)
          console.log(res.data.result);
        })
      };
      getBookData();
    } catch (error) {
      toast.error("Can't load books");
    }
  }, []);

  const handleAddBook = async () => {
    console.log(authToken);
    const response = await axios.post(
      "http://localhost:3001/get-book-data",
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    setBooksData(response.data.result);
  };
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 999 ? 4 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleLogout = () =>{
    Cookies.remove('user');
    Cookies.remove('authToken');
    handleIsLogin(false);
    navigate('/login')
    
  }

  return (
    <div className="cover">
      <h1 className="title">{user.name}'s Books Directory</h1>
      <button onClick={handleLogout} className="logout">Logout</button>
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
        authToken={authToken}
      />
      <div className="books-cover">
        {booksData !== undefined &&  booksData.length !== 0 ? (
          <>
            {currentPage.map((data, index) => {
              return (
                <Books
                  key={index}
                  name={data.name}
                  author={data.author}
                  description={data.description}
                  id={data.id}
                  handleAddBook={handleAddBook}
                />
              );
            })}
          </>
        ) : (
          <h1 className="nobooks">No Books Found</h1>
        )}
      </div>
      <Pagination
        totalItems={booksData!== undefined ? 3 :0}
        itemsPerPage={itemsPerPage}
        setCurrentPageIndex={setCurrentPageIndex}
      />
    </div>
  );
}

export default Home;
