import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button, Row, Col, Card, CardText, CardBody, CardLink, CardTitle, CardSubtitle, CardHeader } from 'reactstrap';
import axios from 'axios';

const Articles = () => {

    let { section } = useParams();

    const [articles, setArticles] = useState([]);
    const [articlesData, setArticlesData] = useState([]);
    const [toggle, setToggle] = useState(false)
    const [readLaterArticles, setReadLaterArticles] = useState([])



    useEffect(() => {
        getArticlesData();
    }, [section])

    useEffect(() => {
        let addedReadLaterItems = JSON.parse(localStorage.getItem("readLaterItems")) || [];
        if (addedReadLaterItems.length) {
            let arr = addedReadLaterItems.map(value => value.title);
            setReadLaterArticles(arr);
        }
    }, [toggle])

    useEffect(() => {
        if (articles.length && section) {
            if (section === "all") {
                setArticlesData(articles)
            } else {
                let filteredArticle = articles.filter(article => article.section.toLowerCase() === section);
                setArticlesData(filteredArticle)
            }
        }
    }, [articles])

    const getArticlesData = () => {
        axios.get("https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7")
            .then(response => setArticles(response.data.results))
    }

    const handleReadLater = (e, data) => {
        e.preventDefault();
        let readLaterItems = JSON.parse(localStorage.getItem("readLaterItems")) || [];
        let dataExist = readLaterItems.findIndex(article => article.title === data.title);
        if (dataExist === -1) {
            let arr = [...readLaterItems]
            arr.push({
                "title": data.title,
                "abstract": data.abstract,
                "url": data.url,
                "section": data.section
            })
            localStorage.setItem("readLaterItems", JSON.stringify(arr));
            setToggle(!toggle)
        }

    }

    return (
        <>
            <Row className="side-menu">
                {
                    articlesData && articlesData.length ?
                        articlesData.map((article, index) =>
                            <Col sm={3} className="py-2" key={index}>
                                <Card className="h-100">
                                    <CardHeader style={{ backgroundColor: "#c7c4ec" }}>
                                        <CardTitle tag="h5">{article.title}</CardTitle>
                                        <hr />
                                        <CardSubtitle tag="h6" className="mb-2 text-dark">{article.section}</CardSubtitle>
                                    </CardHeader>
                                    <img width="100%" src={article.thumbnail_standard} alt="Card image cap" />
                                    <CardBody>
                                        <CardText>{article.abstract ? article.abstract : "No Description"}</CardText>
                                        {
                                            readLaterArticles.includes(article.title) ?
                                                <CardLink className="btn btn-outline-warning text-white bg-success" disabled={true}>Added</CardLink>
                                                :
                                                <CardLink href="#" className="btn btn-outline-warning text-white bg-info" onClick={(e) => handleReadLater(e, article)}>Add To Read Later</CardLink>
                                        }

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

export default Articles