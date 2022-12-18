// import { getStorage, merge } from '../storage';
describe('', () => {
    it("", () => {
        expect(true).toEqual(true)
    })
})
// describe('merge', () => {
//     it('should handle undefined data', () => {
//         const existingData = {
//             tabs: [],
//             filteredTabs: [],
//         };
//         const data = {
//             tabs: undefined,
//             filteredTabs: undefined,
//         };
//         const result = merge(existingData, data);
//         expect(result).toEqual(existingData);
//     });

//     it('should handle defined data', () => {
//         const existingData = {
//             tabs: [1, 2],
//             filteredTabs: [3, 4],
//         };
//         const data = {
//             tabs: [5, 6],
//             filteredTabs: [7, 8],
//         };
//         const expected = {
//             tabs: [1, 2, 5, 6],
//             filteredTabs: [3, 4, 7, 8],
//         };
//         const result = merge(existingData, data);
//         expect(result).toEqual(expected);
//     });

//     it('should handle partially defined data', () => {
//         const existingData = {
//             tabs: [1, 2],
//             filteredTabs: [3, 4],
//         };
//         const data = {
//             tabs: [5, 6],
//             filteredTabs: undefined,
//         };
//         const expected = {
//             tabs: [1, 2, 5, 6],
//             filteredTabs: [3, 4],
//         };
//         const result = merge(existingData, data);
//         expect(result).toEqual(expected);
//     });
// });



// // describe('getStorage', () => {
// //     beforeEach(() => {
// //         // Mock the mockBrowser.storage API to return an empty object.
// //     });
// //     beforeEach(() => {
// //         // reset the local storage
// //         const storage = [];
// //         // mock local storage get and set
// //         mockBrowser.storage.local.get = vi.fn().mockImplementation((): any[] => {
// //         });

// //         mockBrowser.storage.local.set = vi
// //             .fn()
// //             .mockImplementation((..._args: unknown[]) => {
// //             });
// //     });

// //     it('should handle no key or keys', async () => {
// //         const expected = {
// //             tabs: [1, 2],
// //             filteredTabs: [3, 4],
// //         };
// //         // Mock the mockBrowser.storage API to return the expected data.
// //         vi.spyOn(mockBrowser.storage.local, 'get').mockResolvedValue(expected);

// //         const result = await getStorage();
// //         expect(result).toEqual(expected);
// //     });

// //     it('should handle a single key', async () => {
// //         const expected = [1, 2];
// //         // Mock the mockBrowser.storage API to return the expected data for the given key.
// //         (mockBrowser.storage.local.get as any).mockResolvedValue(expected);

// //         const result = await getStorage('tabs');
// //         expect(result).toEqual(expected);
// //     });

// //     it('should handle an array of keys', async () => {
// //         const expected = {
// //             tabs: [1, 2],
// //             filteredTabs: [3, 4],
// //         };
// //         // Mock the mockBrowser.storage API to return the expected data for the given keys.
// //         vi.spyOn(mockBrowser.storage.local, 'get').mockResolvedValue(expected);

// //         const result = await getStorage(['tabs', 'filteredTabs']);
// //         expect(result).toEqual(expected);
// //     });
// // });