const { createContext, useState, useEffect } = require("react");

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: () => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
  const [notificationData, setNotificationData] = useState(null);

  useEffect(() => {
    if (
      notificationData &&
      (notificationData?.status === "error" ||
        notificationData?.status === "success")
    ) {
      const timer = setTimeout(() => hideNotificationHandler(), 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notificationData]);

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
