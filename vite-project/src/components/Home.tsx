import musicLogo from "../assets/logo.svg"
import Statview from './StatView'
import GreyBox from "./GreyBox"
import '../styles/index.css'
import SongDisplay from './SongDisplay'


function Home() {
    return (

        <div>
            <SongDisplay />
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