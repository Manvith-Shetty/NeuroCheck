import React from 'react'
import { AllProducts } from '../components'
import { client } from '../lib/client'

const sportsoutdoors = ({AllsportsoutdoorsProducts}) => {
    return (
        <div className='Allproducts-container'>
            {AllsportsoutdoorsProducts?.map(prod => (
                <AllProducts key={prod._id} allproducts={prod} />
            ))}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[category == "sportsandoutdoors"]';
    const AllsportsoutdoorsProducts = await client.fetch(query);

    return {
      props: { AllsportsoutdoorsProducts }
    }
}

export default sportsoutdoors
