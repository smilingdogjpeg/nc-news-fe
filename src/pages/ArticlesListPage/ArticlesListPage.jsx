import { useState, useEffect } from "react"
import './ArticlesListPage.css'
import { Link } from "react-router-dom";
import { formatDate } from "../../utils";

function ArticlesListPage() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch(`https://nc-news-wq73.onrender.com/api/articles`)
            .then(response => response.json())
            .then((data) => {
                setArticles(data.articles)
            })
            .catch(err => console.log(err));
    }, [])


    if (!articles.length) return <p className="loading">Loading...</p>;

    return (
        <div className="articles-container">
            <h2>Recent Articles:</h2>
            <ul className="articles-list">
                {articles.map((article) => {
                   const formattedDate = formatDate(article.created_at)
                    return (
                        <li className="article-card" key={article.article_id}>
                            <span className="article-title"> {article.title}</span> <br />
                            <span className="article-author">By: {article.author}</span> <span className="article-date">- {formattedDate}</span> <br />
                            
                            <Link to={`/articles/${article.article_id}`} state={{ article }}>
                            <img style={{ maxWidth: '100%', height: 'auto' }} src={article.article_img_url} />
                            </Link> <br />

                            <span className="article-topic">Topic: {article.topic}</span> <br />
                            <span className="article-comments">Comments: {article.comment_count}  |  </span>
                            <span className="article-votes">Votes: {article.votes}</span>

                        </li>
                    )
                })}
            </ul>
        </div>
    );



}

export default ArticlesListPage