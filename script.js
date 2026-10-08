// Renders PROJECTS (from projects.js) into a collapsible tree.

const STORAGE_KEY = "open-folders";

function loadOpenState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

function saveOpenState() {
  const open = [...document.querySelectorAll("details[data-path]")]
    .filter((d) => d.open)
    .map((d) => d.dataset.path);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(open));
  } catch {}
}

function isPdf(href) {
  return /\.pdf($|[?#])/i.test(href);
}

function renderEntry(entry, path, saved) {
  const li = document.createElement("li");

  if (entry.children) {
    const details = document.createElement("details");
    details.dataset.path = path;
    details.open = saved ? saved.includes(path) : !!entry.open;

    const summary = document.createElement("summary");
    summary.textContent = entry.name;
    details.appendChild(summary);

    const ul = document.createElement("ul");
    entry.children.forEach((child) =>
      ul.appendChild(renderEntry(child, `${path}/${child.name}`, saved))
    );
    details.appendChild(ul);
    details.addEventListener("toggle", saveOpenState);
    li.appendChild(details);
  } else if (entry.text) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = entry.name;
    button.className = "link note";
    button.addEventListener("click", () => openPopup(entry));
    li.appendChild(button);
  } else {
    const a = document.createElement("a");
    a.href = entry.href;
    a.textContent = entry.name;
    a.className = isPdf(entry.href) ? "link pdf" : "link page";
    a.target = "_blank";
    a.rel = "noopener";
    if (isPdf(entry.href)) {
      a.addEventListener("click", (e) => {
        // Plain clicks open the in-page viewer; ctrl/cmd/middle-click still open a new tab
        if (e.metaKey || e.ctrlKey || e.shiftKey || !canShowPdfInline()) return;
        e.preventDefault();
        openPdf(entry);
      });
    }
    li.appendChild(a);
  }

  return li;
}

const popup = document.getElementById("popup");

function openPopup(entry) {
  document.getElementById("popup-title").textContent = entry.name;
  const body = document.getElementById("popup-body");
  body.replaceChildren(
    ...entry.text.trim().split(/\n\s*\n/).map((para) => {
      const p = document.createElement("p");
      // ==like this== marks words to highlight
      para.trim().split(/==(.+?)==/).forEach((part, i) => {
        if (i % 2 === 1) {
          const mark = document.createElement("mark");
          mark.textContent = part;
          p.appendChild(mark);
        } else {
          p.appendChild(document.createTextNode(part));
        }
      });
      return p;
    })
  );
  popup.showModal();
}

const pdfViewer = document.getElementById("pdf-viewer");
const pdfFrame = document.getElementById("pdf-frame");

// Phones and some browsers can't show PDFs inside a page; there the link
// just opens the PDF in a new tab as normal.
function canShowPdfInline() {
  return navigator.pdfViewerEnabled !== false && window.matchMedia("(min-width: 700px)").matches;
}

function openPdf(entry) {
  document.getElementById("pdf-title").textContent = entry.name;
  document.getElementById("pdf-newtab").href = entry.href;
  pdfFrame.src = entry.href;
  pdfViewer.showModal();
}

// Stop loading the PDF once the viewer is closed
pdfViewer.addEventListener("close", () => pdfFrame.removeAttribute("src"));

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  // Close when clicking the dimmed backdrop outside the box
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
});

function setAll(open) {
  document.querySelectorAll("details[data-path]").forEach((d) => (d.open = open));
  saveOpenState();
}

const tree = document.getElementById("tree");
const saved = loadOpenState();
PROJECTS.forEach((entry) => tree.appendChild(renderEntry(entry, entry.name, saved)));

document.getElementById("expand-all").addEventListener("click", () => setAll(true));
document.getElementById("collapse-all").addEventListener("click", () => setAll(false));

// Light/dark toggle. Dark is the default; a choice is remembered.
const themeToggle = document.getElementById("theme-toggle");

function isDark() {
  return document.documentElement.dataset.theme !== "light";
}

function updateThemeButton() {
  themeToggle.textContent = isDark() ? "☀ Light mode" : "☾ Dark mode";
}

themeToggle.addEventListener("click", () => {
  const theme = isDark() ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  updateThemeButton();
});
updateThemeButton();
