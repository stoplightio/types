import * as Types from '../';

/**
 * Smoke test to make sure that all exports in root exist.
 *
 * Without including the root import (above), it is easy to
 * forget to update an export path name in index.
 *
 * Typescript will not typecheck the index file if we don't import it
 * somewhere in our tests.
 */
test('root export', () => {
  // This doesn't really matter, just an empty test basically.
  expect(Types).toBeDefined();
});
