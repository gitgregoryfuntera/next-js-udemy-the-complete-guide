import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRight from "../icons/arrow-right-icon";
import Button from "../ui/button";
import classes from "./event-item.module.css";

const EventItem = (props) => {
  const { id, title, description, location, date, image } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const formattedAddress = location.replace(",", "\n");
  return (
    <li className={classes.item}>
      <img src={`/${image}`} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
          <div className={classes.actions}>
            <Button link={`/events/${id}`}>
              <span>Explore Event</span>
              <span className={classes.icon}>
                <ArrowRight />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
