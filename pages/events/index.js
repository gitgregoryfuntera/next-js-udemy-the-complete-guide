import React from "react";
import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../data/dummy-data";
import { getEvents } from "../../utils/getEventsHelper";

const EventsPage = (props) => {
  const { allEvents } = props
  return <>
    <EventList items={allEvents}/>
  </>;
};

export default EventsPage;


export const getStaticProps = async () => {
  const events = await getEvents();
  return {
    props: {
      allEvents: events
    },
    revalidate: 1800,
  }
}