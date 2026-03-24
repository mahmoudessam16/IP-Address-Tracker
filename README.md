# IP address tracker

![Design preview for the IP address tracker](preview.jpg)

A simple and interactive web application that allows users to track IP addresses or domain names and visualize their geographical location on a map.

## Features

- Detects and displays the user's current IP address on initial load
- Search for any IP address or domain name
- Displays:
  - IP Address
  - Location (City, Country, Region)
  - Timezone
  - ISP
- Interactive map using Leaflet.js
- Smooth map transitions using flyTo animation
- Custom marker icon
- Input validation for both IP addresses and domain names
- Loading state while fetching data

---

## Tech Stack

- HTML5
- SASS (SCSS)
- JavaScript (ES6+)
- Leaflet.js
- Geo.IPify API

---

## 🔌 API Used

```js
const BASE_URL = "https://geo.ipify.org/api/v2/country,city";
```

## How It Works

1.  On page load:

- Fetches the user's public IP using ipify
- Sends it to Geo API
- Displays location data and updates the map

2.  On search:

- Validates input (IP or domain)
- Sends request to API
- Updates UI and map dynamically

---

## Core Logic

function isValidIP(ip) { ... }
function isValidDomain(domain) { ... }
async function fetchIPData(query) { ... }
function updateUI(data) { ... }
function updateMap(lat, lng) { ... }
function setLoading(state) { ... }

---

## Map Behavior

1.  Smooth movement:
    map.flyTo([lat, lng], 15, { duration: 2 });
2.  Update marker:
    marker.setLatLng([lat, lng]);

---

## Validation Rules

1. Accepts:
   Valid IPv4 (e.g. 8.8.8.8)
   Valid domains (e.g. google.com)
2. Rejects:
   Invalid formats
   Empty input
   URLs with protocol (https://...)

---

## Example Inputs

8.8.8.8
1.1.1.1
google.com
github.com
chatgpt.com
