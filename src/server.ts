/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-02
 */

import Application from 'framework/web/Application';
import App from 'framework/App';

global.App = App;

(new Application({}).run());

console.log(App.app.createController('profile'));
/*
console.log(new Event({test: 'case'}));

Event.on('insert', async event => {
  console.log('TRIGGERED', event.data);
}, {type: 'Test'});

console.log('hasHandlers', Event.hasHandlers('insert'));

(async () => {
  await Event.trigger('insert');
  console.log('Event', Event);
})();
*/


/*const module = new Module({
  'programming': 'PHP',
});*/
//console.log('App.controllerMap:', App.app.createControllerByID('profile'));
//console.log('module.className:', module.createControllerByID('app/controllers/site'));

//console.log(module.createControllerByID('user/profile'));

(async () => {
  /*const container = new Component({
    'programming': 'PHP',
  });

  console.log('Prop:', container.get('programming'));

  container.set('programming', 'JavaScript')
  try {
    container.set('namespace', '');
  } catch (e) {
    throw e;
  }
  console.log('Prop:', container.get('namespace'));
*/
  //container.set('helper', {namespace: 'framework/helpers/CallbackHelper'});

  //console.log('newInstance', container.get<Component>('helper'));
})();


