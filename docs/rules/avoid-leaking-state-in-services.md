## Avoid leaking state

### Rule name: `avoid-leaking-state-in-services`

#### Configuration

Example configuration:

```
ember/avoid-leaking-state-in-services: [1, [
  'array',
  'of',
  'ignored',
  'properties',
]]
```

#### Description

Don't use arrays and objects as default properties. More info here: https://dockyard.com/blog/2015/09/18/ember-best-practices-avoid-leaking-state-into-factories

```javascript
// BAD
export default Ember.Service.extend({
  items: [],
});
```

```javascript
// Good
export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.items = [];
  },
});
```
