

function Alert({alertText, alertType, onClose}) {

    return (
        <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
            {alertText}
            {onClose ? <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button> : <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>}
        </div>
    )

}

export default Alert