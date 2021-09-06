import React, {createContext, useState} from 'react';

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [query, setQuery] = useState('');
    const [dataApi, setDataApi] = useState([]);
    const [videoSelect, setVideoSelect] = useState(null);

    const handleVideoSelect = (video) => {
        setVideoSelect(video);
    }

    const updateApiData = (data,q) => {
        setDataApi(data);
        setQuery(q);
    }
    
    return (
        <DataContext.Provider value={{ 
            dataApi, 
            updateApiData, 
            handleVideoSelect,
            videoSelect,
            query
        }}>
            {children}
        </DataContext.Provider>
    );
}


