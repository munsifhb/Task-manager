let allTasks = []; 
const apiUrl = "https://task-manager-chln.onrender.com/api/tasks";
let currentFilter = 'all';
let editingTaskId = null;
const input = document.getElementById("title");
const priorityInput = document.getElementById("priority");
const  renderContainer = document.getElementById("tasks-render");
const button = document.getElementById("addtask");
const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const total = document.getElementById("total");
const high = document.getElementById("high");
const progress = document.getElementById("progress");
const completed = document.getElementById("comp");
const mainContent = document.getElementById("taskWrapper");

button.addEventListener("click", handleSubmit);

async function addTask() {
   const title = input.value;
   const priority = priorityInput.value;
    

    if (!title) {
        alert('Title dey neccessary!');
        return;
    }

    await fetch(apiUrl , {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, priority })
  });



  await loadTask();

  input.value = "";
  priorityInput.value = "";
    
}

async function loadTask() {

    try{

    const response = await fetch(apiUrl);
    if (!response.ok) {
            console.log("faild to fetch data")
            return;
        }else{
    const tasks = await response.json();
    console.log(tasks)


    renderContainer.innerHTML = "";

    allTasks = tasks;
    if (tasks.length == 0) {
        const messg = document.createElement("p")
        messg.innerHTML = `
        <p>No task added yet</p>
        `
        renderContainer.appendChild(messg)
    }else{
    
    renderTasks(filterTasks(tasks))
    }

    console.log(tasks.length)

    
}


    
    }

    

    catch(error) {
        console.error("Connection error:", error);
    }
        

    

    finally{
        console.log("Fetch Completed!")
        
    }
    
    
}

function renderTasks(tasks) {

    

    
    renderContainer.innerHTML = "";

  const highCount = allTasks.filter(task => task.priority === 'High').length;
  const progCount = allTasks.filter(task => task.completed === false).length;
  const completedCount = allTasks.filter(task => task.completed === true).length;

  total.textContent = allTasks.length;
  high.textContent = highCount;
  progress.textContent = progCount;
  completed.textContent = completedCount;

    tasks.forEach((task, id) => {
        
        

        const taskList = document.createElement("div");
        
        taskList.innerHTML = `
        

        <div id="font">

        <input type="checkbox" class="check" ${task.completed ? "checked" : ""} onclick="toggleTask(${task.id})">
        <p id="ti" class="${task.completed ? 'completed' : ''}">${task.title}</p>
        </div>
        
        

        <div id="createPrio">
        <p id="prio">${task.priority}</p>
        

        
        <p id="date">${task.createdAt}</p>
        </div>
        
        

        
        <div id="actions">
    
        
        <svg xmlns="http://www.w3.org/2000/svg" onclick="(editTask(${task.id}, '${task.title}', '${task.priority}'))" viewBox="0 0 640 640" height="15"  width="15"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="#555843" d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" onclick="deleteTask(${task.id})" height="15" width="15" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="rgb(255, 30, 10)" d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>
    </div>
    
    

    
        `;

        renderContainer.appendChild(taskList)

        

        
        
    });

    

}


function filterTasks(tasks) {
  if (currentFilter === 'all') {
    return tasks;
  }

  if (currentFilter === 'High' || currentFilter === 'Medium' || currentFilter === 'Low') {
    return tasks.filter(task => task.priority  === currentFilter);
  }

  if (currentFilter === "Completed") {
    return tasks.filter(task => task.completed === true);
  }

  if (currentFilter === "Pending") {
    return tasks.filter(task => task.completed === false);
  }

  return tasks;
}

// grab all filter buttons
document.querySelectorAll('.filterBtn').forEach(btn => {
  btn.addEventListener('click', () => {

    
    document.querySelectorAll('.filterBtn').forEach(b => b.classList.remove('active'));

    
    btn.classList.add('active');

    currentFilter = btn.dataset.filter;
    renderTasks(filterTasks(allTasks));
  });
});

async function deleteTask(id) { 
    try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    });

  if (!response.ok) {
      console.error("Delete failed:", response.status);
      return;
    }
  
  await loadTask();
  }
  
   catch (error) {
    console.error("Network error:", error);
  }

  
  
}


async function toggleTask(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}/toggle`, {
      method: 'PATCH'
    });

    if (!response.ok) {
      console.error('Toggle failed:', response.status);
      return;
    }

    await loadTask();

  } catch (error) {
    console.error('Network error:', error);
  }
}




function handleSubmit() {
  if (editingTaskId) {
    updateTask(editingTaskId); // PUT
  } else {
    addTask(); // POST
  }
}

function editTask(id, title, priority) {
    // const title = input.value;
    // const priority = priorityInput.value;

  editingTaskId = id; 

  
  input.value = title;
  priorityInput.value = priority;

  
//   button.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" id="addtask" height="50" width="50" viewBox="0 0 640 640"><path fill="#111844" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>`;
}

async function updateTask(id) {

    let title = input.value;
    let priority = priorityInput.value;


    try{

     
        const response = await fetch(`${apiUrl}/${id}`, {
            method : "PUT",
            headers : {"Content-Type": "application/json"},

            body : JSON.stringify({title, priority})
        });

        

        if (!response.ok) {
            console.error("Task update failed", response.status);
            return;
        }

        // button.textContent = `<svg xmlns="http://www.w3.org/2000/svg" id="addtask" height="50" width="50" viewBox="0 0 640 640"><path fill="#111844" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>`;
        input.value = "";
        priorityInput.value = "-- Choose a priority --";

        
        editingTaskId = null;
        await loadTask();

    }

    catch (error) {
        console.error("Network error:", error);
    }
}


function openSidebar() {
  sideBar.classList.add('open');
//   overlay.classList.add('active');
mainContent.style.marginLeft = '240px'
}

function closeSidebar() {
  sideBar.classList.remove('open');
//   overlay.classList.remove('active');
mainContent.style.marginLeft = '0';
}

openBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
// overlay.addEventListener('click', closeSidebar); // tap outside to close



loadTask();

