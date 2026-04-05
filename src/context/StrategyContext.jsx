import { Children } from "react";
import { createContext, useEffect, useState } from "react";

export const StrategyContext = createContext();

export function StrategyProvider({ children }) {

    //STRATEGY
    const [ strategies, setStrategies ] = useState([]);

    //SAVING USER DATA
    useEffect(() => {
        const savedData = localStorage.getItem("strategies");

        if (savedData) {
            const parsedData = JSON.parse(savedData);
            const updatedData = parsedData.map(strategy => ({
                ...strategy, createdAt: new Date(strategy.createdAt)
            }));

            setStrategies(updatedData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("strategies", JSON.stringify(strategies));
    }, [strategies]);


    return(
        <StrategyContext.Provider
        value={{
            strategies,
            setStrategies
        }}>

            {children}

        </StrategyContext.Provider>
    )

}