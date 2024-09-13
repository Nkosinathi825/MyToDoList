import React from 'react'
import AddTask from '../component/AddTask'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <main className='contanier'>
      <section className='upper-contanier'>
        <AddTask/>
      </section>
      <section className='lower-contanier'>

      </section>
    </main>
  )
}
