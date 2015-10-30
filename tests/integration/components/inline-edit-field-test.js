import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inline-edit-field', 'Integration | Component | inline edit field', {
  integration: true
});

test('it calls the stopEditingAction when provided ', function(assert) {
  assert.expect(1);

  this.set('model', {name: 'Name'});
  this.on('updateModel', function() {
    assert.ok(true, 'it calls the updateModel');
  });

  this.render(hbs`
    {{inline-edit-field
        value=model.name
        stopEditingAction="updateModel"}}
  `);
  openAndCommitEditing(this);
});

test('it calls the cancelEditingAction when provided ', function(assert) {
  assert.expect(1);

  this.set('model', {name: 'Name'});
  this.on('rollback', function() {
    assert.ok(true, 'it calls the rollback');
  });

  this.render(hbs`
    {{inline-edit-field
        value=model.name
        cancelEditingAction="rollback"}}
  `);

  openAndCancelEditing(this);
});

test('it renders the inverse template if given', function(assert) {
  this.set('model', {name: 'Name'});

  this.render(hbs`
    {{#inline-edit-field value=model.name}}
      <p>Not Editing</p>
    {{else}}
      <p data-role="custom-input">My Customer Input for Editing</p>
    {{/inline-edit-field}}
  `);

  startEditing(this);
  assert.equal($('[data-role=custom-input]').length, 1, 'it shows the custom inverse template');
});

function openAndCommitEditing(context) {
  startEditing(context);

  const confirmEditingButton = '[data-role=stop-editing]';
  context.$(confirmEditingButton).click();
}


function openAndCancelEditing(context) {
  startEditing(context);

  const confirmEditingButton = '[data-role=cancel-editing]';
  context.$(confirmEditingButton).click();
}

function startEditing(context) {
  const editButton = '[data-role=start-editing]';
  context.$(editButton).click();
}
