let ele = [];
loader = () => {
  ele = JSON.parse(sessionStorage.getItem("meal"));
  console.log(ele);
  let mealname = document.querySelector("[meal-name]");
  let mealimage = document.querySelector("[meal-image]");
  let mealdesc = document.querySelector("[meal-desc]");
  mealname.textContent = ele[0].strMeal;
  mealimage.src = ele[0].strMealThumb;
  mealdesc.textContent = ele[0].strInstructions;
};
