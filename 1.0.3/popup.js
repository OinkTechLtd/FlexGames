let isActive = false;
let timerInterval;

document.getElementById('activateBtn').addEventListener('click', () => {
  if (isActive) return;
  
  isActive = true;
  document.getElementById('status').textContent = 'Активация... Рекомендуем DNS 1.1.1.1';
  document.getElementById('activateBtn').textContent = 'АКТИВНО';
  document.getElementById('activateBtn').style.background = 'linear-gradient(45deg, #00cc88, #00aa66)';
  
  // Start timer
  chrome.runtime.sendMessage({ action: 'startTimer' });
  
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon48.png',
    title: 'GoidaX Активен!',
    message: 'DNS-рекомендация: 1.1.1.1 или 8.8.8.8. Таймер 60 минут запущен.'
  });
});

document.getElementById('customDnsBtn').addEventListener('click', () => {
  const services = ['YouTube', 'TikTok', 'ChatGPT', 'Groq', 'Claude'];
  const dns = '1.1.1.1'; // Example
  alert(`Собственный DNS для ${services.join(', ')}:\n\nDNS: ${dns}\n\nДобавь в настройки сети!`);
});

document.getElementById('sitesBtn').addEventListener('click', () => {
  const sites = [
    'https://www.youtube.com',
    'https://www.tiktok.com',
    'https://x.com'
  ];
  sites.forEach(site => chrome.tabs.create({ url: site }));
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'updateTimer') {
    document.getElementById('timer').textContent = message.time;
  }
});