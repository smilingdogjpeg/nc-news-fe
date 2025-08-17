import { useState } from "react"
import './Comments.css'
import { currentUser } from "../../User"
import { addComment } from "../../api"

function AddComment({ article_id, setComments }) {
    const [optimisticComment, setOptimisticComment] = useState('')
    const [error, setError] = useState(null)
    const [submitEnable, setSubmitEnable] = useState(true)
    const isFormValid = optimisticComment.trim();


    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitEnable(false)

        const newComment = {
            author: currentUser.username,
            body: optimisticComment,
        }

        addComment(article_id, newComment)
            .then((data) => {
                setComments((prev) => [data.newComment, ...prev]);
                setOptimisticComment("");
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setSubmitEnable(true);
            });
    };

    return (
        <div className="new-comment-container">
            <form className="comment-form" onSubmit={handleSubmit}>
                <p className="comment-user-field">
                    User: {currentUser.username}
                </p>
                <input className="new-comment-body"
                    value={optimisticComment}
                    onChange={(event) => setOptimisticComment(event.target.value)}
                    placeholder="new comment..."
                />
                {error && <p className="error-message">{error}</p>}
                <button className="new-comment-submit-buton" type="submit" disabled={!submitEnable || !isFormValid}>
                    {submitEnable ? "Add Comment" : "Submitting..."}
                </button>
            </form>
        </div>
    );
}

export default AddComment