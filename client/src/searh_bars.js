import React, { useState, useEffect } from 'react';
import axios from 'axios'


const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [pairings, setPairings] = useState([]);
  const [data, setData] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [searchBarWidth, setSearchBarWidth] = useState(null);


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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKeyPress = event => {
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
      <input
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        placeholder="Search by name or ingredients"
        onKeyPress={handleKeyPress}
      />
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
      <button onClick={handleSearch}>Clear Search</button>
      <div>
      <h1>MySQL Data:</h1>
      <button onClick={handleSearchDrinks}>Fetch All Drinks</button>
      {isDataFetched && (
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
      <button onClick={handleSearchDishes}>Fetch Dishes</button>
      {isDataFetched && (
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
      <button onClick={handleSearchDishCategories}>Fetch Dish Categories</button>
      {isDataFetched && (
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
      <button onClick={handleSearchDrinkFlavors}>Fetch Drink Flavors</button>
      {isDataFetched && (
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
    </div>
  );
};

export default SearchBar;