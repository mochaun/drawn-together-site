const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-slideshow]").forEach((slideshow) => {
  const track = slideshow.querySelector(".slideshow-track");
  const slides = Array.from(slideshow.querySelectorAll(".slideshow-track img"));
  const prev = slideshow.querySelector(".slide-prev");
  const next = slideshow.querySelector(".slide-next");
  const count = slideshow.querySelector(".slide-count");

  if (!track || slides.length === 0 || !prev || !next || !count) return;

  let current = 0;

  const update = () => {
    track.style.transform = `translateX(-${current * 100}%)`;
    count.textContent = `${current + 1} / ${slides.length}`;
  };

  prev.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    update();
  });

  next.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    update();
  });

  update();
});

document.querySelectorAll("[data-email-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const firstName = data.get("First name") || "";
    const lastName = data.get("Last name") || "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const subject = `Donation interest from ${fullName || "Drawn Together supporter"}`;
    const body = [
      "Drawn Together donation interest",
      "",
      `First name: ${firstName}`,
      `Last name: ${lastName}`,
      `Email: ${data.get("Email") || ""}`,
      `Donation interest: ${data.get("Donation interest") || ""}`,
      "",
      "Message:",
      data.get("Message") || ""
    ].join("\n");

    window.location.href = `mailto:drawntogetherofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
