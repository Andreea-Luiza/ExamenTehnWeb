import {useEffect, useState} from 'react';

import Playlist from "./playlist"
import PlaylistForm from "./playlistForm"
import PlaylistDetails from "./PlaylistDetails"
import EditPlaylist from "./EditPlaylist"
import '../looks/PlaylistList.css'

const SERVER = 'http://localhost:8080';

function PlaylistList(props) {
    const [playlists, setPlaylists] = useState([]);

    const [selected, setSelected] = useState(0)

    const {item} = props;

    const getPlaylists = async() =>{
        const response = await fetch(`${SERVER}/api/playlists`)
        const data = await response.json()
        setPlaylists(data);
    }

    const addPlaylist = async(playlist) => {
        await fetch(`${SERVER}/api/playlists`, {
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlist)
        })
        getPlaylists();
    }

    const editPlaylist = async(playlist) => {
        await fetch(`${SERVER}/api/playlists/${selected}`, {
            method:'put',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(playlist)
        })
        getPlaylists();
        window.location.reload(false);
    }

    useEffect(()=>{
        getPlaylists();
    }, []);

    return(
        <div className="playlist-list">
            
            {
                selected !== 0 ? (
                    <div>
                    <EditPlaylist onUpdate={editPlaylist}/>
                    <PlaylistDetails onCancel={() => setSelected(0)} item={playlists.find(e => e.id ===selected)}/>
                    </div>
                ) : (
                    <>
                    {
                        playlists.map(e =><Playlist key={e.id} item={e} onSelect={() => setSelected(e.id)} onCancel={() => setSelected(0)}/>)
                    }
                    <PlaylistForm onAdd={addPlaylist}/>
                    </>
                    
                )
                
            }
        </div>
    )
}
export default PlaylistList;