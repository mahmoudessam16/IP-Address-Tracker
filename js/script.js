const BASE_URL = "https://geo.ipify.org/api/v2/country,city";
const API_KEY = "at_nqnNgiG6sKBvN4D8WY3tauDoCeyN5";

// elements
const ip_address_ele = document.getElementById("ip-address");
const location_ele = document.getElementById("location");
const timezone_ele = document.getElementById("timezone");
const isp_ele = document.getElementById("isp");

const loading = document.querySelector(".loading");
const container = document.getElementById("ip-data");

const form = document.querySelector("form");
const input = document.querySelector("input");

// Loading
function setLoading(state) {
  if (state) {
    loading.style.display = "block";
    document.querySelectorAll("#ip-data article").forEach((el) => {
      el.style.display = "none";
    });
  } else {
    loading.style.display = "none";
    document.querySelectorAll("#ip-data article").forEach((el) => {
      el.style.display = "block";
    });
  }
}

// Validation
function isValidIP(ip) {
  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  return ipRegex.test(ip);
}

function isValidDomain(domain) {
  const domainRegex = /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}

// Fetch data
async function fetchIPData(query) {
  let url = `${BASE_URL}?apiKey=${API_KEY}`;

  if (isValidIP(query)) {
    url += `&ipAddress=${query}`;
  } else if (isValidDomain(query)) {
    url += `&domain=${query}`;
  } else {
    throw new Error("Invalid IP or domain");
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// UI update
function updateUI(data) {
  ip_address_ele.textContent = data.ip;
  location_ele.textContent = `${data.location.city}, ${data.location.country}, ${data.location.region}`;
  timezone_ele.textContent = `UTC ${data.location.timezone}`;
  isp_ele.textContent = data.isp;
}

// Leaflet Map setup
var map = L.map("map").setView([30.0444, 31.2357], 13);

var blackLocationIcon = L.icon({
  iconUrl: "../images/icon-location.svg",
  iconSize: [40, 55],
  iconAnchor: [22, 55],
});

var marker = L.marker([30.0444, 31.2357], {
  icon: blackLocationIcon,
}).addTo(map);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Update Map
function updateMap(lat, lng) {
  map.flyTo([lat, lng], 15, {
    animate: true,
    duration: 2,
  });

  marker.setLatLng([lat, lng]);
}

// Init (first load)
async function init() {
  try {
    setLoading(true);

    const ipRes = await fetch("https://api.ipify.org?format=json");
    const { ip } = await ipRes.json();

    const data = await fetchIPData(ip);

    updateUI(data);
    updateMap(data.location.lat, data.location.lng);

    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
}

init();

// Search handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const value = input.value.trim();

  if (!value) return;

  try {
    setLoading(true);

    const data = await fetchIPData(value);

    updateUI(data);
    updateMap(data.location.lat, data.location.lng);

    setLoading(false);
  } catch (err) {
    alert(
      "Please enter a valid IP address or domain like: 8.8.8.8 - google.com - chatgpt.com",
    );
    setLoading(false);
  }
});
