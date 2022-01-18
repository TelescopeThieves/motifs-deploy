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
    const deletePlaylist = async (id) => {
        await axios.post(`post/deletePlaylist/${id}?_method=DELETE`, {}, {headers: {Authentication: loggedInUser?.accesstoken}})
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
                    </div>
                    </article>
                )}
            </section>
        </div>
    )
}
