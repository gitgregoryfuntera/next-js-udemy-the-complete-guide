const { createContext } = require("react");

const NotificationContext = createContext({
  notification, // {title, message, status}
  showNotification: () => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
  return (
    <NotificationContext.Provider>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
