import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Col, Row, Typography, Layout } from 'antd';
import { DataContext } from '../../Context/DataContext';
import { HeaderM } from '../Header/Header';
import { AuthContext } from '../../Context/AuthContext';
import { useHttp } from '../../Hooks/http.hook';
import './Favourites.css';

const { Header } = Layout;

export const Favourites = () => {
    const history = useHistory();
    const { token } = useContext(AuthContext);
    const { updateApiData } = useContext(DataContext);
    const { request } = useHttp();
    const [requests, setRequest] = useState([]);

    const fetchedQuery = useCallback(async () => {
        try {
            const fetched = await request(`https://almost-youtube.herokuapp.com/api/favourites`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setRequest(fetched)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchedQuery()
    }, [])

    const sendRequest = (id) => {
        try {
            requests.forEach(el => {
                if (id === el._id) {
                    axios.get('https://www.googleapis.com/youtube/v3/search/', {
                        params: {
                            part: 'snippet',
                            maxResults: el.maxResults || 12,
                            order: el.order || 'relevance',
                            key: process.env.API_KEY,
                            q: el.query 
                        }
                    })
                        .then(res => {
                            updateApiData(res.data.items, el.query)
                        })
                        .catch(error => console.log('err', error))
                }
            })
        } catch (e) {
            console.log(e);
        }
        history.push('/Search');
    }

    const deleteQuery = useCallback(async id => {
        try {
            const remove = await request(`https://almost-youtube.herokuapp.com/api/favourites/remove`, 'DELETE', { id }, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) {
            console.log(e);
        }
    }, [])

    return (
        <>
            <Header>
                <HeaderM />
            </Header>
            <section className='favourites container'>
                <Row>
                    <Col className='favourites__col' span={24}>
                        <Typography.Title level={2}>
                            Избранное
                        </Typography.Title>
                        <ul className='favourites__list'>
                            {requests.map(el => {
                                return (
                                    <li key={el._id} className='favourites__item'>
                                        <h3 className='favourites__item-title'>{el.query}</h3>
                                        <div className='favourites__btn-group'>
                                            <button
                                                className='favourites__btn btn-delete'
                                                onClick={() => {
                                                    setRequest(requests.filter(item => item._id !== el._id));
                                                    deleteQuery(el._id);
                                                }}
                                            >
                                                Удалить
                                            </button>
                                            <button
                                                className='favourites__btn btn-complete'
                                                onClick={() => sendRequest(el._id)}
                                            >
                                                Выполнить
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </Col>
                </Row>
            </section>
        </>
    );
}