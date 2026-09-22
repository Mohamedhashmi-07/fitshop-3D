import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../common/EmptyState';
import { Search } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = 'No products match your criteria. Try adjusting your filters or search terms.',
}) => {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No Products Found"
        description={emptyMessage}
        actionText="Clear All Filters"
        actionLink="/shop"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
