// Hero glow drifts toward the pointer for a subtle sense of depth.
// Skipped entirely for touch devices and reduced-motion preferences.

const glow = document.querySelector(".hero__glow");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = window.matchMedia("(hover: none)").matches;

if (glow && !prefersReducedMotion && !isTouchDevice) {
  const hero = document.querySelector(".hero");

  hero.addEventListener("pointermove", (event) => {
    const { left, top, width, height } = hero.getBoundingClientRect();
    const offsetX = ((event.clientX - left) / width - 0.5) * 60;
    const offsetY = ((event.clientY - top) / height - 0.5) * 60;

    glow.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
  });

  hero.addEventListener("pointerleave", () => {
    glow.style.transform = "translate(-50%, -50%)";
  });
}

// Contact form has no backend yet, so just confirm receipt in the UI.
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    formStatus.textContent = "Thanks — your message has been noted. I'll get back to you soon.";
    contactForm.reset();
  });
}
