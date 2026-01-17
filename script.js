let reports = [];
let map;
let markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.6139, lng: 77.2090 },
    zoom: 12,
  });
}


function submitReport() {
  const image = document.getElementById("imageInput").value;
  const severity = document.getElementById("severity").value;

  if (!image) {
    alert("Please upload an image");
    return;
  }

    // Fake AI Severity Detection
  const aiSeverity = fakeAIScan();

  const report = {
    id: Date.now(),
    severity: aiSeverity,
    status: "Reported",
  };

    addMarker();
  reports.unshift(report);
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
