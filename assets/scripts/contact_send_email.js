
emailjs.init("hvLkYvpp1sB2v6pHM");

const form = document.getElementById("contact-form");
const responseDiv = document.getElementById("form-response");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    emailjs.send("service_b949jof", "template_abt2a7c", Object.fromEntries(formData))
        .then(function () {
            responseDiv.textContent = "Message sent successfully!";
            responseDiv.style.display = "block";
            responseDiv.style.color = "green";
            form.reset();
        })
        .catch(function (error) {
            responseDiv.textContent = "Failed to send message. Please try again.";
            responseDiv.style.display = "block";
            responseDiv.style.color = "red";
            console.error("EmailJS Error:", error);
        });
});
