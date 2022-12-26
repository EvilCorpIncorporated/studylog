import {Tabs} from 'webextension-polyfill';

const allowedWebsites: string[] = [
  // learning websites
  "pluralsight.com",
  "github.com",
  "stackoverflow.com",
  "medium.com",
  "dev.to",
  "developer.mozilla.org",

]


export function filterTabs(tabs: Tabs.Tab[]) {
  return filterTabsNotAllowedWebsites(tabs)
}

export function isAllowedWebsite(url?: string) {
  if (url && url in allowedWebsites) {
    return true
  }
  return false
}
export function filterTabsNotAllowedWebsites(tabs: Tabs.Tab[]): Tabs.Tab[] {
    console.log('should filter tabs')
    return tabs.filter((tab) => isAllowedWebsite(tab.url));
}