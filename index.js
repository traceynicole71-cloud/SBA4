let tasks = [];

//Get the elements
const taskNameInput = document.getElementById("taskName");
const categoryInput = document.getElementById("category");
const deadlineInput = document.getElementById("deadLine");
const statusInput = document.getElementById("status");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterStatus = document.getElementById("filterSatus");
const filterCategory = document.getElementById("filterCategory");

//Add Tasks
add addTaskBtn.addEventListener("click", function () {
    const task = {
        name: taskNameInput.value,
        category: categoryInput.value,
        deadline: deadlineInput.value,
        status: statusInput.value
    };

    tasks.push(task);


    clearInputs();
    displayTasks();
});

//Clear the Inputs
function clearInputs() {
    taskNameInput.value = "";
    categoryInput.value = "";
    deadlineInput.value = "";
    statusInput.value = "In Progress";
}

//Displaying the Tasks
function displayTasks() {
    taskList.innerHTML = "";

    let filteredTasks == tasks.filter(task => {
        const statusMatch = 
        filterStatus.value == "All" || task.status === filterStatus.value;

        const categoryMatch = 
        filterCategory.value === "" ||
        task.category.toLowerCase().includes(filterCategory.value.toLowerCase());

        return statusMatch && categoryMatch;
    });

    filteredTasks.forEach((task, index) => {
        checkOverdue(task);

        const li = document.createElement("li");
        li.classList.add("task");

        if (task.status === "Overdue") {
            li.classList.add("overdue");
        } else of (task.status === "Completed") {
            li.classList.add("Completed");
        }
        
        li.innerHTML =  `
        <strong>${task.name}</strong><br>
        Category: ${task.category}<br>
        Deadline: ${task.deadLine}<br>
        Status:
        <select onchange="updateStatus(${index}, this.value)">
        <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option value="Completed" ${task.status === "completed" ? "selected" : ""}>Completed</option>
        </select>
        `;
        taskList.appendChild(li);
    });

    //Update the Status
    function updateStatus(index, newStatus){
        tasks[index].status = newStatus;
displayTasks();
    }

    //Check for Overdue Status
    function checkOverdue(task) {
        const today = newDate();
        const deadline = newDate(task.deadline);

        if (task.status !== "Completed" && deadline < today) {
            task.status = "Overdue";
        }
    }

    filterStatus.addEventListener("change", displayTasks);
    filterCategory.addEventListener("input", displayTasks);

