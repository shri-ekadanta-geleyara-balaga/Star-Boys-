window.onload = function () {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main-content");

  if (!sessionStorage.getItem("introPlayed")) {
    setTimeout(() => {
      intro.style.display = "none";
      main.classList.remove("hidden");
      sessionStorage.setItem("introPlayed", true);
    }, 2500);
  } else {
    intro.style.display = "none";
    main.classList.remove("hidden");
  }

  document.getElementById("currentYear").innerText =
    new Date().getFullYear();
};
