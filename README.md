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

## Want to put in bookmarklet instead ?
Have a read in here `https://medium.com/@jai.lani9001/weaponizing-bookmarklets-for-passive-recon-wayback-machine-virustotal-alienvault-9f4a736a1c8f`

## Recon Bookmarklet

Copy the following one-liner into a new bookmark’s URL field (make sure to use valid apikey):

```javascript
javascript:(function(){const domain=window.location.hostname;const vtKey='xxxxx';const win=window.open('about:blank');if(!win){alert("Popup blocked – allow popups for this site.");return;}win.document.write(`<p style="font-family:monospace;">Recon started for <b>${domain}</b>...<br>Fetching URLs from Wayback, VirusTotal & AlienVault.</p>`);const urls=new Set();const fetchWayback=()=>fetch(`https://corsproxy.io/?${encodeURIComponent(`https://web.archive.org/cdx/search/cdx?url=${domain}/*&fl=original&output=txt`)}`).then(r=>r.text()).then(t=>t.split('\n').forEach(u=>u&&urls.add(u.trim()))).catch(()=>{});const fetchVirusTotal=()=>fetch(`https://corsproxy.io/?https://www.virustotal.com/vtapi/v2/domain/report?apikey=${vtKey}&domain=${domain}`).then(r=>r.text()).then(t=>{const m=t.match(/https?:\/\/[^\s"%'<>\)]+/g);m&&m.forEach(u=>urls.add(u.trim()));}).catch(()=>{});const fetchAlienVault=()=>fetch(`https://otx.alienvault.com/api/v1/indicators/hostname/${domain}/url_list?limit=500`).then(r=>r.json()).then(j=>{j.url_list&&j.url_list.forEach(e=>urls.add(e.url.trim()));}).catch(()=>{});Promise.all([fetchWayback(),fetchVirusTotal(),fetchAlienVault()]).then(()=>{const all=Array.from(urls).filter(Boolean).sort();const esc=all.map(u=>u.replace(/</g,"&lt;").replace(/>/g,"&gt;")).join('\n');win.document.body.innerHTML=`<h2 style="font-family:sans-serif;">${all.length} unique URLs found</h2><pre style="white-space:pre-wrap;font-family:monospace;">${esc}</pre>`;});})();


