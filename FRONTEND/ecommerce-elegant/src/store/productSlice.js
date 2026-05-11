import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 7,
      name: "Stratus Men's Runner",
      price: 129,
      category: "Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      description: "Breathable mesh performance runner for men."
    },
    {
      id: 8,
      name: "Nova Women's Sneaker",
      price: 110,
      category: "Shoes",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
      description: "Sleek and stylish everyday sneaker for women."
    },
    {
      id: 9,
      name: "Apex Elite Trail",
      price: 145,
      category: "Shoes",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
      description: "Rugged trail running shoe with superior grip."
    },
    {
      id: 10,
      name: "Zenith Flow Women",
      price: 95,
      category: "Shoes",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
      description: "Lightweight training shoe for maximum flexibility."
    },
    {
      id: 1,
      name: "Minimalist Chrono",
      price: 189,
      category: "Watches",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      description: "A timeless piece designed for the modern professional."
    },
    {
      id: 2,
      name: "Artisan Ceramic Set",
      price: 120,
      category: "Home",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
      description: "Handcrafted ceramics with a textured matte finish."
    },
    {
      id: 3,
      name: "Nebula Headphones",
      price: 299,
      category: "Tech",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
      description: "Immersive sound quality in a sleek, ergonomic design."
    },
    {
      id: 11,
      name: "Velvet Accent Chair",
      price: 245,
      category: "Furniture",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
      description: "Luxurious velvet upholstery with ergonomic gold-finished legs."
    },
    {
      id: 12,
      name: "Marble Coffee Table",
      price: 380,
      category: "Furniture",
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800",
      description: "Natural marble top with a minimalist steel frame."
    },
    {
      id: 13,
      name: "Luxe Whistling Kettle",
      price: 115,
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1506083085494-0891638d522c?q=80&w=2000&auto=format&fit=crop",
      description: "Elegant matte black whistling kettle with premium rose gold accents and a heat-resistant handle."
    },
    {
      id: 14,
      name: "Ceramic Dinnerware Set",
      price: 155,
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800",
      description: "16-piece handcrafted ceramic set for modern dining."
    },
    {
      id: 15,
      name: "VIBE Phone Pro",
      price: 999,
      category: "Smartphones",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800",
      description: "Cutting-edge performance with a stunning minimalist design."
    },
    {
      id: 16,
      name: "VIBE Phone Lite",
      price: 599,
      category: "Smartphones",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
      description: "Everything you need, nothing you don't. Pure efficiency."
    },
    {
      id: 17,
      name: "AeroBook 14",
      price: 1299,
      category: "Laptops",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800",
      description: "Ultralight aluminum chassis with incredible battery life."
    },
    {
      id: 18,
      name: "ZenBook Pro",
      price: 1599,
      category: "Laptops",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
      description: "Power meets elegance. The ultimate tool for creators."
    }
  ],
  selectedCategory: 'All',
  searchQuery: '',
  status: 'idle',
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    }
  }
});

export const { setCategory, setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
