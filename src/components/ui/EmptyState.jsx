import './EmptyState.css'

function EmptyState( {msg} ) {
    return (
        <div className='empty-state'>
            <h2>{msg.title}</h2>
            <p>{msg.desc}</p>
        </div>
    )
}

export default EmptyState