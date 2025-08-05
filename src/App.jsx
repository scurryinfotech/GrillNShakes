import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryButtons from "./components/CategoryButtons";
import MenuList from "./components/menuList";
import CartModal from "./components/CartModal";
// import MenuItems from "./components/MenuItems.jsx";
import TableSelectionModal from "./components/TableSelectionModal";
import StickyCartButton from "./components/StickyCartButton.jsx";
// import { tables } from './data/menuData';
import Loader from "./components/Loader.jsx";
import { useLocation } from "react-router-dom";




  const RestaurantApp = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [menuItems, setMenuItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [showTableSelection, setShowTableSelection] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const tableFromURL = queryParams.get("table");
  // const [tables, setTables] = useState([]);

// ⬇️ In the parent component where <CartModal /> is used
const handlePlaceOrder = async () => {
  try {
    const  token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkdyaWxsX05fU2hha2VzIiwibmJmIjoxNzUxMjA5MTg4LCJleHAiOjE3NTg5ODUxODgsImlhdCI6MTc1MTIwOTE4OH0.H2XoHKLvlrM8cpb68ht18K2Mkj6PVnSSd-tM4HmMIfI";

         // Or from state/context

    if (!token) {
      alert("User not authenticated");
      return;
    }

    if (!selectedTable) {
      alert("Please select a table");
      return;
    }
const orderData = {
  userName: String(2),
  selectedTable:
    selectedTable.TableNo ||
    selectedTable.tableNo ||
    selectedTable.id ||
    selectedTable,

  orderItems: cart.map(item => ({
    item_id: item.id, // ✅ Sending numeric ID"", // fallback
    full: item.size === "full" ? item.quantity : 0,
    half: item.size === "half" ? item.quantity : 0
  }))
};
console.log("Payload I'm sending to backend:", JSON.stringify(orderData, null, 2));

    console.log("✅ Order placed successfully:", orderData  );

    const response = await axios.post(
      "https://localhost:7104/api/Order/Post",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("✅ Order placed successfully:", response.data);
    alert("Order placed successfully!");
    setCart([]);         // Optional: clear cart
    setShowCart(false);  // Optional: close cart modal

  } catch (error) {
    console.error("❌ Failed to place order:", error.response?.data || error.message);
    alert(JSON.stringify(error.response?.data.errors, null, 2));
  }
};



  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkdyaWxsX05fU2hha2VzIiwibmJmIjoxNzUxMjA5MTg4LCJleHAiOjE3NTg5ODUxODgsImlhdCI6MTc1MTIwOTE4OH0.H2XoHKLvlrM8cpb68ht18K2Mkj6PVnSSd-tM4HmMIfI";

        const [catRes, subcatRes, itemRes] = await Promise.all([
          axios.get(
            "https://localhost:7104/api/Order/GetMenuCategory?username=Grill_N_Shakes",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            "https://localhost:7104/api/Order/GetMenuSubcategory?username=Grill_N_Shakes",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            "https://localhost:7104/api/Order/GetMenuItem?username=Grill_N_Shakes",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          //        axios.get("https://localhost:7104/api/Order/GetTables?username=Grill_N_Shakes", {
          //   headers: { Authorization: `Bearer ${token}` }
          // })
        ]);

        setCategories(catRes.data);
        const initialExpanded = {};
        catRes.data.forEach((cat) => {
          initialExpanded[cat.categoryName] = true;
        });

        // setTables(tableRes.data);
        setExpandedCategories(initialExpanded);

        const grouped = {};
        subcatRes.data.forEach((sub) => {
          const catId = Number(sub.categoryId);
          if (!grouped[catId]) grouped[catId] = [];
          grouped[catId].push(sub);
        });
        setSubcategories(grouped);

        const groupedItemsBySubcategory = {};
        itemRes.data.forEach((item) => {
          const subId = Number(item.subcategoryId);
          if (!groupedItemsBySubcategory[subId]) {
            groupedItemsBySubcategory[subId] = [];
          }
          groupedItemsBySubcategory[subId].push({
            ...item,
            name: item.itemName,
            id: item.itemId,
            imageData:
              item.imageSrc && item.imageSrc.startsWith("")
                ? item.imageSrc
                : null, // since your data uses itemName
            prices: {
              Full: item.price1,
              Half: item.price2,
            },
          });
        });
        

        setMenuItems(groupedItemsBySubcategory);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        setError(error);
      }
      finally {
        setIsLoading(false); // ✅ Stop loader
      }
    };

    fetchData();
  }, []);
   
useEffect(() => {
  if (tableFromURL) {
    setSelectedTable(tableFromURL);
    setShowTableSelection(false);  // Table select modal ko band karega
    console.log("✅ Table auto-selected:", tableFromURL);
  }
}, [tableFromURL]);



  const getFilteredItems = () => {
    let allItems = [];

    if (searchTerm) {
      Object.values(subcategories).forEach((categorySubcategories) => {
        categorySubcategories.forEach((subcategory) => {
          const subId =
            subcategory.id || subcategory.subcategoryId || subcategory.subCatId;
          const items = menuItems[Number(subId)] || [];

          allItems = allItems.concat(
            items.map((item) => ({
              ...item,
              subcategoryName:
                subcategory.subcategoryName || subcategory.name || "Unknown",
              categoryId: subcategory.categoryId,
            }))
          );
        });
      });

      return allItems.filter((item) =>
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
      subcategoryName: item.subcategoryName,
    };

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === `${item.id}-${size}`
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
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
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getItemQuantityInCart = (itemId, size) => {
    const cartItem = cart.find((item) => item.id === `${itemId}-${size}`);
    return cartItem ? cartItem.quantity : 0;
  };

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => {
      const isAlreadyExpanded = !!prev[categoryName];
      return isAlreadyExpanded
        ? {} // close all if clicked again
        : { [categoryName]: true }; // open only one
    });
  };

  // const handlePlaceOrder = () => {
  //   if (!selectedTable) {
  //     setShowTableSelection(true);
  //     return;
  //   }
  //   alert(`Order placed for ${selectedTable}!\n\nItems: ${cart.length}\nTotal: ₹${getCartTotal()}`);
  //   setCart([]);
  //   setShowCart(false);
  //   setSelectedTable('');
  // };

  const groupedItems = () => {
    const filtered = getFilteredItems();
    const grouped = {};

    if (searchTerm) {
      filtered.forEach((item) => {
        const categoryName =
          categories.find((cat) => cat.categoryId === item.categoryId)
            ?.categoryName || "Unknown";
        const subName = item.subcategoryName || "Uncategorized ";

        if (!grouped[categoryName]) grouped[categoryName] = {};
        if (!grouped[categoryName][subName])
          grouped[categoryName][subName] = [];

        grouped[categoryName][subName].push(item);
      });
    } else {
      categories.forEach((category) => {
        const categorySubcategories = subcategories[category.categoryId] || [];
        categorySubcategories.forEach((subcategory) => {
          const subId =
            subcategory.subcategoryId || subcategory.id || subcategory.subCatId;
          const subName =
            subcategory.subcategoryName || subcategory.name || "Uncategorized";
          const items = menuItems[Number(subId)] || [];

          if (items.length > 0) {
            if (!grouped[category.categoryName])
              grouped[category.categoryName] = {};
            grouped[category.categoryName][subName] = items.map((item) => ({
              ...item,
              subcategoryName: subName,
              categoryId: category.categoryId,
            }));
          }
        });
      });
    }

    return grouped;
  };

  return (
    <div className=" min-h-screen bg-gray-50 relative scroll-pt-[128px] scroll-smooth">
      <Header getCartItemCount={getCartItemCount}  setShowCart={setShowCart} />
      

      { isLoading ? (
      <Loader />  // ✅ Loader appears under header
    ) :error ? (
        <div className="text-black-500 text-center mt-10">Error Occured While Loading Data</div>
      ) : (
        <>
          <div className="sticky top-14 z-20 bg-white max-w-7xl mx-auto p-3 sm:p-4 shadow-md">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          
          <div className=" sticky top-28 bg-white z-5 pt-2 pr-0.5 pb-2 pl-0.5">
            <CategoryButtons
              categories={categories}
              toggleCategory={toggleCategory}
              expandedCategories={expandedCategories}
            />
          </div>
          

          <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-8 bg-none overflow-auto">
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

          {showTableSelection && !selectedTable && (
  <TableSelectionModal
    setSelectedTable={setSelectedTable}
    setShowTableSelection={setShowTableSelection}
  />
)}

          {/* ✅ Sticky Cart Button appears only when cart has items */}
          <StickyCartButton
              itemCount={getCartItemCount()}
              onClick={() => setShowCart(true)}
            />
        </>
      )}
    </div>
  );
};
export default RestaurantApp;
