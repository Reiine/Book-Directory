import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {toast} from 'react-toastify';

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}

function MyVerticallyCenteredModal(props) {
  const [loading, setLoading] = useState(false);
  const [editName, setEditName] = useState(props.name || "");
  const [editAuthor, setEditAuthor] = useState(props.author || "");
  const [editDescription, setEditDescription] = useState(props.description || "");


  const handleSubmit = async () => {
    const name = editName;
    const description = editDescription;
    const author = editAuthor;
    setLoading(true);
    try {
      const id = props.id;
      if(name !== '' && author !== '' && description !== '') {
        const response = await axios.put(`http://localhost:3001/update`, {
        id,
        name,
        description,
        author,
      });
      toast.success("Values updated successfully");

      }else{
        setEditAuthor(props.author);
        setEditName(props.name);
        setEditDescription(props.description);
        toast.error("Please fill the values correctly")
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
        <Modal.Title id="contained-modal-title-vcenter">
          Edit The Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          onChange={(e) => setEditName(e.target.value)}
          defaultValue={props.name}
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          onChange={(e) => setEditAuthor(e.target.value)}
          defaultValue={props.author}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          onChange={(e) => setEditDescription(e.target.value)}
          defaultValue={props.description}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>
          {loading ? "Loading..." : "Save Changes"}
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Books({ name, author, description, id, handleAddBook }) {
  const [modalShow, setModalShow] = useState(false);
  const truncatedDescription = truncateText(description, 55);

  const handleDelete = async () => {
    const response = await axios.post(`http://localhost:3001/delete`, {
      id,
    });
    toast.success("Successfully deleted")
    handleAddBook();
  };

  return (
    <div className="single-book-cover">
      <p>{name}</p>
      <p>{author}</p>
      <p>{truncatedDescription}</p>
      <div>
        <ButtonGroup aria-label="Basic example">
          <button  onClick={() => setModalShow(true)} className="delete-edit-btn editbtn">Edit</button>
          <button variant="danger" onClick={handleDelete} className="delete-edit-btn deletebtn">Delete</button>
        </ButtonGroup>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onAddBook={handleAddBook}
        name={name}
        description={description}
        author={author}
        id={id}
      />
    </div>
  );
}

export default Books;
