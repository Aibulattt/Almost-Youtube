import React, {  useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { Layout, Row, Col, Typography } from 'antd';
import { HeaderM } from '../Header/Header';
import { DataContext } from '../../Context/DataContext';
import './Search.css';
import { ResultList } from './resultList/ResultList';
import { ModalSave } from './ModalSave';
import { VideoItem } from './VideoItem';

const { Header, Content } = Layout;

export const SearchM = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchClass, setSearchClass] = useState(false);
    const [list, setList] = useState(true);
    const [classViewIcon, setClassViewIcon] = useState(false);
    const [totalResults, setTotalResults] = useState([]);
    const [toggleIconResults, setToggleIcon] = useState(true);
    const { dataApi, updateApiData, query, handleVideoSelect} = useContext(DataContext);

    useEffect(() => {
        if (dataApi.length) {
            setSearchClass(true)
        } 
    }, [dataApi])

    const onRequest = (value) => {
        axios.get('https://www.googleapis.com/youtube/v3/search/',{
            params: {
                part: 'snippet',
                maxResults: 12,
                key: process.env.API_KEY,
                q: value
            }
        })
        .then(res => {
            updateApiData(res.data.items)
            setTotalResults(res.data.pageInfo.totalResults)
        })
        .catch(error => console.log('err',error))
    }

    const onSearch = (inputValue) => {
        onRequest(inputValue);
        handleVideoSelect(null);
    }

    const addIconSave = (ev) => {
        if(ev !== '') {
            setClassViewIcon(true);
        } else {
            setClassViewIcon(false);
        }
    }

    const toggleClass = () => {
        setList(!list);
        setToggleIcon(!toggleIconResults);
    }
   
    const classname = searchClass ? 'search-wrapper' : '';
    const classnameList = list ? 'result__list' : 'result__grid';
    const classIconSave = classViewIcon ? 'search__icon-show' : 'search__icon-hide';
    const toggleIconList = toggleIconResults ? 'active-btn-toggle' : '';
    const toggleIconGrid = toggleIconResults ? '' : 'active-btn-toggle';
    
    return (
            <Layout>
                <Header>
                    <HeaderM/>
                </Header>
                <Content className={classname}>
                    <section className='search container'>
                        <Row className='center'>
                            <Col>
                                 <Typography.Title className='search__title' level={1}>
                                     Поиск видео
                                </Typography.Title>
                                <form 
                                    className='search__form'
                                    onSubmit={(ev) => {
                                        ev.preventDefault();
                                        onSearch(inputValue);
                                    }}
                                >
                                    <input 
                                        className='search__search-input'
                                        placeholder="Что хотите посмотреть?"
                                        type="search"
                                        onChange={(ev) => {
                                            addIconSave(ev.target.value);
                                            setInputValue(ev.target.value);
                                        }}
                                    />
                                    <ModalSave 
                                        inputValue={inputValue} 
                                        classIconSave={classIconSave}
                                    />
                                    <button 
                                        className='search__btn'
                                        type='submit'
                                    >
                                        Найти
                                    </button>
                                </form>
                            </Col>
                        </Row>
                    </section>
                    <section className='result container'>
                        <div className='result__info'>
                            <h2 className='info__title'>Видео по запросу <span className='info-title__query'>«{inputValue || query}»</span></h2><span className='info-title__count'>{totalResults}</span>
                            <div className='info__btn-group'>
                                <button 
                                    className='info__btn btn-list'
                                    onClick={() => toggleClass()}
                                >
                                    <img className={toggleIconList} src="src/Components/Search/list.svg" alt="icon"/>
                                </button>
                                <button 
                                    className='info__btn btn-grid'
                                    onClick={() => toggleClass()}
                                >
                                    <img className={toggleIconGrid} src="src/Components/Search/grid.svg" alt="icon"/>
                                </button>
                            </div>
                        </div>
                        <VideoItem />
                        <ResultList classnameList={classnameList}/>
                    </section>
                </Content>
            </Layout>
    );
}