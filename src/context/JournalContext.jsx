import { Children, createContext, useEffect, useState } from "react";

export const JournalContext = createContext();

export function JournalProvider({ children }) {

    // JOURNAL
    const [ journals, setJournals ] = useState([]);

    //SAVING USER DATA
    useEffect(() => {
        const savedData = localStorage.getItem("journals");

        if (savedData) {
            const parsedData = JSON.parse(savedData);
            const updatedData = parsedData.map(journal => ({
                ...journal, createdAt: new Date(journal.createdAt)
            }));

            setJournals(updatedData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("journals", JSON.stringify(journals));
    }, [journals]);


    return (
        <JournalContext.Provider
        value={{
            journals,
            setJournals
        }}
        >

            {children}

        </JournalContext.Provider>
    )
}