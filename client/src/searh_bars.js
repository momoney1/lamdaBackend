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
  const [dishId, setDishId] = useState('');
  const [drinkId, setDrinkId] = useState('');
  const [dishName, setDishName] = useState('');  //dishId, setDishid
  const [drinkName, setDrinkName] = useState(''); //drinkId, setDrinkId
  const [drink, setDrink] = useState('');
  const [drinkIngredientName, setDrinkIngredientName] = useState('');
  const [flavorPairings, setFlavorPairings] = useState([]);
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

 
  const handleSearchDrinkByName = async () => {
    try {
      const response = await axios.post('http://localhost:4000/v1/Drink-Name', { drinkName }); 
      const drink = response.data[0].drink_name;
      console.log(drink.toString() + " is the searched drink");
      setDrink(drink.toString());
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
      setSelectedTable('dishes'); // Select the 'dishes' table
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchByDishName = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:4000/v1/Dish-Name?search=${searchTerm}`);
      console.log('backend call works just fine now')
      setData(response.data);
      setIsDataFetched(true);
      setSelectedTable('dish-name'); // Select the 'dishes' table
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
      console.log('drinks for dish works');
      setData(response.data);
      setIsDataFetched(true);
      setSelectedTable('dishDrinksForDish'); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleByDrinkIngredient = async () => {
    try {
      const response = await axios.post('http://localhost:4000/v1/drinks-for-dish', {
        drink_ingredient: 'your-drink-ingredient', // Replace 'your-dish-name' with the actual dish name
      });
      console.log('drinks for dish works');
      setData(response.data);
      setIsDataFetched(true);
      setSelectedTable('dishDrinksForDish'); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setDishName(event.target.value);  //setDishId
  };
  const handleDishInputChange = (event) => {
    setDishId(event.target.value);  //setDishId
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDishesForDrinkSearch = async () => {
    try {
      const response = await axios.post('http://localhost:4000/v1/dishes-for-drink', {
        drink_name: 'your-dish-name', // Replace 'your-dish-name' with the actual dish name
      });
      setData(response.data);
      setIsDataFetched(true);
      setSelectedTable('dishesForDrink');

    } catch (error) {
      console.error(error);
    }
  };
 

  const handleDrinkInputChange = (event) => {
    setDrinkId(event.target.value);  //setDrinkId
  };
  
  const handleDrinkNameInputChange = (event) => {
    setDrinkName(event.target.value); 
    //console.log(drinkName + " is the name of target value");
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

  const handleFetchByDrinkIngredient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/v1/match-drink-ingredient', { drink_ingredient_name: drinkIngredientName });
      const data = response.data;
      setFlavorPairings(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching flavor pairings:', error);
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
        value={dishId} //dishId
        onChange={handleDishInputChange}
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
        value={drinkId} //drinkID
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
      <div className="input-section">
      <input
        type="text"
        value={drinkName} 
        onChange={handleDrinkNameInputChange}
        placeholder="Enter Drink Name"
      />
      <button onClick={handleSearchDrinkByName}>Search</button>
      <p>Drink: {drink}</p>
    </div>
    <div className="input-section">
      <form onSubmit={handleFetchByDrinkIngredient}>
        <input
          type="text"
          value={drinkIngredientName}
          onChange={(e) => setDrinkIngredientName(e.target.value)}
          placeholder="Enter Drink Ingredient Name"
        />
        <button type="submit">Search by Drink Ingredient</button>
      </form>
      <ul>
        {flavorPairings.map((pairing) => (
          <li key={pairing.flavor_pairing_id}>
            Drink Ingredient Name: {pairing.drink_ingredient_name}, Dish Ingredient Name: {pairing.dish_ingredient_name}
          </li>
        ))}
      </ul>
    </div>
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