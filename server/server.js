import { Meteor } from 'meteor/meteor';
import { Boom, Stats, Subs } from '/common/collections';

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
  setGif: ( id ) =>  {
    return Boom.update({ _id: id }, { $set: { active: true } });
  },
  closeGif: ( id ) => {
    Boom.update({ _id: id }, { $set: { active: false } });
  },
  newSub: (gifID) => {
    let d = new Date();
    let id = Subs.insert({date_joined: d});
    Stats.insert({subID:id, gifID: gifID, date_landed: d});
    return id;
  },
  oldSub: (gifID, id) => {
    let d = new Date();
    Stats.insert({subID:id, gifID: gifID, date_landed: d});
  }
});
