const url =
  "https://next-js-course-dee8e-default-rtdb.asia-southeast1.firebasedatabase.app/events.json";

const getEvents = async () => {
  const fetchedEvents = await fetchEvents();
  console.log(
    "🚀 ~ file: getEvents.js ~ line 6 ~ getEvents ~ fetchedEvents",
    fetchedEvents
  );
  return transformObjToArr(fetchedEvents);
};

const getEventById = async (id) => {
  const events = await getEvents();
  console.log(
    "🚀 ~ file: getEventsHelper.js ~ line 15 ~ getEventById ~ events",
    events
  );
  return events.find((event) => event.id === id);
};

const transformObjToArr = (response) => {
  const arr = [];
  for (const key in response) {
    arr.push({
      id: key,
      ...response[key],
    });
  }
  return arr;
};

const fetchEvents = async () => {
  const response = await fetch(url);
  return response.json();
};

const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;
  const events = await getEvents();
  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

export { url, getEvents, getEventById, transformObjToArr, getFilteredEvents};
