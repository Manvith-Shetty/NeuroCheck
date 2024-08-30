import React from 'react'
import { AllProducts } from '../components'
import { client } from '../lib/client'

const medicine = ({AllMedicineProducts}) => {
    return (
        <div className='Allproducts-container'>
            {AllMedicineProducts?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[category == "medicine"]';
    const AllMedicineProducts = await client.fetch(query);

    return {
      props: { AllMedicineProducts }
    }
}

export default medicine
