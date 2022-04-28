import Link from "next/link";
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
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
          <div className={classes.actions}>
            <Link href={`/events/${id}`}>
              <a>Explore Event</a>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
