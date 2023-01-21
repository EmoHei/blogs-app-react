import React, { useEffect } from "react";
import './BlogSection.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import { Button, Card, CardGroup, Figure, Image } from "react-bootstrap";
import { FaTrashAlt } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';

const BlogSection = ({ blogs, user }) => {


    return (

        <Container className="blog-section-container" >

            <h3 style={{ marginBottom: '30px', padding: '20px', borderBottom: 'solid 2px grey' }}>Daily Blogs</h3>
            {blogs?.map((item) => (
                <Card >
                    <Row style={{ display: 'flex' }}>
                        <Col className="col-img">

                            <Image
                                style={{ borderRadius: '10px' }}
                                width={100}
                                height={50}
                                alt="171x180" src={item.imgUrl} fluid />

                        </Col>

                        <Col className="col-content">
                            <Card.Text className="text-category" >
                                {item.category}
                            </Card.Text>
                            <Card.Title style={{ color: 'black', fontWeight: 'bold',fontSize:'30px' }}>{item.title}</Card.Title>
                            <Card.Text>
                                <span style={{ fontWeight: 'bold' }}> {item.author} </span> 
                                - {item.timestamp.toDate().toDateString()}
                            </Card.Text>


                            {excerpt(item.description, 120)}
                            <Row className="row-btn">

                                <Col >
                                    <Link to={`/detail/${item.id}`}>
                                 <Button >Read More</Button>
                                </Link>
                                   
                                </Col>

                                <Col className="col-edit-trash">
                                    <BiEdit
                                        name="edit"
                                        style={{ marginRight: '15px', cursor: 'pointer', color: 'rgb(80, 167, 243)', fontSize: '39px' }}
                                    />
                                    <FaTrashAlt
                                        name="trash"
                                        style={{ cursor: 'pointer', color: 'rgb(194, 42, 42)', fontSize: '35px' }}

                                    />
                                </Col>
                            </Row>


                        </Col>
                    </Row>
                </Card>

            ))}
        </Container>


    )


};
export default BlogSection;