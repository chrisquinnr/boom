import {Boom} from '../common/collections';
import {First} from '../common/collections';

Meteor.startup(function () {
  Boom.remove({});
  //Boom.insert({gifpath: 'cage.gif', active:false});
  //Boom.insert({gifpath: '200.gif', active:false});
  //Boom.insert({gifpath: 'fu.gif', active:false});
  //Boom.insert({gifpath: 'giphy.gif', active:false});
  //Boom.insert({gifpath: 'jack.gif', active:false});
  //Boom.insert({gifpath: 'voltron.gif', active:false});
  //Boom.insert({gifpath: 'rollercoaster.mov', active:false, movie:true});

  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true, //create the directories for you
    finished(fileInfo, formFields) {
      console.log(fileInfo);
      Boom.insert({gifpath: fileInfo.url, name:fileInfo.name, active:false});
    }
  });
});

Meteor.methods({
  setGif:function(id){

    Boom.update({_id:id}, {$set:{active:true}});
  },
  closeGif:function(id){
    Boom.update({_id:id}, {$set:{active:false}});
  }
});
