import React from 'react'
import { AllProducts } from '../components'
import { client } from '../lib/client'

const tvelectronics = ({AllTvElectronicsProducts}) => {
    return (
        <div className='Allproducts-container'>
            {AllTvElectronicsProducts ?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[category == "tvelectronics"]';
    const AllTvElectronicsProducts = await client.fetch(query);

    return {
      props: { AllTvElectronicsProducts }
    }
}

export default tvelectronics
