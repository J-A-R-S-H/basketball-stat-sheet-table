let playerData = [
    { name: "Samuel", points: 4, assists: 6, steals: 3, fg: 0, twoPm: 4, threePm: 3, game1: 0, game2: 0, game3: 4, shotPercentage: 0 },
    { name: "Andrew", points: 18, assists: 4, steals: 2, fg: 0, twoPm: 3, threePm: 3, game1: 9, game2: 6, game3: 3, shotPercentage: 0 },
    { name: "Linus", points: 8, assists: 3, steals: 1, fg: 0, twoPm: 2, threePm: 2, game1: 2, game2: 3, game3: 3, shotPercentage: 0 },
    { name: "Kyle", points: 1, assists: 5, steals: 2, fg: 0, twoPm: 3, threePm: 2, game1: 1, game2: 1, game3: 1, shotPercentage: 0 },
    { name: "Ben", points: 12, assists: 2, steals: 1, fg: 2, twoPm: 1, threePm: 2, game1: 3, game2: 3, game3: 6, shotPercentage: 0 },
    { name: "Vince", points: 9, assists: 3, steals: 2, fg: 1, twoPm: 2, threePm: 2, game1: 3, game2: 5, game3: 1, shotPercentage: 0 },
    { name: "Lance", points: 5, assists: 1, steals: 1, fg: 0, twoPm: 2, threePm: 1, game1: 1, game2: 3, game3: 1, shotPercentage: 0 },
    { name: "Martino", points: 2, assists: 4, steals: 2, fg: 0, twoPm: 4, threePm: 1, game1: 2, game2: 0, game3: 0, shotPercentage: 0 }
];

let playerColors = new Map(); // Store player colors separately

// Function to populate the table with player data
function populateTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Clear the table body

    // Iterate through the player data and populate the table
    playerData.forEach((player, index) => {
        const row = document.createElement("tr");

        // Check if player already has a color assigned
        const color = playerColors.get(player.name);
        if (color) {
            row.className = color;
        } else {
            // Assign appropriate class based on the player's name
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

// Add event listeners to the sortable columns
const sortableColumns = document.getElementsByClassName("sortable");
Array.from(sortableColumns).forEach(column => {
    column.addEventListener("click", () => {
        const stat = column.getAttribute("data-stat");
        const currentOrder = column.getAttribute("data-order");

        sortByStat(stat, currentOrder);

        // Toggle the sorting order
        column.setAttribute("data-order", currentOrder === "asc" ? "desc" : "asc");
    });
});

// Function to sort player data by a specific stat
function sortByStat(stat, order) {
    playerData.sort((a, b) => (order === "asc" ? a[stat] - b[stat] : b[stat] - a[stat]));
    updateTable();
}

// Initially populate the table
populateTable();