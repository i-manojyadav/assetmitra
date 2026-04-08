import './StatCard.css'

function StatCard({ title, value, subTitle, isPnL, roi, isWinRate }) {

    let valueColor = "#ffffff";
    if (isPnL) {
        valueColor = value >= 0 ? "#008000" : "#ff0000";
    }

    return (
        <div className='stat-card desktop-view'>
            <p className='stat-title'>{title}</p>
            <p className='stat-value' style={{color: valueColor}}>{Number(Number(value).toFixed(1)).toLocaleString()}<span className='roi' style={{display: isPnL? "inline-block" : "none"}}>({Number(Number(roi).toFixed(1)).toLocaleString()}%)</span><span style={{display: isWinRate? "inline-block" : "none"}}>%</span></p>
            <p className='stat-sub-title'>{subTitle}</p>
        </div>
    )
}


function StatCardMobo({ invested, current, pnl, roi, color }) {

    let defaultColor = "white";
    if (color) {
        defaultColor = pnl > 0 ? "green" : "red";
    }

    return (
        <div className='stat-card-mobo mobile-view'>
            <div className='asset-value'>
                <div className='asset-inv-value'>
                    <p>Invested</p>
                    <p className='folio-value'>{Number(invested).toLocaleString()}</p>
                </div>
                <div className='asset-cur-value'>
                    <p>Current</p>
                    <p className='folio-value'>{Number(current).toLocaleString()}</p>
                </div>
            </div>
            <span className='stat-card-border'></span>
            <div className='assetPnL'>
                <div>
                    <p>P&L</p>
                </div>
                <div>
                    <p className='folio-value' style={{color: defaultColor}}>{Number(pnl).toLocaleString()} <span>({Number(Number(roi).toFixed(2)).toLocaleString()}%)</span></p>
                </div>
            </div>
        </div>
    )
}

export default StatCard;
export { StatCardMobo };