import { MockzillaDeep } from 'mockzilla';
import { MockzillaEventOf } from 'mockzilla-webextension';
import { Events, Tabs } from 'webextension-polyfill';
import { onTabActivatedHandler, onTabUpdatedHandler, setupEventHandlers } from '../events';

describe('setupTabEventHandlers', () => {
    let onRemoved: MockzillaEventOf<typeof mockBrowser.tabs.onRemoved>;
    let onCreated: MockzillaEventOf<typeof mockBrowser.tabs.onCreated>;

    beforeEach(() => {
        // onRemoved = MockEvent(mockBrowser.tabs.onRemoved);
        // onCreated = MockEvent(mockBrowser.tabs.onCreated);
    });
    
    it('should set up the event handlers', () => {
        // setupEventHandlers();
        // expect(mockBrowser.tabs).toBeCalled();
        // expect(spy).toBeCalled();
        // expect(mockBrowser.tabs.onActivated.addListener).toBeCalled();
        // expect(mockBrowser.tabs.onRemoved.addListener).toBeCalled();
        // expect(mockBrowser.tabs.onCreated.addListener).toBeCalled();
    });
});


// describe('tab event listener functionality', () => {
//     beforeEach(() => {
//         // reset the local storage
//         const storage = [];
//         // mock local storage get and set
//         // mockBrowser.storage.local.get = jest.fn().mockImplementation((): any[] => {
//         //     return storage;
//         // })

//         // mockBrowser.storage.local.set = jest.fn().mockImplementation((..._args: unknown[]) => {
//         //     storage.push(..._args);
//         // })
//     });

//     it('should add the tab event to the local storage when a tab is updated', () => {
//         // setup a tab event
//         const tabEvent = { tabId: 1, url: 'https://www.google.com', timestamp: Date.now() };
//         // call the onTabUpdatedHandler
//         onTabUpdatedHandler(tabEvent.tabId, { url: tabEvent.url }, { id: tabEvent.tabId } as mockBrowser.tabs.Tab);
//         // expect the local storage to have the tab event
//         expect(mockBrowser.storage.local.set).toBeCalledWith(tabEvent);
//     });
//     it('should add the tab event to the local storage when a tab is activated', () => {
//         // setup a tab event
//         const tabEvent = {
//             tabId: 1,
//         } as mockBrowser.tabs.OnActivatedActiveInfoType;
//         // call the onTabActivatedHandler
//         onTabActivatedHandler(tabEvent);
//         // expect the local storage to have the tab event
//         expect(mockBrowser.storage.local.set).toBeCalledWith(tabEvent);

//     });

//     it('should add the tab event to the local storage when a tab is removed', () => {
//         // setup a tab event
//         // call the omTabRemovedHandler
//         // expect the local storage to have the tab event
//     });

//     it('should add the tab event to the local storage when a tab is created', () => {
//         // setup a tab event
//         // call the onTabCreatedHandler
//         // expect the local storage to have the tab event
//     });
// });
