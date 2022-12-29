import { TabEvent } from './tabs';
// send heartbeat to server

import { Tabs } from 'webextension-polyfill';
import {getIdleEventsFromLocalStore, getTabsFromLocalStore, IdleEvent} from './storage';
import { filterTabs } from './tabs';
import client from '../../trpc';

export function sendEvents(events: TabEvent[]) { // move this to the api file
    console.log('should send events to the server')
  }
  