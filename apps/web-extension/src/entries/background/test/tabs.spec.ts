import { isAllowedWebsite } from '../tabs';

describe('isAllowedWebsite', () => {
    let validInputs: string[];
    let invalidInputs: (string | undefined)[];

    beforeEach(async () => {
        validInputs = ['https://stackoverflow.com', "https://pluralsight.com", "stackoverflow.com"];
        invalidInputs = ['http://notallowed.com', 'http://example.org', '', undefined];
    });

    it('returns true for allowed websites', () => {

      validInputs.forEach(async (input) => {
        console.log('input', input)
        expect(isAllowedWebsite(input)).toBe(true);
        expect(isAllowedWebsite(input)).toBe(true);
      });
    });

    it('returns false for not allowed websites', () => {
    
        invalidInputs.forEach(async (input) => {
            expect(isAllowedWebsite(input)).toBe(false);
            expect(isAllowedWebsite(input)).toBe(false);
        });
        });
  });