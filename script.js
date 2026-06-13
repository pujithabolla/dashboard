let seconds = 0;
let timerInterval;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const taskTable = document.getElementById("taskTable");

function updateTimer() {
    seconds++;

    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    timerDisplay.textContent =
        String(hrs).padStart(2, '0') + ":" +
        String(mins).padStart(2, '0') + ":" +
        String(secs).padStart(2, '0');
}

document.getElementById("startBtn").addEventListener("click", () => {
    if (!isRunning) {
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
    }
});

document.getElementById("stopBtn").addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
});

document.getElementById("saveBtn").addEventListener("click", () => {
    const taskName = document.getElementById("taskName").value;

    if (taskName.trim() === "") {
        alert("Please enter a task name");
        return;
    }

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${taskName}</td>
        <td>${timerDisplay.textContent}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    row.querySelector(".delete-btn").addEventListener("click", () => {
        row.remove();
    });

    taskTable.appendChild(row);

    clearInterval(timerInterval);
    isRunning = false;
    seconds = 0;
    timerDisplay.textContent = "00:00:00";
    document.getElementById("taskName").value = "";
});