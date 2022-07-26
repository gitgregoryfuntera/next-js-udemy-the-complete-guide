import { Fragment, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Notification from "../notification/notification";
import MainHeader from "./main-header";

function Layout(props) {
  const notificationContext = useContext(NotificationContext);
  const { notification } = notificationContext;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification?.title}
          message={notification?.message}
          status={notification?.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
