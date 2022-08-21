const Notification = ({message, positivity}) => {
    if (message === null) {
        return null
    }

    const notificationPositiveStyle = {
        color: 'green',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const notificationNegativeStyle = {
        color: 'red',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    console.log(positivity === '+')
    const notificationStyle = positivity === '+' ? notificationPositiveStyle : notificationNegativeStyle

    console.log(notificationStyle)
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification