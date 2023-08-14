// global variables
const formEl = document.getElementById("my-form"); // Reference to the form element
const formText = document.getElementById("title-input"); // Reference to the task name input element
const formDescription = document.getElementById("description-input"); // Reference to the task description input element
const myPizzaContainer = document.getElementById("remember-list"); // Reference to the wrapper element to display tasks
const localStorageKey = "taskStorage"; // Key for storing data in local storage

let toDoArray = JSON.parse(localStorage.getItem(localStorageKey)) || []; // Array to store task data retrieved from local storage or empty array if no data exists

// Loop through the toDoArray and create task elements on page load
toDoArray.forEach((taskItem) =>
  createPizzaArray(taskItem.name, taskItem.descText, taskItem.id)
);

// Function to add a new task
function addPizza(text, descText) {
  const taskId = Date.now(); // Generate a unique task ID based on the current timestamp

  const task = {
    name: text,
    descText: descText,
    id: taskId,
  };

  toDoArray.push(task); // Add the new tas to the toDoArray
  updateLocalStorage(); // Update the local storage with the updated toDoArray data

  createPizzaArray(text, descText, taskId); // Create a task element on the page
}

// Function to task element on the page
function createPizzaArray(text, descText, taskId) {
  const wrapper = document.createElement("article"); // Create a wrapper div
  wrapper.classList.add("wrapper");

  const titleContainer = document.createElement("div"); // create container for appending the H2 and done task button
  titleContainer.classList.add("title-container");

  const taskTitle = document.createElement("h2"); // Create an h2 element for the task title
  taskTitle.textContent = text;

  const button = document.createElement("button"); // Create a button element
  button.textContent = "check_circle";
  button.classList.add("btn-icon", "material-symbols-outlined");

  button.addEventListener("click", () => removeTask(wrapper, taskId));

  titleContainer.append(taskTitle, button);

  const paragraph = document.createElement("p"); // Create a p element for the task description
  paragraph.textContent = descText;

  wrapper.append(titleContainer, paragraph); // Append the elements to the wrapper

  myPizzaContainer.appendChild(wrapper);
}

// Function to remove a task from the page and toDoArray
function removeTask(element, taskId) {
  toDoArray = toDoArray.filter((task) => task.id !== taskId); // Filter out the task with the given taskId from the toDoArray
  updateLocalStorage(); // Update the local storage with the updated toDoArray data
  element.remove(); // Remove the task element from the page
}

// Function to handle form submission
function handleForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  if (formText.value.length < 3 || formDescription.value.length < 3) return;

  addPizza(formText.value, formDescription.value); // Add a new task with the given name and description
  formText.value = ""; // Clear the task name input field
  formDescription.value = ""; // Clear the task description input field
}

//

// Function to update the local storage with the current toDoArray data
function updateLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(toDoArray));
}

formEl.addEventListener("submit", handleForm); // Attach the handleForm function to the form's submit event
