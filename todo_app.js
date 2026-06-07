let todos = [
    { date: "2026-06-06", task: "Create To Do List", assigned_to: "Tesfaye", status: "done" },
    { date: "2026-06-07", task: "ሰኔ ሚካኤል በአል በአውደ ምህረት ማስነገር", assigned_to: "ሰበካ ጉባኤ", status: "done" },
    { date: "2026-06-07", task: "ተመራቂ ልጆች እንዲያስመዘግቡ በአውደ ምህረት ማስነገር", assigned_to: "ሰበካ ጉባኤ", status: "done" },
    { date: "2026-06-07", task: "ርክክብ", assigned_to: "ሰበካ ጉባኤ", status: "done" },
    { date: "2026-06-08", task: "በዓል ኮሚቴ መጥራት", assigned_to: "ሰበካ ጉባኤ", status: "done" },
    { date: "2026-06-09", task: "ቅዲስ ሚካኤል ጽዋ ማህበር ሙሴ መጥራት", assigned_to: "ሰበካ ጉባኤ", status: "done" }

];

function render() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    todos.forEach((t, i) => {
                list.innerHTML += `
      <div class="task-card ${t.checked ? "crossed" : ""}">
        <input class="task-checkbox" type="checkbox" ${t.checked ? "checked" : ""} onchange="toggleCross(${i}, this.checked)" />
        <div class="task-body">
          <div class="task-name">${t.task}</div>
          <div class="task-meta">📅 ${t.date} &nbsp;👤 ${t.assigned_to}</div>
        </div>
        <div class="task-actions">
          <span class="badge badge-${t.status}">${t.status}</span>
          ${t.status === "pending" ? `<button class="btn-done" onclick="markDone(${i})">Done</button>` : ""}
        </div>
      </div>`;
  });
}
 
function addTask() {
  const date     = document.getElementById("date").value;
  const task     = document.getElementById("task").value.trim();
  const assigned = document.getElementById("assigned").value.trim();
 
  if (!date || !task || !assigned) {
    alert("Please fill in all fields.");
    return;
  }
 
  todos.unshift({ date, task, assigned_to: assigned, status: "pending", checked: false });
  document.getElementById("date").value     = "";
  document.getElementById("task").value     = "";
  document.getElementById("assigned").value = "";
  render();
}
 
function markDone(i) {
  todos[i].status = "done";
  render();
}
 
function toggleCross(i, checked) {
  todos[i].checked = checked;
  render();
}
 
render();