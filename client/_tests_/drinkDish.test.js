import { render, screen, cleanup} from '@testing-library/react'
import SearchBar  from '../src/searh_bars'
import React, { useState, useEffect } from 'react';
import axios from 'axios'


/*test('should return drink or dish items', () => {
    render(<SearchBar/>);
})*/

const handleSearchDrinks = async () => {
  //const [data, setData] = useState([]);
    try {
      const response = await axios.get('http://localhost:4000/v1/Drinks');
      console.log('backend call works just fine now');
      console.log(response.data);
      //setData(response.data);
      //setIsDataFetched(true);
      //setSelectedTable('drinks'); // Select the 'drinks' table
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const mockedDrinks = [
    {
      id: 1,
      name: 'Espresso',
      category: 'Coffee',
      description: 'A strong and concentrated coffee made by forcing hot water through finely ground coffee beans.',
      ingredients: 'Coffee beans, hot water',
      flavors: 'Bold, intense',
      dateAdded: '2023-06-09T09:54:47.000Z',
    },
    {
      id: 2,
      name: 'Cappuccino',
      category: 'Coffee',
      description: 'A classic Italian coffee drink made with equal parts espresso, steamed milk, and milk foam.',
      ingredients: 'Espresso, milk, milk foam',
      flavors: 'Creamy, frothy',
      dateAdded: '2023-06-09T09:54:47.000Z',
    },
    {
        id: 3,
        name: 'Latte',
        category: 'Coffee',
        description: 'A popular coffee drink made with espresso and steamed milk, often topped with milk foam or latte art.',
        ingredients: ['Espresso', 'milk', 'milk foam'],
        flavors: ['Smooth', 'creamy'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 4,
        name: 'Mocha',
        category: 'Coffee',
        description: 'A delightful combination of espresso, chocolate syrup, and steamed milk, often topped with whipped cream and chocolate drizzle.',
        ingredients: ['Espresso', 'chocolate syrup', 'milk', 'whipped cream'],
        flavors: ['Rich', 'chocolatey'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 5,
        name: 'Matcha Latte',
        category: 'Tea',
        description: 'A creamy and vibrant green tea latte made with powdered matcha, milk, and sweetener.',
        ingredients: ['Matcha powder', 'milk', 'sweetener'],
        flavors: ['Earthly', 'creamy'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 6,
        name: 'Chai Tea',
        category: 'Tea',
        description: 'A spiced and aromatic tea made with a blend of black tea, milk, and a variety of warm spices.',
        ingredients: ['Black tea', 'milk', 'spices', 'sweetener'],
        flavors: ['Spiced', 'flavorful'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 7,
        name: 'Lemonade',
        category: 'Lemonade',
        description: 'A refreshing and tangy beverage made with freshly squeezed lemon juice, water, and sweetener.',
        ingredients: ['Lemon juice', 'water', 'sweetener'],
        flavors: ['Tangy', 'citrusy'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 8,
        name: 'Iced Tea',
        category: 'Tea',
        description: 'A chilled and thirst-quenching tea made by steeping tea leaves in cold water and serving over ice.',
        ingredients: ['Tea leaves', 'cold water', 'sweetener'],
        flavors: ['Cool', 'refreshing'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 9,
        name: 'Orange Juice',
        category: 'Juice',
        description: 'A classic and refreshing juice made from freshly squeezed oranges.',
        ingredients: ['Oranges'],
        flavors: ['Citrusy', 'vibrant'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 10,
        name: 'Apple Juice',
        category: 'Juice',
        description: 'A sweet and fruity juice made from pressed apples.',
        ingredients: ['Apples'],
        flavors: ['Crisp', 'fruity'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 11,
        name: 'Peach Smoothie',
        category: 'Smoothie',
        description: 'A creamy and peachy smoothie made with ripe peaches, yogurt, and a touch of sweetness.',
        ingredients: ['Peaches', 'yogurt', 'sweetener'],
        flavors: ['Smooth', 'fruity'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 12,
        name: 'Mango Lassi',
        category: 'Smoothie',
        description: 'A traditional Indian yogurt-based drink with the tropical flavors of mango and a hint of cardamom.',
        ingredients: ['Mango', 'yogurt', 'cardamom', 'sweetener'],
        flavors: ['Creamy', 'tropical'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 13,
        name: 'Strawberry Milkshake',
        category: 'Milkshake',
        description: 'A classic milkshake made with fresh strawberries, milk, and creamy vanilla ice cream.',
        ingredients: ['Strawberries', 'milk', 'vanilla ice cream'],
        flavors: ['Creamy', 'fruity'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 14,
        name: 'Pineapple Coconut Water',
        category: 'Beverage',
        description: 'A refreshing and hydrating drink made with natural pineapple juice and coconut water.',
        ingredients: ['Pineapple juice', 'coconut water'],
        flavors: ['Tropical', 'revitalizing'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 15,
        name: 'Ginger Ale',
        category: 'Soda',
        description: 'A bubbly and ginger-flavored soda with a hint of sweetness and refreshing fizz.',
        ingredients: ['Carbonated water', 'ginger flavoring', 'sweetener'],
        flavors: ['Spicy', 'fizzy'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 16,
        name: 'Grapefruit Soda',
        category: 'Soda',
        description: 'A tangy and citrusy soda made with zesty grapefruit juice, carbonated water, and a touch of sweetness.',
        ingredients: ['Grapefruit juice', 'carbonated water', 'sweetener'],
        flavors: ['Tart', 'bubbly'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 17,
        name: 'Pomegranate Mocktail',
        category: 'Mocktail',
        description: 'A vibrant and non-alcoholic cocktail made with pomegranate juice, sparkling water, and garnished with fresh fruit.',
        ingredients: ['Pomegranate juice', 'sparkling water', 'fresh fruit'],
        flavors: ['Refreshing', 'fruity'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 18,
        name: 'Mint Mojito',
        category: 'Cocktail',
        description: 'A refreshing and minty cocktail made with fresh mint leaves, lime juice, sugar, and rum.',
        ingredients: ['Mint leaves', 'lime juice', 'sugar', 'rum', 'soda water'],
        flavors: ['Minty', 'zesty'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 19,
        name: 'Blueberry Lemonade',
        category: 'Lemonade',
        description: 'A twist on classic lemonade with the addition of sweet blueberries, creating a refreshing and fruity drink.',
        ingredients: ['Lemon juice', 'blueberries', 'water', 'sweetener'],
        flavors: ['Tangy', 'berry-infused'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 20,
        name: 'Watermelon Slush',
        category: 'Slush',
        description: 'A cool and icy slushy drink made with juicy watermelon, ice, and a touch of sweetness.',
        ingredients: ['Watermelon', 'ice', 'sweetener'],
        flavors: ['Cooling', 'fruity'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 21,
        name: 'Raspberry Iced Tea',
        category: 'Tea',
        description: 'A delightful combination of iced tea and raspberry syrup, creating a sweet and fruity beverage.',
        ingredients: ['Tea leaves', 'cold water', 'raspberry syrup', 'sweetener'],
        flavors: ['Fruity', 'refreshing'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 22,
        name: 'Coconut Mojito',
        category: 'Cocktail',
        description: 'A tropical twist on the classic mojito, made with coconut rum, fresh mint, lime juice, sugar, and soda water.',
        ingredients: ['Coconut rum', 'mint leaves', 'lime juice', 'sugar', 'soda water'],
        flavors: ['Tropical', 'minty'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 23,
        name: 'Green Smoothie',
        category: 'Smoothie',
        description: 'A healthy and nutrient-packed smoothie made with fresh greens, fruits, and a splash of liquid.',
        ingredients: ['Greens (spinach, kale)', 'fruits', 'liquid (water, juice, milk)'],
        flavors: ['Nutrient-rich', 'refreshing'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 24,
        name: 'Hibiscus Tea',
        category: 'Tea',
        description: 'A vibrant and floral tea made from dried hibiscus flowers, often served iced with a hint of sweetness.',
        ingredients: ['Hibiscus flowers', 'water', 'sweetener'],
        flavors: ['Floral', 'refreshing'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 25,
        name: 'Mango Smoothie',
        category: 'Smoothie',
        description: 'A tropical and creamy smoothie made with ripe mangoes, yogurt, and a touch of sweetness.',
        ingredients: ['Mangoes', 'yogurt', 'sweetener'],
        flavors: ['Creamy', 'tropical'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 26,
        name: 'Pina Colada',
        category: 'Cocktail',
        description: 'A classic tropical cocktail made with rum, pineapple juice, and coconut cream.',
        ingredients: ['Rum', 'pineapple juice', 'coconut cream'],
        flavors: ['Tropical', 'creamy'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 27,
        name: 'Mojito',
        category: 'Cocktail',
        description: 'A refreshing and minty cocktail made with fresh mint leaves, lime juice, sugar, rum, and soda water.',
        ingredients: ['Mint leaves', 'lime juice', 'sugar', 'rum', 'soda water'],
        flavors: ['Minty', 'zesty'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 28,
        name: 'Sangria',
        category: 'Cocktail',
        description: 'A fruity and wine-based cocktail made with red wine, fruit juices, and chopped fresh fruits.',
        ingredients: ['Red wine', 'fruit juices', 'fresh fruits'],
        flavors: ['Fruity', 'refreshing'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 29,
        name: 'Mint Julep',
        category: 'Cocktail',
        description: 'A classic Southern cocktail made with bourbon, fresh mint, sugar, and crushed ice.',
        ingredients: ['Bourbon', 'mint leaves', 'sugar', 'crushed ice'],
        flavors: ['Minty', 'bourbon-infused'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 30,
        name: 'Irish Coffee',
        category: 'Coffee',
        description: 'A warming and indulgent coffee drink made with hot coffee, Irish whiskey, brown sugar, and topped with whipped cream.',
        ingredients: ['Coffee', 'Irish whiskey', 'brown sugar', 'whipped cream'],
        flavors: ['Rich', 'indulgent'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 31,
        name: 'Margarita',
        category: 'Cocktail',
        description: 'A classic and refreshing cocktail made with tequila, lime juice, and orange liqueur, often served with a salt rim.',
        ingredients: ['Tequila', 'lime juice', 'orange liqueur'],
        flavors: ['Tangy', 'citrusy'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 32,
        name: 'Piña Colada',
        category: 'Cocktail',
        description: 'A tropical and creamy cocktail made with rum, pineapple juice, coconut cream, and crushed ice.',
        ingredients: ['Rum', 'pineapple juice', 'coconut cream', 'crushed ice'],
        flavors: ['Tropical', 'creamy'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 33,
        name: 'Moscow Mule',
        category: 'Cocktail',
        description: 'A zesty and refreshing cocktail made with vodka, ginger beer, lime juice, and served with a slice of lime.',
        ingredients: ['Vodka', 'ginger beer', 'lime juice', 'lime slice'],
        flavors: ['Zesty', 'tangy'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 34,
        name: 'Negroni',
        category: 'Cocktail',
        description: 'A classic Italian cocktail made with equal parts gin, sweet vermouth, and Campari, garnished with an orange twist.',
        ingredients: ['Gin', 'sweet vermouth', 'Campari', 'orange twist'],
        flavors: ['Bitter', 'complex'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 35,
        name: 'Bloody Mary',
        category: 'Cocktail',
        description: 'A bold and savory cocktail made with vodka, tomato juice, Worcestershire sauce, hot sauce, and various spices.',
        ingredients: ['Vodka', 'tomato juice', 'Worcestershire sauce', 'hot sauce', 'spices'],
        flavors: ['Spicy', 'savory'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 36,
        name: 'Old Fashioned',
        category: 'Cocktail',
        description: 'A timeless and classic cocktail made with whiskey, sugar, bitters, and a twist of citrus zest.',
        ingredients: ['Whiskey', 'sugar', 'bitters', 'citrus zest'],
        flavors: ['Timeless', 'sophisticated'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 37,
        name: 'Gin and Tonic',
        category: 'Cocktail',
        description: 'A crisp and refreshing cocktail made with gin, tonic water, and garnished with a slice of lime or lemon.',
        ingredients: ['Gin', 'tonic water', 'lime or lemon slice'],
        flavors: ['Crisp', 'citrusy'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 38,
        name: 'Whiskey Sour',
        category: 'Cocktail',
        description: 'A tangy and sweet cocktail made with whiskey, lemon juice, sugar, and often garnished with a cherry.',
        ingredients: ['Whiskey', 'lemon juice', 'sugar', 'cherry'],
        flavors: ['Tangy', 'sweet'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 39,
        name: 'White Russian',
        category: 'Cocktail',
        description: 'A creamy and indulgent cocktail made with vodka, coffee liqueur, and cream, often served over ice.',
        ingredients: ['Vodka', 'coffee liqueur', 'cream'],
        flavors: ['Creamy', 'indulgent'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 40,
        name: 'Black Tea',
        category: 'Tea',
        description: 'A classic and bold tea made from oxidized tea leaves, often served with a splash of milk or lemon.',
        ingredients: ['Black tea leaves', 'water', 'milk or lemon (optional)'],
        flavors: ['Bold', 'robust'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 41,
        name: 'Cola',
        category: 'Soda',
        description: 'A popular and carbonated soft drink with a sweet and cola flavor.',
        ingredients: ['Carbonated water', 'sugar', 'flavorings'],
        flavors: ['Sweet', 'bubbly'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 42,
        name: 'Red Bull',
        category: 'Energy Drink',
        description: 'A high-energy drink that provides a boost of energy with caffeine, taurine, and various vitamins and minerals.',
        ingredients: ['Carbonated water', 'sugar', 'caffeine', 'taurine', 'vitamins', 'minerals'],
        flavors: ['Energizing', 'stimulating'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 43,
        name: 'Strawberry Banana Smoothie',
        category: 'Smoothie',
        description: 'A fruity and creamy smoothie made with ripe strawberries, bananas, yogurt, and a touch of sweetness.',
        ingredients: ['Strawberries', 'bananas', 'yogurt', 'sweetener'],
        flavors: ['Smooth', 'fruity'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 44,
        name: 'Vanilla Milkshake',
        category: 'Milkshake',
        description: 'A classic milkshake made with creamy vanilla ice cream, milk, and vanilla extract.',
        ingredients: ['Vanilla ice cream', 'milk', 'vanilla extract'],
        flavors: ['Creamy', 'vanilla-infused'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 45,
        name: 'Mojito',
        category: 'Cocktail',
        description: 'A refreshing and minty cocktail made with fresh mint leaves, lime juice, sugar, rum, and soda water.',
        ingredients: ['Mint leaves', 'lime juice', 'sugar', 'rum', 'soda water'],
        flavors: ['Minty', 'zesty'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      },
      {
        id: 46,
        name: 'Cosmopolitan',
        category: 'Cocktail',
        description: 'A sophisticated and fruity cocktail made with vodka, cranberry juice, orange liqueur, and lime juice.',
        ingredients: ['Vodka', 'cranberry juice', 'orange liqueur', 'lime juice'],
        flavors: ['Fruity', 'tangy'],
        dateAdded: '2023-06-09T09:54:47.000Z',
      }
    
  ];

describe('handleSearchDrinks', () => {
    it('should fetch data successfully from the backend', async () => {
      
      // Mock the axios.get() method to return a mocked response
      const mockGet = jest.fn().mockResolvedValue({ data: { mockedDrinks } });
      const mockSetData = jest.fn();
      const mockSetIsDataFetched = jest.fn();
      const consoleLogMock = jest.spyOn(console, 'log');

      axios.get = mockGet;
  
      // Mock the necessary functions and variables
      const setData = jest.fn();
      const setIsDataFetched = jest.fn();
      const setSelectedTable = jest.fn();
  
      // Call the function
      await handleSearchDrinks();
  
      // Assertions
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/v1/Drinks');
      //expect(console.log).toHaveBeenCalledWith('backend call works just fine now');
      expect(consoleLogMock).toHaveBeenCalledWith({ mockedDrinks});
      //expect(mockSetData).toHaveBeenCalledWith(true);
      //expect(mockSetIsDataFetched).toHaveBeenCalledWith(true);
      //expect(setSelectedTable).toHaveBeenCalledWith('drinks');
    });
  
    it('should handle errors correctly when fetching data', async () => {
      // Mock the axios.get() method to throw an error
      axios.get = jest.fn().mockRejectedValue(new Error('Mocked error'));
  
      // Mock the necessary functions and variables
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const setData = jest.fn();
      const setIsDataFetched = jest.fn();
      const setSelectedTable = jest.fn();
  
      // Call the function
      await handleSearchDrinks();
  
      // Assertions
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/v1/Drinks');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching data:', expect.any(Error));
      expect(setData).not.toHaveBeenCalled();
      expect(setIsDataFetched).not.toHaveBeenCalled();
      expect(setSelectedTable).not.toHaveBeenCalled();
  
      // Restore the original console.error function
      consoleErrorSpy.mockRestore();
    });
  });




  const mockedDishes = [
    {
      id: 1,
      name: 'Spaghetti Bolognese',
      category: 'Pasta',
      description: 'Classic Italian dish with spaghetti pasta and meat sauce',
      flavor: 'Savory, rich',
    },
    {
      id: 2,
      name: 'Chicken Parmesan',
      category: 'Chicken',
      description: 'Breaded chicken topped with marinara sauce and melted cheese',
      flavor: 'Cheesy, flavorful',
    },
    {
      id: 3,
      name: 'Caesar Salad',
      category: 'Salad',
      description: 'Traditional salad with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing',
      flavor: 'Crisp, tangy',
    },
    {
      id: 4,
      name: 'Beef Stir-Fry',
      category: 'Beef',
      description: 'Sliced beef cooked with mixed vegetables in a savory sauce',
      flavor: 'Savory, tender',
    },
    {
      id: 5,
      name: 'Fish Tacos',
      category: 'Seafood',
      description: 'Grilled fish wrapped in tortillas with cabbage slaw and tangy sauce',
      flavor: 'Fresh, zesty',
    },
    {
      id: 6,
      name: 'Chicken Alfredo',
      category: 'Chicken',
      description: 'Creamy pasta dish with grilled chicken and Parmesan cheese sauce',
      flavor: 'Creamy, indulgent',
    },
    {
      id: 7,
      name: 'Greek Salad',
      category: 'Salad',
      description: 'Refreshing salad with tomatoes, cucumbers, olives, feta cheese, and Greek dressing',
      flavor: 'Crisp, tangy',
    },
    {
      id: 8,
      name: 'Beef Burrito',
      category: 'Beef',
      description: 'Large flour tortilla filled with seasoned beef, rice, beans, cheese, and salsa',
      flavor: 'Hearty, flavorful',
    },
    {
      id: 9,
      name: 'Sushi Rolls',
      category: 'Seafood',
      description: 'Assorted sushi rolls with fresh fish, rice, and vegetables',
      flavor: 'Fresh, delicate',
    },
    {
      id: 10,
      name: 'Chicken Teriyaki',
      category: 'Chicken',
      description: 'Grilled chicken glazed with teriyaki sauce, served with steamed rice and vegetables',
      flavor: 'Sweet, savory',
    },
    {
      id: 11,
      name: 'Caprese Salad',
      category: 'Salad',
      description: 'Simple salad with fresh mozzarella, tomatoes, basil, and balsamic glaze',
      flavor: 'Fresh, tangy',
    },
    {
      id: 12,
      name: 'Beef Chili',
      category: 'Beef',
      description: 'Hearty chili made with ground beef, beans, tomatoes, and spices',
      flavor: 'Spicy, comforting',
    },
    {
      id: 13,
      name: 'Shrimp Scampi',
      category: 'Seafood',
      description: 'Garlic and butter sautéed shrimp served over pasta or rice',
      flavor: 'Garlicky, buttery',
    },
    {
      id: 14,
      name: 'Chicken Curry',
      category: 'Chicken',
      description: 'Spicy and aromatic curry dish with tender chicken and vegetables',
      flavor: 'Spicy, flavorful',
    },
    {
      id: 15,
      name: 'Spinach Salad',
      category: 'Salad',
      description: 'Salad with fresh spinach, strawberries, nuts, and vinaigrette dressing',
      flavor: 'Fresh, tangy',
    },
    {
      id: 16,
      name: 'Beef Tacos',
      category: 'Beef',
      description: 'Tacos filled with seasoned ground beef, lettuce, cheese, and salsa',
      flavor: 'Savory, satisfying',
    },
    {
      id: 17,
      name: 'Grilled Salmon',
      category: 'Seafood',
      description: 'Grilled salmon fillet seasoned with herbs and served with roasted vegetables',
      flavor: 'Flavorful, healthy',
    },
    {
      id: 18,
      name: 'Chicken Noodle Soup',
      category: 'Chicken',
      description: 'Classic soup with chicken, vegetables, and noodles in a flavorful broth',
      flavor: 'Comforting, warm',
    },
    {
      id: 19,
      name: 'Shrimp Pasta',
      category: 'Seafood',
      description: 'Pasta dish with shrimp, garlic, cherry tomatoes, and herbs in a light sauce',
      flavor: 'Fresh, flavorful',
    },
    {
      id: 20,
      name: 'Chicken Caesar Wrap',
      category: 'Chicken',
      description: 'Grilled chicken, romaine lettuce, Parmesan cheese, and Caesar dressing wrapped in a tortilla',
      flavor: 'Crisp, tangy',
    },
    {
      id: 21,
      name: 'Caprese Pizza',
      category: 'Pizza',
      description: 'Pizza topped with fresh mozzarella, tomatoes, basil, and balsamic glaze',
      flavor: 'Cheesy, tangy',
    },
    {
      id: 22,
      name: 'Fish and Chips',
      category: 'Seafood',
      description: 'Battered and deep-fried fish served with French fries and tartar sauce',
      flavor: 'Crispy, satisfying',
    },
    {
      id: 23,
      name: 'Chicken Fried Rice',
      category: 'Chicken',
      description: 'Stir-fried rice with chicken, vegetables, and soy sauce',
      flavor: 'Savory, satisfying',
    },
    {
      id: 24,
      name: 'Margherita Pizza',
      category: 'Pizza',
      description: 'Classic pizza with fresh mozzarella, tomatoes, basil, and olive oil',
      flavor: 'Cheesy, flavorful',
    },
    {
      id: 25,
      name: 'Beef Lasagna',
      category: 'Beef',
      description: 'Layers of pasta, beef, cheese, and tomato sauce baked to perfection',
      flavor: 'Cheesy, hearty',
    },
    {
      id: 26,
      name: 'Shrimp Fried Rice',
      category: 'Seafood',
      description: 'Stir-fried rice with shrimp, vegetables, and soy sauce',
      flavor: 'Flavorful, satisfying',
    },
    {
      id: 27,
      name: 'Chicken Piccata',
      category: 'Chicken',
      description: 'Chicken breast cooked in a lemon-caper sauce, served with pasta or rice',
      flavor: 'Tangy, flavorful',
    },
    {
      id: 28,
      name: 'Vegetable Curry',
      category: 'Vegetarian',
      description: 'Spicy curry made with mixed vegetables, coconut milk, and aromatic spices',
      flavor: 'Spicy, flavorful',
    },
    {
      id: 29,
      name: 'Steak Fajitas',
      category: 'Beef',
      description: 'Sliced steak cooked with peppers and onions, served with tortillas and toppings',
      flavor: 'Savory, satisfying',
    },
    {
      id: 30,
      name: 'Cobb Salad',
      category: 'Salad',
      description: 'Salad with mixed greens, grilled chicken, bacon, avocado, eggs, and blue cheese',
      flavor: 'Fresh, savory',
    },
    {
      id: 31,
      name: 'Vegetable Stir-Fry',
      category: 'Vegetarian',
      description: 'Mixed vegetables cooked in a flavorful sauce, served over rice or noodles',
      flavor: 'Fresh, flavorful',
    },
    {
      id: 32,
      name: 'Pepperoni Pizza',
      category: 'Pizza',
      description: 'Pizza topped with pepperoni, cheese, and tomato sauce',
      flavor: 'Cheesy, savory',
    },
    {
      id: 33,
      name: 'Chicken Enchiladas',
      category: 'Chicken',
      description: 'Rolled tortillas filled with chicken, cheese, and topped with enchilada sauce',
      flavor: 'Cheesy, flavorful',
    },
    {
      id: 34,
      name: 'Greek Gyro',
      category: 'Chicken',
      description: 'Grilled chicken, tomatoes, onions, and tzatziki sauce wrapped in a pita',
      flavor: 'Savory, tangy',
    },
    {
      id: 35,
      name: 'Roast Beef Sandwich',
      category: 'Beef',
      description: 'Sliced roast beef, cheese, and toppings served on a bun',
      flavor: 'Hearty, satisfying',
    },
    {
      id: 36,
      name: 'Falafel Wrap',
      category: 'Vegetarian',
      description: 'Deep-fried chickpea balls, lettuce, tomatoes, and tahini sauce wrapped in a tortilla',
      flavor: 'Flavorful, satisfying',
    },
    {
      id: 37,
      name: 'Tomato Soup',
      category: 'Soup',
      description: 'Classic soup made with ripe tomatoes, broth, and seasonings',
      flavor: 'Comforting, warm',
    },
    {
      id: 38,
      name: 'Mushroom Pizza',
      category: 'Pizza',
      description: 'Pizza topped with sautéed mushrooms, cheese, and tomato sauce',
      flavor: 'Savory, earthy',
    },
    {
      id: 39,
      name: 'BBQ Ribs',
      category: 'Pork',
      description: 'Slow-cooked ribs glazed with BBQ sauce, served with coleslaw and cornbread',
      flavor: 'Tender, smoky',
    },
    {
      id: 40,
      name: 'Chicken Quesadilla',
      category: 'Chicken',
      description: 'Flour tortilla filled with grilled chicken, cheese, and vegetables, served with salsa and sour cream',
      flavor: 'Cheesy, flavorful',
    },
    {
      id: 41,
      name: 'Vegetable Soup',
      category: 'Soup',
      description: 'Hearty soup with mixed vegetables, broth, and seasonings',
      flavor: 'Comforting, nutritious',
    },
    {
      id: 42,
      name: 'Beef and Broccoli',
      category: 'Beef',
      description: 'Stir-fried beef and broccoli in a savory sauce, served over rice or noodles',
      flavor: 'Savory, tender',
    },
    {
      id: 43,
      name: 'Chicken Satay',
      category: 'Chicken',
      description: 'Grilled chicken skewers served with peanut sauce',
      flavor: 'Flavorful, tangy',
    },
    {
      id: 44,
      name: 'Pork Tenderloin',
      category: 'Pork',
      description: 'Roasted pork tenderloin served with mashed potatoes and vegetables',
      flavor: 'Tender, flavorful',
    },
    {
      id: 45,
      name: 'Chicken Tikka Masala',
      category: 'Chicken',
      description: 'Spiced chicken cooked in a creamy tomato sauce, served with rice or naan bread',
      flavor: 'Spicy, creamy',
    },
    {
      id: 46,
      name: 'Pasta Primavera',
      category: 'Vegetarian',
      description: 'Pasta dish with mixed vegetables, garlic, and olive oil',
      flavor: 'Fresh, flavorful',
    },
    {
      id: 47,
      name: 'Beef and Mushroom Pie',
      category: 'Beef',
      description: 'Savory pie filled with beef, mushrooms, and rich gravy, topped with pastry',
      flavor: 'Hearty, flavorful',
    },
    {
      id: 48,
      name: 'Crispy Tofu Stir-Fry',
      category: 'Vegetarian',
      description: 'Crispy tofu cooked with mixed vegetables in a flavorful sauce',
      flavor: 'Crispy, flavorful',
    },
    {
      id: 49,
      name: 'Miso Soup',
      category: 'Soup',
      description: 'Traditional Japanese soup made with miso paste, tofu, seaweed, and scallions',
      flavor: 'Savory, comforting',
    },
    {
      id: 50,
      name: 'Vegetarian Pizza',
      category: 'Vegetarian',
      description: 'Pizza topped with a variety of vegetables, cheese, and tomato sauce',
      flavor: 'Flavorful, satisfying',
    },
    {
      id: 51,
      name: 'Salmon Salad',
      category: 'Seafood',
      description: 'Salad with grilled salmon, mixed greens, tomatoes, cucumbers, and dressing',
      flavor: 'Healthy, flavorful',
    },
    {
      id: 52,
      name: 'Stuffed Cabbage Rolls',
      category: 'Vegetarian',
      description: 'Cabbage leaves stuffed with a mixture of rice, vegetables, and spices, cooked in tomato sauce',
      flavor: 'Comforting, flavorful',
    },
    {
      id: 53,
      name: 'Lemon Garlic Shrimp',
      category: 'Seafood',
      description: 'Sautéed shrimp with lemon, garlic, and herbs, served with rice or pasta',
      flavor: 'Zesty, flavorful',
    },
    {
      id: 54,
      name: 'Vegetable Bolognese',
      category: 'Vegetarian',
      description: 'Sauce made with mixed vegetables, tomatoes, herbs, and served over pasta',
      flavor: 'Hearty, flavorful',
    },
    {
      id: 55,
      name: 'Chicken Piccata',
      category: 'Chicken',
      description: 'Chicken breast cooked in a tangy lemon and caper sauce, served with pasta',
      flavor: 'Tangy, flavorful',
    },
    {
      id: 56,
      name: 'Grilled Portobello Burger',
      category: 'Vegetarian',
      description: 'Grilled portobello mushroom cap served on a bun with toppings and condiments',
      flavor: 'Hearty, savory',
    },
    {
      id: 57,
      name: 'Fish Tacos',
      category: 'Seafood',
      description: 'Soft tortillas filled with grilled or fried fish, coleslaw, and salsa',
      flavor: 'Fresh, satisfying',
    },
    {
      id: 58,
      name: 'Vegetable Stir-Fry with Tofu',
      category: 'Vegetarian',
      description: 'Stir-fried mixed vegetables and tofu in a flavorful sauce, served over rice or noodles',
      flavor: 'Flavorful, satisfying',
    },
    {
      id: 59,
      name: 'Vegetable Curry',
      category: 'Vegetarian',
      description: 'Spicy curry made with mixed vegetables, coconut milk, and aromatic spices',
      flavor: 'Spicy, flavorful',
    },
    {
      id: 60,
      name: 'Beef Kebabs',
      category: 'Beef',
      description: 'Skewered beef, marinated and grilled to perfection',
      flavor: 'Tender, flavorful',
    },
    {
      id: 61,
      name: 'Potato Salad',
      category: 'Salad',
      description: 'Classic salad made with boiled potatoes, mayonnaise, and seasonings',
      flavor: 'Creamy, tangy',
    },
    {
      id: 62,
      name: 'Vegetable Lo Mein',
      category: 'Vegetarian',
      description: 'Chinese stir-fried noodles with mixed vegetables in a savory sauce',
      flavor: 'Flavorful, satisfying',
    },
    {
      id: 63,
      name: 'Vegetable Sushi',
      category: 'Vegetarian',
      description: 'Assorted sushi rolls filled with fresh vegetables and rice',
      flavor: 'Fresh, delicate',
    },
    {
      id: 64,
      name: 'Beef Tacos',
      category: 'Beef',
      description: 'Tacos filled with seasoned ground beef, lettuce, cheese, and salsa',
      flavor: 'Savory, satisfying',
    },
    {
      id: 65,
      name: 'Tofu Pad Thai',
      category: 'Vegetarian',
      description: 'Thai stir-fried noodles with tofu, vegetables, and tangy sauce',
      flavor: 'Flavorful, tangy',
    },
    {
      id: 66,
      name: 'Roast Chicken',
      category: 'Chicken',
      description: 'Herb-roasted chicken served with roasted potatoes and vegetables',
      flavor: 'Juicy, flavorful',
    },
    {
      id: 67,
      name: 'Vegetable Dumplings',
      category: 'Vegetarian',
      description: 'Steamed or fried dumplings filled with mixed vegetables, served with dipping sauce',
      flavor: 'Crispy, flavorful',
    },
    {
      id: 68,
      name: 'Beef and Broccoli',
      category: 'Beef',
      description: 'Stir-fried beef and broccoli in a savory sauce, served over rice or noodles',
      flavor: 'Savory, tender',
    },
    {
      id: 69,
      name: 'Vegetable Soba Noodles',
      category: 'Vegetarian',
      description: 'Japanese noodles with mixed vegetables in a savory broth',
      flavor: 'Flavorful, satisfying',
    },
    {
      id: 70,
      name: 'Pulled Pork Sandwich',
      category: 'Pork',
      description: 'Slow-cooked pulled pork in BBQ sauce served on a bun with coleslaw',
      flavor: 'Tender, smoky',
    },
    {
      id: 71,
      name: 'Eggplant Stir-Fry',
      category: 'Vegetarian',
      description: 'Stir-fried eggplant with vegetables in a savory sauce, served over rice or noodles',
      flavor: 'Flavorful, satisfying',
    },
    {
      id: 72,
      name: 'Chicken Curry',
      category: 'Chicken',
      description: 'Spicy curry made with chicken, vegetables, and aromatic spices, served with rice or bread',
      flavor: 'Spicy, flavorful',
    },
    {
      id: 73,
      name: 'Vegetable Stew',
      category: 'Vegetarian',
      description: 'Hearty stew made with mixed vegetables, beans, and aromatic spices',
      flavor: 'Comforting, flavorful',
    },
    {
      id: 74,
      name: 'Lemon Herb Roasted Salmon',
      category: 'Seafood',
      description: 'Salmon fillet seasoned with lemon, herbs, and spices, served with roasted vegetables',
      flavor: 'Flavorful, aromatic',
    },
    {
      id: 75,
      name: 'Vegetable Omelette',
      category: 'Vegetarian',
      description: 'Omelette filled with mixed vegetables and cheese, served with toast or potatoes',
      flavor: 'Fluffy, flavorful',
    },
    {
      id: 76,
      name: 'Beef and Mushroom Stir-Fry',
      category: 'Beef',
      description: 'Stir-fried beef and mushrooms in a savory sauce, served over rice or noodles',
      flavor: 'Savory, tender',
    },
    {
      id: 77,
      name: 'Sesame Noodles with Tofu',
      category: 'Vegetarian',
      description: 'Asian-style noodles tossed with tofu, sesame sauce, and vegetables',
      flavor: 'Flavorful, satisfying',
    },
    {
      id: 78,
      name: 'Avocado Chicken Salad',
      category: 'Chicken',
      description: 'Salad with grilled chicken, avocado, mixed greens, tomatoes, and dressing',
      flavor: 'Healthy, flavorful',
    },
    {
      id: 79,
      name: 'Vegetable Frittata',
      category: 'Vegetarian',
      description: 'Baked omelette with mixed vegetables, cheese, and herbs',
      flavor: 'Fluffy, flavorful',
    },
    {
      id: 80,
      name: 'Beef Tamales',
      category: 'Beef',
      description: 'Steamed corn husk pockets filled with seasoned beef, served with salsa',
      flavor: 'Savory, satisfying',
    },
    {
      id: 81,
      name: 'Vegetable Pho',
      category: 'Vegetarian',
      description: 'Vietnamese noodle soup with mixed vegetables and aromatic broth',
      flavor: 'Flavorful, comforting',
    },
    {
      id: 82,
      name: 'Chicken and Spinach Salad',
      category: 'Chicken',
      description: 'Salad with grilled chicken, spinach, tomatoes, feta cheese, and balsamic dressing',
      flavor: 'Healthy, flavorful',
    },
    {
      id: 83,
      name: 'Vegetarian Shepherd\'s Pie',
      category: 'Vegetarian',
      description: 'Baked casserole with a filling of mixed vegetables and topped with mashed potatoes',
      flavor: 'Comforting, flavorful',
    },
    {
      id: 84,
      name: 'Lemon Herb Grilled Shrimp',
      category: 'Seafood',
      description: 'Grilled shrimp seasoned with lemon, herbs, and spices, served with rice or salad',
      flavor: 'Zesty, flavorful',
    },
    {
      id: 85,
      name: 'Vegetable Curry with Lentils',
      category: 'Vegetarian',
      description: 'Spicy curry made with mixed vegetables, lentils, and aromatic spices, served with rice or bread',
      flavor: 'Spicy, flavorful',
    },
    {
      id: 86,
      name: 'Tomato Basil Soup',
      category: 'Soup',
      description: 'Creamy soup made with tomatoes, basil, broth, and cream',
      flavor: 'Creamy, comforting',
    },
    {
      id: 87,
      name: 'Vegetable Pot Pie',
      category: 'Vegetarian',
      description: 'Baked pie with a filling of mixed vegetables in a savory sauce, topped with a crust',
      flavor: 'Comforting, flavorful',
    },
    {
      id: 88,
      name: 'Honey Glazed Salmon',
      category: 'Seafood',
      description: 'Salmon fillet glazed with honey, soy sauce, and spices, served with roasted vegetables or rice',
      flavor: 'Sweet, savory',
    },
    {
      id: 89,
      name: 'Chicken and Vegetable Stir-Fry',
      category: 'Chicken',
      description: 'Stir-fried chicken and mixed vegetables in a savory sauce, served over rice or noodles',
      flavor: 'Flavorful, satisfying',
    },
    {
      id: 90,
      name: 'Vegetable Tacos',
      category: 'Vegetarian',
      description: 'Tacos filled with mixed vegetables, beans, lettuce, cheese, and salsa',
      flavor: 'Satisfying, flavorful',
    },
    {
      id: 91,
      name: 'Vegetable Dumpling Soup',
      category: 'Vegetarian',
      description: 'Soup with vegetable dumplings, broth, and mixed vegetables',
      flavor: 'Comforting, flavorful',
    },
    {
      id: 92,
      name: 'Vegetable Lasagna Rolls',
      category: 'Vegetarian',
      description: 'Lasagna noodles rolled with a filling of mixed vegetables and cheese, topped with marinara sauce',
      flavor: 'Cheesy, flavorful',
    },
    {
      id: 93,
      name: 'Teriyaki Chicken Bowl',
      category: 'Chicken',
      description: 'Grilled chicken glazed with teriyaki sauce, served over rice with vegetables',
      flavor: 'Sweet, savory',
    },
    {
      id: 94,
      name: 'Mediterranean Stuffed Zucchini',
      category: 'Vegetarian',
      description: 'Zucchini halves stuffed with a mixture of rice, vegetables, and feta cheese, baked to perfection',
      flavor: 'Cheesy, flavorful',
    },
    {
      id: 95,
      name: 'Lemon Garlic Roasted Chicken',
      category: 'Chicken',
      description: 'Roasted chicken seasoned with lemon, garlic, and herbs, served with roasted vegetables',
      flavor: 'Flavorful, aromatic',
    },
    {
      id: 96,
      name: 'Beef Burritos',
      category: 'Beef',
      description: 'Burritos filled with seasoned ground beef, rice, beans, cheese, and toppings',
      flavor: 'Savory, satisfying',
    },
    {
      id: 97,
      name: 'Vegetable Chow Mein',
      category: 'Vegetarian',
      description: 'Chinese stir-fried noodles with mixed vegetables in a savory sauce',
      flavor: 'Flavorful, satisfying',
    }
  ];

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

  describe('handleSearchDishes', () => {
    it('fetches data and updates state', async () => {
     
      const mockGet = jest.fn().mockResolvedValue({ data: { mockedDishes } });
      axios.get = mockGet;
  
      axios.get = jest.fn().mockResolvedValue(mockedDishes);
      console.log = jest.fn();
  
      const setData = jest.fn();
      const setIsDataFetched = jest.fn();
      const setSelectedTable = jest.fn();
  
      await handleSearchDishes(setData, setIsDataFetched, setSelectedTable);
  
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/v1/Dishes');
      //expect(setData).toHaveBeenCalledWith(mockedResponse.data);
      //expect(setIsDataFetched).toHaveBeenCalledWith(true);
      //expect(setSelectedTable).toHaveBeenCalledWith('dishes');
    });
  
    it('handles error during data fetching', async () => {
      const mockedError = new Error('Failed to fetch data');
  
      axios.get = jest.fn().mockRejectedValue(mockedError);
      console.error = jest.fn();
  
      const setData = jest.fn();
      const setIsDataFetched = jest.fn();
      const setSelectedTable = jest.fn();
  
      await handleSearchDishes(setData, setIsDataFetched, setSelectedTable);
  
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/v1/Dishes');
      expect(console.error).toHaveBeenCalledWith('Error fetching data:', mockedError);
      expect(setData).not.toHaveBeenCalled();
      expect(setIsDataFetched).not.toHaveBeenCalled();
      expect(setSelectedTable).not.toHaveBeenCalled();
    });
  });