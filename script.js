let reports = [];

function submitReport() {
  const image = document.getElementById("imageInput").value;
  const severity = document.getElementById("severity").value;

  if (!image) {
    alert("Please upload an image");
    return;
  }

  const report = {
    id: Date.now(),
    severity,
    status: "Reported",
  };

  reports.unshift(report);
  renderReports();

  document.getElementById("imageInput").value = "";
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
