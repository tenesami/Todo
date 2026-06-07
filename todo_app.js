let todos = [
    { date: "2026-06-06", task: "Create To Do List", assigned_to: "Tesfaye", status: "done" },
    { date: "2026-06-07", task: "ሰኔ ሚካኤል በአል በአውደ ምህረት ማስነገር", assigned_to: "ሰበካ ጉባኤ", status: "done" },
    { date: "2026-06-07", task: "ተመራቂ ልጆች እንዲያስመዘግቡ በአውደ ምህረት ማስነገር", assigned_to: "ሰበካ ጉባኤ", status: "done" },
    { date: "2026-06-07", task: "ርክክብ", assigned_to: "ሰበካ ጉባኤ", status: "done" },
    { date: "2026-06-08", task: "በዓል ኮሚቴ መጥራት", assigned_to: "ሰበካ ጉባኤ", status: "done" },
    { date: "2026-06-09", task: "ቅዲስ ሚካኤል ጽዋ ማህበር ሙሴ መጥራት", assigned_to: "ሰበካ ጉባኤ", status: "done" }

];

function render() {
    const tbody = document.getElementById("taskBody");
    tbody.innerHTML = "";
    todos.forEach((t, i) => {
                const crossed = t.checked ? "crossed" : "";
                tbody.innerHTML += `
      <tr class="${crossed}">
        <td>${i + 1}</td>
        <td>${t.date}</td>
        <td>${t.task}</td>
        <td>${t.assigned_to}</td>
        <td class="status-${t.status}">${t.status}</td>
        <td>
          ${t.status === "pending" ? `<button class="btn-done" onclick="markDone(${i})">Done</button>` : ""}
          <input type="checkbox" title="Cross out" ${t.checked ? "checked" : ""} onchange="toggleCross(${i}, this.checked)" />
        </td>
      </tr>`;
  });
}
 
function addTask() {
  const date       = document.getElementById("date").value;
  const task       = document.getElementById("task").value.trim();
  const assigned   = document.getElementById("assigned").value.trim();
 
  if (!date || !task || !assigned) {
    alert("Please fill in all fields.");
    return;
  }
 
  todos.push({ date, task, assigned_to: assigned, status: "pending" });
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