import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryButtons from './components/CategoryButtons';
import MenuList from './components/MenuList';
import CartModal from './components/CartModal';
import MenuItem from "./components/MenuItems.jsx";
import TableSelectionModal from './components/TableSelectionModal';
import StickyCartButton from './components/StickyCartButton.jsx';
import { tables } from './data/menuData';



const RestaurantApp = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [menuItems, setMenuItems] = useState({});


  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [showTableSelection, setShowTableSelection] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [error, setError] = useState(null);
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkdyaWxsX05fU2hha2VzIiwibmJmIjoxNzUxMjA5MTg4LCJleHAiOjE3NTg5ODUxODgsImlhdCI6MTc1MTIwOTE4OH0.H2XoHKLvlrM8cpb68ht18K2Mkj6PVnSSd-tM4HmMIfI";

      const [catRes, subcatRes, itemRes] = await Promise.all([
        axios.get("https://localhost:7104/api/Order/GetMenuCategory?username=Grill_N_Shakes", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get("https://localhost:7104/api/Order/GetMenuSubcategory?username=Grill_N_Shakes", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get("https://localhost:7104/api/Order/GetMenuItem?username=Grill_N_Shakes", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setCategories(catRes.data);
      console.log("✅ Categories from API:", catRes.data);

      const grouped = {};
      subcatRes.data.forEach(sub => {
        const catId = Number(sub.categoryId);
        if (!grouped[catId]) grouped[catId] = [];
        grouped[catId].push(sub);
      });
      console.log("✅ Subcategories from API:", subcatRes.data);
      console.log("✅ Grouped subcategories before state set:", grouped);
      setSubcategories(grouped);

      
      const groupedItemsBySubcategory = {};
      itemRes.data.forEach(item => {
        const subId = Number(item.subcategoryId);
        if (!groupedItemsBySubcategory[subId]) {
          groupedItemsBySubcategory[subId] = [];
        }
      groupedItemsBySubcategory[subId].push({
  ...item,
  name: item.itemName,
  id: item.itemId, // since your data uses itemName
  prices: {
    Small: item.price1,
    Medium: item.price2
  }
});

      });
      
      setMenuItems(groupedItemsBySubcategory);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setError(error);
    }
  };

  fetchData();
}, []);




  

  const getFilteredItems = () => {
    let allItems = [];
    
    if (searchTerm) {
      Object.values(subcategories).forEach(categorySubcategories => {
        categorySubcategories.forEach(subcategory => {
          const subId = subcategory.id || subcategory.subcategoryId || subcategory.subCatId;
          const items = menuItems[Number(subId)] || [];
          
          allItems = allItems.concat(items.map(item => ({
            ...item,
            subcategoryName: subcategory.name,
            categoryId: subcategory.categoryId
            
          })));
        });
      });
      
      return allItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
  
  };

  const addToCart = (item, size) => {
    const cartItem = {
      id: `${item.id}-${size}`,
      name: item.name,
      size: size,
      price: item.prices[size],
      quantity: 1,
      subcategoryName: item.subcategoryName
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === `${item.id}-${size}`);
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === `${item.id}-${size}` 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, cartItem];
    });
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } else {
      setCart(prevCart => 
        prevCart.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getItemQuantityInCart = (itemId, size) => {
    const cartItem = cart.find(item => item.id === `${itemId}-${size}`);
    return cartItem ? cartItem.quantity : 0;
  };

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handlePlaceOrder = () => {
    if (!selectedTable) {
      setShowTableSelection(true);
      return;
    }
    alert(`Order placed for ${selectedTable}!\n\nItems: ${cart.length}\nTotal: ₹${getCartTotal()}`);
    setCart([]);
    setShowCart(false);
    setSelectedTable('');
  };
  
  const groupedItems = () => {
  const filtered = getFilteredItems();
  const grouped = {};

  if (searchTerm) {
    filtered.forEach(item => {
      const categoryName = categories.find(cat => cat.categoryId === item.categoryId)?.categoryName || 'Unknown';
      const subName = item.subcategoryName || 'Uncategorized';

      if (!grouped[categoryName]) grouped[categoryName] = {};
      if (!grouped[categoryName][subName]) grouped[categoryName][subName] = [];

      grouped[categoryName][subName].push(item);
    });
  } else {
    categories.forEach(category => {
      const categorySubcategories = subcategories[category.categoryId] || [];
      categorySubcategories.forEach(subcategory => {
        const subId = subcategory.subcategoryId || subcategory.id || subcategory.subCatId;
        const subName = subcategory.subcategoryName || subcategory.name || 'Uncategorized';
        const items = menuItems[Number(subId)] || [];

        if (items.length > 0) {
          if (!grouped[category.categoryName]) grouped[category.categoryName] = {};
          grouped[category.categoryName][subName] = items.map(item => ({
            ...item,
            subcategoryName: subName,
            categoryId: category.categoryId
          }));
        }
      });
    });
  }

  return grouped;
};



    return (
    <div className="min-h-screen bg-gray-50 relative">
      <Header getCartItemCount={getCartItemCount} 
        setShowCart={setShowCart}  />

    {error ? (
      <div className="text-red-500 text-center mt-10">❌ Error occurred while loading data</div>
    ) : (
      <>
        <div className="max-w-7xl mx-auto p-3 sm:p-4">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 mb-4 sm:mb-6">
        <CategoryButtons 
          categories={categories} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-8">
        <MenuList
         groupedItems={groupedItems()}
          categories={categories}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
          getItemQuantityInCart={getItemQuantityInCart}
          addToCart={addToCart}
          updateCartQuantity={updateCartQuantity}
        />
      </div>
      
      {showCart && (
        <CartModal
          cart={cart}
          getCartTotal={getCartTotal}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
          handlePlaceOrder={handlePlaceOrder}
          selectedTable={selectedTable}
          setShowCart={setShowCart}
        />
      )}

      {showTableSelection && (
        <TableSelectionModal
          tables={tables}
          setSelectedTable={setSelectedTable}
          setShowTableSelection={setShowTableSelection}
        />
      )}

      {/* ✅ Sticky Cart Button appears only when cart has items */}
      {cart.length > 0 && (
        <StickyCartButton 
          itemCount={getCartItemCount()} 
          onClick={() => setShowCart(true)} 
        />
      )}
      </>
    )}

     
    </div>
  );

};
export default RestaurantApp;