chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.notifications.create({
      title: 'GoidaX установлен!',
      message: 'Спасибо, что выбрал GoidaX! Для лучшего обхода используй зарубежный DNS (1.1.1.1).',
      iconUrl: 'icon48.png',
      type: 'basic'
    });
  }
});

// Прощание при удалении (не работает напрямую, но можно отслеживать)
chrome.runtime.onSuspend.addListener(() => {
  console.log('GoidaX: До встречи! Рекомендуем вернуться через 30 дней.');
});