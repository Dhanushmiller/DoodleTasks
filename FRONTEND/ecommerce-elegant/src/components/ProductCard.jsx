import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, openCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { showToast } from '../store/uiSlice';
import { Plus, Heart } from 'lucide-react';
import { formatPrice } from '../utils/currencyUtils';
import '../styles/ProductList.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const { currencies, selectedCurrency } = useSelector(state => state.ui);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);
  const currency = currencies[selectedCurrency];

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(showToast({ message: `${product.name} added to cart!` }));
    // Opening the cart drawer is also fine, but toast adds extra polish
    dispatch(openCart());
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    dispatch(showToast({ 
      message: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!',
      type: isWishlisted ? 'info' : 'success'
    }));
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button className={`wishlist-toggle ${isWishlisted ? 'active' : ''}`} onClick={handleWishlist}>
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
        <button className="quick-add" onClick={handleAddToCart}>
          <Plus size={20} />
          <span>Quick Add</span>
        </button>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">{formatPrice(product.price, currency)}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
