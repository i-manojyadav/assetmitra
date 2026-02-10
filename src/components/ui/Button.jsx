import './Button.css'

function Button({icon, name}) {
    return(
        <button><i className={icon}></i><span>{name}</span></button>
    )
}

export default Button