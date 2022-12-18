import browser from 'webextension-polyfill';
import type { Tabs } from 'webextension-polyfill';
// import { tabs, TabWithTimestamp, FilteredTab } from './../logic/tabs';
import { getStorage, setStorage } from './storage';

// import type { FilteredTab, TabWithTimestamp } from '~/logic';

export async function onUpdatedHandler( // gets called when a tab is updated, creates tab event, and updates the 'tabs' array, sets storage
  _tabId: number,
  changeInfo: Tabs.OnUpdatedChangeInfoType,
  _tab: Tabs.Tab,
) {
  if (changeInfo.status === 'complete') {
    let tabs = await getStorage('tabs');
    const [activeTab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    tabs = createActivityEvent({ tabs, activeTab });
    await setStorage({ tabs });
    // sending activity data
    console.log('sending activity data', tabs);
    // sendActivityData(tabs);
  } else if (changeInfo.status === 'loading') {
    // loading
    // addData -- close item
    // console.log('loading');
    const tabs = await getStorage('tabs');
    await setStorage({ tabs: closeActivityEvent(tabs) });
  }
}

function createActivityEvent({
  /* creates an exitTime for the last inserted items in the 'tabs' array */
  activeTab,
  tabs,
}: {
  activeTab: Tabs.Tab;
  tabs: TabWithTimestamp[];
}) {
  return [...tabs, { ...activeTab, enterTime: getCurrentTime() }];
}

function getCurrentTime() {
  return Date.now();
}

function closeActivityEvent(tabs: TabWithTimestamp[]) {
  if (tabs.length > 0) {
    tabs[tabs.length - 1].exitTime = getCurrentTime();
    return tabs;
  } else {
    return [];
  }
}

export async function onActivatedHandler({
  // gets called when a tab is activated, creates tab event, and updates the 'tabs' array, sets storage
  tabId,
}: Tabs.OnActivatedActiveInfoType) {
  let tabs = await getStorage('tabs');
  const activeTab = await browser.tabs.get(tabId);
  tabs = closeActivityEvent(tabs);
  tabs = createActivityEvent({ activeTab, tabs });
  await setStorage({ tabs });

  //   sendActivityData(tabs);
}
