 document.addEventListener("DOMContentLoaded", function () {
            document.getElementById("year").textContent = new Date().getFullYear();

            const footerText = document.getElementById("footer-text");
            const messages = [
                "Dziękujemy za odwiedzenie naszej strony!",
                "Skontaktuj się z nami, jeśli masz pytania.",
                "Śledź nasze nowości i promocje!",
                "Zostań z nami na dłużej!",
            ];

            let index = 0;
            setInterval(() => {
                index = (index + 1) % messages.length;
                footerText.innerHTML = `&copy; ${new Date().getFullYear()} MarekLux. ${messages[index]}`;
            }, 5000);
        });