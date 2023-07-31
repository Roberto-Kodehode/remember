// global variables
const formEl = document.getElementById("my-form"); // Reference to the form element
const formText = document.getElementById("title-input"); // Reference to the pizza name input element
const formDescription = document.getElementById("description-input"); // Reference to the pizza description input element
const myPizzaContainer = document.getElementById("remember-list"); // Reference to the wrapper element to display pizzas
const localStorageKey = "pizzaStorage"; // Key for storing data in local storage

let toDoArray = JSON.parse(localStorage.getItem(localStorageKey)) || []; // Array to store pizza data retrieved from local storage or empty array if no data exists

// Loop through the toDoArray and create pizza elements on page load
toDoArray.forEach((pizzaItem) =>
  createPizzaArray(pizzaItem.name, pizzaItem.descText, pizzaItem.id)
);

// Function to add a new pizza
function addPizza(text, descText) {
  const pizzaId = Date.now(); // Generate a unique pizza ID based on the current timestamp

  const pizza = {
    name: text,
    descText: descText,
    id: pizzaId,
  };

  toDoArray.push(pizza); // Add the new tas to the toDoArray
  updateLocalStorage(); // Update the local storage with the updated toDoArray data

  createPizzaArray(text, descText, pizzaId); // Create a pizza element on the page
}

// Function to task element on the page
function createPizzaArray(text, descText, pizzaId) {
  const wrapper = document.createElement("article"); // Create a wrapper div
  wrapper.classList.add("wrapper");

  const titleContainer = document.createElement("div"); // create container for appending the H2 and done task button
  titleContainer.classList.add("title-container");

  const taskTitle = document.createElement("h2"); // Create an h2 element for the task title
  taskTitle.textContent = text;

  const button = document.createElement("button"); // Create a button element
  button.textContent = "check_circle";
  button.classList.add("btn-icon", "material-symbols-outlined");

  button.addEventListener("click", () => removePizza(wrapper, pizzaId));

  titleContainer.append(taskTitle, button);

  const paragraph = document.createElement("p"); // Create a p element for the pizza description
  paragraph.textContent = descText;

  wrapper.append(titleContainer, paragraph); // Append the elements to the wrapper

  myPizzaContainer.appendChild(wrapper);
}

// Function to remove a task from the page and toDoArray
function removePizza(element, pizzaId) {
  toDoArray = toDoArray.filter((pizza) => pizza.id !== pizzaId); // Filter out the pizza with the given pizzaId from the toDoArray
  updateLocalStorage(); // Update the local storage with the updated toDoArray data
  element.remove(); // Remove the pizza element from the page
}

// Function to handle form submission
function handleForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  if (formText.value.length < 3 || formDescription.value.length < 3) return;

  addPizza(formText.value, formDescription.value); // Add a new pizza with the given name and description
  formText.value = ""; // Clear the pizza name input field
  formDescription.value = ""; // Clear the pizza description input field
}

//

// Function to update the local storage with the current toDoArray data
function updateLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(toDoArray));
}

formEl.addEventListener("submit", handleForm); // Attach the handleForm function to the form's submit event
