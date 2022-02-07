import {useState} from 'react';
import '../looks/SongForm.css';

function SongForm(props){
    const {onAdd} = props;
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

    const addSong = (evt) => {
        console.warn('called')
        onAdd({
            titlu, 
            url,
            stilMuzica
        })
    }

    return(
        <div className="song-form">
            <p>Song Form</p>
            <div className="titlu">
                <input type="text" placeholder="titlu" onChange={(evt) => setTitlu(evt.target.value)}/>
            </div>
            <div className="url">
                <input type="text" placeholder="url" onChange={(evt) => setUrl(evt.target.value)}/>
            </div>
            <div className="stilMuzica">
               <select onChange={(evt) => setStilMuzica(evt.target.value)}>
                   {options.map((option) => (
                       <option key={option.key} value={option.value}>{option.label}</option>
                   ))}
               </select>
            </div>
            <button
        className="add"
        onClick={addSong}
      >
        Add 
      </button>
        </div>
    )

}

export default SongForm;