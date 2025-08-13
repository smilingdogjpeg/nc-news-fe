import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { formatDate } from "../utils";
import './GetArticleByID.css'

function GetArticleByID() {
    const { article_id } = useParams()
    const [article, setArticle] = useState([])
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            fetch(`https://nc-news-wq73.onrender.com/api/articles/${article_id}`).then(response => response.json()),
            fetch(`https://nc-news-wq73.onrender.com/api/articles/${article_id}/comments`).then(response => response.json())
        ])
            .then(([dataArticle, dataComments]) => {
                setArticle(dataArticle.article)
                setComments(dataComments.comments)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [article_id])

    if (loading) return <p>Loading...</p>

    const formattedArticleDate = formatDate(article.created_at)


    return (
        <>
            <div className="article-container">
                <h1>{article.title}</h1>
                <h2>in: {article.topic} <br />
                    {article.author} | {formattedArticleDate} <br />
                    Comments: {comments.length} | Votes: {article.votes}
                </h2>
                <img
                    src={article.article_img_url}
                    alt={article.title}
                    style={{ maxWidth: '600px' }}
                /><br />
                <span className="article-body">{article.body}</span>
            </div>
            <div className="comment-container">
                <h3>Comments</h3>
                <ul className="comment-list">
                    {comments.map((comment) => {
                        const formattedCommentDate = formatDate(comment.created_at)
                        return (
                            <li className="comment-card" key={(comment.comment_id)}>
                                <span className="comment-date">[{formattedCommentDate}] </span> <br />
                                <span className="comment-author">{comment.author} said: </span>
                                <span className="comment-body">{comment.body}</span><br />
                                <span className="comment-votes">Votes: {comment.votes}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );


}

export default GetArticleByID