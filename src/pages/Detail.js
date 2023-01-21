import React, { useState, useEffect } from "react";
import './Detail.css'
import { useParams } from "react-router-dom";

import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  orderBy,
  where,
} from "firebase/firestore";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaTags } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { AiFillTags } from "react-icons/ai";

const Detail = ({setActive}) => {
  // const userId = user?.uid;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  let [likes, setLikes] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    
    const blogRef = collection(db, "blogs");
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data())
    setActive (null)

   
  };



  return (
    <>
    <Container> 
       <header className="container" style={{ backgroundImage: `url('${blog?.imgUrl}')` }}>

       </header>
        <Row className="overlay">

          <Col className="blog-title-col">
          <span className="date">{blog?.timestamp.toDate().toDateString()}</span>
            <h2 className="blog-title-col-title" >{blog?.title}</h2>
        </Col>
        </Row>
       <Row className="row-content">
          <Col className="row-content-description-col">
            <span className="meta-info text-start">
            <span>By </span><span className="author">{blog?.author}</span> -&nbsp;
              <span >{blog?.timestamp.toDate().toDateString()}</span>
              {/* <BiLike handleLike={handleLike} likes={likes} userId={userId} /> */}
            </span>
        </Col>

          <Col className="row-content-tags-col">
        <h2>Tags</h2>

        <h2>Most Popular</h2>
        </Col>
       </Row>
       <Row>

        <Col className="col-description">
            <p>{blog?.description}</p>
        </Col>
       </Row>

     
    
      {/* <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding"> */}
          {/* <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{blog?.author}</p> -&nbsp;
                {blog?.timestamp.toDate().toDateString()} */}
                {/* <BiLike handleLike={handleLike} likes={likes} userId={userId} /> */}
              {/* </span> */}
              {/* <p className="text-start">{blog?.description}</p> */}
              {/* <div className="text-start"> */}
                {/* <FaTags tags={blog?.tags} /> */}
              {/* </div>
              <br /> */}
              {/* <div className="custombox">
                <div className="scroll">
                  <h4 className="small-title">{comments?.length} Comment</h4>
                  {isEmpty(comments) ? (
                    <UserComments
                      msg={
                        "No Comment yet posted on this blog. Be the first to comment"
                      }
                    />
                  ) : (
                    <>
                      {comments?.map((comment) => (
                        <UserComments {...comment} />
                      ))}
                    </>
                  )}
                </div>
              </div> */}
              {/* <CommentBox
                userId={userId}
                userComment={userComment}
                setUserComment={setUserComment}
                handleComment={handleComment}
              /> */}
            {/* </div>
            <div className="col-md-3"> */}
              {/* <div className="blog-heading text-start py-2 mb-4">Tags</div> */}
              {/* <AiFillTags tags={tags} /> */}
              {/* <FeatureBlogs title={"Recent Blogs"} blogs={blogs} /> */}
           {/* </div> */}
        {/* </div>  */}
          {/* <RelatedBlog id={id} blogs={relatedBlogs} /> */}
        {/* </div> */}
      {/* </div> */}
     </Container>
     </>
  )
}

export default Detail
