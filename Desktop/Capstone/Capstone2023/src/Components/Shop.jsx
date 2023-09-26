import React, { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history'; // Import createBrowserHistory from the 'history' library
import '../Styles/Shop.css';

function Shop() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [sortingOption, setSortingOption] = useState(''); // State to store sorting option

    // State to manage editing mode for a product
    const [editingProductId, setEditingProductId] = useState(null);

    // State to track user authentication
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false); // Set this state based on your authentication logic

    // Create a history object
    const history = createBrowserHistory();

    useEffect(() => {
        // Fetch products when the component mounts
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
            });
    }, []);

    const handleCategoryChange = (category) => {
        // Filter products based on the selected category
        setSelectedCategory(category);
    };

    // Function to handle sorting options change
    const handleSortingChange = (option) => {
        // Set the sorting option
        setSortingOption(option);

        // Fetch sorted data based on the selected sorting option
        fetch(`https://fakestoreapi.com/products?sort=${option}`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching sorted data:', error);
            });
    };

    // Function to add an item to the cart and navigate to the "MyCart" page
    const addToCart = (item) => {
        setCart([...cart, item]);
        setCartItemCount(cartItemCount + 1);

        // Navigate to the "MyCart" page
        history.push('/mycart'); // Replace with your actual route
    };

    // Function to toggle editing mode for a product
    const toggleEditing = (id) => {
        setEditingProductId(id === editingProductId ? null : id);
    };

    // Function to update a product
    const updateProduct = (id, updatedFields) => {
        // Implement the API request to update a product based on the provided 'id' and 'updatedFields'.
        // Then, update the 'products' state and turn off editing mode using 'toggleEditing(null)'.
    };

    // Function to delete a product
    const deleteProduct = (id) => {
        // Implement the API request to delete a product based on the provided 'id'.
        // Then, remove the deleted item from the 'products' state.
    };

    // Function to add a new product
    const addNewProduct = () => {
        // Implement the API request to add a new product.
        // Then, add the new product to the 'products' state.
    };

    return (
        <div className="Shop-Page">
            <h1>Products</h1>
            <div className="Sort-Buttons">
                <div>
                    <label>Sort by Price:</label>
                    <select onChange={(e) => handleSortingChange(e.target.value)}>
                        <option value="">Select</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>
                <div>
                    <label>Sort by Category:</label>
                    <select onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value="">Select</option>
                        <option value="all">All</option>
                        <option value="men's clothing">Men's</option>
                        <option value="women's clothing">Women's</option>
                        <option value="electronics">Electronics</option>
                        <option value="jewelry">Jewelry</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>
            </div>
            <div className="Category-Buttons">
                <button onClick={() => handleCategoryChange('all')}>All</button>
                <button onClick={() => handleCategoryChange("men's clothing")}>Men's</button>
                <button onClick={() => handleCategoryChange("women's clothing")}>Women's</button>
                <button onClick={() => handleCategoryChange('electronics')}>Electronics</button>
                <button onClick={() => handleCategoryChange('jewelry')}>Jewelry</button>
                {isUserAuthenticated && <button onClick={addNewProduct}>Add New Product</button>}
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className="Product-List">
                    {products
                        .filter((product) => {
                            if (selectedCategory === 'all') {
                                return true;
                            } else {
                                return product.category === selectedCategory;
                            }
                        })
                        .map((product) => (
                            <li key={product.id} className="Product-Item">
                                <img src={product.image} alt={product.title} />
                                <p>{product.title}</p>
                                <p>${product.price}</p>
                                <p>Category: {product.category}</p>
                                {editingProductId === product.id ? (
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            defaultValue={product.title}
                                            onChange={(e) => {
                                                const updatedTitle = e.target.value;
                                                updateProduct(product.id, { title: updatedTitle });
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Price"
                                            defaultValue={product.price}
                                            onChange={(e) => {
                                                const updatedPrice = parseFloat(e.target.value); // Parse as a float
                                                updateProduct(product.id, { price: updatedPrice });
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Category"
                                            defaultValue={product.category}
                                            onChange={(e) => {
                                                const updatedCategory = e.target.value;
                                                updateProduct(product.id, { category: updatedCategory });
                                            }}
                                        />
                                        <button onClick={() => toggleEditing(product.id)}>Update</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                                        {isUserAuthenticated && (
                                            <React.Fragment>
                                                <button onClick={() => toggleEditing(product.id)}>Edit</button>
                                                <button onClick={() => deleteProduct(product.id)}>Delete</button>
                                            </React.Fragment>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}

export default Shop;
