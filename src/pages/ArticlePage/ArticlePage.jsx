import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { formatDate } from "../../utils";
import './ArticlePage.css'
import '../../components/Comments/Comments.css'
import Voter from "../../components/Voter";
import AddComment from "../../components/Comments/AddComment";
import DeleteComment from "../../components/Comments/DeleteComment";

function ArticlePage() {
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

    if (loading) return <p className="loading">Loading...</p>

    const formattedArticleDate = formatDate(article.created_at)


    return (
        <>
            <div className="article-container">
                <h1>{article.title}</h1>
                <h2>in: {article.topic} <br />
                    {article.author} | {formattedArticleDate} <br />

                </h2>
                <img
                    src={article.article_img_url}
                    alt={article.title}
                    style={{ maxWidth: '600px' }}
                /><br />
                <span className="article-body">{article.body}</span> <br />
                <Voter id={article.article_id} type="articles" votes={article.votes} />
            </div>
            <div className="comment-container">
                <h3>Comments: {comments.length}</h3>
                <AddComment article_id={article_id} setComments={setComments} comments={comments} />
                <ul className="comment-list">
                    {comments.map((comment) => {
                        const formattedCommentDate = formatDate(comment.created_at)
                        return (
                            <li className="comment-card" key={(comment.comment_id)}>
                                <span className="comment-date">[{formattedCommentDate}] </span> <br />
                                <span className="comment-author">{comment.author} said: </span>
                                <span className="comment-body">{comment.body}</span><br />
                                <Voter id={comment.comment_id} type="comments" votes={comment.votes} />
                                <DeleteComment comment={comment} setComments={setComments} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );


}

export default ArticlePage