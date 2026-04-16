let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//Get the elements
const taskNameInput = document.getElementById("taskName");
const categoryInput = document.getElementById("category");
const deadlineInput = document.getElementById("deadline");
const statusInput = document.getElementById("status");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterStatus = document.getElementById("filterStatus");
const filterCategory = document.getElementById("filterCategory");

//Add Tasks
addTaskBtn.addEventListener("click", function () {
    if (!taskNameInput.value || !deadlineInput.value) {
        alert("Enter a new task name and deadline.");
        return;
    }

    const task = {
        name: taskNameInput.value,
        category: categoryInput.value,
        deadline: deadlineInput.value,
        status: statusInput.value
    };

    tasks.push(task);
    saveAndDisplay();
    clearInputs();
});

//Clear the Inputs
function clearInputs() {
    taskNameInput.value = "";
    categoryInput.value = "Work";
    deadlineInput.value = "";
    statusInput.value = "In Progress";
}

//Save to Local Storage and Refresh List
function saveAndDisplay() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

//Display the Tasks
function displayTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        const statusMatch = filterStatus.value == "All" || task.status === filterStatus.value;
        const categoryMatch = filterCategory.value === "" ||
            task.category.toLowerCase().includes(filterCategory.value.toLowerCase());
        return statusMatch && categoryMatch;
    });

    filteredTasks.forEach((task, index) => {
        checkOverdue(task);

        const li = document.createElement("li");
        li.classList = "task";

        if (task.status === "Overdue")  {
            li.style.color = "red";
    } else if (task.status === "Completed") {
        li.style.textDecoration = "line-through";
    }

        li.innerHTML = `
        <strong>${task.name}</strong><br>
        Category: ${task.category}<br>
        Deadline: ${task.deadline}<br>
        Status:
        <select onchange="updateStatus(${index}, this.value)">
        <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
        <option value="Overdue" ${task.status === "Overdue" ? "selected" : ""}>Overdue</option>
        </select>
        `;
        taskList.appendChild(li);
    });
}
    //Update the Status
    window.updateStatus = function (index, newStatus) {
        tasks[index].status = newStatus;
        saveAndDisplay();
    };

    //Check for Overdue Status
    function checkOverdue(task) {
        const today = new Date();
        today.setHours(0,0,0,0);
        const deadline = new Date(task.deadline);

        if (task.status !== "Completed" && deadline < today) {
            task.status = "Overdue";
        }
    }

    filterStatus.addEventListener("change", displayTasks);
    filterCategory.addEventListener("input", displayTasks);

    //Load
    displayTasks();
