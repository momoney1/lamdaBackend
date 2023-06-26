import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './search_bars.css';
import logo from './DrinkDishLogo.png';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [pairings, setPairings] = useState([]);
  const [data, setData] = useState([]);
  const [dishName, setDishName] = useState('');
  const [drinkName, setDrinkName] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [searchBarWidth, setSearchBarWidth] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);



  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:4000/message');
      console.log('backend call works just fine now')
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchDrinks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/Drinks');
      console.log('backend call works just fine now')
      console.log(response.data)
      setData(response.data);
      setIsDataFetched(true);
      setSelectedTable('drinks'); // Select the 'drinks' table
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/Dishes');
      console.log('backend call works just fine now')
      setData(response.data);
      setIsDataFetched(true);
      setSelectedTable('drinks'); // Select the 'drinks' table
      setSelectedTable('dishes'); // Select the 'dishes' table
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchDrinkFlavors = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/Drink_Flavors');
      console.log('backend call works just fine now')
      setData(response.data);
      setIsDataFetched(true)
      setSelectedTable('drinkFlavors'); // Select the 'drinkFlavors' table
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchDishCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/Dish_Category');
      console.log('backend call works just fine now')
      setData(response.data);
      setIsDataFetched(true)
      setSelectedTable('dishCategories'); // Select the 'dishCategories' table
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDrinksForDishSearch = async () => {
    try {
      const response = await axios.post('http://localhost:4000/v1/drinks-for-dish', {
        dish_name: 'your-dish-name', // Replace 'your-dish-name' with the actual dish name
      });
      setData(response.data);
      setIsDataFetched(true);
      setSelectedTable('dishDrinksForDish'); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setDishName(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDishesForDrinkSearch = async () => {
    try {
      const response = await axios.post('http://localhost:4000/v1/dishes-for-drink', {
        dish_name: 'your-dish-name', // Replace 'your-dish-name' with the actual dish name
      });
      setData(response.data);
      setIsDataFetched(true);
      setSelectedTable('dishesForDrink');

    } catch (error) {
      console.error(error);
    }
  };

  const handleDrinkInputChange = (event) => {
    setDrinkName(event.target.value);
  };

  const handleDrinkKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  
  const handleClearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    setSelectedResult(null);
    setPairings([]);
  };

  useEffect(() => {
    const updateSearchBarWidth = () => {
      setSearchBarWidth(window.innerWidth * 0.8);
    };

    window.addEventListener('resize', updateSearchBarWidth);

    return () => {
      window.removeEventListener('resize', updateSearchBarWidth);
    };
  }, []);

  const handleResultPress = async result => {
    setSelectedResult(result);

    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${result.code}.json`);
      const data = await response.json();
      const extractedPairings = data.product.ingredients_analysis_tags.map(pairing => pairing.replace(/^en:/, ''));
      setPairings(extractedPairings);
    } catch (error) {
      console.error('Error fetching pairings:', error);
    }
  };

  return (
    <div className="search-bar">
      <ul>
        {searchResults.map(result => (
          <li key={result.code} onClick={() => handleResultPress(result)}>
            {result.product_name}
          </li>
        ))}
      </ul>
      {selectedResult && (
        <div>
          <p>Selected Result: {selectedResult.product_name}</p>
          {pairings.length > 0 && (
            <div>
              <p>Pairings:</p>
              <ul>
                {pairings.map((pairing, index) => (
                  <li key={index}>{pairing}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <div>
      <h1>Home</h1>
      <div>
      <button onClick={handleSearchDrinks}>Fetch All Drinks</button>
      {isDataFetched && selectedTable === 'drinks'&&(
        <table>
          <thead>
            <tr>
              <th>Drink ID</th>
              <th>Drink Name</th>
              <th>Drink Category</th>
              <th>Drink Description</th>
              <th>Drink Ingredients</th>
              <th>Drink Flavors</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.drink_id}>
                <td>{item.drink_id}</td>
                <td>{item.drink_name}</td>
                <td>{item.drink_category}</td>
                <td>{item.drink_description}</td>
                <td>{item.drink_ingredients}</td>
                <td>{item.drink_flavors}</td>
                <td>{item.date_added}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      <div>
      <button onClick={handleSearchDishes}>Fetch Dishes</button>
      {isDataFetched && selectedTable === 'dishes'&&(
        <table>
          <thead>
            <tr>
              <th>Dish ID</th>
              <th>Dish Name</th>
              <th>Dish Category</th>
              <th>Dish Description</th>
              <th>Flavor</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.dish_id}>
                <td>{item.dish_id}</td>
                <td>{item.dish_name}</td>
                <td>{item.dish_category}</td>
                <td>{item.dish_description}</td>
                <td>{item.flavor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      <div>
      <button onClick={handleSearchDishCategories}>Fetch Dish Categories</button>
      {isDataFetched && selectedTable === 'dishCategories' && (
        <table>
          <thead>
            <tr>
              <th>Dish Category</th>
              <th>Dish Category Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.dish_category}>
                <td>{item.dish_category}</td>
                <td>{item.dish_category_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      <div>
      <button onClick={handleSearchDrinkFlavors}>Fetch Drink Flavors</button>
      {isDataFetched && selectedTable === 'drinkFlavors' && (
        <table>
          <thead>
            <tr>
              <th>Drink Flavor</th>
              <th>Drink Flavor Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.drink_flavors}>
                <td>{item.drink_flavor}</td>
                <td>{item.drink_flavor_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      <div>
      <input
        type="text"
        value={dishName}
        onChange={handleInputChange}
        placeholder="Enter Dish ID"
      />
      <button onClick={handleDrinksForDishSearch}>Fetch Complimentary Drinks</button>
      {isDataFetched && selectedTable === 'drinksForDish' && (
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.column1}</td>
                <td>{item.column2}</td>
                <td>{item.column3}</td>
                {/* Display more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      <div>
      <input
        type="text"
        value={drinkName}
        onChange={handleDrinkInputChange}
        placeholder="Enter Drink ID"
      />
      <button onClick={handleDishesForDrinkSearch}>Fetch Complimentary Dishes</button>
      {isDataFetched && selectedTable === 'dishesForDrink' && (
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.column1}</td>
                <td>{item.column2}</td>
                <td>{item.column3}</td>
                {/* Display more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
       <div className="logo-container">
      <img src={logo} alt="Logo" />
      {/* The rest of your React components */}
    </div>
      </div>
    </div>
    </div>
  );
};

export default SearchBar;