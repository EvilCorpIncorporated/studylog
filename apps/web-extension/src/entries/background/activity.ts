import browser from 'webextension-polyfill';
import type { TabEvent } from './tabs';
import { getStorage, setStorage } from './storage';

export async function onUpdatedHandler( // gets called when a tab is updated, creates tab event, and updates the 'tabs' array, sets storage
  _tabId: number,
  changeInfo: browser.Tabs.OnUpdatedChangeInfoType,
  _tab: browser.Tabs.Tab,
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
    console.debug('sending activity data', tabs);
    // sendActivityData(tabs);
  } else if (changeInfo.status === 'loading') {
    // loading
    // addData -- close item
    // console.log('loading');
    const tabs = await getStorage('tabs');
    await setStorage({ tabs });
  }
}

function createActivityEvent({
  /* creates an exitTime for the last inserted items in the 'tabs' array */
  activeTab,
  tabs,
}: {
  activeTab: browser.Tabs.Tab;
  tabs: TabEvent[];
}) {
  return [...tabs, { ...activeTab, enterTime: getCurrentTime() }] as TabEvent[];
}

function getCurrentTime() {
  return Date.now();
}


export async function onActivatedHandler({
  // gets called when a tab is activated, creates tab event, and updates the 'tabs' array, sets storage
  tabId,
}: browser.Tabs.OnActivatedActiveInfoType) {
  let tabs = await getStorage('tabs');
  const activeTab = await browser.tabs.get(tabId);
  tabs = createActivityEvent({ activeTab, tabs });
  await setStorage({ tabs });

  //   sendActivityData(tabs);
}
