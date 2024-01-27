import React, { useState } from 'react';

const Lender = ({ data }) => {
  console.log(data);

  // const { postPersonalInfo } = PostData();
  const [lendingInfo, setLendingInfo] = useState({
    intersetRate: 0,
    availFunds: 0,
  });

  const handleChange = () => {
    const { name, value } = e.target;
    setLendingInfo({
      ...lendingInfo,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="container">
        <div className="dashboard">
          <div>
            <h2>Lender Dashboard</h2>

            <p>Welcome, {data.personalInfo.firstName}!</p>
          </div>
          <div>
            <h4>Lending Info</h4>
            {data.lenderInfo ? (
              <div></div>
            ) : (
              <div className='d-flex'>
                <div>
                  <label htmlFor="interestRate">Interest Rate:</label>
                  <input
                    type="number"
                    id="interestRate"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="availableFunds">Available Funds:</label>
                  <input
                    type="number"
                    id="availableFunds"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2>Past Payments</h2>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- Past payments data goes here --> */}
              <tr>
                <td>2024-01-27</td>
                <td>$500</td>
              </tr>
              <tr>
                <td>2024-01-20</td>
                <td>$300</td>
              </tr>
              {/* <!-- Add more rows as needed --> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Lender;
