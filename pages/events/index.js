import React from "react";
import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../data/dummy-data";

const EventsPage = () => {
  const allEvents = getAllEvents();
  return <>
    <EventList items={allEvents}/>
  </>;
};

export default EventsPage;
