import { useState } from "react";
import { currentUser } from "../../User";
import { deleteComment } from "../../api";

function DeleteComment({ comment, setComments }) {
    const [error, setError] = useState("");

    const handleDelete = () => {
        setComments((prev) => {
            if (!Array.isArray(prev)) return prev;
            return prev.filter((c) => c.comment_id !== comment.comment_id);
        });

        deleteComment(comment.comment_id)
            .then(() => {
                setError("");
            })
            .catch((err) => {
                setComments((prev) => {
                    if (!Array.isArray(prev)) return [comment];
                    return [comment, ...prev];
                });
                setError(err.message);
            });
    };

    if (currentUser.username !== comment.author) {
        return null;
    }

    return (
        <div>
            <button className="delete-button" onClick={handleDelete}>
                Delete Comment
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default DeleteComment;