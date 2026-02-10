import './StatCard.css'

export default function StatCard({ color = false, title, value}) {

    let valueColor = "white";

    if (color) {
        valueColor = value > 0 ? "green" : "red";
    }

    return (
        <div className='stat-card'>
            <div>
                <i className="fa-solid fa-indian-rupee-sign"></i>
            </div>
            <div>
                <p><b>{title}</b></p>
                <p style={{color: valueColor}}>{Number(value).toLocaleString()}</p>
            </div>
        </div>
    )
}