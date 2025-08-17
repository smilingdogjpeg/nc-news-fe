export function voteUpdater(id, type, increment) {
    return fetch(`https://nc-news-wq73.onrender.com/api/${type}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inc_votes: increment }),
    })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Failed to update ${type}`);
            }
            return res.json();
        })
        .catch((err) => {
            console.error(`Error updating ${type} with ID ${id}:`, err);
            return Promise.reject(err);
        });
}

export function addComment(articleId, newComment) {
    return fetch(`https://nc-news-wq73.onrender.com/api/articles/${articleId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(newComment),
    }).then((res) => {
        if (!res.ok) {
            if (res.status === 400) {
                throw new Error("Invalid username. Please enter a registered user.");
            }
            throw new Error(`Error: ${res.status}`);
        }
        return res.json();
    });
};

export function deleteComment(commentId) {
    return fetch(`https://nc-news-wq73.onrender.com/api/comments/${commentId}`, {
        method: "DELETE",
    }).then((res) => {
        if (!res.ok) {
            return res.json().then((data) => {
                throw new Error(data?.message || `Error: ${res.status}`);
            });
        }
        return "Delete successful";
    });
}

