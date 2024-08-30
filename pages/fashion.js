import React from 'react'
import { AllProducts } from '../components'
import { client } from '../lib/client'

const fashion = ({AllFashionProducts}) => {
    return (
        <div className='Allproducts-container'>
            {AllFashionProducts ?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[category == "fashion"]';
    const AllFashionProducts = await client.fetch(query);

    return {
      props: { AllFashionProducts }
    }
}

export default fashion
