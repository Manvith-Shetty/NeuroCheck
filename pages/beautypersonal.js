import React from 'react'
import { AllProducts } from '../components'
import { client } from '../lib/client'

const beautypersonal = ({AllBeautyPersonalProducts}) => {
    return (
        <div className='Allproducts-container'>
            {AllBeautyPersonalProducts ?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[category == "beautypersonal"]';
    const AllBeautyPersonalProducts = await client.fetch(query);

    return {
      props: { AllBeautyPersonalProducts }
    }
}

export default beautypersonal
