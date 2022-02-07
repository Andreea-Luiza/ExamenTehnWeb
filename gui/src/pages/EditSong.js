import {useState} from 'react';
import '../looks/EditSongForm.css'

function SongForm(props){
    const {onUpdate} = props;
    const [titlu, setTitlu] = useState('');
    const [url, setUrl] = useState('');
    const [stilMuzica, setStilMuzica] = useState('');

const options = [{
    label: 'Pop',
    value: 'Pop'
}, {
    label: 'Rock',
    value: 'Rock'
}, {
    label: 'Alternative',
    value: 'Alternative'
}]

    const editSong = (evt) => {
        console.warn('called')
        onUpdate({
            titlu, 
            url,
            stilMuzica
        })
    }

    return(
        <div className="song-edit-form">
            <p>Song Edit</p>
            <div className="edit-titlu">
                <input type="text" placeholder="titlu" onChange={(evt) => setTitlu(evt.target.value)}/>
            </div>
            <div className="edit-url">
                <input type="text" placeholder="url" onChange={(evt) => setUrl(evt.target.value)}/>
            </div>
            <div className="edit-stilMuzica">
               <select onChange={(evt) => setStilMuzica(evt.target.value)}>
                   {options.map((option) => (
                       <option key={option.key} value={option.value}>{option.label}</option>
                   ))}
               </select>
            </div>
         
            <button
        className="add"
        onClick={editSong}
      >
        Update 
      </button>
        </div>
    )

}

export default SongForm;