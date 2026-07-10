function attachScanner(element) {
  element.addEventListener("input", () => {
    const text = element.innerText || element.value || "";
    const issues = scanText(text);

    element.classList.toggle("security-warning", issues.length > 0);

    let oldBox = document.getElementById("security-grammarly-box");
    if (oldBox) oldBox.remove();

    if (issues.length > 0) {
      const box = document.createElement("div");
      box.id = "security-grammarly-box";
      box.innerHTML = `
        <strong>Security warning</strong>
        <ul>
          ${issues.map(i => `<li>${i.message}</li>`).join("")}
        </ul>
      `;
      document.body.appendChild(box);
    }
  });
}

function init() {
  const fields = document.querySelectorAll("textarea, input[type='text'], [contenteditable='true']");
  fields.forEach(attachScanner);
}

init();

const observer = new MutationObserver(init);
observer.observe(document.body, { childList: true, subtree: true });