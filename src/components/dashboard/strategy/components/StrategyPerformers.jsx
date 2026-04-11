import { useContext, useEffect, useState } from 'react';
import './StrategyPerformers.css'
import { JournalContext } from '../../../../context/JournalContext';
import { StrategyContext } from '../../../../context/StrategyContext';

function StrategyPerformers() {

    const { journals } = useContext(JournalContext);
    const { strategies } = useContext(StrategyContext);

    const [ strategyPnL, setStrategyPnL ] = useState([]);
    const [ topPerformer, setTopPerformer ] = useState([]);
    const [ worstPerformer, setWorstPerformer ] = useState([]);

    // CALCULATE P&L & ROI
    function calculatePnL(trades) {
        const grossPnL = trades.reduce((sum, trade) => {
            const entry = Number(trade.entryPrice);
            const exit = Number(trade.exitPrice);
            const qty = Number(trade.qty);

            const side = trade.side.toLowerCase() === "buy" ? 1 : -1;

            const pnl = (exit - entry) * qty * side;

            return sum + pnl;
        }, 0);

        const charges = trades.reduce((sum, trade) => {
            return sum + Number(trade.charges);
        }, 0);

        const invested = trades.reduce((sum, trade) => {
            return sum + (Number(trade.entryPrice) * Number(trade.qty));
        }, 0);

        const netPnL = grossPnL - charges;
        const ROI = (netPnL / invested) * 100;

        return {
            netPnL, ROI
        }

    }

    useEffect(() => {

        const trades = journals.flatMap((journal) =>
        journal.trades);

        const strategyTrades = strategies.map((strategy) => {
            const filterTrades = trades.filter((trade) => {
                return strategy.name === trade.strategy;
            });

            return {
                name: strategy.name,
                trades: filterTrades
            }
            
        });

        const results = strategyTrades.map((strategy) => {
            const { netPnL, ROI } = calculatePnL(strategy.trades);

            return {
                name: strategy.name,
                pnl: netPnL,
                roi: ROI
            };
        });

        setStrategyPnL(results);

    }, []);

    // BEST AND WORST STRATEGY
    useEffect(() => {

        const sortedStrategyPnL = strategyPnL.sort((strategy, item) => {
            return Number(item.pnl) - Number(strategy.pnl);
        });

        const topStrategies = sortedStrategyPnL.filter((strategy) => {
            return Number(strategy.roi) > 0;
        });

        const worstStrategies = sortedStrategyPnL.filter((strategy) => {
            return Number(strategy.roi) < 0;
        })

        setTopPerformer(topStrategies);
        setWorstPerformer(worstStrategies);
    }, [strategyPnL]);


    return (
        <div className='strategy-performers'>
            <div>
                <p className='asset-list-title'>Top Performers</p>
                {topPerformer.map((strategy, index) => {
                    return (
                        <p className='asset-items' key={index}><span>{strategy.name.toUpperCase()}</span> <span style={{color: "#008000"}}>{Number(Number(strategy.pnl).toFixed(2)).toLocaleString()} ({Number(Number(strategy.roi).toFixed(2)).toLocaleString()}%)</span></p>
                    )
                })}
            </div>
            <div>
                <p className='asset-list-title'>Worst Performers</p>
                {worstPerformer.map((strategy, index) => {
                    return (
                        <p className='asset-items' key={index}><span>{strategy.name.toUpperCase()}</span> <span style={{color: "#ff0000"}}>{Number(Number(strategy.pnl).toFixed(2)).toLocaleString()} ({Number(Number(strategy.roi).toFixed(2)).toLocaleString()}%)</span></p>
                    )
                })}
            </div>
        </div>
    )
}

export default StrategyPerformers;