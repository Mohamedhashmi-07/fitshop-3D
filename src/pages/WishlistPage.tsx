import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/products/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import { Heart } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts } = useWishlist();

  return (
    <div className="bg-slate-50/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Wishlist
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Saved items ready for your next fitness unlock and checkout.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your Wishlist is Empty"
            description="Explore our curated collection of marathon shoes, gym wear, smartwatches and sports nutrition to save your favorites."
            actionText="Browse Catalog"
            actionLink="/shop"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
