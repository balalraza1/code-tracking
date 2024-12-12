import { useState, useContext, useEffect } from "react";
import { PollContext } from "../../providers/PollContext";
import { Button } from "../../shadcn/components/ui/button";

export const ViewerPoll = ({ data, submitVote, endPoll }) => {
  const [selectedOption, setSelectedOption] = useState();
  const { pollData, updatePollData } = useContext(PollContext);
  const { question, options, totalVotes, duration } = pollData;
  const [isVoted, setIsVoted] = useState(false);
  const [showOptions, setShowOptions] = useState(true); // Control visibility of options
  const [showComponent, setShowComponent] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    updatePollData(data);
  }, []);

  useEffect(() => {
    const headingTimer = setTimeout(() => {
      setShowResults(true);
    }, duration * 1000);

    const optionsTimer = setTimeout(() => {
      setShowOptions(false);
    }, duration * 1000);

    const showPoll = setTimeout(() => {
      setShowComponent(false);
    }, (duration + 10) * 1000);

    return () => {
      clearTimeout(headingTimer);
      clearTimeout(optionsTimer);
      clearTimeout(showPoll);
    };
  }, [duration]);

  useEffect(() => {
    if (!showComponent) {
      endPoll();
    }
  }, [showComponent]);

  const handleVote = (selectedOptionId) => {
    const updatedOptions = options.map((option) => {
      if (option.id === selectedOptionId) {
        return { ...option, votes: option.votes + 1, selected: true };
      }
      return option;
    });

    const updatedPollData = {
      ...pollData,
      options: updatedOptions,
      totalVotes: totalVotes + 1,
    };
    const voted = updatedOptions.some((option) => option.selected);
    updatePollData(updatedPollData);
    submitVote(updatedPollData);
    setIsVoted(voted);
  };

  const calculatePercentage = (votes) => {
    return totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);
  };

  return (
    <>
      {showComponent && (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-6 flex flex-col">
            {showResults && <h6 className="mb-2">{"Showing Results..."}</h6>}
            <h3 className="text-xl font-bold mb-4">Poll: {question}</h3>
            <div className="flex-grow">
              {/* {isVoted && } */}
              {showOptions && !isVoted ? (
                <>
                  <ul>
                    {options.map(({ id, value, votes }) => (
                      <li
                        key={id}
                        onClick={() => setSelectedOption(id)}
                        className={`border-2 p-2 rounded-md flex items-center mb-2 ${selectedOption === id
                            ? "bg-slate-500 text-white"
                            : "white"
                          } hover:bg-slate-500 hover:text-white hover:cursor-pointer justify-between`}
                      >
                        <label htmlFor={`option-${id}`} className="mr-2">
                          {value}
                        </label>
                        <span>
                          {votes} votes ({calculatePercentage(votes)}%)
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4 self-end"
                    onClick={() => handleVote(selectedOption)}
                  >
                    Vote
                  </Button>
                </>
              ) : (
                <div>
                  {options.map(({ id, value, votes }) => (
                    <div
                      key={id}
                      className={`${selectedOption === id ? "bg-slate-500 text-white" : ""
                        } border-2 border-slate-400 rounded-md flex items-center mb-2 justify-between p-2`}
                    >
                      <p id={`option-${id}`}>{value}</p>
                      <span>
                        {votes} votes ({calculatePercentage(votes)}%)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
