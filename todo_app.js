let todos = [
    { date: "2026-06-06", task: "Create To Do List", assigned_to: "Tesfaye", status: "done", checked: true },
    { date: "2026-06-07", task: "ሰኔ ሚካኤል በአል በአውደ ምህረት ማስነገር", assigned_to: "ሰበካ ጉባኤ", status: "pending", checked: false },
    { date: "2026-06-07", task: "ተመራቂ ልጆች እንዲያስመዘግቡ በአውደ ምህረት ማስነገር", assigned_to: "ሰበካ ጉባኤ", status: "pending", checked: false },
    { date: "2026-06-07", task: "ርክክብ", assigned_to: "ሰበካ ጉባኤ", status: "pending", checked: false },
    { date: "2026-06-08", task: "በዓል ኮሚቴ መጥራት", assigned_to: "ሰበካ ጉባኤ", status: "pending", checked: false },
    { date: "2026-06-09", task: "ቅዲስ ሚካኤል ጽዋ ማህበር ሙሴ መጥራት", assigned_to: "ሰበካ ጉባኤ", status: "pending", checked: false }

];

// ------------------------------------------------------------
// makeCard(t, i)
// Builds the HTML for a single task card.
// t = task object, i = index in todos array
// ------------------------------------------------------------
function makeCard(t, i) {
    return `
    <div class="task-card ${t.checked ? "crossed" : ""}">
 
      <!-- Checkbox: toggles strikethrough on the card -->
      <input class="task-checkbox" type="checkbox"
        ${t.checked ? "checked" : ""}
        onchange="toggleCross(${i}, this.checked)" />
 
      <!-- Task details: name, date, assigned person -->
      <div class="task-body">
        <div class="task-name">${t.task}</div>
        <div class="task-meta">📅 ${t.date} &nbsp;👤 ${t.assigned_to}</div>
      </div>
 
      <!-- Status badge and Done button (only shown if pending) -->
      <div class="task-actions">
        <span class="badge badge-${t.status}">${t.status}</span>
        ${t.status === "pending"
          ? `<button class="btn-done" onclick="markDone(${i})">Done</button>`
          : ""}
      </div>
 
    </div>`;
}
 
// ------------------------------------------------------------
// render()
// Clears the task list and redraws all tasks,
// split into Pending and Completed sections.
// ------------------------------------------------------------
function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
 
  // Separate tasks by status while keeping their original index
  const pending = todos.map((t, i) => ({ t, i })).filter(({ t }) => t.status === "pending");
  const done    = todos.map((t, i) => ({ t, i })).filter(({ t }) => t.status === "done");
 
  // Render pending tasks
  if (pending.length > 0) {
    list.innerHTML += `<div class="section-label">📌 Pending (${pending.length})</div>`;
    pending.forEach(({ t, i }) => list.innerHTML += makeCard(t, i));
  }
 
  // Render completed tasks
  if (done.length > 0) {
    list.innerHTML += `<div class="section-label done-label">✅ Completed (${done.length})</div>`;
    done.forEach(({ t, i }) => list.innerHTML += makeCard(t, i));
  }
}
 
// ------------------------------------------------------------
// addTask()
// Reads the form inputs, validates them, adds a new task
// to the top of the list, clears the form, and re-renders.
// ------------------------------------------------------------
function addTask() {
  const date     = document.getElementById("date").value;
  const task     = document.getElementById("task").value.trim();
  const assigned = document.getElementById("assigned").value.trim();
 
  // Ensure all fields are filled in
  if (!date || !task || !assigned) {
    alert("Please fill in all fields.");
    return;
  }
 
  // Add new task at the top (unshift = prepend)
  todos.unshift({ date, task, assigned_to: assigned, status: "pending", checked: false });
 
  // Clear the form fields
  document.getElementById("date").value     = "";
  document.getElementById("task").value     = "";
  document.getElementById("assigned").value = "";
 
  render();
}
 
// ------------------------------------------------------------
// markDone(i)
// Marks a task as done by updating its status,
// which moves it to the Completed section on re-render.
// ------------------------------------------------------------
function markDone(i) {
  todos[i].status = "done";
  render();
}
 
// ------------------------------------------------------------
// toggleCross(i, checked)
// Crosses out a task visually (strikethrough) when the
// checkbox is checked, without changing its status.
// ------------------------------------------------------------
function toggleCross(i, checked) {
  todos[i].checked = checked;
  render();
}
 
// Initial render when the page loads
render();