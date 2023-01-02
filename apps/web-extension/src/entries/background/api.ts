import type { TabEvent } from './tabs';
import client from '~/trpc';
import { getUserId } from './storage';
// send heartbeat to server

async function prepareEventsBeforeSending(events: TabEvent[]) {
  const outgoingEvents: { tab: { active: boolean; title: string; url: string }; enter_time: Date; }[] = [];

  events.forEach((event: TabEvent) => {
    outgoingEvents.push(
      {
        tab: {
          active: event.tab.active,
          title: event.tab.title!, // TODO: remove '!', assure that the title is not null
          url: event.tab.url!, // TODO: remove '!' assure that the url is not null
        },
        enter_time: new Date(event.lastAccessed),
      }
    )
  })
  return outgoingEvents;

}
export async function sendEvents(events: TabEvent[]) {
  // move this to the api file
  console.log('should send events to the server');

  const eventsToSend = await prepareEventsBeforeSending(events);
  const user_id = await getUserId()
  client.addEvents.mutate(
    {
      user_id,
      events: eventsToSend,
    }
  )

}
