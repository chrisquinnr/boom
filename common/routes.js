FlowRouter.route('/', {
  action: function(params, queryParams) {
    if(queryParams.id){
      BlazeLayout.render('layout', {content: 'boring'});
    } else {
      BlazeLayout.render('layout', {content: 'home'});
    }
  },
  subscriptions: function(params, queryParams) {
  },
});


FlowRouter.route('/creator', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'creater'});
  },
  subscriptions: function(params, queryParams) {
  },
});

FlowRouter.route('/stager', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {content: 'stager'});
  },
  subscriptions: function(params, queryParams) {
  },
});