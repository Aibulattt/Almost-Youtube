import React,{useEffect,useContext} from 'react';
import { Form, Input, Button } from 'antd';
import {useHttp} from '../../Hooks/http.hook';
import {useErrorMessage} from '../../Hooks/messageError'
import {AuthContext} from '../../Context/AuthContext';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  
  export const Forms = () => {
    const { error, request, clearError} = useHttp();
    const message = useErrorMessage();
    const {login} = useContext(AuthContext);
    
    useEffect(() => {
      message(error);
      clearError()
  }, [error, message,clearError])

    const loginHandler = async (values) => {
      try {
          const data = await request('https://almost-youtube.herokuapp.com/api/auth/login', 'POST', {...values})
          message(data.message)
          login(data.token, data.userId)
      } catch (e) {}
  }

    const onFinish = (values) => {
      loginHandler(values)
    };
  
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          className='form__input'
          label="Логин"
          name="login"
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
  
        <Form.Item {...tailLayout} className='authorizaition__btn-block center'>
            <Button className='authorizaition__btn' type="primary" htmlType="submit">
              Войти
            </Button>
        </Form.Item>
      </Form>
    );
  };