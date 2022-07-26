const { createContext, useState } = require("react");

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: () => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
  const [notificationData, setNotificationData] = useState(null);

  const showNotificationHandler = (notificationData) => {
    setNotificationData({
      title: notificationData.title,
      message: notificationData.message,
      status: notificationData.status,
    });
  };

  const hideNotificationHandler = () => {
    setNotificationData(null);
  };

  const context = {
    notification: notificationData,
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
