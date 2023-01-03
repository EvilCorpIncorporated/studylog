import type { TabEvent } from './tabs';
import client from '~/trpc';
import { clearIdleEventsState, clearTabsState, getUserId } from './storage';
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


  const eventsToSend = await prepareEventsBeforeSending(events);
  const user_id = await getUserId()
  console.log('user_id', user_id)

  if ( user_id === null || user_id === '') {
    console.log('user_id is null')
    return;
  }
  console.log('should send events to the server');
  const response = await client.addEvents.mutate(
    {
      user_id,
      events: eventsToSend,
    }
  )
  console.log('response', response)

  // make sure the response is successful, to clear the local storage
  if (response.length > 0) {
    // clear local storage
    console.log('clearing local storage')
    clearTabsState();
    clearIdleEventsState();  
  }
}
