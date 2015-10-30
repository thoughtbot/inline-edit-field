import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {
      name: 'Ralph the Robot',
      bio: "Just a small town girl. Livin' in a lonely world'",
    };
  },
});
