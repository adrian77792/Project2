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
                footerText.innerHTML = `&copy; ${new Date().getFullYear()} MarexLux. ${messages[index]}`;
            }, 5000);
        });

        document.addEventListener("DOMContentLoaded", function () {
            var navbarMenu = document.querySelector("#navbarMenu");
            var containerFluid = document.querySelector(".container-fluid");
    
            // Tworzymy instancję Collapse
            var bsCollapse = new bootstrap.Collapse(navbarMenu, { toggle: false });
    
            // Funkcja do opóźnienia
            function delay(ms) {
                return new Promise(function(resolve) {
                    setTimeout(resolve, ms);
                });
            }
    
            // Sprawdzamy, czy kursor jest nad elementem container-fluid
            function isMouseOverContainerFluid(event) {
                return containerFluid.contains(event.target);
            }
    
            // Dodatkowa obsługa dla zamykania menu, gdy kursor nie jest nad container-fluid
            document.addEventListener("mousemove", function(event) {
                // Jeśli kursor opuścił container-fluid
                if (!isMouseOverContainerFluid(event)) {
                    //console.log("Kursor opuścił container-fluid, czekam 500ms przed zamknięciem.");
    
                    delay(500).then(function () {
                        // Jeśli kursor nadal nie jest nad container-fluid, zamknij menu
                        if (!isMouseOverContainerFluid(event)) {
                            //console.log("Zamykam menu, kursor nie jest nad container-fluid.");
                            bsCollapse.hide(); // Zamykanie menu
                        }
                    });
                }
            });
        });