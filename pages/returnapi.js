import { useState } from 'react';

const returnapi = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = ['tv', 'medicine', 'fashion', 'beauty', 'toy', 'sports'];
  const [customerInfo, setCustomerInfo] = useState({ id: '', score: '' });

  const fetchData = async () => {
    setLoading(true);
    setData({});
    try {
      // Create an array of fetch promises for each category
      const fetchPromises = categories.map(category =>
        fetch(`http://13.127.179.23:5000/${category}?customer_id=sudeep@gmail.com&customer_score=90`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
      );

      // Wait for all fetch requests to complete
      const results = await Promise.all(fetchPromises);
  const firstResult = results[0];
      if (firstResult.customer_id && firstResult.customer_score) {
        setCustomerInfo({ id: firstResult.customer_id, score: firstResult.customer_score });
        console.log('Customer Info:', firstResult.customer_id, firstResult.customer_score);
      }
      // Combine results into a single object
      const combinedData = results.reduce((acc, result, index) => {
        acc[categories[index]] = result;
        return acc;
      }, {});

      setData(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
         <div className="mb-4">
        <h1 className="text-xl font-bold">Customer Details</h1>
        <p><strong>Customer ID:</strong>sudeep@gmail.com </p>
        <p><strong>Customer Score:</strong> 90 / 100</p>
      </div>
      <button
        onClick={fetchData}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Fetch Data
      </button>

      {loading && <p>Loading...</p>}

      {Object.keys(data).length > 0 && (
        <div className="mt-4">
          {categories.map(category => (
            data[category] && (
              <div key={category} className="mb-4">
                <h2 className="text-lg font-bold">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                <ul>
                  {Object.entries(data[category]).map(([key, value]) => (
                    <li key={key} className="mb-2">
                      <strong className="block">{key.replace(/_/g, ' ')}:</strong>
                      <p>{value}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default returnapi;
