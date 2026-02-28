import './StatCard.css'

function StatCard({ color = false, title, value, roi }) {

    let defaultColor = "white";

    if (color) {
        defaultColor = value >= 0 ? "green" : "red";
    }

    return (
        <div className='stat-card desktop-view'>
            <div>
                <i className="fa-solid fa-indian-rupee-sign"></i>
            </div>
            <div>
                <p><b>{title}</b></p>
                <p style={{color: defaultColor}}>{Number(value).toLocaleString()} <span style={{display: roi !== undefined ? "inline-block" : "none"}}>({Number(Number(roi).toFixed(2)).toLocaleString()}%)</span></p>
            </div>
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
                    <p>P&L:</p>
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