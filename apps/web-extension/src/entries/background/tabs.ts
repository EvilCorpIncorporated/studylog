import type { Tabs } from 'webextension-polyfill';
import type { IdleEvent } from './storage';

export function filterTabs(tabs: Tabs.Tab[]) {
  return filterTabsNotAllowedWebsites(tabs);
}

export function isAllowedWebsite(url?: string): boolean {
  // TODO: add unit test; fix: function name does not match the code functionality
  const allowedWebsites: string[] = [
    'https://pluralsight.com',
    'https://github.com',
    'https://stackoverflow.com',
    'https://medium.com',
    'https://developer.mozilla.org',
    'https://mozilla.com',
    'https://w3schools.com',
    'https://towardsdatascience.com',
    'https://freecodecamp.org',
    'https://udemy.com',
    'https://udacity.com',
    'https://coursera.org',
    'https://edx.org',
    'https://khanacademy.org',
    'https://codecademy.com',
    'https://code.org',
    'https://sololearn.com',
    'https://skillshare.com',
    'https://datacamp.com',
  ];
  const allowedWebsitesRegex = new RegExp(`^(${allowedWebsites.join('|')})`);
  if (!url) {
    return false;
  }
  return allowedWebsitesRegex.test(url);
}

export function filterTabsNotAllowedWebsites(tabs: Tabs.Tab[]): Tabs.Tab[] {
  console.debug('should filter tabs');
  return tabs.filter(tab => isAllowedWebsite(tab.url));
}

export interface TabEvent {
  tab: Tabs.Tab;
  lastAccessed: number; // TODO: not representative of the data - should be lastAccessedTime if any. this data point is captured when the tab has finished loading
}

export function processEvents(tabEvents: TabEvent[], idleEvents: IdleEvent[]) {
  // TODO: add types
  // process events
  let validTabEvents: TabEvent[] = [];

  console.debug('tabEvents', tabEvents);
  console.debug('idleEvents', idleEvents);
  const allowedWebsitesTabEvents = getAllowedWebsitesTabEvents(tabEvents); // TODO: there might be a more desxcriptive name for this variable

  const activeIdleEvents = getActiveIdleEvents(idleEvents); // TODO: misleading function name/ not descriptive enough

  activeIdleEvents.forEach((idleEvent: IdleEvent) => {
    // find tabEvents in the idleEvent time range
    const allowedActiveTabEvents = getTabEventsInIdleEventTimeRange(allowedWebsitesTabEvents, idleEvent); // TODO: misleading function name/ not descriptive enough
    // const allowedWebsitesTabEvents = getAllowedWebsitesTabEvents(activeTabEvents);

    if (allowedActiveTabEvents.length) {
      validTabEvents = validTabEvents.concat(allowedActiveTabEvents);
    }
  });

  console.debug('validTabEvents', validTabEvents);
  return validTabEvents;
}

function getActiveIdleEvents(idleEvents: IdleEvent[]) {
  return idleEvents.filter((idleEvent: IdleEvent) => {
    return idleEvent.state === 'active';
  });
}

function getAllowedWebsitesTabEvents(tabEvents: TabEvent[]) {
  return tabEvents.filter((tabEvent: TabEvent) => {
    return isAllowedWebsite(tabEvent.tab.url);
  });
}

function getTabEventsInIdleEventTimeRange(tabEvents: TabEvent[], idleEvent: IdleEvent) {
  return tabEvents.filter((tabEvent: TabEvent) => {
    const condition = tabEvent.lastAccessed >= idleEvent.startTime && tabEvent.lastAccessed <= idleEvent.endTime;
    if (condition) {
      console.debug('tabEvent: ', tabEvent);
    }
    return tabEvent.lastAccessed >= idleEvent.startTime && tabEvent.lastAccessed <= idleEvent.endTime;
  });
}
