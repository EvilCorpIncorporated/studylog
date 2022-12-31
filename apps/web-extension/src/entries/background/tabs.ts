import type { Tabs } from 'webextension-polyfill';

export function filterTabs(tabs: Tabs.Tab[]): Tabs.Tab[] {
  console.debug('should filter tabs');
  new Error('Function not implemented.');
  return tabs.filter(tab => tab);
}
