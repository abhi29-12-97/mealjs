const mealTemplate = document.querySelector("[meal-list-template]");
const mealList = document.querySelector("[meal-list]");
const searchBar = document.querySelector("[meal-search]");

const favouriteButton =
  mealTemplate.content.children[0].querySelector("[favourite-button]");

let meals = [];
let favourites = [];

//onloading of the page updating the local storage and favourites array so that we don't store duplicates
updateLocal = () => {
  favourites = JSON.parse(localStorage.getItem("Favourite"));
  localStorage.setItem("Favourite", JSON.stringify(favourites));
};

//adding add to favourite on click of add to favourite button
addToFavourite = (e) => {
  var newFavourite = meals.filter((item) => item.idMeal === e);
  favourites = JSON.parse(localStorage.getItem("Favourite"));
  if (favourites.some((item) => item.idMeal === e)) {
    return;
  }
  favourites.push(newFavourite[0]);
  localStorage.setItem("Favourite", JSON.stringify(favourites));
  console.log(favourites);
};

// creating session cookie for meal page so that everytime we click a meal we can show that data only
mealPage = (e) => {
  var newFavourite = meals.filter((item) => item.idMeal === e);
  console.log(newFavourite);
  sessionStorage.setItem("meal", JSON.stringify(newFavourite));
};

//adding search bar event listener so on input we filter the results and show only the applicable items and hiding the rest that doesn't match the value
searchBar.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  if (value.length == 0) {
    mealList.classList.remove("meal-list-update");
    return;
  }
  mealList.classList.add("meal-list-update");
  meals.forEach((meal) => {
    const isVisible = meal.strMeal.toLowerCase().includes(value);
    meal.boxElement.classList.toggle("hide", !isVisible);
  });
});

//fetching the ApI from the meal API
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  .then((response) => response.json())
  .then((data) => {
    meals = data.meals.map((element) => {
      const card = mealTemplate.content.cloneNode(true).children[0];
      const image = card.querySelector("[dish-image]");
      const name = card.querySelector("[dish-name]");
      const id = card.querySelector("[favourite-button]");
      const links = card.querySelector("[links]");
      image.src = element.strMealThumb;
      name.textContent = element.strMeal;
      id.id = element.idMeal;
      links.id = element.idMeal;
      mealList.append(card);
      return {
        ...element,
        boxElement: card,
      };
    });
  })
  .catch((error) => console.log("error", error));
