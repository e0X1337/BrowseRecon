async function getCurrentTabDomain() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let url = new URL(tab.url);
  return url.hostname;
}

document.getElementById("wayback").onclick = async () => {
  const domain = await getCurrentTabDomain();
  const rawUrl = `https://web.archive.org/cdx/search/cdx?url=${domain}/*&fl=original&output=txt`;
  const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(rawUrl)}`;
  window.open(proxiedUrl, "_blank");
};

document.getElementById("virustotal").onclick = async () => {
  const domain = await getCurrentTabDomain();
  const apikey = "YOUR_API_KEY_HERE";
  const url = `https://corsproxy.io/?https://www.virustotal.com/vtapi/v2/domain/report?apikey=${apikey}&domain=${domain}`;
  window.open(url, "_blank");
};

document.getElementById("alienvault").onclick = async () => {
  const domain = await getCurrentTabDomain();
  const url = `https://otx.alienvault.com/api/v1/indicators/hostname/${domain}/url_list?limit=500`;
  window.open(url, "_blank");
};
