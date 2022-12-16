import { describe, expect, it } from 'vitest';
import { setupEventHandlers } from '../tabEventHandlers';

describe('setupTabEventHandlers', () => {
  it('should set up the event handlers', () => {
    setupEventHandlers();
    expect(browser.tabs.onUpdated.addListener).toBeCalled();
    expect(browser.tabs.onActivated.addListener).toBeCalled();
    expect(browser.tabs.onRemoved.addListener).toBeCalled();
    expect(browser.tabs.onCreated.addListener).toBeCalled();
  });
});

describe('tab event listener functionality', () => {
  it('should add the tab event to the local storage when a tab is updated', () => {
    // setup empty local storage
    // setup a tab event
    // call the onTabUpdatedHandler
    // expect the local storage to have the tab event
  });
  it('should add the tab event to the local storage when a tab is activated', () => {
    // setup empty local storage
    // setup a tab event
    // call the onTabActivatedHandler
    // expect the local storage to have the tab event
  });

  it('should add the tab event to the local storage when a tab is removed', () => {
    // setup empty local storage
    // setup a tab event
    // call the omTabRemovedHandler
    // expect the local storage to have the tab event
  });

  it('should add the tab event to the local storage when a tab is created', () => {
    // setup empty local storage
    // setup a tab event
    // call the onTabCreatedHandler
    // expect the local storage to have the tab event
  });
});
