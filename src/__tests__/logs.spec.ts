import { ValidationSeverity, ValidationSeverityNum } from '../validations';

describe('logs', () => {
  test('level names should map to/from level numbers', () => {
    /**
     * Check that every LogLevelNum has a corresponding LogLevel
     */
    for (const s in ValidationSeverityNum) {
      const val = ValidationSeverityNum[s];
      if (typeof val !== 'string') continue;
      expect(ValidationSeverity[val]).toEqual(val.toLowerCase());
    }
  });
});
