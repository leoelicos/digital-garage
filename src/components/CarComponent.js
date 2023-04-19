import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { START_CAR, STOP_CAR, ADD_CAR } from '../utils/actions.js'

import logo from '../images/vroom.png'

import useModal from '../hooks/useModal.js'
import { Button, Form, Input, Modal, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import FormItemLabel from 'antd/es/form/FormItemLabel.js'

export default function CarComponent() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const [newCarMake, setNewCarMake] = useState('')
  const [newCarModel, setNewCarModel] = useState('')
  const [newCarYear, setNewCarYear] = useState('')

  /* modal and modal methods */
  const { modal, showModal, hideModal } = useModal()

  const [form] = Form.useForm()

  const addCar = () =>
    dispatch({
      type: ADD_CAR,
      payload: {
        make: newCarMake,
        model: newCarModel,
        year: newCarYear
      }
    })

  return (
    <div className='vroom'>
      <header>
        <div className='logo'>
          <img
            src={logo}
            alt='logo'
          />
        </div>
        <h1>vroom</h1>
        <div className='button-holder'>
          <Button
            type='primary'
            shape='circle'
            onClick={showModal}>
            <FontAwesomeIcon icon={faPlusSquare} />
          </Button>
        </div>
      </header>

      <section className='car-list'>
        {state.cars.map((car) => (
          <div
            key={car.id}
            id={car.id}
            className='card'>
            <h4>
              <div className='minicar'>{car.isRunning ? '🏎️' : '💤'}</div>
              {car.make}&nbsp;{car.model}&nbsp;{car.year}
            </h4>
            <div className='id'>ID:&nbsp;{car.id}</div>
            <span style={{ fontSize: '1rem' }}>
              <Button
                block
                style={{ borderRadius: 0 }}
                type='primary'
                danger={car.isRunning}
                id='turnOn'
                onClick={!car.isRunning ? () => dispatch({ type: START_CAR, payload: car.id }) : () => dispatch({ type: STOP_CAR, payload: car.id })}>
                {!car.isRunning ? 'Start the car' : 'Stop the car'}
              </Button>
            </span>
          </div>
        ))}
      </section>
      <Space
        size='small'
        align='center'>
        <Modal
          maskStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          title={<h1>Add a car</h1>}
          style={{ textAlign: 'center' }}
          centered
          open={modal}
          okType={'danger'}
          onCancel={hideModal}
          bodyStyle={{ fontFamily: 'Montserrat, sans-serif' }}
          footer={null}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}
            onFinish={(e) => {
              hideModal()
              addCar()
              setTimeout(() => {
                form.resetFields()
              }, 500)
            }}>
            <Form.Item
              label='Make'
              rules={[
                {
                  required: true,
                  message: 'Please input your car make'
                }
              ]}>
              <Input
                defaultValue={newCarMake}
                onChange={(event) => setNewCarMake(event.target.value)}
                placeholder='New car make...'
                type='text'
              />
            </Form.Item>
            <Form.Item
              label='Model'
              rules={[
                {
                  required: true,
                  message: 'Please input your car model'
                }
              ]}>
              <Input
                defaultValue={newCarModel}
                onChange={(event) => setNewCarModel(event.target.value)}
                placeholder='New car model...'
                type='text'
              />
            </Form.Item>
            <Form.Item
              label='Year'
              rules={[
                {
                  required: true,
                  message: 'Please input your car year'
                }
              ]}>
              <Input
                defaultValue={newCarYear}
                onChange={(event) => setNewCarYear(event.target.value)}
                placeholder='New car year...'
                type='text'
              />
            </Form.Item>
            <Button
              block
              size='large'
              type='primary'
              htmlType='submit'>
              Add Car
            </Button>
          </Form>
        </Modal>
      </Space>
    </div>
  )
}
