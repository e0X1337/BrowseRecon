# BrowseRecon

**BrowseRecon** is a lightweight Chrome extension for passive reconnaissance and threat intelligence collection directly from your browser. It allows red teamers, bug bounty hunters, and OSINT analysts to instantly extract URLs and artifacts from:

- Wayback Machine (Internet Archive)
- VirusTotal (via public API)
- AlienVault OTX (Open Threat Exchange)

No setup. No scanning. Just click and pivot.

---

## Features

- Fetch historical URLs from the Wayback Machine
- Extract passive DNS and observed URLs from VirusTotal
- Pull threat-related URLs from AlienVault OTX
- Clean output in new tab
- 100% client-side JavaScript, no data is stored

---

## Installation

1. Clone this repo
2. Go to `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the folder containing `manifest.json`

---

## Usage

1. Visit any target domain (e.g., `example.com`)
2. Click the BrowseRecon extension icon
3. Choose from:
   - Wayback URLs
   - VirusTotal URLs (requires API key)
   - AlienVault URLs
4. A new tab will open with results

---

## Configuration

### VirusTotal API Key

Edit `popup.js` and replace:

```javascript
const apikey = 'YOUR_API_KEY_HERE';
