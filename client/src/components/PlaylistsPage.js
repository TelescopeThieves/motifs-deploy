import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../Context/UserContext'
import axios from 'axios'


export default function PlaylistsPage () {
    const [playlists, setPlaylists] = useState([])
    const {loggedInUser} = useContext(UserContext)

    const getPlaylists = async () => {
        try {
            const {data} = await axios.get(`/playlists/${loggedInUser.userId}`, {headers: {Authentication: loggedInUser?.accesstoken}})
            setPlaylists(prev => [...data.playlists, ...prev])
        } catch (err) {
            console.error(err)
        }
    }
    const deletePlaylist = (id) => {
      axios.post(`post/deletePlaylist/${id}?_method=DELETE`, {}, {headers: {Authentication: loggedInUser?.accesstoken}})
    }
    const addATrackToPlaylist = async (trackId, playlistId) =>{
        const res = await axios.post(`post/addToPlaylist/${trackId}/${playlistId}?_method=PUT`, {}, {headers: {Authentication: loggedInUser?.accesstoken}})
        console.log(res.data.msg)
    }
    const removeATrackFromPlaylist = async (trackId, playlistId) =>{
        const res = await axios.post(`post/removeFromPlaylist/${trackId}/${playlistId}?_method=PUT`, {}, {headers: {Authentication: loggedInUser?.accesstoken}})
        console.log(res.data.msg)
    }
    useEffect(() => {
        getPlaylists()        
    }, [])
    return (
        <div>
            <h1>My Playlists</h1>
            <section>{playlists.map(playlist => 
                    <article key={playlist._id}>
                    <div>
                    <span>{playlist.title}</span>
                    <button onClick={() => deletePlaylist(playlist._id)}>{`Delete`}</button>
                    <button onClick={() => addATrackToPlaylist("60b69d2a31d6f000158bae41",playlist._id)}>{`Add Pazmal track`}</button>
                    <button onClick={() => removeATrackFromPlaylist("60b69d2a31d6f000158bae41",playlist._id)}>{`Remove Pazmal track`}</button>
                    </div>
                    </article>
                )}
            </section>
        </div>
    )
}
