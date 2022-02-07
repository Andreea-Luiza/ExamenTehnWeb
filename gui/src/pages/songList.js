import {useEffect, useState} from 'react';
import Song from './song'
import SongForm from './songForm'

const SERVER = 'http://localhost:8080';

function SongList(props) {
    const [songs, setSongs] = useState([]);

    const {idPlaylist} = props;  
    const {item} = props;
    

    const getSongs = async() => {
        const response = await fetch(`${SERVER}/api/playlists/${idPlaylist}/songs`)
        const data =  await response.json();
        setSongs(data);
    }

    const addSong= async(song) => {
        await fetch(`${SERVER}/api/playlists/${idPlaylist}/songs`, {
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        })
        getSongs();
    }

    useEffect(()=>{
        getSongs();
    }, []);

    return(
            <div className="song-list">
            {
                songs.map(e =><Song key={e.id} item={e}/>)
            }
             <SongForm onAdd={addSong}/>
            </div>
    )
}


export default SongList;