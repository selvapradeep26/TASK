import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';

const App = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);  // Manage cart state
    const [cartVisible, setCartVisible] = useState(false); // To toggle cart visibility

    // Fetching categories and products from the fake API
    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = [
                { 
                    name: 'Electronics', 
                    products: [
                        { id: 1, name: 'Laptop', price: 74999, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJtifTdFJBviOwFMeah_Ngbu78sdqrg7npkw&s' },
                        { id: 2, name: 'Phone', price: 129999, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14qUZqT0M49gz5cv1skXQuWjXUKC0RLAXTQ&s' },
                        { id: 3, name: 'Tab', price: 71999, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpfZvFUTpf-zn_87UEJixU_kTEMLN-jdaV8w&s' },
                        { id: 4, name: 'Monitor', price: 28999, image: 'https://rukminim2.flixcart.com/image/720/864/xif0q/monitor/i/r/d/-original-imagpu2t9erq3eyt.jpeg?q=60&crop=false' }
                    ] 
                },
                { 
                    name: 'Furniture', 
                    products: [
                        { id: 5, name: 'Sofa', price: 29999, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4JN738ZZb_fIGjUo-kFQ76N-iO-kcX4co6w&s' },
                        { id: 6, name: 'Godrej Dining Table Set', price: 14999, image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/dining-table/i/b/g/290-4-seater-340-foam-dining-table-utkarsh-450-honey-finish-original-imah27tfhvd6tec5.jpeg?q=20&crop=false' },
                        { id: 7, name: 'Ikea Malm Bed Frame', price: 12999, image: 'https://www.nilkamalsleep.com/cdn/shop/files/1_61f9365a-c5b3-4b95-a64a-69b40203187c_650x.jpg?v=1724666320' },
                        { id: 8, name: 'Philips Table Lamp', price: 1999, image: 'https://ik.imagekit.io/achtunglabs/nLighten/wp-content/uploads/O1CN01gBwTtE2Csn7LVyHZ2_21212208355238530-0-cib.jpg' }
                    ] 
                },
                { 
                    name: 'Clothing', 
                    products: [
                        { id: 9, name: 'Puma Men\'s T-shirt', price: 799, image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/524989/01/fnd/IND/fmt/png/RUN-CLOUDSPUN-Men's-Short-Sleeve-Running-T-shirt" },
                        { id: 10, name: 'Levi\'s 511 Slim Fit Jeans', price: 2499, image: 'https://example.com/images/levis-jeans.jpg' },
                        { id: 11, name: 'BOSS Hugo Boss Jacket', price: 18999, image: 'https://example.com/images/boss-jacket.jpg' },
                        { id: 12, name: 'Nike Air Force 1 Sneakers', price: 6999, image: 'https://example.com/images/nike-sneakers.jpg' }
                    ] 
                }
            ];
            setCategories(categoriesData);
        };

        fetchCategories();
    }, []);

    // Filter products using useMemo
    const filteredCategories = useMemo(() => {
        return categories.map(category => ({
            ...category,
            products: category.products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }));
    }, [searchTerm, categories]);

    const productCount = filteredCategories.reduce((count, category) => {
        return count + category.products.length;
    }, 0);

    const clearSearch = useCallback(() => {
        setSearchTerm('');
    }, []);

    // Add to Cart Function
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Remove from Cart Function
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
    };

    // Toggle Cart Visibility
    const toggleCart = () => {
        setCartVisible(prev => !prev);
    };

    return (
        <div className="app-container">
            <h1>Product List</h1>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="search-input"
                />
                <button onClick={clearSearch} className="clear-button">Clear Search</button>
            </div>
            <h2>Count of Products: {productCount}</h2>

            {/* Cart Button */}
            <button className="cart-button" onClick={toggleCart}>
                Cart ({cart.length})
            </button>

            {/* Display Categories and Products */}
            {filteredCategories.map((category) => (
                <div key={category.name} className="category-container">
                    <h3>{category.name}</h3>
                    <div className="product-tiles">
                        {category.products.map((product) => (
                            <div key={product.id} className="product-tile">
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-info">
                                    <h4 className="product-name">{product.name}</h4>
                                    <p className="product-price">₹{product.price.toLocaleString()}</p>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="add-to-cart-button"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Cart Section */}
            {cartVisible && (
                <div className="cart-container">
                    <h3>Your Cart</h3>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cart.map((product) => (
                                <li key={product.id} className="cart-item">
                                    <img src={product.image} alt={product.name} className="cart-item-image" />
                                    <div>
                                        <h4>{product.name}</h4>
                                        <p>₹{product.price.toLocaleString()}</p>
                                        <button
                                            onClick={() => removeFromCart(product.id)}
                                            className="remove-from-cart-button"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
