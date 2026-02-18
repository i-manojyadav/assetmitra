import './TradeInsightCard.css'

function TradeInsightCard({ icon, cardTitle, trades }) {
    return (
        <div className='trade-insight-card'>
            <div className='card-title'>
                <p><i className={icon}></i></p>
                <p>{cardTitle}</p>
            </div>
            <div>
                <table>
                    <tbody>
                        {trades}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TradeInsightCard