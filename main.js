// ================================
// TNI OSINT STATIC DATABASE
// ================================

const OSINT_DATABASE = [
    {
        identifier: "John Pork",
        info: [
            "Location: America",
            "Hobbies: Playing Minecraft",
            "TikTok: https://tiktok.com/@johnpork"
        ]
    },
    {
        identifier: "shadow_user42",
        info: [
            "Alias: Shadow",
            "Platforms: 4chan, Reddit",
            "VPN Usage: ExpressVPN, NordVPN",
            "Threat Level: Low"
        ]
    },
    {
        identifier: "example123@gmail.com",
        info: [
            "Name: Alex Johnson",
            "Location: San Francisco, CA",
            "Occupation: Software Engineer",
            "Notes: Uses public WiFi frequently"
        ]
    }
];

// ================================
// SEARCH (CASE-INSENSITIVE)
// ================================

function searchData() {
    const searchTerm = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    const resultsDisplay = document.getElementById("resultsDisplay");

    if (!searchTerm) {
        resultsDisplay.innerHTML =
            '<div class="no-results">Enter an identifier to search</div>';
        return;
    }

    const matches = OSINT_DATABASE.filter(entry =>
        entry.identifier.toLowerCase().includes(searchTerm)
    );

    document.getElementById("lastSearch").textContent =
        searchTerm.length > 15 ? searchTerm.slice(0, 15) + "..." : searchTerm;

    if (matches.length === 0) {
        resultsDisplay.innerHTML =
            `<div class="no-results">No data found for "${escapeHtml(searchTerm)}"</div>`;
        return;
    }

    resultsDisplay.innerHTML = matches.map(entry => `
        <div class="result-card">
            <div class="identifier">${escapeHtml(entry.identifier)}</div>
            ${entry.info.map(line =>
                `<div class="data-content">${escapeHtml(line)}</div>`
            ).join("")}
        </div>
    `).join("");
}

// ================================
// STATS
// ================================

document.getElementById("totalEntries").textContent = OSINT_DATABASE.length;

// ================================
// HELPERS
// ================================

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
