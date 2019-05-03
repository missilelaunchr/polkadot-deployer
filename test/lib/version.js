const subject = require('../../lib/version');

require('chai').should()


describe('version', () => {
  describe('show', () => {
    it('returns a semver', () => {
      subject.show().should.match(/\d+\.\d+\.\d+/);
    });
  });
});
