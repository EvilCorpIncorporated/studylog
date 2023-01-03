import type { TabEvent } from './tabs';
import { clearIdleEventsState, clearTabsState, getUserId } from './storage';
import client from '~/trpc';
// send heartbeat to server

function prepareEventsBeforeSending(events: TabEvent[]) {
  // FIXME: this long literal type is fishy, should at least partially extend `TabEvent`.
  const outgoingEvents: { tab: { active: boolean; title: string; url: string }; enter_time: Date }[] = [];

  for (const event of events) {
    outgoingEvents.push({
      tab: {
        active: event.tab.active,
        title: event.tab.title!, // TODO: remove '!', assure that the title is not null
        url: event.tab.url!, // TODO: remove '!' assure that the url is not null
      },
      enter_time: new Date(event.lastAccessed),
    });
  }

  return outgoingEvents;
}

export async function sendEvents(events: TabEvent[]) {
  // move this to the api file

  const eventsToSend = prepareEventsBeforeSending(events);
  const user_id = await getUserId();
  console.debug('user_id', user_id);

  if (user_id == null || user_id.length === 0) {
    console.debug('user_id is not defined or empty');
    return;
  }
  console.debug('should send events to the server');
  const response = await client.addEvents.mutate({
    user_id,
    events: eventsToSend,
  });
  console.debug('response', response);

  // make sure the response is successful, to clear the local storage
  if (response.length > 0) {
    // clear local storage
    console.debug('clearing local storage');
    await clearTabsState();
    await clearIdleEventsState();
  }
}
