import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";//Used for "tags" and must be install
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, getDoc, serverTimestamp, doc, updateDoc, onSnapshot, } from "firebase/firestore";

import { toast } from "react-toastify";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import FormCheck from 'react-bootstrap/FormCheck'
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
// Form fields
const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  comments: [],
  likes: []
};
// Tags Categories
const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const AddEditBlog = ({ user, setActive }) => { // user is declared in App.js
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category, trending, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  console.log("form",form);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };
  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }
    navigate("/");
  };


  return (
    <Container style={{ marginTop: '100px' }}>
      <h1 style={{ marginTop: '5%' }}>{id? "Update Blog" : "Create Blog"}</h1>
      <Form onSubmit={handleSubmit}>
        <Row>


          <Form.Group className="mb-3" controlId="formBasicEmail">

            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row style={{ margin: '0px' }} >
          <ReactTagInput
            tags={tags}
            placeholder="Tags"
            onChange={handleTags}
          ></ReactTagInput>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col >
            <p >
              Is it trending blog?
            </p>
          </Col>

          <Col>
            <input
              type="radio"
              aria-label="radio 1"
              value="yes"
              name="radioOption"
              checked={trending === "yes"}
              onChange={handleTrending}
            />
            <FormCheckLabel htmlFor="radioOption">   Yes&nbsp;</FormCheckLabel>
          </Col>
          <Col>
            <input
              type="radio"
              aria-label="radio 1"
              value="no"
              name="radioOption"
              checked={trending === "no"}
              onChange={handleTrending}
            />
            <FormCheckLabel htmlFor="radioOption">No &nbsp;</FormCheckLabel>
          </Col>
        </Row>
        <Row style={{ margin: '0px', height: '40px' }} >
          <Form.Select aria-label="Default select example"
            value={category}
            onChange={onCategoryChange}
          >
            <option value="">Please select category</option>
            {categoryOption.map((option, index) => (
              <option value={option || ""} key={index}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              value={description}
              name="description"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              type="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>
        </Row>
        <Button
          type="submit"
          disabled={progress !== null && progress < 100}
        >
        {id ? "Update" : "Submit"}
        </Button>

      </Form>

    </Container>
  )
}

export default AddEditBlog
