<<<<<<< HEAD
const reports = [];
let map;
const markers = [];

const imageInput = document.getElementById("imageInput");
const fileBox = document.getElementById("fileBox");
const fileText = document.getElementById("fileText");
const submitBtn = document.getElementById("submitBtn");
const severityInput = document.getElementById("severity");

// OPEN FILE DIALOG
fileBox.addEventListener("click", () => {
  imageInput.click();
});

// SHOW FILE NAME
const previewImage = document.getElementById("previewImage");

imageInput.addEventListener("change", () => {
  if (imageInput.files.length) {
    const file = imageInput.files[0];
    fileText.textContent = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});


// SEVERITY SELECTION
document.querySelectorAll(".sev").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".sev").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    severityInput.value = card.dataset.level;
  });
});

// SUBMIT
submitBtn.addEventListener("click", submitReport);

navigator.geolocation.getCurrentPosition(async position => {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  const formData = new FormData();
  formData.append("image", imageInput.files[0]);
  formData.append("severity", severityInput.value);
  formData.append("lat", lat);
  formData.append("lng", lng);

  const res = await fetch("http://localhost:5000/api/reports", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  addMarker(data.severity, data.location, data.imageUrl, data.status);
});



// RENDER REPORTS
=======
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

>>>>>>> 3f37c786ac841f45ad1d12aee0c28abcd164e886
function renderReports() {
  const list = document.getElementById("reportList");
  const empty = document.getElementById("emptyText");

  list.innerHTML = "";
<<<<<<< HEAD
  empty.style.display = reports.length ? "none" : "block";
=======
  empty.style.display = reports.length === 0 ? "block" : "none";
>>>>>>> 3f37c786ac841f45ad1d12aee0c28abcd164e886

  reports.forEach(r => {
    const div = document.createElement("div");
    div.className = "report";
<<<<<<< HEAD
    div.innerHTML = `<strong>${r.severity}</strong> – ${r.status}`;
    list.appendChild(div);
  });
}
async function loadReports() {
  const res = await fetch("http://localhost:5000/api/reports");
  const data = await res.json();

  data.forEach(report => {
    addMarker(report.severity, report.location, report.imageUrl, report.status);
  });
}

window.onload = loadReports;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.6139, lng: 77.2090 }, // Delhi
    zoom: 12,
  });
}

function addMarker(severity, location, imageUrl, status) {
  const marker = new google.maps.Marker({
    position: location,
    map,
  });

  const info = new google.maps.InfoWindow({
    content: `
      <div style="width:150px">
        <img src="${imageUrl}" style="width:100%;border-radius:8px"/>
        <p><b>${severity}</b></p>
        <p>Status: ${status}</p>
      </div>
    `
  });

  marker.addListener("click", () => info.open(map, marker));
}

function renderAdmin(reports) {
  const admin = document.getElementById("adminList");
  admin.innerHTML = "";

  reports.forEach(r => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${r.severity} - ${r.status}</p>
      <button onclick="updateStatus('${r._id}','Fixed')">Mark Fixed</button>
    `;
    admin.appendChild(div);
  });
}

async function updateStatus(id, status) {
  await fetch(`http://localhost:5000/api/reports/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  location.reload();
}

//Hearmap logic

let heatmap;

function renderHeatmap(reports) {
  const points = reports.map(r =>
    new google.maps.LatLng(r.location.lat, r.location.lng)
  );

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: points,
    map,
  });

  renderHeatmap(data);

}

=======
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
>>>>>>> 3f37c786ac841f45ad1d12aee0c28abcd164e886
