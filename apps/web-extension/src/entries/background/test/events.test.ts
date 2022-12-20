// jest test example

import { MockzillaDeep } from 'mockzilla';
import type { MockzillaEventOf } from 'mockzilla-webextension';
import { mockEvent } from 'mockzilla-webextension';
import { Events, Tabs } from 'webextension-polyfill';
import {
  onTabActivatedHandler,
  onTabUpdatedHandler,
  setupEventHandlers,
} from '../events';

describe('MyEventHandler', () => {
  let onRemoved: MockzillaEventOf<typeof mockBrowser.tabs.onRemoved>;
  let onCreated: MockzillaEventOf<typeof mockBrowser.tabs.onCreated>;
  let onActivated: MockzillaEventOf<typeof mockBrowser.tabs.onActivated>;
  let onUpdated: MockzillaEventOf<typeof mockBrowser.tabs.onUpdated>;

  beforeEach(() => {
    onUpdated = mockEvent(mockBrowser.tabs.onUpdated);
    onCreated = mockEvent(mockBrowser.tabs.onCreated);
    onActivated = mockEvent(mockBrowser.tabs.onActivated);
  });

  describe('listeners', () => {
    it('should add listeners after init', () => {
      setupEventHandlers();
      expect(onActivated.hasListener(onTabActivatedHandler)).toBe(true);
      expect(onUpdated.hasListener(onTabUpdatedHandler)).toBe(true);
      // expect(onCreated.hasListener(myEventHandler!["onTabCreated"])).toBe(true);
    });
  });
});
