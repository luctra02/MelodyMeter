import musicLogo from "../assets/logo.svg"
import Statview from './statview'
import '../styles/index.css'


function Home() {
    return (

        <div>
            <Statview />
            <div id = "search">
                <div className="Logo">
                    <img src={musicLogo} alt="logo"/>
                </div>
                <div className="Search">
                    <input type="text" placeholder="Search" />
                </div>
            </div>
        </div>
    )
}

export default Home