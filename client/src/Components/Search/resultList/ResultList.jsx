import React, { useContext } from 'react';
import { DataContext } from '../../../Context/DataContext';

export const ResultList = ({ classnameList }) => {

const { dataApi, handleVideoSelect } = useContext(DataContext);

    return(
        <ul className={classnameList}>
            {dataApi.map((video) => {
                 return(
                    <li 
                        key={video.id.videoId} 
                        className='result__item'
                        onClick={() => {handleVideoSelect(video)}}     
                    >
                        <img className='result__img' src={video.snippet.thumbnails.medium.url} alt='image'/>
                        <div className='result__text'>
                            <h3 className='text__title'>{video.snippet.description}</h3>
                            <p className='text__description'>{video.snippet.channelTitle}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    )
}

    

