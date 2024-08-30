import Image from 'next/image'
import React from 'react'
import { GrFacebookOption, GrLinkedinOption, GrTwitter } from 'react-icons/gr'
import logo from '../src/assets/Logo.png'

const Footer = () => {
  return (
    <footer>
      <div className='footer'>
        <div className='logo'>
          <Image src={logo} width={180} height={30} alt='logo' />
          <p>Discover exceptional products with seamless shopping and secure transactions. Enjoy our commitment to quality and customer satisfaction with every purchase</p>
          <div className='icon-container'>
            <div><GrTwitter size={20} /></div>
            <div><GrFacebookOption size={20} /></div>
            <div><GrLinkedinOption size={20} /></div>
          </div>
        </div>

        <div className='footer-links'>
          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>How it Works</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className='footer-links'>
          <h3>Support</h3>
          <ul>
            <li>Support Carrer</li>
            <li>24h Service</li>
            <li>Quick Chat</li>
          </ul>
        </div>

        <div className='footer-links'>
          <h3>Contact</h3>
          <ul>
            <li>Whatsapp</li>
            <li>Support 24h</li>
          </ul>
        </div>
      </div>

      <div className='copyright'>
        <p>Copyright © 2024 NeuroCreaters</p>
        <p>Design by. <span>NeuroCreaters</span></p>
        <p>Code by. <span>NeuroCreaters</span></p>
      </div>
    </footer>
  )
}

export default Footer