import { ValidationSeverity, ValidationSeverityLabel } from '../validations';

describe('logs', () => {
  test('level names should map to/from level numbers', () => {
    /**
     * Check that every LogLevelNum has a corresponding LogLevel
     */
    for (const s in ValidationSeverity) {
      const val = ValidationSeverity[s];
      if (typeof val !== 'string') continue;
      expect(ValidationSeverityLabel[val]).toEqual(val.toLowerCase());
    }
  });
});
