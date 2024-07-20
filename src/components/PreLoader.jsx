import useTheme from '../hooks/useTheme'
const Preloader = () => {
    useTheme()
    return (
        <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
        </div>
    )
}

export default Preloader
