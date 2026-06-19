let timerInterval;
let timeLeft = 60 * 60; // 60 minutes in seconds

document.getElementById('activateBtn').addEventListener('click', activateBypass);

document.getElementById('customDnsBtn').addEventListener('click', showCustomDns);
document.getElementById('openSitesBtn').addEventListener('click', openBlockedSites);

function activateBypass() {
  const btn = document.getElementById('activateBtn');
  btn.textContent = 'АКТИВИРОВАНО';
  btn.style.background = 'linear-gradient(135deg, #00cc66, #0099ff)';
  
  chrome.storage.local.set({ active: true, endTime: Date.now() + timeLeft * 1000 });
  
  startTimer();
  
  chrome.notifications.create({
    title: 'GoidaX',
    message: 'Обход активирован на 60 минут! Рекомендуем использовать DNS 1.1.1.1',
    iconUrl: 'icon48.png',
    type: 'basic'
  });
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  
  timerInterval = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById('activateBtn').textContent = 'АКТИВИРОВАТЬ ОБХОД';
      document.getElementById('timer').textContent = '00:00';
      chrome.storage.local.set({ active: false });
    }
  }, 1000);
}

function showCustomDns() {
  const services = ['YouTube', 'TikTok', 'ChatGPT', 'Grok', 'Twitter/X'];
  let dnsConfig = 'Рекомендуемые DNS:\n1.1.1.1 (Cloudflare)\n8.8.8.8 (Google)\n\nДля YouTube/TikTok используй NextDNS или AdGuard DNS';
  alert(dnsConfig);
}

function openBlockedSites() {
  const sites = [
    'https://www.youtube.com',
    'https://www.tiktok.com',
    'https://x.com',
    'https://chat.openai.com'
  ];
  sites.forEach(site => chrome.tabs.create({ url: site }));
}

chrome.storage.local.get(['active', 'endTime'], (data) => {
  if (data.active && data.endTime > Date.now()) {
    timeLeft = Math.floor((data.endTime - Date.now()) / 1000);
    document.getElementById('activateBtn').textContent = 'АКТИВИРОВАНО';
    startTimer();
  }
});

// Приветствие при открытии popup
window.onload = () => {
  chrome.notifications.create({
    title: 'Добро пожаловать в GoidaX!',
    message: 'Нажми большую кнопку для активации обхода',
    iconUrl: 'icon48.png',
    type: 'basic'
  });
};