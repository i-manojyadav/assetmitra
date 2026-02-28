import './TradeInsightCard.css'

function TradeInsightCard({ cardTitle, th, trades }) {

    return (
        <div className='trade-insight-card'>
            <div className='card-title-div'>
                <p className='card-title'>{cardTitle}</p>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            {th.map((th, index) => {
                                return <th key={index}>{th}</th>
                            })}
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