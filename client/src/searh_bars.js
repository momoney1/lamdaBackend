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
  //const [isDishFetched, setIsDishFetched] = useState(false);
  const [drinkId, setDrinkId] = useState('');
  //const [isDrinkFetched, setIsDrinkFetched] = useState(false);
  const [dishName, setDishName] = useState('');  
  const [drinkName, setDrinkName] = useState(''); 
  const [drink, setDrink] = useState('');
  const [dish, setDish] = useState('');
  const [drinkIngredientName, setDrinkIngredientName] = useState('');
  const [flavorPairings, setFlavorPairings] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [searchBarWidth, setSearchBarWidth] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [dishFlavorName, setDishFlavorName] = useState('');
  const [resultData, setResultData] = useState(null);
  const [userRating, setUserRating] = useState('');
  const [userId, setUserId] = useState('');
  const [ingredientPairing, setIngredientPairing] = useState('');
  const [rating, setRating] = useState('');

  const [dishToDrinkName, setDishToDrinkName] = useState('');
  const [result, setResult] = useState([]);



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

      if (/[^A-Za-z\s]/.test(drinkName)) {
        const errorMessage = 'Drink name can only contain alphabetic letters and spaces.';
        window.alert(errorMessage);
        return;
    }
      const response = await axios.post('http://localhost:4000/v1/Drink-Name', { drinkName }); 
      console.log(response.data[0].drink_name + ": "+response.data[0].drink_description );
      const drink = response.data[0].drink_name;
      const drinkDescription = response.data[0].drink_description;
      console.log(drink.toString() + " is the searched drink");
      setDrink(drink.toString() + ": "+ drinkDescription);
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

  const handleSearchByDishName = async () => {
    try {

      if (/[^A-Za-z\s]/.test(dishName)) {
        const errorMessage = 'Dish name can only contain alphabetic letters and spaces.';
        window.alert(errorMessage);
        return;
    }
      //const response = await axios.post('http://localhost:4000/v1/Drink-Name', { drinkName }); 
      const response = await axios.post('http://localhost:4000/v1/Dish-Name', { dishName }); 
      const dish = response.data[0].dish_name.toString();
      const dishDescription = response.data[0].dish_description.toString();
      const dishFlavors = response.data[0].flavor.toString();
      console.log(response.data[0].dish_name.toString() + '    name of dish returned')
     // setData();
      //setIsDataFetched(true);
      //setSelectedTable('dish-name'); // Select the 'dishes' table
      setDish(dish + ": "+ dishDescription + ":  It is comprised of the following flavors: "+ dishFlavors);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchDrinkFlavors = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/Drink_Flavors');
      console.log('backend call works just fine now')
      console.log(response.data)
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
        dish_name: dishId, // Replace 'your-dish-name' with the actual dish name
      });
      console.log('drinks for dish works');
      console.log('the returned list of drinks   ' + response.data);  //object is being returned but unable to display integers
      setDrinkId(response.data);
      setIsDataFetched(true);
      //setIsDrinkFetched(true);
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
      //setData(response.data);
      setDishId(response.data);
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

    if (!/^\d+$/.test(drinkId)) {
      const errorMessage = 'Drink ID should only contain numeric values.';
      window.alert(errorMessage);
      return;
  }

    try {
      const response = await axios.post('http://localhost:4000/v1/dishes-for-drink', {
        drink_name: drinkId, // Replace 'your-dish-name' with the actual dish name
      });
      setData(response.data);
      console.log("response list of dishes   "+ response.data);  //object is being returned but unable to display integers
      setIsDataFetched(true);
      //setIsDishFetched(true);
      setSelectedTable('dishesForDrink');

    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchDishFlavor = async () => {
    
    if (/[^A-Za-z\s]/.test(dishFlavorName)) {
      const errorMessage = 'Dish flavor can only contain alphabetic letters and spaces.';
      window.alert(errorMessage);
      return;
  }

    try {
      const response = await axios.post('http://localhost:4000/v1/Dish-Flavor-Name', {
        dishFlavorName: dishFlavorName,
      });
      setResultData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDishToDrinkSearch = async () => {

    if (/[^A-Za-z\s]/.test(dishToDrinkName)) {
      const errorMessage = 'Dish name can only contain alphabetic letters and spaces.';
      window.alert(errorMessage);
      return;
  }

    try {
      const response = await axios.post('http://localhost:4000/v1/Dish-To-Drink-Pairing', { dishToDrinkName });
      console.log(response.data);
      setResult(response.data);
      setIsDataFetched(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 

  const handleUserRatingSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/v1/rating', {
        user_rating: userRating,
        user_id: userId,
        ingredient_pairing: ingredientPairing,
        rating: rating,
      });

      console.log(response.data); // Display the response from the server
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleDrinkInputChange = (event) => {
    setDrinkId(event.target.value);  //setDrinkId
  };
  
  const handleDrinkNameInputChange = (event) => {
    setDrinkName(event.target.value); 
    //console.log(drinkName + " is the name of target value");
  };

  const handleDishNameInputChange = (event) =>{
    setDishName(event.target.value);
  }

  const handleDrinkIngredientInputChange = (event) =>{
    setDrinkIngredientName(event.target.value);
  }


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

  const handleFetchByDrinkIngredient = async () => {
    try {
      if (/[^A-Za-z\s]/.test(drinkIngredientName)) {
        const errorMessage = 'Drink ingredient can only contain alphabetic letters and spaces.';
        window.alert(errorMessage);
        return;
    }
      console.log(drinkIngredientName + "  is the drink's ingredient name");
      const response = await axios.post('http://localhost:4000/v1/match-drink-ingredient', { drinkIngredientName });
      //'http://localhost:4000/v1/Dish-Name'
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
      <input
        type="text"
        value={dishName} 
        onChange={handleDishNameInputChange}
        placeholder="Enter Dish Name"
      />
      <button onClick={handleSearchByDishName}>Search</button>
      <p>Dish: {dish}</p>
    </div>
    <div className="input-section">
        <input
          type="text"
          value={drinkIngredientName}
          onChange={handleDrinkIngredientInputChange}
          placeholder="Enter Drink Ingredient Name"
        />
        <button onClick={handleFetchByDrinkIngredient}>Search by Drink Ingredient</button>
        <ul>
    {Array.isArray(flavorPairings) ? ( 
      flavorPairings.map((pairing) => (
        <li key={pairing.flavor_pairing_id}>
          Drink Ingredient Name: {pairing.drink_ingredient_name}, Dish Ingredient Name: {pairing.dish_ingredient_name}
        </li>
      ))
    ) : (
      <li>No flavor pairings found</li> //caused due to an array not being returned, but rather json object perhaps
    )}
  </ul>
    </div>
    <div>
      <input
        type="text"
        value={dishFlavorName}
        onChange={(e) => setDishFlavorName(e.target.value)}
        placeholder="Enter Dish Flavor Name"
      />
      <button onClick={handleFetchDishFlavor}>Search</button>
      {resultData && (
        <ul>
          {resultData.map((item) => (
            <li key={item.dish_category_name}>
              Dish Category Name: {item.dish_category_name}, Drink Category Name: {item.drink_category_name}
            </li>
          ))}
        </ul>
      )}
    </div>
    <div>
    <form onSubmit={handleUserRatingSubmit}>
      <div>
        <label>User Rating:</label>
        <input type="text" value={userRating} onChange={(e) => setUserRating(e.target.value)} />
      </div>
      <div>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div>
        <label>Ingredient Pairing:</label>
        <input type="text" value={ingredientPairing} onChange={(e) => setIngredientPairing(e.target.value)} />
      </div>
      <div>
        <label>Rating:</label>
        <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
      </div>
      <button type="submit">Submit Rating</button>
    </form>
    </div>
    <div>
      <input
        type="text"
        value={dishToDrinkName}
        onChange={(e) => setDishToDrinkName(e.target.value)}
        placeholder="Enter Dish Name"
      />
      <button onClick={handleDishToDrinkSearch}>Search</button>
      <ul>
        {result.map((drink, index) => (
          <li key={index}>{drink.drink_name}</li>
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