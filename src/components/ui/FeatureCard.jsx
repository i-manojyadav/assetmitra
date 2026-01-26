import './FeatureCard.css'

function FeatureCard({icon, title, desc}) {
    return (
        <div className='feature-card'>
            <div>
                <i class={icon}></i>
            </div>
            <div>
                <h3>{title}</h3>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default FeatureCard