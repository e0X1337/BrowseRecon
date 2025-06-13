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

## Want to put in bookmarklet instead ?

```javascript:(function(){  const domain = window.location.hostname;  const vtKey = 'xxxxx';  const win = window.open('about:blank');  if (!win) { alert("Popup blocked – allow popups for this site."); return; }  win.document.write(`<p style="font-family:monospace;">Recon started for <b>${domain}</b>...<br>Fetching URLs from Wayback, VirusTotal, and AlienVault.</p>`);  const urls = new Set();  const fetchWayback = () =>    fetch(`https://corsproxy.io/?${encodeURIComponent(`https://web.archive.org/cdx/search/cdx?url=${domain}/*&fl=original&output=txt`)}`)      .then(r => r.text())      .then(t => t.split(%27\n%27).forEach(u => u && urls.add(u.trim())))      .catch(() => {});  const fetchVirusTotal = () =>    fetch(`https://corsproxy.io/?https://www.virustotal.com/vtapi/v2/domain/report?apikey=${vtKey}&domain=${domain}`)      .then(r => r.text())      .then(t => {        const matches = t.match(/https?:\/\/[^\s"%27<>\\)]+/g);        if (matches) matches.forEach(u => urls.add(u.trim()));      })      .catch(() => {});  const fetchAlienVault = () =>    fetch(`https://otx.alienvault.com/api/v1/indicators/hostname/${domain}/url_list?limit=500`)      .then(r => r.json())      .then(j => {        if (j.url_list) j.url_list.forEach(entry => urls.add(entry.url.trim()));      })      .catch(() => {});  Promise.all([fetchWayback(), fetchVirusTotal(), fetchAlienVault()]).then(() => {    const all = Array.from(urls).filter(Boolean).sort();    const escaped = all.map(u => u.replace(/</g, "&lt;").replace(/>/g, "&gt;")).join(%27\n%27);    win.document.body.innerHTML = `<h2 style="font-family:sans-serif;">${all.length} unique URLs found</h2><pre style="white-space:pre-wrap; font-family:monospace;">${escaped}</pre>`;  });})();

