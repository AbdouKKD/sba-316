const locationInput = document.querySelector("#location");
const findRestaurantsButton = document.querySelector("#find-restaurants");
const restaurantList = document.querySelector("#restaurant-list");
const favoritesList = document.querySelector("#favorites-list");

const restaurantData = [
  { name: "Joe's Pizza", location: "Chicago", cuisine: "Italian" },
  { name: "Sushi World", location: "Atlanta", cuisine: "Japanese" },
  { name: "Taco Town", location: "Los Angeles", cuisine: "Mexican" },
  { name: "Taste of Punjab", location: "Philadelphia", cuisine: "Pakistani" },
  {name: "Old Havana", location: "Miami", cuisine: "Cuban"},
  {name: "African Paradise", location: "New York", cuisine: "Ivorian"},
  {name: "Tom's BBQ", location: "Dallas", cuisine: "American"}
    
];

// Get the template for restaurant items
const restaurantTemplate = document.querySelector("#restaurant-template");

function displayRestaurants(location) {
  // Clear previous restaurant list
  restaurantList.innerHTML = "";

  // Filter the restaurants by location
  const filteredRestaurants = restaurantData.filter((restaurant) =>
    restaurant.location.toLowerCase().includes(location.toLowerCase())
  );

  // If no restaurants found, show a message
  if (filteredRestaurants.length === 0) {
    restaurantList.innerHTML = "<p>No restaurants found in your location.</p>";
  } else {
    const fragment = document.createDocumentFragment(); 

    // Create and add each restaurant item to the list
    filteredRestaurants.forEach((restaurant) => {
      const restaurantItem = restaurantTemplate.content.cloneNode(true); // Clone the template

      // Fill the template with restaurant info
      restaurantItem.querySelector(".restaurant-name").innerText =
        restaurant.name;
      restaurantItem.querySelector(".restaurant-cuisine").innerText =
        restaurant.cuisine;

      // Add an event listener to the "Add to Favorites" button
      const addToFavoritesButton =
        restaurantItem.querySelector(".add-to-favorites");
      addToFavoritesButton.addEventListener("click", () => {
        const li = document.createElement("li");
        li.textContent = `${restaurant.name} - ${restaurant.cuisine}`;
        favoritesList.appendChild(li);

        // Change button color after adding to favorites
        addToFavoritesButton.classList.add("added");
      });

      // Add the new restaurant item to the document fragment
      fragment.appendChild(restaurantItem);
    });

    // Append all restaurant items at once
    restaurantList.appendChild(fragment);
  }
}

// Handle when the "Find Restaurants" button is clicked
findRestaurantsButton.addEventListener("click", () => {
    // Get the input value
  const location = locationInput.value.trim(); 
  if (location) {
    // Show restaurants for the given location
    displayRestaurants(location); 
  } else {
    // Alert if location is empty
    alert("Please enter a location"); 
  }
});

