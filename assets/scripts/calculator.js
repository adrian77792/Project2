const services = {
    "Malowanie": 20,
    "Tapetowanie": 25,
    "Tynkowanie": 30,
    "Gładź": 35,
    "Układanie płytek": 40,
    "Murowanie": 50
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

function addRow(service = "Malowanie", area = 1) {
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
    cell3.textContent = services[select.value] + " zł";
    
    const cell4 = row.insertCell(3);
    cell4.textContent = services[select.value] * input.value + " zł";
    
    const cell5 = row.insertCell(4);
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Usuń";
    removeBtn.onclick = function () {
        table.deleteRow(row.rowIndex - 1);
        updateTotal();
    };
    cell5.appendChild(removeBtn);
    
    select.onchange = function () {
        cell3.textContent = services[select.value] + " zł";
        cell4.textContent = services[select.value] * input.value + " zł";
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
        row.cells[3].textContent = price + " zł";
        total += price;
        data.push({ service, area });
    });
    document.getElementById("totalPrice").textContent = total;
    setCookie("constructionData", data, 7);
}
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Kalkulator Budowlany", 10, 10);
    let y = 20;
    doc.autoTable({
        head: [["Usługa", "Powierzchnia (m²)", "Cena za m²", "Łączna cena"]],
        body: Array.from(document.querySelectorAll("#servicesTable tr")).map(row => [
            row.cells[0].querySelector("select").value,
            row.cells[1].querySelector("input").value,
            row.cells[2].textContent,
            row.cells[3].textContent
        ]),
        startY: y
    });
    doc.text(`Łączna cena: ${document.getElementById("totalPrice").textContent} zł`, 10, doc.autoTable.previous.finalY + 10);
    doc.save("kalkulator_budowlany.pdf");
}
function loadData() {
    const savedData = getCookie("constructionData");
    if (savedData) {
        savedData.forEach(item => addRow(item.service, item.area));
    }
}

window.onload = loadData;