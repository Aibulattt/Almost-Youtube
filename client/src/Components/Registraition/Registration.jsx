import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Row, Col, Typography,message } from 'antd';
import { useHistory } from 'react-router-dom';
import {useHttp} from '../../Hooks/http.hook';
import {useErrorMessage} from '../../Hooks/messageError';
import 'materialize-css';

import './Registration.css';

  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };

export const Registration = () => {
    const { error, request, clearError} = useHttp();
    const history = useHistory();
    const message = useErrorMessage();
 
    useEffect(() => {
        message(error);
        clearError()
    }, [error, message,clearError])

      const onFinish = (values) => {
        registerHandler(values)
      };

    const registerHandler = async (values) => {
        try {
            const data = await request('https://almost-youtube.herokuapp.com/api/auth/register', 'POST', {...values})
            message(data.message)
            setTimeout(() => {
                history.push('/')
            }, 2000)
        } catch (e) {}
    }

    return(
         <Row justify='center' align='middle' className='authorization'>
            <Col span={24} className='registration__block'>
            <Row>
                <Col className='center' span={24}>
                    <img src="src/Components/logo.svg" alt="logo"/>
                </Col>
                <Col>
                    <Typography.Title className='reg__title' level={2}>
                        Зарегистрироваться
                    </Typography.Title>
                </Col>
            </Row>
                <Form
                    className='register__form'
                    name="basic"
                    onFinish={onFinish}
                    initialValues={{
                    remember: true,
                    }}
                >
                    <Form.Item
                        className='form__input'
                        label="Имя"
                        name="username"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your username!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='form__input'
                        label="Email"
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your email!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='form__input'
                        label="Логин"
                        name="login"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your login!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='form__input'
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your password!',
                            },
                        ]}
                        >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout} className='registration__btn-block center'>
                        <Button 
                            className='registration__btn' 
                            type="primary" 
                            htmlType="submit"
                        >
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
            </Form>
    </Col>
</Row>
    );
}
