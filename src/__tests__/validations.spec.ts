import { ValidationSeverity, ValidationSeverityNum } from '../validations';

describe('validations', () => {
  test('severity names should map to/from severity numbers', () => {
    /**
     * Check that every ValidationSeverityNum has a corresponding ValidationSeverity
     */
    for (const s in ValidationSeverityNum) {
      const val = ValidationSeverityNum[s];
      if (typeof val !== 'string') continue;
      expect(ValidationSeverity[val]).toEqual(val.toLowerCase());
    }
  });
});
