import { createContext, useState } from 'react';

const PollContext = createContext({
    pollData: {
        question: '',
        options: [
            { id: 1, value: '', votes: 0, selected: false },
            { id: 2, value: '', votes: 0, selected: false },
        ],
        duration: 15,
        totalVotes: 0,
    },

    updatePollData: () => { },
});

function PollProvider({ children }) {
    const [pollData, setPollData] = useState({
        question: '',
        options: [],
        duration: 15,
    });

    const updatePollData = (newPollData) => {
        setPollData({ ...pollData, ...newPollData });
    };

    return (
        <PollContext.Provider value={{ pollData, updatePollData }}>
            {children}
        </PollContext.Provider>
    );
}

export { PollContext, PollProvider };
