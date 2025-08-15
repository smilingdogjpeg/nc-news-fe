import { useState } from "react";
import { voteUpdater } from "../utils";

function Voter({ id, type, votes }) {
  const [optimisticVotes, setOptimisticVotes] = useState(0)
  const [error, setError] = useState(null)

  const handleVote = (change) => {
    setOptimisticVotes(prev => prev + change);
    setError(null);

    voteUpdater(id, type, change)
      .catch((err) => {
        setOptimisticVotes(prev => prev - change)
        setError("Failed to update votes. Please try again.")
        console.error(err)
      });
  };

  return (
    <>
      <button className="vote-button" onClick={() => handleVote(1)}>+1</button>
      <button className="vote-button" onClick={() => handleVote(-1)}>-1</button>
      <p className="votes">Votes: {votes + optimisticVotes}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  )
}
export default Voter;