import './Button.css'

function Button({icon, name}) {
    return(
        <button><i class={icon}></i>{name}</button>
    )
}

export default Button