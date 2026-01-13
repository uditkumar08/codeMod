let hidden = "";

async function send() {
  const text = document.getElementById("input").value.trim();
  if (!text) return;

  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: text })
  });

  const data = await res.json();
  hidden = data.result;
}

function copy() {
  if (!hidden) return alert("Nothing to copy");
  navigator.clipboard.writeText(hidden);
  alert("Copied!");
}
