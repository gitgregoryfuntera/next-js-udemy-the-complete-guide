import EventItem from "./event-item";

const EventList = (props) => {
  const { items } = props;
  return (
    <ul>
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
