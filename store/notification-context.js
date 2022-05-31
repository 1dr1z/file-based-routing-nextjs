import React, { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
  notification: null, //{title,message,status}
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
  const [activeNotification, setActiveNotification] = useState(null); //{title,message,status}

  useEffect(() => {
    let timeout;
    if (
      (activeNotification && activeNotification.status === 'success') ||
      (activeNotification && activeNotification.status === 'error')
    ) {
      timeout = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [activeNotification]);
  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData);
  };
  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };
  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
