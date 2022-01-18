import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../Context/UserContext'
import axios from 'axios'


export default function PlaylistsPage () {
    const [playlists, setPlaylists] = useState([{title: 'First Playlist'}])
    const {loggedInUser} = useContext(UserContext)

    const getPlaylists = async () => {
        try {
            const {data} = await axios.get(`/playlists/${loggedInUser.userId}`, {headers: {Authentication: loggedInUser?.accesstoken}})
            setPlaylists(prev => [...data.playlists, ...prev])
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getPlaylists()        
    }, [])
    return (
        <div>
            <h1>My Playlists</h1>
            <section>{playlists.map(playlist => <article key={playlist._id}><h2>{playlist.title}</h2></article>)}</section>
        </div>
    )
}
