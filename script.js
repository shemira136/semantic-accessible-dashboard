"use strict";

/* Semantic Accessibility Dashboard */

/**
 * Accessible modal dialog functionality.
 * The HTML page should contain:
 * #open-modal, #accessible-modal, and #close-modal.
 */

document.addEventListener("DOMContentLoaded", () => {
    const openButton = document.getElementById("open-modal");
    const modal = document.getElementById("accessible-modal");
    const closeButton = document.getElementById("close-modal");

    if (openButton && modal && closeButton) {
        let previousFocus = null;

        function openModal() {
            previousFocus = document.activeElement;

            if (typeof modal.showModal === "function") {
                modal.showModal();
            } else {
                modal.setAttribute("open", "");
            }

            closeButton.focus();
        }

        function closeModal() {
            if (typeof modal.close === "function" && modal.open) {
                modal.close();
            } else {
                modal.removeAttribute("open");
            }

            if (previousFocus) {
                previousFocus.focus();
            }
        }

        openButton.addEventListener("click", openModal);
        closeButton.addEventListener("click", closeModal);

        modal.addEventListener("close", () => {
            if (previousFocus) {
                previousFocus.focus();
            }
        });

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    /* Accessible form validation feedback */

    const form = document.getElementById("accessible-form");
    const status = document.getElementById("form-status");

    if (form && status) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                status.textContent =
                    "Please correct the required fields before submitting.";
                return;
            }

            status.textContent =
                "Form validation successful. This is a demonstration; no data was sent.";
        });
    }
});
