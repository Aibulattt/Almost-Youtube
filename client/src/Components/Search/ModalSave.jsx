import React, { useState, useContext } from 'react';
import { Slider, Modal, Select, InputNumber } from 'antd';
import { SaveBtn } from './SaveBtn';
import {useHttp} from '../../Hooks/http.hook';
import {AuthContext}  from '../../Context/AuthContext';
import './ModalSave.css';

const { Option } = Select;

export const ModalSave = ({ classIconSave, inputValue }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [inputSlider, setInputSliser] = useState(25);
  const {token} = useContext(AuthContext);
  const {request} = useHttp();

  const saveParams = async () => {
    try {
      const data = await request(`https://almost-youtube.herokuapp.com/api/favourites/request`, 'POST', {...form},{
        Authorization: `Bearer ${token}`
      })
    } catch (e) {
      console.log(e);
    }
  }

  const form = {
      query: inputValue, order: selectValue || 'relevance', maxResults: inputSlider || 25 
    };

  const onChange = (value) => {
    setInputSliser(value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onSelect = (value) => {
      const {label} = value;
        setSelectValue(label);
  }

  return (
    <>
        <SaveBtn showModal={showModal} inputValue={inputValue} classIconSave={classIconSave}/>
        <Modal className='modal' title="Сохранить запрос" visible={isModalVisible} >
        <form className='modal-form'>
            <label className='form__label' htmlFor="query">
                Запрос
            </label>
            <input 
              className='modal-form__input input-mb' 
              type="text" 
              placeholder={inputValue} 
              name="query" 
              disabled
            />
      <div className='form__select'>
          <p className='select__title'>Сортировать по</p>
        <Select 
            className='input-mb' 
            labelInValue 
            placeholder='Сортировать по'
            name='order'
            onSelect={onSelect}
        >
            <Option value='Relevance' key='1'>Relevance</Option>
            <Option value='Rating' key='2'>Rating</Option>
            <Option value='Date' key='3'>Date</Option>
            <Option value='Title' key='4'>Title</Option>
            <Option value='videoCount' key='5'>videoCount</Option>
            <Option value='viewCount' key='6'>viewCount</Option>
        </Select>
      </div>

        <div className='form__slider'>
            <p className='slider__title'>Максимально количество</p>
            <Slider
                className='slider'
                min={0}
                max={50}
                onChange={onChange}
                value={typeof inputSlider === 'number' ? inputSlider : 0}
            />
            <InputNumber
                min={0}
                max={50}
                value={inputSlider}
                onChange={onChange}
            />
        </div>

        <div className='form__btn'>
            <button 
                onClick={() => closeModal()}
                type='button' 
                className='btn btn-dnt-save'
            >
                Не сохранять
            </button>
            <button 
                onClick={() => {
                    saveParams();
                    closeModal();
                }}
                type='button' 
                className='btn btn-save'
            >
                Сохранить
            </button>
        </div>

      </form>

      </Modal>
    </>
  );
};