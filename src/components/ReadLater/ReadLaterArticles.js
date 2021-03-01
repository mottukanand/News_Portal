import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button, Row, Col, Card, CardText, CardBody, CardLink, CardTitle, CardSubtitle, CardHeader } from 'reactstrap';
import axios from 'axios';

const ReadLaterArticles = () => {

    let { section } = useParams();

    const [toggle, setToggle] = useState(false)
    const [readLaterArticles, setReadLaterArticles] = useState([])



    useEffect(() => {
        getReadLaterArticlesData();
    }, [section])

    const getReadLaterArticlesData = () => {
        let addedReadLaterItems = JSON.parse(localStorage.getItem("readLaterItems")) || [];
        setReadLaterArticles(addedReadLaterItems)
    }

    const handleRemoveReadLater = (e, data) => {
        e.preventDefault();
        let readLaterItems = JSON.parse(localStorage.getItem("readLaterItems")) || [];
        let newReadLaterData = readLaterItems.filter(article => article.title !== data.title);
        localStorage.setItem("readLaterItems", JSON.stringify(newReadLaterData));
        setReadLaterArticles(newReadLaterData)

    }
    
    return (
        <>
            <Row className="side-menu">
                {
                    readLaterArticles && readLaterArticles.length ?
                        readLaterArticles.map((article, index) =>
                            <Col sm={3} className="py-2" key={index}>
                                <Card className="h-100">
                                    <CardHeader style={{ backgroundColor: "#c7c4ec" }}>
                                        <CardTitle tag="h5">{article.title}</CardTitle>
                                        <hr />
                                        <CardSubtitle tag="h6" className="mb-2 text-dark">{article.section}</CardSubtitle>
                                    </CardHeader>
                                    <CardBody>
                                        <CardText>{article.abstract ? article.abstract : "No Description"}</CardText>
                                        <CardLink href="#" className="btn btn-outline-warning text-white bg-danger" onClick={(e) => handleRemoveReadLater(e, article)}>Remove</CardLink>

                                        <CardLink href={article.url} className="btn btn-outline-primary text-white bg-primary" target="_blank">Read More</CardLink>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                        :
                        <Col sm={12} className="py-2">
                            <Card className="w-100">
                                <CardHeader style={{ backgroundColor: "#c7c4ec" }}>
                                    <CardTitle tag="h5">NO ARTICLES FOUND</CardTitle>
                                </CardHeader>
                            </Card>
                        </Col>
                }
            </Row>
        </>
    )
}

export default ReadLaterArticles