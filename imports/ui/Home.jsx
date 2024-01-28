import React, { useEffect, useState } from 'react';
import fetchData from '../helpers/fetchData';
import Lender from './Lender/Lender';
import Borrower from './Borrower/Borrower';
import Admin from './Admin/Admin';
import PostData from '../helpers/postData';

const Home = () => {
  const { getUserDate, data } = fetchData();
  useEffect(() => {
    getUserDate();
  }, []);

  if (data) {
    if (data.personalInfo) {
      return data.role === 'lender' ? (
        <Lender name={data.personalInfo.firstName} id={data._id} />
      ) : data.role === 'borrower' ? (
        <Borrower data={data} />
      ) : data.role === 'admin' ? (
        <Admin />
      ) : (
        <></>
      );
    } else {
      return <UserProfile />;
    }
  }
};

export const UserProfile = () => {
  const { postPersonalInfo } = PostData();
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await postPersonalInfo({ personalInfo });
  };

  return (
    <div className="form__parent">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            maxLength={10}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
