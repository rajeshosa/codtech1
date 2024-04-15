const addBtn = document.querySelector(".add-btn");
const inputText = document.getElementById("text-input");
const taskList = document.querySelector(".task-list");
const error = document.querySelector(".error");

let tasks;

const addTask = () => {
  let task = inputText.value;

  //show error if input value is empty
  if (!task) {
    error.style.display = "block";
  } else {
    error.style.display = "none";
  }

  //getting all tasks
  tasks = get();

  if (!tasks) tasks = [];

  //adding task to all task list
  tasks.push({
    task,
    status: "pending",
  });

  save(tasks);

  showTaskList();

  inputText.value = "";
};

const showTaskList = () => {
  //fist empty task list
  tasks = [];

  tasks = get();
  //clear inner HTML of ul element
  taskList.innerHTML = "";

  if (tasks) createLiTag(tasks);
};

const createLiTag = (tasks) => {
  tasks.forEach((taskInfo, index) => {
    const { task, status } = taskInfo;

    let iconClass = status === "pending" ? "fa-circle" : "fa-circle-check";

    let textClass = status === "pending" ? "" : "completed";

    let liTag = document.createElement("li");
    liTag.innerHTML = `
                    <li class="task">
                        <span>
                            <i class="fa-regular ${iconClass}" onclick="toggleIcon(event);updateTaskStatus(${index})"></i>
                            <span class="text ${textClass}">${task}</span>
                        </span>
                         <i class="fa-solid fa-xmark" onclick="removeTask(${index})"></i>
                    </li>
    `;

    taskList.appendChild(liTag);
  });
};

const toggleIcon = (e) => {
  //getting classlist of circle icon
  let classList = e.target.classList;
  //getting classlist of sibling of circle icon
  let nextElClassList = e.target.nextElementSibling.classList;

  if (classList.contains("fa-circle")) {
    classList.remove("fa-circle");
    classList.add("fa-circle-check");
    nextElClassList.add("completed");
  } else {
    classList.add("fa-circle");
    classList.remove("fa-circle-check");
    nextElClassList.remove("completed");
  }
};

const updateTaskStatus = (index) => {
  let status = tasks[index].status;
  //updating task status
  status === "pending" ? (status = "completed") : (status = "pending");
  tasks[index].status = status;
  //saving updated task list
  save(tasks);
};

const removeTask = (index) => {
  //removing indexed tasks
  tasks.splice(index, 1);
  //save updated tasks
  save(tasks);

  //showing updated task list
  showTaskList();
};

//getting task list form local storage
const get = () => JSON.parse(localStorage.getItem("tasks"));

//saving data to local storage
const save = (data) => localStorage.setItem("tasks", JSON.stringify(data));

showTaskList();
 