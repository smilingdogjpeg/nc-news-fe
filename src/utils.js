export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}


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