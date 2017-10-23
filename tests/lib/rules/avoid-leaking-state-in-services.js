// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/avoid-leaking-state-in-services');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const eslintTester = new RuleTester();
eslintTester.run('avoid-leaking-state-in-services', rule, {
  valid: [
    {
      code: 'export default Service.extend();',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
    },
    {
      code: 'export default Service.extend({ someProp: "example", init() { this.set("anotherProp", []) } });',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
    },
    {
      code: 'export default Service.extend({ someProp: "example", init() { this.set("anotherProp", {}) } });',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
    },
    {
      code: 'export default Service.extend({ someProp: "example", init() { this.set("anotherProp", new Ember.A()) } });',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
    },
    {
      code: 'export default Service.extend({ someProp: "example", init() { this.set("anotherProp", new A()) } });',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
    },
    {
      code: 'export default Service.extend({ someProp: "example", init() { this.set("anotherProp", new Ember.Object()) } });',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
    },
    {
      code: 'export default Service.extend({ someProp: "example", init() { this.set("anotherProp", new Object()) } });',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
    },
    {
      code: 'export default Service.extend({concatenatedProperties: [], mergedProperties: []});',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
    },
  ],
  invalid: [
    {
      code: 'export default Service.extend({someProp: []});',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: 'Avoid using arrays as default properties',
      }],
    },
    {
      code: 'export default Service.extend({someProp: new Ember.A()});',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: 'Avoid using arrays as default properties',
      }],
    },
    {
      code: 'export default Service.extend({someProp: new A()});',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: 'Avoid using arrays as default properties',
      }],
    },
    {
      code: 'export default Service.extend({someProp: {}});',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: 'Avoid using objects as default properties',
      }],
    },
    {
      code: 'export default Service.extend({someProp: new Ember.Object()});',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: 'Avoid using objects as default properties',
      }],
    },
    {
      code: 'export default Service.extend({someProp: new Object()});',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: 'Avoid using objects as default properties',
      }],
    },
    {
      filename: 'example-app/services/some-service.js',
      code: 'export default CustomService.extend({someProp: []});',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: 'Avoid using arrays as default properties',
      }],
    },
    {
      filename: 'example-app/service/some-service/service.js',
      code: 'export default CustomService.extend({someProp: new A()});',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: 'Avoid using arrays as default properties',
      }],
    },
    {
      filename: 'example-app/twisted-path/some-file.js',
      code: 'export default Service.extend({someProp: {}});',
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
      errors: [{
        message: 'Avoid using objects as default properties',
      }],
    },
  ],
});
