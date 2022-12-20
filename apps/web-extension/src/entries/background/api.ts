// send heartbeat to server
import {getTabsFromLocalStore} from './storage';
import { filterTabs } from './tabs';

export async function sendEvents() {
    console.log(`should send these events to the server: ${getTabsFromLocalStore()}`);

    // get tabvs from local storage
    // filter tabs
    const filteredTabs = filterTabs(await getTabsFromLocalStore());
    console.log(`filtered tabs: ${filteredTabs}`);

    // send tabs to server
    throw new Error('Function not implemented.');
  }
