import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ItemDetailPage from './pages/ItemDetailPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/user/DashboardPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/user/OrdersPage';
import OrderDetailPage from './pages/user/OrderDetailPage';
import WishlistPage from './pages/user/WishlistPage';
import ProfilePage from './pages/user/ProfilePage';
import CollectionPage from './pages/user/CollectionPage';
import WalletPage from './pages/user/WalletPage';
import CommunityForumPage from './pages/CommunityForumPage';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import ExpertConsultationPage from './pages/ExpertConsultationPage';
import EducationHubPage from './pages/EducationHubPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCatalog from './pages/admin/AdminCatalog';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminNewsManagement from './pages/admin/AdminNewsManagement';
import AdminEventsManagement from './pages/admin/AdminEventsManagement';
import AdminSettings from './pages/admin/AdminSettings';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<ItemDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Protected User Routes */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="checkout" element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />
          <Route path="orders" element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          } />
          <Route path="orders/:id" element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          } />
          <Route path="wishlist" element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="collection" element={
            <ProtectedRoute>
              <CollectionPage />
            </ProtectedRoute>
          } />
          <Route path="wallet" element={
            <ProtectedRoute>
              <WalletPage />
            </ProtectedRoute>
          } />
          
          {/* Public Community Features */}
          <Route path="community" element={<CommunityForumPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="experts" element={<ExpertConsultationPage />} />
          <Route path="learn" element={<EducationHubPage />} />
        </Route>

        {/* Admin Login Route (outside main layout) */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="catalog" element={<AdminCatalog />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="news" element={<AdminNewsManagement />} />
          <Route path="events" element={<AdminEventsManagement />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;