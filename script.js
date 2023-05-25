let playerData = [
    { name: "Samuel", points: 4, assists: 5, steals: 1, fg: 43, twoPm: 4, threePm: 0, game1: 0, game2: 0, game3: 4, shotPercentage: 0.093 },
    { name: "Andrew", points: 18, assists: 3, steals: 3, fg: 52, twoPm: 15, threePm: 2, game1: 9, game2: 6, game3: 3, shotPercentage: 0.307 },
    { name: "Linus", points: 8, assists: 2, steals: 3, fg: 31, twoPm: 8, threePm: 0, game1: 2, game2: 3, game3: 3, shotPercentage: 0.258 },
    { name: "Kyle", points: 1, assists: 4, steals: 3, fg: 8, twoPm: 1, threePm: 0, game1: 1, game2: 1, game3: 1, shotPercentage: 0.125 },
    { name: "Ben", points: 12, assists: 1, steals: 1, fg: 48, twoPm: 10, threePm: 1, game1: 3, game2: 3, game3: 6, shotPercentage: 0.208 },
    { name: "Vince", points: 9, assists: 3, steals: 1, fg: 1, twoPm: 5, threePm: 1, game1: 3, game2: 5, game3: 1, shotPercentage: 0.166 },
    { name: "Lance", points: 5, assists: 4, steals: 1, fg: 24, twoPm: 5, threePm: 0, game1: 1, game2: 3, game3: 1, shotPercentage: 0.208 },
    { name: "Martino", points: 2, assists: 1, steals: 0, fg: 13, twoPm: 2, threePm: 0, game1: 2, game2: 0, game3: 0, shotPercentage: 0.153 }
];

let playerColors = new Map(); // Store player colors separately

function populateTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    // Iterate through the player data and populate the table
    playerData.forEach((player, index) => {
        const row = document.createElement("tr");

        const color = playerColors.get(player.name);
        if (color) {
            row.className = color;
        } else {
            row.className = index < 4 ? "team-1" : "team-2";
            // Store the assigned color for the player
            playerColors.set(player.name, row.className);
        }

        row.innerHTML = `
        <td>${player.name}</td>
        <td>${player.points}</td>
        <td>${player.assists}</td>
        <td>${player.steals}</td>
        <td>${player.fg}</td>
        <td>${player.twoPm}</td>
        <td>${player.threePm}</td>
        <td>${player.game1}</td>
        <td>${player.game2}</td>
        <td>${player.game3}</td>
        <td>${player.shotPercentage}</td>
      `;
        tableBody.appendChild(row);
    });
}

// Function to update the table with sorted data
function updateTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Clear the table body

    // Iterate through the player data and populate the table
    playerData.forEach((player, index) => {
        const row = document.createElement("tr");

        // Get the color assigned to the player
        const color = playerColors.get(player.name);
        if (color) {
            row.className = color;
        }

        row.innerHTML = `
        <td>${player.name}</td>
        <td>${player.points}</td>
        <td>${player.assists}</td>
        <td>${player.steals}</td>
        <td>${player.fg}</td>
        <td>${player.twoPm}</td>
        <td>${player.threePm}</td>
        <td>${player.game1}</td>
        <td>${player.game2}</td>
        <td>${player.game3}</td>
        <td>${player.shotPercentage}</td>
      `;
        tableBody.appendChild(row);
    });
}
const sortableColumns = document.getElementsByClassName("sortable");
Array.from(sortableColumns).forEach((column) => {
    column.addEventListener("click", () => {
        const stat = column.getAttribute("data-stat");
        const currentOrder = column.getAttribute("data-order");

        sortByStat(stat, currentOrder);

        // Toggle the sorting order
        const newOrder = currentOrder === "asc" ? "desc" : "asc";
        column.setAttribute("data-order", newOrder);

        // Reset arrow symbols for all columns
        Array.from(sortableColumns).forEach((col) => {
            col.classList.remove("sort-asc", "sort-desc");
        });

        // Add arrow symbol for the clicked column
        column.classList.add(newOrder === "asc" ? "sort-asc" : "sort-desc");
    });
});

function sortByStat(stat, order) {
    playerData.sort((a, b) => {
        if (order === "asc") {
            return a[stat] - b[stat];
        } else {
            return b[stat] - a[stat];
        }
    });
    updateTable();
}

populateTable();