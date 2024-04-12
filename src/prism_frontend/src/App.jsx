import { useEffect, useState } from 'react';
import { prism_backend } from 'declarations/prism_backend';

const pollResults = {
    "Rust": 0,
    "Motoko": 0,
    "TypeScript": 0,
    "Python": 0
};

function App() {
    const [question, setQuestion] = useState("");
    const [voteCounts, setVoteCounts] = useState([]);

    function updateLocalVoteCounts(arrayOfVoteArrays){

        for (let voteArray of arrayOfVoteArrays) {
          //Example voteArray -> ["Motoko","0"]
          let voteOption = voteArray[0];
          let voteCount = voteArray[1];
          pollResults[voteOption] = voteCount;
        }

      };

    const initialize = async () => {
        const question = await prism_backend.getQuestion();
        setQuestion(question);
        const voteCounts = await prism_backend.getVotes();
        updateLocalVoteCounts(voteCounts);
    }
  useEffect(() => {
    initialize();
  }, [])
  return (
    <main>
      <h1>{question}</h1>
      <p>{JSON.stringify(pollResults)}</p>
    </main>
  );
}

export default App;
