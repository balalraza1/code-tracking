import { useContext, useEffect, useState } from "react";
import { PollContext } from "../../providers/PollContext";

export const ModeratorPoll = ({ data, endPoll }) => {
  const { pollData, updatePollData } = useContext(PollContext);
  const { question, options, totalVotes, duration } = pollData;
  const [showResults, setShowResults] = useState(false);
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    updatePollData(data);
  }, []);

  useEffect(() => {
    const headingTimer = setTimeout(() => {
      setShowResults(true);
    }, duration * 1000);

    const showPoll = setTimeout(() => {
      setShowComponent(false);
    }, (duration + 10) * 1000);

    return () => {
      clearTimeout(headingTimer);
      clearTimeout(showPoll);
    };
  }, [duration]);

  useEffect(() => {
    if (!showComponent) {
      endPoll();
    }
  }, [showComponent]);

  const calculatePercentage = (votes) => {
    return totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);
  };

  return (
    <>
      {showComponent && (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-6">
            <div>
              {showResults && <h6 className="mb-2">{"Showing Results..."}</h6>}
              <h3 className="text-xl font-bold mb-4">Poll: {question}</h3>
              <ul>
                {options.map(({ id, value, votes }) => (
                  <li key={id} className="flex justify-between mb-2 border-2 border-slate-400 p-3 rounded-md">
                    <span className="flex-1">{value}</span>
                    <span >
                      {votes} votes ({calculatePercentage(votes)}%)
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">Total votes: {totalVotes}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
