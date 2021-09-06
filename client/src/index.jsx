import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { DataProvider } from './Context/DataContext';
import { App } from './App';


ReactDOM.render(
        <DataProvider> 
            <App />
        </DataProvider>,
    document.querySelector('#root')
)