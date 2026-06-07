import json
import os
from datetime import date

FILE = "todos.json"

def load():
    if os.path.exists(FILE):
        with open(FILE) as f:
            return json.load(f)["todos"]
    return []

def save(todos):
    with open(FILE, "w") as f:
        json.dump({"todos": todos}, f, indent=2)

def show(todos):
    if not todos:
        print("No tasks.")
        return
    print(f"\n{'#':<4} {'Date':<12} {'Task':<25} {'Assigned To':<15} {'Status'}")
    print("-" * 70)
    for i, t in enumerate(todos, 1):
        print(f"{i:<4} {t['date']:<12} {t['task']:<25} {t['assigned_to']:<15} {t['status']}")

def main():
    todos = load()
    while True:
        print("\n1. Add  2. Mark Done  3. Delete  4. List  5. Quit")
        choice = input("> ").strip()

        if choice == "1":
            task        = input("Task: ").strip()
            assigned_to = input("Assigned to: ").strip()
            todos.append({
                "date":        str(date.today()),
                "task":        task,
                "assigned_to": assigned_to,
                "status":      "pending"
            })
            save(todos)

        elif choice == "2":
            show(todos)
            i = int(input("Mark done #: ")) - 1
            todos[i]["status"] = "done"
            save(todos)

        elif choice == "3":
            show(todos)
            i = int(input("Delete #: ")) - 1
            todos.pop(i)
            save(todos)

        elif choice == "4":
            show(todos)

        elif choice == "5":
            break

main()