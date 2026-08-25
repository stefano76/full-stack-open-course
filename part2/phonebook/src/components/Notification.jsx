const Notification = ({ message, error }) => {
    if (message === null) {
        return null
    }

    const classError = error ? ' error' : ''

    return (
        <div className={`notification${classError}`}>
            {message}
        </div>
    )
}

export default Notification