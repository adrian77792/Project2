// Service pricing per square meter
const services = {
    "Painting": 20,
    "Wallpapering": 25,
    "Plastering": 30,
    "Smoothing": 35,
    "Tiling": 40,
    "Bricklaying": 50
};

/**
 * Stores data as a cookie with optional expiration in days
 * Uses JSON.stringify to serialize object values
 */
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + JSON.stringify(value) + ";expires=" + d.toUTCString() + ";path=/";
}

/**
 * Retrieves and parses a cookie value by name
 * Returns null if the cookie is not found or is invalid
 */
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let [key, value] = cookies[i].split("=");
        if (key === name) {
            try {
                return JSON.parse(decodeURIComponent(value));
            } catch (e) {
                return null;
            }
        }
    }
    return null;
}

/**
 * Adds a new row to the services table with:
 * - a dropdown for service selection
 * - a numeric input for area
 * - calculated unit price
 * - total price (unit price * area)
 * - a delete button to remove the row
 */
function addRow(service = "Painting", area = 1) {
    const table = document.getElementById("servicesTable");
    const row = table.insertRow();
    
    // Service selection dropdown
    const cell1 = row.insertCell(0);
    const select = document.createElement("select");
    for (const s in services) {
        let option = document.createElement("option");
        option.value = s;
        option.textContent = s;
        if (s === service) option.selected = true;
        select.appendChild(option);
    }
    select.style.width = "100%";
    cell1.appendChild(select);
    
    // Area input field
    const cell2 = row.insertCell(1);
    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.value = area;
    input.oninput = updateTotal;
    input.style.width = "100%";
    cell2.appendChild(input);
    
     // Price per square meter
    const cell3 = row.insertCell(2);
    cell3.textContent = services[select.value] + " £";
    
     // Total price (unit price * area)
    const cell4 = row.insertCell(3);
    cell4.textContent = services[select.value] * input.value + " £";
    
    // Delete row button
    const cell5 = row.insertCell(4);
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.onclick = function () {
        table.deleteRow(row.rowIndex - 1);
        
        // Update total immediately
        updateTotal();
    };
    cell5.appendChild(removeBtn);
    
    // Update prices when service selection changes
    select.onchange = function () {
        cell3.textContent = services[select.value] + " £";
        cell4.textContent = services[select.value] * input.value + " £";
        updateTotal();
    };
    updateTotal();
}

/**
 * Recalculates the grand total price based on all rows
 * Also updates the total price cell and saves the current state in cookies
 */
function updateTotal() {
    let total = 0;
    let data = [];
    document.querySelectorAll("#servicesTable tr").forEach(row => {
        const service = row.cells[0].querySelector("select").value;
        const area = row.cells[1].querySelector("input").value;
        const price = services[service] * area;
        row.cells[3].textContent = price + " £";
        total += price;

        // Save current row data for persistence
        data.push({ service, area });
    });
    document.getElementById("totalPrice").textContent = total;
    setCookie("constructionData", data, 7);
}

/**
 * Generates a PDF from the current table using jsPDF and autoTable plugin
 * Includes headers, each row's data, and the final total
 */
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Construction Calculator", 10, 10);
    let y = 20;
    doc.autoTable({
    head: [["Service", "Area (m²)", "Price per m²", "Total price"]],

        body: Array.from(document.querySelectorAll("#servicesTable tr")).map(row => [
            row.cells[0].querySelector("select").value,
            row.cells[1].querySelector("input").value,
            row.cells[2].textContent,
            row.cells[3].textContent
        ]),
        startY: y
    });

    // Display total price after table
    doc.text(`Total price: ${document.getElementById("totalPrice").textContent} £`, 10, doc.autoTable.previous.finalY + 10);
    doc.save("Construction_Calculator.pdf");
}

/**
 * Loads saved data from cookies and reconstructs the table
 * Triggered on window load to restore previous session
 */
function loadData() {
    const savedData = getCookie("constructionData");
    if (savedData) {
        savedData.forEach(item => addRow(item.service, item.area));
    }
}

// Initialize table with saved data on page load
window.onload = loadData;