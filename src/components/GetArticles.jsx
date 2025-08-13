import { useState, useEffect } from "react"
import './GetArticles.css'


function GetArticles() {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch(`https://nc-news-wq73.onrender.com/api/articles`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
               setArticles(data.articles)
            })
            .catch(err => {
                console.error(err);
                next(err);
            });
    }, [])

    if (!articles.length) return <p>Loading...</p>;

    return (
        <div className="articles-container">
            <p className="articles-heading">Articles:</p>
            <ul className="articles-list">
                {articles.map((article) => (
                    <li className="article-card" key={article.article_id}>
                        <span className="article-title"> {article.title}</span> <br />
                        <span className="article-author">By: {article.author}</span> <br />
                        <span className="article-topic">Topic: {article.topic}</span> <br />
                        <span className="article-comments">Comments: {article.comment_count}</span> <br />
                        <span className="article-date">Created: {article.created_at}</span> <br />
                        <span className="article-votes">Votes: {article.votes}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default GetArticles