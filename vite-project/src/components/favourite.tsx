
import '../styles/favourite.css'
import '../styles/index.css'

function favourite() {
    return (
        <div className='fullpageBox'>
            <h1 id = "favouriteTitle">My Favourite Songs</h1> 
            <ul id = "favouriteList">
                <li>
                    First song
                </li>
                <li>
                    Second song
                </li>
                <li>
                    Third song
                </li>
                <li>
                    Fourth song
                </li>
            </ul>

        </div>
    )
}

export default favourite