import './TradeInsightCard.css'

function TradeInsightCard({ cardTitle, trades }) {

    return (
        <div className='trade-insight-card'>
            <div className='card-title-div'>
                <p className='card-title'>{cardTitle}</p>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>LTP</th>
                            <th>P&L</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trades}
                    </tbody>
                </table>
            </div>
            <p style={{display: trades.length > 0 ? "none" : "block", textAlign: "center"}}>Nothing to Show</p>
        </div>
    )
}

export default TradeInsightCard