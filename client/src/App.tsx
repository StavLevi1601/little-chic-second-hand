import Login from '../src/components/login/login';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/main/layout';
import { ShopCollection } from './components/collection/mainContent/shop-collection';
import { MyCollection } from './components/collection/mainContent/my-collection';
import { ItemDetails } from './components/items/item-details';
import { ProtectedRoute } from './components/protected/protected-route';
import NotFound from './components/not-found';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="collection" element={<ShopCollection />} />
          <Route path="my-collection" element={<MyCollection />} />
          <Route path="items/:itemId" element={<ItemDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
