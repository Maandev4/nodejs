/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @link https://github.com/blacksmoke26 Author Website
 * @since 2022-07-02
 */

import Event from 'framework/base/Event';

Event.on('insert', async function (e) {
  console.log('TRIGGERED', e.data);
}, "XX");
console.log('hasHandlers', Event.hasHandlers('insert'));

(async () => {
  await Event.trigger('insert');
  console.log('Event', Event);
})();
