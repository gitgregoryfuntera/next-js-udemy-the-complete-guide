import React, { useEffect, useState } from "react";
import EventList from "../components/events/event-list";
import EventsSearch from "../components/events/events-search";
import { useRouter } from "next/router";
import useSWR from "swr";

const url =
  "https://next-js-course-dee8e-default-rtdb.asia-southeast1.firebasedatabase.app/events.json";

const transformObjToArr = (object) => {
  const arr = [];
  for (const key in object) {
    arr.push({
      id: key,
      ...object[key],
    });
  }
  return arr;
};

const HomePage = (props) => {
  const { featuredEventsResponse } = props;
  const { data, error } = useSWR(url, (args) =>
    fetch(args).then((res) => res.json())
  );
  const [featuredEvents, setFeaturedEvents] = useState(featuredEventsResponse);

  useEffect(() => {
    if (data) {
      const tempFeaturedEvents = transformObjToArr(data);
      setFeaturedEvents(
        tempFeaturedEvents.filter((event) => event.isFeatured === true)
      );
    }
  }, [data]);

  const router = useRouter();

  const onSearch = (year, month) => {
    const path = `/events/${year}/${month}`;
    router.push(path);
  };

  if (!data && !featuredEvents) {
    return <>Loading...</>;
  }

  return (
    <div>
      <EventsSearch onSearch={onSearch} />
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;

export const getServerSideProps = async () => {
  const data = await fetch(url);
  const response = await data.json();
  console.log(
    "🚀 ~ file: index.js ~ line 63 ~ getServerSideProps ~ response",
    response
  );
  const featuredEventsResponse = transformObjToArr(response);
  return {
    props: {
      featuredEventsResponse: featuredEventsResponse.filter(
        (event) => event.isFeatured === true
      ),
    },
  };
};
