import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/stores')
      .then(res => setStores(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Hyperlocal Stores</h1>
      <ul className="store-list">
        {stores.map(store => (
          <li key={store._id}>
            <Link to={`/store/${store._id}`}>
              {store.name} ({store.location})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
