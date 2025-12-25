document.addEventListener("DOMContentLoaded", () => {
  // your code here
  // Selectors
  const form = document.querySelector("#create-task-form");
  const input = document.querySelector("#new-task-description");
  const taskList = document.querySelector("#tasks");
  const prioritySelect = document.querySelector("#priority");
  const sortBtn = document.querySelector("#sort-tasks");

  let sortAscending = true; // true = High->Low, false = Low->High


  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = input.value.trim();// trims spaces
    if (taskText === "") return; // don't add blank tasks
    const priority = prioritySelect.value;

    // Create the list item
    const li = document.createElement("li");
    li.dataset.priority = priority;
    // set the colors for the task priiority
    if (priority === "high") li.style.color = "red";
    if (priority === "medium") li.style.color = "blue";
    if (priority === "low") li.style.color = "green";

    // get set the li content
    // text lives in a span (so we can edit it)
    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);
    li.appendChild(document.createTextNode(" "));

    // create the edit task button

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.type = "button";

    editBtn.addEventListener("click", () => {
      const updated = prompt("Edit task:", span.textContent);
      if (updated === null) return; // user pressed Cancel

      const cleaned = updated.trim();
      if (cleaned === "") return;   // don't allow blank

      span.textContent = cleaned;
    });


    // Create a delete button 
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X"
    deleteBtn.type = "button"; // prevents form submit   

    // Make button remove THIS li when clicked
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    // strikethrough functionality for done tasks

    li.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") return;
      li.classList.toggle("done");
    });

    // Put button inside li, then li inside ul

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    form.reset(); // clears the input field


  });

  // sort the tasks  by priority 

  sortBtn.addEventListener("click", () => {
    const order = { high: 1, medium: 2, low: 3 };
    const items = Array.from(taskList.querySelectorAll("li"));

    items.sort((a, b) => order[a.dataset.priority] - order[b.dataset.priority]);

    // If descending, reverse the sorted array
    if (!sortAscending) items.reverse();

    items.forEach((li) => taskList.appendChild(li));

    // Toggle for next click + update button text
    sortAscending = !sortAscending;
    sortBtn.textContent = sortAscending ? "Sort by Priority (High → Low)" : "Sort by Priority (Low → High)";
  });

});




