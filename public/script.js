let hiddenResult = "";

async function send() {
  const input = document.getElementById("input").value.trim();
  if (!input) return;

  hiddenResult = ""; // reset

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });

    const data = await res.json();

    if (data.result) {
      hiddenResult = data.result;
    } else {
      alert(data.error || "Server error");
    }

  } catch (e) {
    alert("Network / Server failure");
  }
}

function copy() {
  if (!hiddenResult) {
    alert("Nothing to copy");
    return;
  }
  navigator.clipboard.writeText(hiddenResult);
  alert("Copied!");
}
