import './TradeInsightCard.css'

function TradeInsightCard({ icon, cardTitle, data }) {
    return (
        <div className='trade-insight-card'>
            <div className='card-title'>
                <p><i className={icon}></i></p>
                <p>{cardTitle}</p>
            </div>
            <div>
                <table>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TradeInsightCard