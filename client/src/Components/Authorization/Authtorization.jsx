import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';
import './authorization.css';
import { Forms } from './Form';

const {Title} = Typography;

export const  Authorization = () => {
    const history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('token')) {
            history.push('/Search');
        }
    },[])
    
    return  (
        <>
            <Row justify='center' align='middle' className='authorization'>
                <Col span={24} className='authorization__block'>
                    <Row>
                        <Col className='center' span={24}>
                        <img src="src/Components/logo.svg" alt="logo"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='center' span={24}>
                            <Title className='authorization__title' level={2}>
                                Вход
                            </Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className='center'>
                            <Forms/>
                        </Col>
                    </Row>
                    <Link to='/Registration' className='link-reg'>Зарегистрироваться</Link>
                </Col>
            </Row>
        </>
    );
}