import {getIdleEventsFromLocalStore, getTabsFromLocalStore} from './storage';

export async function prepareAndSendEvents() {
    console.log(`should send these events to the server: ${getTabsFromLocalStore()}`);
    console.log(`idle events: ${getIdleEventsFromLocalStore()}`);
  }
