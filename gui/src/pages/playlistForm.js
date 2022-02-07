import {useState} from 'react';
import '../looks/PlaylistForm.css'



function PlaylistForm(props){
    const {onAdd} = props;
    const [descriere, setDescriere] = useState('');
    const [dataCreare, setDataCreare] = useState(''); 


    const addPlaylist = (evt) => {
        console.warn('called')
        onAdd({
            descriere,
            // dataCreare
        })
    }

    return(
        <div className="playlist-form">
            <div>Playlist Form</div>
            <div className="form-descriere">
                <input type="text" placeholder="descriere" onChange={(evt) => setDescriere(evt.target.value)}/>
            </div>
            {/* <div className="form-dataCreare">
                <input type="text"  placeholder="dataCreare" onChange={(evt) => setDataCreare(evt.target.value)}/>
            </div> */}
            <button
        className="add"
        onClick={addPlaylist}
      >
        Add 
      </button>
        </div>
    )

}

export default PlaylistForm;