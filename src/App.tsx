import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FitnessProvider } from './context/FitnessContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { SellerLayout } from './layouts/SellerLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Common
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Storefront Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BrandsPage } from './pages/BrandsPage';
import { FitnessRewardsPage } from './pages/FitnessRewardsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrdersPage } from './pages/OrdersPage';
import { WishlistPage } from './pages/WishlistPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

// Seller Portal Pages
import { SellerLoginPage } from './pages/seller/SellerLoginPage';
import { SellerDashboardPage } from './pages/seller/SellerDashboardPage';
import { SellerProductsPage } from './pages/seller/SellerProductsPage';
import { SellerOffersPage } from './pages/seller/SellerOffersPage';
import { SellerInventoryPage } from './pages/seller/SellerInventoryPage';
import { SellerOrdersPage } from './pages/seller/SellerOrdersPage';
import { SellerAnalyticsPage } from './pages/seller/SellerAnalyticsPage';

// Admin Portal Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <FitnessProvider>
            <CartProvider>
              <WishlistProvider>
                <Routes>
                  {/* Public & Customer Storefront Routes */}
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/brands" element={<BrandsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    {/* Customer Protected Routes */}
                    <Route
                      path="/fitness-rewards"
                      element={
                        <ProtectedRoute>
                          <FitnessRewardsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/cart" element={<CartPage />} />
                    <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute>
                          <CheckoutPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/order-confirmation/:id"
                      element={
                        <ProtectedRoute>
                          <OrderConfirmationPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/orders"
                      element={
                        <ProtectedRoute>
                          <OrdersPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/wishlist"
                      element={
                        <ProtectedRoute>
                          <WishlistPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  {/* Seller Demo Portal Routes */}
                  <Route path="/seller/login" element={<SellerLoginPage />} />
                  <Route path="/seller" element={<SellerLayout />}>
                    <Route index element={<Navigate to="/seller/dashboard" replace />} />
                    <Route path="dashboard" element={<SellerDashboardPage />} />
                    <Route path="products" element={<SellerProductsPage />} />
                    <Route path="offers" element={<SellerOffersPage />} />
                    <Route path="inventory" element={<SellerInventoryPage />} />
                    <Route path="orders" element={<SellerOrdersPage />} />
                    <Route path="analytics" element={<SellerAnalyticsPage />} />
                  </Route>

                  {/* Admin Demo Portal Routes */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                  </Route>

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </WishlistProvider>
            </CartProvider>
          </FitnessProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
