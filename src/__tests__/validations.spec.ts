import { ValidationSeverity, ValidationSeverityLabel } from '../validations';

describe('validations', () => {
  test('severity names should map to/from severity numbers', () => {
    /**
     * Check that every ValidationSeverityNum has a corresponding ValidationSeverity
     */
    for (const s in ValidationSeverity) {
      const val = ValidationSeverity[s];
      if (typeof val !== 'string') continue;
      expect(ValidationSeverityLabel[val]).toEqual(val.toLowerCase());
    }
  });
});
