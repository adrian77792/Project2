 // Run after DOM is fully loaded
 document.addEventListener("DOMContentLoaded", function () {
            // Dynamically insert the current year into the element with id="year"
            document.getElementById("year").textContent = new Date().getFullYear();
            
            // Rotating footer message logic
            const footerText = document.getElementById("footer-text");
            const messages = [
               "Thank you for visiting our site!",
                "Contact us if you have any questions.",
                "Follow our news and promotions!",
                "Stay with us for a while!",
            ];

            let index = 0;

            // Every 3 seconds, update the footer message in a loop
            setInterval(() => {
                index = (index + 1) % messages.length;
                footerText.innerHTML = `&copy; ${new Date().getFullYear()} MarexLux. ${messages[index]}`;
            }, 3000);
        });

        // Another DOMContentLoaded listener for navigation bar behavior
        document.addEventListener("DOMContentLoaded", function () {
            var navbarMenu = document.querySelector("#navbarMenu");
            var containerFluid = document.querySelector(".container-fluid");
    
            // Initialize Bootstrap Collapse component without toggling it immediately
            var bsCollapse = new bootstrap.Collapse(navbarMenu, { toggle: false });
    
            // Utility: delay execution for a given number of milliseconds
            function delay(ms) {
                return new Promise(function(resolve) {
                    setTimeout(resolve, ms);
                });
            }
    
             // Check if the mouse is currently hovering over the container-fluid element
            function isMouseOverContainerFluid(event) {
                return containerFluid.contains(event.target);
            }
    
             /**
             * Detects mouse movement and conditionally collapses the navbar:
             * If the mouse leaves the container-fluid area and stays out for 500ms,
             * the navigation menu will automatically close.
             */
            document.addEventListener("mousemove", function(event) {
                
                // Wait 500ms before checking again and potentially closing the menu
                if (!isMouseOverContainerFluid(event)) {
                    
                    // Wait 500ms before checking again and potentially closing the menu
                    delay(500).then(function () {
                        if (!isMouseOverContainerFluid(event)) {
                            bsCollapse.hide(); // Collapse the navbar menu
                        }
                    });
                }
            });
        });