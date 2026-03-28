import { createContext, useEffect, useState } from "react";

export const FDPortfolioContext = createContext();

export function FDContext({ children }) {

    // FD PORTFOLIO
    const [ fdFolio, setFDFolio ] = useState([]);

    // FD STATS
    const [ fdStats, setFDStats ] = useState([]);


    // FD STATS
    useEffect(() => {
        const invested = fdFolio.reduce((sum, fd) => {
            return Number(sum) + Number(fd.principalAmount);
        }, 0);

        const fdProfit = fdFolio.reduce((sum, fd) => {
            return Number(sum) + Number(fd.profit);
        }, 0);

        const current = Number(invested) + Number(fdProfit);

        const roi = Number((fdProfit/invested) * 100);

        setFDStats(() => {
            return { invested: invested, fdProfit: fdProfit, current: current, roi: roi }
        });

    }, [fdFolio]);


    // SAVING USER PORTFOLIO DATA
    useEffect(() => {
        const savedData = localStorage.getItem("fdFolio");

        if (savedData) {
            setFDFolio(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("fdFolio", JSON.stringify(fdFolio));
    }, [fdFolio]);



    return (
        <FDPortfolioContext.Provider
        value={{
            fdFolio,
            setFDFolio,
            fdStats,
            setFDStats,
        }}
        >

            {children}

        </FDPortfolioContext.Provider>
    )
}