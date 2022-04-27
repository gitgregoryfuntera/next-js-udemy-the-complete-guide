import Link from 'next/link'
const EventItem = (props) => {
  const { id, title, description, location, date, image } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const formattedAddress = location.replace(",", "\n");
  return (
    <li>
      <img src={`/${image}`} alt={title} />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div>
            <address>{formattedAddress}</address>
          </div>
          <div>
          <Link href={`/events/${id}`}>
          <a>{id}</a>
        </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
