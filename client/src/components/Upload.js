import React, { useState, useContext } from 'react'
import PostField from './PostField'
import PostTextArea from './PostTextArea'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import NavSide from './NavSide';
import { UserContext } from '../Context/UserContext'
const FormData = require('form-data');


const Upload = () => {


    const {loggedInUserContext} = useContext(UserContext)


    const [values, setValues] = useState({
        artist: '',
        title: '',
        caption: '',
        art: 'https://res.cloudinary.com/drs4pvb1e/image/upload/c_scale,h_600,w_600/v1629319772/Motifs/brett-jordan-aZVuQWEtX5Y-unsplash_bp7plp.jpg'
    })
    // const [uploadId, setUploadId] = useState('')
    // const [artInputState, setArtInputState] = useState('')
    const [fileInputState, setFileInputState] = useState('')
    const [uploading, setUploading] = useState('')
    const [redirect, setRedirect] = useState(false)

    function updateValue(e){
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }



    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        setFileInputState(file)
    }
    
    const handleSubmitFile = (e) => {
        e.preventDefault()
        if(!fileInputState) return
        uploadTrack(fileInputState)
        setUploading(true)  
    }
    const uploadTrack = async (track) => {

    const formData = new FormData()
    formData.append('file', track)
    formData.append('artist', values.artist)
    formData.append('title', values.title)
    formData.append('caption', values.caption)
    formData.append('art', values.art)

    await axios.post('/post/createPost', formData, {headers: {Authentication: loggedInUserContext?.accesstoken}})

    setUploading(false)
    setRedirect(true)

    }


    // upload art 
    // const handleArtInputChange = (e) => {
    //     const art = e.target.files[0]
    //     setArtInputState(art)
    // }

    // const handleSubmitArt = (e) => {
    //     e.preventDefault()
    //     if(!artInputState) return
    //     uploadArt(artInputState)
    //     setUploading(true)

    // }
    // const uploadArt = async (art) => {

    // const formData = new FormData()
    // formData.append('file', art)

    // axios.put(`/post/addArt/${uploadId}`, formData)
    // .then(({data}) => {
    //     console.log(data)
    //     setRedirect(true)
    //   })
    // }

    if(uploading){
        return(
            <div className="gradient landing">
                <div>uploading...</div>
            </div>
        )
    }
    if(redirect){
        return (
            <Redirect to='/' />
        )
    }
    
    return (
        <div>
            <NavSide />    
            <div className="gradient landing">
                
                <div className="stream audioAndArt index radius">
    
                    <div className="formHead padding">
                        <h1>Upload a track!</h1>
                    </div>
    
                    <form   className="uploadForm padding"
                            onSubmit={handleSubmitFile}
                    >
                        <PostField  for='artist'
                                    label='Artist'
                                    inputClass='padding-top padding-bottom'
                                    inputType='text'
                                    inputId='artist'
                                    inputName='artist'
                                    value={values.artist}
                                    onChange={(e) => updateValue(e)}
                                    
                        />
                        <PostField  for='title'
                                    label='Title'
                                    inputClass='padding-top padding-bottom'
                                    inputType='text'
                                    inputId='title'
                                    inputName='title' 
                                    value={values.title}
                                    onChange={(e) => updateValue(e)}
                        />
                        <PostTextArea  for='caption'
                                        label='Caption'
                                        inputClass='padding-top padding-bottom'
                                        inputType='text'
                                        inputId='caption'
                                        inputName='caption'
                                        rows='8'
                                        value={values.caption}
                                        onChange={(e) => updateValue(e)} 
                        />
                        <PostField  for='audio'
                                    inputClass='chooseFile'
                                    inputType='file'
                                    inputId='audio'
                                    inputName='file'
                                    onChange={handleFileInputChange}
                        />
    
                        <div className="postField margin-top2">
                            <button type="submit" 
                                    className="trackBtn padding-top padding-bottom" 
                                    value="Upload">Upload
                                    </button>
                        </div> 
    
                    </form>
    
                </div>
            </div>
        </div>
        )
}

export default Upload

                    
            //         <div className="stream artUploadStream audioAndArt radius padding2">
        
            //             <div className="formHead">
            //                 <h2>Add cover art!</h2>
            //             </div>
            //             <form  
            //                     className='uploadForm'
            //                     onSubmit={handleSubmitArt}
            //             >
            //                 <PostField  for='art'
            //                             inputClass='chooseFile'
            //                             inputType='file'
            //                             inputId='art'
            //                             inputName='file'
            //                             onChange={handleArtInputChange}
            //                 />
            //                 <div className="postField margin-top2">
            //                     <button type="submit" 
            //                             className="trackBtn padding-top padding-bottom" 
            //                             value="Upload">Upload</button>
            //                 </div> 
        
            //             </form>
        
            //         </div>
                    
            //         }
            //     </div>
            // </div>

    // }
    // else{
    //     return (
    //         <Redirect to='/feed' />
    //     )
    // }

