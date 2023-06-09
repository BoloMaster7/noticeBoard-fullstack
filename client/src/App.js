import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Footer from './components/views/Footer/Footer';
import Header from './components/views/Header/Header';
import AdPage from './components/pages/AdPage/AdPage';
import EditAds from './components/features/EditAds/EditAds';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import AdAds from './components/features/AdAds/AdAds';
import Search from './components/pages/Search/Search'

const App = () => {
  return (
    <main>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ads/:id" element={<AdPage />} />
          <Route path="/adAds" element={<AdAds />} />
          <Route path="/ads/edit/:id" element={<EditAds />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/search/:searchId" element={<Search />} />      
        </Routes>
      </Container>
      <Footer />
    </main>
  );
};

export default App;