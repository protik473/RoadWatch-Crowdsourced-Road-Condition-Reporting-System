async function submitReport() {
  const image = document.getElementById("imageInput").value;
  if (!image) {
    alert("Please upload an image");
    return;
  }

  const severity = fakeAIScan();

  const res = await fetch("http://localhost:5000/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      severity,
      location: { lat: 28.61, lng: 77.20 }
    })
  });

  const data = await res.json();

  reports.unshift(data);
  addMarker();
  renderReports();

  document.getElementById("imageInput").value = "";
}

function fakeAIScan() {
  const levels = ["Low", "Medium", "High"];
  return levels[Math.floor(Math.random() * levels.length)];
}

function addMarker() {
  if (!map) return;
  const position = {
    lat: 28.6 + Math.random() * 0.05,
    lng: 77.2 + Math.random() * 0.05,
  };
  const marker = new google.maps.Marker({ position, map });
  markers.push(marker);
}

function renderReports() {
  const list = document.getElementById("reportList");
  const empty = document.getElementById("emptyText");

  list.innerHTML = "";
  empty.style.display = reports.length === 0 ? "block" : "none";

  reports.forEach(r => {
    const div = document.createElement("div");
    div.className = "report";
    div.innerHTML = `
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span class="badge ${r.severity.toLowerCase()}">${r.severity}</span>
        <span style="font-size:12px;color:#cbd5f5;">${r.status}</span>
      </div>
      <p style="font-size:14px;color:#e5e7eb;">Road damage reported by citizen.</p>
    `;
    list.appendChild(div);
  });
}
