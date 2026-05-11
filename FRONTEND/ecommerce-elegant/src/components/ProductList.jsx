import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from './ProductCard';
import { setCategory } from '../store/productSlice';
import '../styles/ProductList.css';

const categories = ['All', 'Smartphones', 'Laptops', 'Watches', 'Home', 'Tech', 'Furniture', 'Kitchen', 'Shoes'];

const ProductList = () => {
  const { items, selectedCategory, searchQuery } = useSelector(state => state.products);
  const dispatch = useDispatch();

  const filteredProducts = items.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="product-list-section" id="products">
      <div className="container">
        <div className="section-header">
          <h2>{searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Collection'}</h2>
          <p>{filteredProducts.length} items found</p>
        </div>

        {!searchQuery && (
          <div className="category-bar">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => dispatch(setCategory(cat))}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
             <h3>No products found matching your search.</h3>
             <p>Try searching for something else or browse our categories.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
