FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'home'});
  },
  subscriptions: function(params, queryParams) {
    //this.register('slideevents', Meteor.subscribe('events'));
    //this.register('presentations', Meteor.subscribe('presentations'));
  },
});

FlowRouter.route('/creater', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'creater'});
  },
  subscriptions: function(params, queryParams) {
    //this.register('slideevents', Meteor.subscribe('events'));
    //this.register('presentations', Meteor.subscribe('presentations'));
  },
});

FlowRouter.route('/stager', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'stager'});
  },
  subscriptions: function(params, queryParams) {
    //this.register('slideevents', Meteor.subscribe('events'));
    //this.register('presentations', Meteor.subscribe('presentations'));
  },
});