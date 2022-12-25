// send heartbeat to server

import { Tabs } from 'webextension-polyfill';
import {getIdleEventsFromLocalStore, getTabsFromLocalStore, IdleEvent} from './storage';
import { filterTabs } from './tabs';
import client from '../../trpc';

export async function prepareAndSendEvents() {
    console.log(`should send these events to the server: ${getTabsFromLocalStore()}`);
    console.log(`idle events: ${getIdleEventsFromLocalStore()}`);
  }
