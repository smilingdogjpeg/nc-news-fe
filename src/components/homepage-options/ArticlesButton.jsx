import { Link } from "react-router-dom";

function ArticlesButton() {
  return (
    <div>
      <p>Welcome</p>
      <Link to="/articles">
        <button>Click to view all articles</button>
      </Link>
    </div>
  );
}

export default ArticlesButton