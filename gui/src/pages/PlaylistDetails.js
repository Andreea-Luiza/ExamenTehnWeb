import SongList from './songList'

function PlaylistDetails(props){
    const {item, onCancel} = props;
    return(
        <div>
            <div>
                <input type='button' value='back' onClick={() => onCancel()} />
            </div>
            <SongList idPlaylist={item.id}/>
        </div>
    )
}

export default PlaylistDetails;