import './StatCard.css'

function StatCard({ title, value, subTitle, isPnL, roi, isWinRate }) {

    let valueColor = "#ffffff";
    if (isPnL) {
        valueColor = value >= 0 ? "#008000" : "#ff0000";
    }

    return (
        <div className='stat-card'>
            <p className='stat-title'>{title}</p>
            <p className='stat-value' style={{color: valueColor}}><span>{Number(Number(value).toFixed(1)).toLocaleString()}</span> <span className='roi' style={{display: isPnL? "inline-block" : "none"}}>({Number(Number(roi).toFixed(1)).toLocaleString()}%)</span><span style={{display: isWinRate? "inline-block" : "none"}}>%</span></p>
            <p className='stat-sub-title'>{subTitle}</p>
        </div>
    )
}

function StatCardMobile({ invested, current, pnl, roi }) {
    return (
        <div className='stat-card-mobile'>
            <div className='stat-value-sec'>
                <div className='asset-inv-value'>
                    <p className='stat-title-m'>Invested</p>
                    <p className='stat-value-m'>{Number(Number(invested).toFixed(1)).toLocaleString()}</p>
                </div>
                <div>
                    <p className='stat-title-m'>Current</p>
                    <p className='stat-value-m'>{Number(Number(current).toFixed(1)).toLocaleString()}</p>
                </div>
            </div>
            <span className='stat-card-border'></span>
            <div className='stat-pnl'>
                <p className='stat-title-m'>P&L</p>
                <p className='stat-value-m' style={{color: pnl > 0 ? "#008000" : "#ff0000"}}>{Number(Number(pnl).toFixed(1)).toLocaleString()} ({Number(Number(roi).toFixed(1)).toLocaleString()}%)</p>
            </div>
        </div>
    )
}


export default StatCard;
export {StatCardMobile};