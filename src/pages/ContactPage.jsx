import React from 'react'
import { ContactSection, MapSection } from '../components'

const ContactPage = () => {
  window.scrollTo({ top: 0 })
  return (
    <div className='pt-16 md:pt-0 bg-[var(--brand-color)]'>
      <ContactSection/>
      <div className='w-full h-[200px] bg-[var(--brand-color)] flex items-center justify-center'>
        <h1 className='certon text-5xl text-[var(--brand2-color)]'>ZYRET E SHITJES</h1>
      </div>
      <MapSection/>
    </div>
  )
}

export default ContactPage