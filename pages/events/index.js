import React from "react";
import EventList from "../../components/events/event-list";
import { getEvents } from "../../utils/getEventsHelper";
import Head from "next/head";

const EventsPage = (props) => {
  const { allEvents } = props;
  return (
    <>
      <Head>
        <title>Events List</title>
        <meta name="description" content="Events List is here..." />
      </Head>
      <EventList items={allEvents} />
    </>
  );
};

export default EventsPage;

export const getStaticProps = async () => {
  const events = await getEvents();
  return {
    props: {
      allEvents: events,
    },
    revalidate: 1800,
  };
};
