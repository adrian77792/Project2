// Initialize EmailJS with the public user key
// NOTE: This key should not expose sensitive data; it's safe to use client-side as per EmailJS design
emailjs.init("hvLkYvpp1sB2v6pHM");

// Get references to the contact form and the response message container
const form = document.getElementById("contact-form");
const responseDiv = document.getElementById("form-response");

// Attach a submit event listener to the form
// This allows us to intercept the default form submission and handle it via JavaScript
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data using the FormData API
    // This automatically captures all input fields with a `name` attribute
    const formData = new FormData(form);

    // Success handler: inform the user that the message was sent
    emailjs.send("service_b949jof", "template_abt2a7c", Object.fromEntries(formData))
        .then(function () {
            // Success handler: inform the user that the message was sent
            responseDiv.textContent = "Message sent successfully!";
            responseDiv.style.display = "block";
            responseDiv.style.color = "green";
             // Clear the form fields for better UX after successful submission
            form.reset();
        })
        .catch(function (error) {
             // Error handler: display an error message to the user
            responseDiv.textContent = "Failed to send message. Please try again.";
            responseDiv.style.display = "block";
            responseDiv.style.color = "red";
             // Log error details to the console for debugging purposes
            console.error("EmailJS Error:", error);
        });
});
