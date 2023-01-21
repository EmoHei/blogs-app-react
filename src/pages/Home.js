import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  orderBy,
  where,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";
import React, { useState, useEffect } from "react";
import BlogSection from "../components/BlogSection";
import './Home.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SpinnerComp from "../components/SpinnerComp";


const Home = ({setActive ,user}) => {

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        });
        setBlogs(list);
        setLoading(false);
        setActive("home")
      }, (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    }

  }, []);
  if (loading){
    return <SpinnerComp></SpinnerComp>
  }

//  DELETE
 

  console.log("blogs", blogs);
  return (
    <>
      <Row className="row-header-title"><h1>Trending</h1></Row>
      <Container className="home-container">
        <Row >

          <Col className="blog-col">
            <BlogSection blogs={blogs} user={user} />
          </Col>

          <Col className="tags-col">
            <Row>
              <h2>Tags</h2>
            </Row>
            <Row>
              <h2>Most Popular</h2>
            </Row>


          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
