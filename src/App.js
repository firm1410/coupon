import React, { useState } from 'react'
import './App.css'
function App() {
  const [customer, setCustomer] = useState(0)
  const [price, setPrice] = useState(0)
  const [coupon, setCoupon] = useState('')
  const [final, setFinal] = useState(0)
  let rules = [
    {
      code: 'DIS10',
      rule() {
        if (total() >= 2000) {
          return discount(10)
        }
      },
    },
    {
      code: 'STARCARD',
      rule() {
        if (parseInt(customer) === 2) {
          return discount(30)
        }
        if (customer >= 4) {
          return (customer - Math.floor(customer / 4)) * price
        }
      },
    },
    {
      code: '',
      rule() {
        if (total() >= 2500) {
          return discount(25)
        }
      },
    },
  ]
  let total = () => {
    return customer * price
  }
  let discount = (percent) => {
    return total() - total() * (percent / 100)
  }
  return (
    <div className='App'>
      <div className='input'>
        <label htmlFor='customer'>Customer Number</label>
        <input
          type='number'
          name='customer'
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>
      <div className='input'>
        <label htmlFor='price'>Price per Person</label>
        <input
          type='number'
          name='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className='input'>
        <label htmlFor='coupon'>Coupon</label>
        <input
          type='text'
          name='coupon'
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          let calcValue = rules.reduce((prev, res) => {
            if (res.rule() < prev) {
              return res.rule()
            }
            return prev
          }, total())
          setFinal(calcValue)
          return
        }}>
        Apply Coupon
      </button>
      <div>Total Price - {final}</div>
    </div>
  )
}

export default App
