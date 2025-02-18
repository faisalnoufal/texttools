// Initialize variables
let convertToUnderscore = true;
let history = [];
let historyIndex = -1;

// Get DOM elements
const textarea = document.getElementById("input");
const output = document.getElementById("output");
const delimiterInput = document.getElementById("delimiter");
const inputCount = document.getElementById("inputCount");
const outputCount = document.getElementById("outputCount");

// Function to replace spaces with delimiters or vice versa
function autoConvert() {
  let text = textarea.value;
  const delimiter = delimiterInput.value || "_";
  if (convertToUnderscore) {
    output.textContent = text.replace(/ /g, delimiter);
  } else {
    output.textContent = text.replace(new RegExp(delimiter, "g"), " ");
  }
  updateCharacterCount();
}

// Function to update character count
function updateCharacterCount() {
  inputCount.textContent = textarea.value.length;
  outputCount.textContent = output.textContent.length;
}

// Auto-resize textarea
function autoResize(element) {
  element.style.height = "auto";
  element.style.height = element.scrollHeight + "px";
}

// Event listeners
textarea.addEventListener("input", () => {
  autoResize(textarea);
  autoConvert();
  updateHistory();
});

delimiterInput.addEventListener("input", autoConvert);

document.getElementById("toggleMode").addEventListener("click", () => {
  convertToUnderscore = !convertToUnderscore;
  autoConvert();
});

document.getElementById("copyButton").addEventListener("click", () => {
  navigator.clipboard.writeText(output.textContent).then(() => {
    alert("Text copied to clipboard!");
  });
});

document.getElementById("downloadButton").addEventListener("click", () => {
  const blob = new Blob([output.textContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "converted_text.txt";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("clearButton").addEventListener("click", () => {
  textarea.value = "";
  output.textContent = "";
  updateCharacterCount();
});

document.getElementById("undoButton").addEventListener("click", () => {
  if (historyIndex > 0) {
    historyIndex--;
    textarea.value = history[historyIndex];
    autoConvert();
  }
});

document.getElementById("redoButton").addEventListener("click", () => {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    textarea.value = history[historyIndex];
    autoConvert();
  }
});

document.getElementById("toggleDarkMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Function to update history
function updateHistory() {
  const text = textarea.value;
  history = history.slice(0, historyIndex + 1);
  history.push(text);
  historyIndex++;
}
