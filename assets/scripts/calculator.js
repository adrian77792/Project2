const services = {
    "Painting": 20,
    "Wallpapering": 25,
    "Plastering": 30,
    "Smoothing": 35,
    "Tiling": 40,
    "Bricklaying": 50
};

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + JSON.stringify(value) + ";expires=" + d.toUTCString() + ";path=/";
}

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

function addRow(service = "Painting", area = 1) {
    const table = document.getElementById("servicesTable");
    const row = table.insertRow();
    
    const cell1 = row.insertCell(0);
    const select = document.createElement("select");
    for (const s in services) {
        let option = document.createElement("option");
        option.value = s;
        option.textContent = s;
        if (s === service) option.selected = true;
        select.appendChild(option);
    }
    cell1.appendChild(select);
    
    const cell2 = row.insertCell(1);
    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.value = area;
    input.oninput = updateTotal;
    cell2.appendChild(input);
    
    const cell3 = row.insertCell(2);
    cell3.textContent = services[select.value] + " £";
    
    const cell4 = row.insertCell(3);
    cell4.textContent = services[select.value] * input.value + " £";
    
    const cell5 = row.insertCell(4);
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.onclick = function () {
        table.deleteRow(row.rowIndex - 1);
        updateTotal();
    };
    cell5.appendChild(removeBtn);
    
    select.onchange = function () {
        cell3.textContent = services[select.value] + " £";
        cell4.textContent = services[select.value] * input.value + " £";
        updateTotal();
    };
    updateTotal();
}

function updateTotal() {
    let total = 0;
    let data = [];
    document.querySelectorAll("#servicesTable tr").forEach(row => {
        const service = row.cells[0].querySelector("select").value;
        const area = row.cells[1].querySelector("input").value;
        const price = services[service] * area;
        row.cells[3].textContent = price + " £";
        total += price;
        data.push({ service, area });
    });
    document.getElementById("totalPrice").textContent = total;
    setCookie("constructionData", data, 7);
}
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
    doc.text(`Total price: ${document.getElementById("totalPrice").textContent} £`, 10, doc.autoTable.previous.finalY + 10);
    doc.save("Construction_Calculator.pdf");
}
function loadData() {
    const savedData = getCookie("constructionData");
    if (savedData) {
        savedData.forEach(item => addRow(item.service, item.area));
    }
}

window.onload = loadData;