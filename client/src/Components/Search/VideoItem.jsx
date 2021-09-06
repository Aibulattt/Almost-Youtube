import React, {  useContext} from 'react';
import { DataContext } from '../../Context/DataContext';

export const VideoItem = () => {

const { videoSelect } = useContext(DataContext);

    if (!videoSelect) {
        return <div></div>
    }

    const videoSrc = `https://www.youtube.com/embed/${videoSelect.id.videoId}`;
    return (
        <>
            <div className='video-container'>
                <iframe className='videoItem' allowFullScreen src={videoSrc} />
                <p className='video__title'>{videoSelect.snippet.title}</p>
                <p className='video__description'>{videoSelect.snippet.description}</p>
                <p className='video__channelTitle'>{videoSelect.snippet.channelTitle}</p>
            </div>
        </>
    );
}