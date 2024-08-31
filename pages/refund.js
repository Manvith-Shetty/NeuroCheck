import { useState } from 'react';

const Refund = () => {
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://mailcontract-7jk014qt.b4a.run/fundCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerAddress,
          customerEmail,
          refundAmount,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      let result;
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = await response.text(); // Handle non-JSON response
      }

      setResponse(result);
    } catch (error) {
      console.error('Error submitting data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Refund Request</h1>

      <div className="mb-4">
        <label htmlFor="customerAddress" className="block text-sm font-medium mb-1">
          Customer Address
        </label>
        <input
          id="customerAddress"
          type="text"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="customerEmail" className="block text-sm font-medium mb-1">
          Customer Email
        </label>
        <input
          id="customerEmail"
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="refundAmount" className="block text-sm font-medium mb-1">
          Refund Amount
        </label>
        <input
          id="refundAmount"
          type="text"
          value={refundAmount}
          onChange={(e) => setRefundAmount(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit Refund
      </button>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {response && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Response</h2>
          <pre className="bg-gray-100 p-2 rounded">{typeof response === 'string' ? response : JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Refund;
