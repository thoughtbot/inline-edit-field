import Ember from 'ember';
import layout from '../templates/components/inline-edit-field';

const { empty } = Ember.computed;

export default Ember.Component.extend({
  attributeBindings: ['data-role'],
  cancelButtonText: 'Cancel',
  commitButtonText: 'Save',
  isEditing: false,
  layout: layout,
  valueEmpty: empty('value'),

  actions: {
    startEditing: function() {
      this.toggleProperty('isEditing');

      Ember.run.later(() => {
        this.$('input').first().focus();
      });
    },

    stopEditing: function() {
      this.toggleProperty('isEditing');

      if (this.get('stopEditingAction')) {
        this.sendAction('stopEditingAction');
      }
    },

    cancelEditing: function() {
      this.toggleProperty('isEditing');

      if (this.get('cancelEditingAction')) {
        this.sendAction('cancelEditingAction');
      }
    },
  }
});
