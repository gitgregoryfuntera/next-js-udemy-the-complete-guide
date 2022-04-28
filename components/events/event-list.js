import EventItem from "./event-item";
import classes from "./event-list.module.css";
const EventList = (props) => {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          id={event.id}
          title={event.title}
          description={event.description}
          date={event.date}
          image={event.image}
          location={event.location}
          key={event.id}
        />
      ))}
    </ul>
  );
};

export default EventList;
