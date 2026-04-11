import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './JournalPerformance.css'

function JournalPerformance({ trades }) {

    const sortedTrades = trades.sort((a, b) => {
        return new Date(a.dateTime) - new Date(b.dateTime);
    });

    // CALCULATE P&L
    function calculatePnL(trade) {
        const entry = Number(trade.entryPrice);
        const exit = Number(trade.exitPrice);
        const charges = Number(trade.charges);
        const qty = Number(trade.qty);
        
        const side = trade.side.toLowerCase() === "buy" ? 1 : -1;

        const pnl = (exit - entry) * qty * side;

        const netPnL = pnl - charges;

        return netPnL;
    }

    const data = sortedTrades.map((trade) => ({
        date: trade.dateTime,
        pnl: calculatePnL(trade)
    }));



    return (
        <div className='journal-performance'>
            <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={data}>

                <defs>
                    <linearGradient id='colorPnl' x1='0' y1='0'x2='0' y2='1'>
                        <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.4} />
                        <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
                    </linearGradient>
                </defs>

                <CartesianGrid stroke='#1f2937' strokeDasharray='3 3' />

                <XAxis dataKey='date' tick={{ fontSize: 14}} tickFormatter={(date) =>
                    new Date(date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short"
                    })
                } />

                
                <Tooltip
                contentStyle={{
                    backgroundColor: "#111111",
                    border: "1px solid #232323",
                    borderRadius: "10px",
                }}
                formatter={(value) => `${value}`}
                labelFormatter={(date) => new Date(date).toLocaleDateString("en-IN")} />

                <Area
                    type='monotone'
                    dataKey='pnl'
                    stroke='#3b82f6'
                    fillOpacity={1}
                    fill='url(#colorPnl)'
                    dot={false}
                />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default JournalPerformance;