import {useState} from 'react';
import '../looks/EditPlaylistForm.css'

function EditPlaylist(props){
    const {onUpdate} = props;
    const [descriere, setDescriere] = useState('');
    const [dataCreare, setDataCreare] = useState(''); 


    const editPlaylist = (evt) => {
        console.warn('called')
        onUpdate({
            descriere,
            // dataCreare
        })
    }

    return(
        <div className="edit-form">
            <p>Update playlist form</p>
            <div className="descriere">
                <input type="text" placeholder="descriere" onChange={(evt) => setDescriere(evt.target.value)}/>
            </div>
            {/* <div className="dataCreare">
                <input type="text" placeholder="dataCreare" onChange={(evt) => setDataCreare(evt.target.value)}/>
            </div> */}
    
            <button
        className="add"
        onClick={editPlaylist}
      >
        Update 
      </button>
        </div>
    )

}

export default EditPlaylist;