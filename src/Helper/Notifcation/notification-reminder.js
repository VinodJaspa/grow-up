export const showNotification = (title, options) => {
    if (Notification.permission === "granted") {
      new Notification(title, options);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, options);
        }
      });
    }
  };
  
  export const playSound = () => {
    const audio = new Audio('/path/to/sound.mp3');
    audio.play();
  };
  
  export const setReminder = (time, message) => {
    const now = new Date();
    const reminderTime = new Date(time);
  
    const timeout = reminderTime.getTime() - now.getTime();
  
    if (timeout > 0) {
      setTimeout(() => {
        showNotification('Task Reminder', { body: message });
        playSound();
      }, timeout);
    }
  };
  