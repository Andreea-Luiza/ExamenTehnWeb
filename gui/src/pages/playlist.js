import { Axios } from "axios";
import { useNavigate } from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Song from './song'
import SongForm from "./songForm"
import EditPlaylist from "./EditPlaylist"
import '../looks/Playlist.css'

const SERVER = 'http://localhost:8080';



function Playlist(props){
    const {item} = props;  
    const {onSelect} = props; 

    const [playlists, setPlaylists] = useState([]);

    const getPlaylists= async() =>{
        const response = await fetch(`${SERVER}/api/playlists`)
        const data = await response.json()
        setPlaylists(data);
    }

    const deletePlaylist = async(id) => {
        await fetch(`${SERVER}/api/playlists/${item.id}`, {
            method:'delete',
        })
        getPlaylists();
        window.location.reload(false);
    }
    return(
        <div className="playlist" onClick={() => onSelect(item.id)}>
            <div className="descriere">
                <label>Descriere: </label>
                {item.descriere}
            </div>
            <div className="dataCreare">
                <label>Data Creare: </label>
                {item.createdAt}
            </div>
            <div className='delete'>
                <input type='button' value='Delete' onClick={deletePlaylist}/>
            </div>
            
        </div>
    )

}
export default Playlist;