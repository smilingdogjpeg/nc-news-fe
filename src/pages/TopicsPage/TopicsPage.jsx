import { useState, useEffect } from "react";
import './TopicsPage.css'

function TopicsPage() {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        fetch('https://nc-news-wq73.onrender.com/api/topics')
        .then(response => response.json())
        .then((data) => {
            setTopics(data.topics)
        })
        .catch(err => console.log(err))
    }, [])


if (!topics.length) return <p className="loading">Loading...</p>;

return (
    <div className="topics-container">
        <h2>All Topics</h2>
        <ul className="topics-list">
            {topics.map((topic) => {
                return (
                    <li className="topics-card">
                        <span className="topic-name"> {topic.slug}</span>
                    </li>
                )
            })}
        </ul>
    </div>
)
}

export default TopicsPage