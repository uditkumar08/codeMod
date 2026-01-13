let hiddenResult = ""; // 🔒 stores AI response secretly

async function send() {
  const inputEl = document.getElementById("input");
  const text = inputEl.value.trim();

  if (!text) return alert("Enter something");

  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });

    const data = await res.json();

    // ✅ Store result but DO NOT show
    hiddenResult = data.result;

    inputEl.value = "";
    console.log("Response received (hidden)");

  } catch (err) {
    console.error("Submit failed", err);
  }
}

function copy() {
  if (!hiddenResult) {
    alert("Nothing to copy. Submit first.");
    return;
  }

  navigator.clipboard.writeText(hiddenResult);
  
}
