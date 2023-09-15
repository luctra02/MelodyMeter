import musicLogo from "./assets/logo.svg"


function Home() {
    return (
        <div className="home">
            <div className="Logo">
                <img src={musicLogo} alt="logo"/>
            </div>
            <div className="Search">
                <input type="text" placeholder="Search" />
            </div>
        </div>
    )
}

export default Home