import { Boom } from '/common/collections';

Meteor.startup(function() {
  
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true, //create the directories for you
    finished( fileInfo, formFields ) {
      Boom.insert({ gifpath: fileInfo.url, name: fileInfo.name, active: false });
    }
  });
});

Meteor.methods({
  setGif: function( id ) {
    return Boom.update({ _id: id }, { $set: { active: true } });
  },
  closeGif: function( id ) {
    Boom.update({ _id: id }, { $set: { active: false } });
  }
});
