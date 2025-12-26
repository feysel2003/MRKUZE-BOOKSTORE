const getBaseUrl = () => {
    // If we open "localhost", this becomes "http://localhost:5000"
    // If we opens "192.168.1.X", this becomes "http://192.168.1.X:5000"
    return `http://${window.location.hostname}:5000`
}

export default getBaseUrl;