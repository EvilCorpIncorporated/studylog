import type { MockzillaDeep } from 'mockzilla';
import { mockEvent, type MockzillaEventOf } from 'mockzilla-webextension';
// import type { Events, Tabs } from 'webextension-polyfill';
import { onTabActivatedHandler, setupEventHandlers } from '../events';
it('test example', () => {
  expect(Math.sqrt(4)).toBe(2);
});

describe('MyEventHandler', () => {
  let onRemoved: MockzillaEventOf<typeof mockBrowser.tabs.onRemoved>;
  let onCreated: MockzillaEventOf<typeof mockBrowser.tabs.onCreated>;
  let onActivated: MockzillaEventOf<typeof mockBrowser.tabs.onActivated>;

  beforeEach(() => {
    onRemoved = mockEvent(mockBrowser.tabs.onRemoved);
    onCreated = mockEvent(mockBrowser.tabs.onCreated);
    onActivated = mockEvent(mockBrowser.tabs.onActivated);
  });

  describe('listeners', () => {
    it('should add listeners after init', () => {
      setupEventHandlers();
      expect(onActivated.hasListener(onTabActivatedHandler)).toBe(true);
      // expect(onCreated.hasListener(myEventHandler!["onTabCreated"])).toBe(true);
    });
  });
});
