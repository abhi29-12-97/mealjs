const searchBar = document.querySelector("[meal-search]");
const mealList = document.querySelector("[favourite-meal-list]");
const mealTemplate = document.querySelector("[favourite-list-template]");
const favouriteButton =
  mealTemplate.content.children[0].querySelector("[remove-button]");
let meals = [];
let list = [];
var count = 0;

//loade function which will load the items from the local storage such that everyTime we load the favourite page we only gets the items which we have added and favourites
function loader() {
  console.log("loading.....");
  list = JSON.parse(localStorage.getItem("Favourite"));
  meals = list.map((element) => {
    console.log(element.strMeal);
    const card = mealTemplate.content.cloneNode(true).children[0];
    const image = card.querySelector("[favourite-dish-image]");
    const name = card.querySelector("[favourite-dish-name]");
    const category = card.querySelector("[favourite-dish-category]");
    const desc = card.querySelector("[favourite-dish-description]");
    const id = card.querySelector("[remove-button]");
    image.src = element.strMealThumb;
    name.textContent = element.strMeal;
    category.textContent = element.strCategory;
    desc.textContent = element.strInstructions;
    id.id = element.idMeal;
    mealList.append(card);
    return {
      ...element,
      boxElement: card,
    };
  });
}

//removing the item from favourite list
removeFromFavourite = (e) => {
  console.log(list);
  var index = list
    .map((item) => {
      return item.idMeal;
    })
    .indexOf(e);
  meals[index].boxElement.classList.toggle("hide", true);
  meals.splice(index, 1);
  list.splice(index, 1);
  localStorage.setItem("Favourite", JSON.stringify(list));
};

//adding search bar event listener only search for the items that we have added in our favourite list
searchBar.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  meals.forEach((meal) => {
    const isVisible = meal.strMeal.toLowerCase().includes(value);
    meal.boxElement.classList.toggle("hide", !isVisible);
  });
});
