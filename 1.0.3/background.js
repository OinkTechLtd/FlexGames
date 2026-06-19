chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon48.png',
      title: 'Добро пожаловать в GoidaX!',
      message: 'Расширение успешно установлено. Нажми на иконку для активации.'
    });
  }
});

let timerInterval = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startTimer') {
    let timeLeft = 60 * 60; // 60 minutes in seconds
    
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      
      chrome.runtime.sendMessage({
        action: 'updateTimer',
        time: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      });
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon48.png',
          title: 'GoidaX',
          message: 'Время активации истекло. Активируй снова!'
        });
      }
    }, 1000);
  }
});