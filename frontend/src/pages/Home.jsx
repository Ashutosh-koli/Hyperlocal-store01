import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fresh from '../assets/Fresh mart.jpg';
import organic from '../assets/Organic hub.jpg';
import local from '../assets/Local green.jpeg';
import './Home.css';

const Home = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const storeImages = {
    'Fresh Mart': fresh,
    'Organic Hub': organic,
    'Local Greens': local,
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/stores')
      .then(res => {
        setStores(res.data);
        setFilteredStores(res.data);
        toast.success('Stores loaded successfully!');
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load stores');
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    const results = stores.filter(store =>
      store.name.toLowerCase().includes(keyword) ||
      store.location.toLowerCase().includes(keyword)
    );
    setFilteredStores(results);
  };

  return (
    <div className="home-container">
      <ToastContainer />

      <header className="home-header">
        <h1>🛍️ Hyperlocal Bazaar</h1>
        <p>Discover stores around you</p>
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name or location..."
          value={search}
          onChange={handleSearch}
        />
      </header>

      {loading ? (
        <p className="loading">Loading stores...</p>
      ) : (
        <div className="store-grid">
          {filteredStores.length > 0 ? (
            filteredStores.map(store => (
              <div key={store._id} className="store-card">
                <Link to={`/store/${store._id}`} className="store-link">
                  <div className="store-image">
                    <img
                      src={storeImages[store.name] || ''}
                      alt={store.name}
                    />
                  </div>
                  <div className="store-info">
                    <h3>{store.name}</h3>
                    <p>{store.location}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No stores found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
