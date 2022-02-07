import {useState} from 'react';
import {useEffect} from 'react';
import '../looks/song.css'
import EditSong from './EditSong'

const SERVER = 'http://localhost:8080';

function Song(props){
    const {item} = props;

    const [songs, setSongs] = useState([]);
    
    const getSongs = async() => {
        const response = await fetch(`${SERVER}/api/playlists/${item.idPlaylist}/songs`)
        const data =  await response.json();
        setSongs(data);
    }

    const deleteSong = async(id) => {
        await fetch(`${SERVER}/api/playlists/${item.idPlaylist}/songs/${item.id}`, {
            method:'delete',
        })
        getSongs();
        window.location.reload(false);
    }

    const editSong = async(song) => {
        await fetch(`${SERVER}/api/playlists/${item.idPlaylist}/songs/${item.id}`, {
            method:'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        })
        getSongs();
        window.location.reload(false);
    }

    useEffect(()=>{
        getSongs();
    }, []);

    return(
        <div className="song">
            <div className="titlu">
                <label>Titlu: </label>
                {item.titlu}
            </div>
            <div className="url">
                <label>Url: </label>
                {item.url}
            </div>
            <div className="stilMuzica">
                <label>Stil de Muzica: </label>
                {item.stilMuzica}
            </div>
            <div className='delete'>
                <input type='button' value='Delete' onClick={deleteSong}/>
            </div>
            <EditSong onUpdate={editSong}/>
        </div>
    )
}

export default Song;