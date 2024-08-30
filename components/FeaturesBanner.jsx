import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import img from '../src/assets/feature.png'

const FeaturesBanner = () => {
  return (
    <section className='features-section'>
      <div className='title'>
        <h1>Unique and Authentic Vintage Designer Jewellery</h1>
      </div>

      <div className='content'>
        <div className='left'>
          <div className="feature-background">
            Different from others
          </div>
          <div>
            <h3>Personalized Return Solutions</h3>
            <p>Generative AI creates personalized returns, boosting trust with smart decisions.</p>
          </div>
          <div>
            <h3>Automated Refunds Simplified</h3>
            <p>Smart contracts automate refunds, ensuring fast, secure, and transparent transactions on chain.</p>
          </div>
          <div>
            <h3>Streamlined Transaction Management</h3>
            <p>Automated emails send invoices for returns, ensuring real time updates.</p>
          </div>
          <div>
            <h3>Effortless Shopping Experience</h3>
            <p>Effortless shopping with automated returns, ensuring happy and satisfied customers.</p>
          </div>
        </div>

        <div className='right'>
          <Image src={img} width={300} height={350} alt='img' />
          <div>
            <p>This product is ethically crafted in our small family-owned workshop in Peru with unmatched attention to detail and care. The natural color is the actual natural hue of the ingredients, undyed and 100% traceable.</p>
            <Link href={'/products'}>
              <button className='btn' type='button'>See All Product</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesBanner