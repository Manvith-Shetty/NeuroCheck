import React from 'react'
import { AllProducts } from '../components'
import { client } from '../lib/client'

const toys = ({AllToysProducts}) => {
    return (
        <div className='Allproducts-container'>
            {AllToysProducts ?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[category == "toysgames"]';
    const AllToysProducts = await client.fetch(query);

    return {
      props: { AllToysProducts }
    }
}

export default toys
