import browser from 'webextension-polyfill';
import { addIdleEventToLocalStore, IdleEvent } from './storage';

  // Create a new alarm for heartbeat
const idleThreshHoldSeconds = 60;
function secondsToMiliseconds(seconds: number) {
  return seconds * 1000;
}

async function onAlarmIdleHandler() {
  recordIdleEvent();
}

const alarmNames = {
  heartbeatAlarm: 'heartbeatAlarm',
  idleAlarm: 'idleAlarm',
}

const alarmHandlers = {
  [alarmNames.idleAlarm]: onAlarmIdleHandler,
  [alarmNames.heartbeatAlarm]: onAlarmHeartbeatHandler,

}

export function setupAlarms() {
  // setup alarm event handlers
  browser.alarms.create(alarmNames.heartbeatAlarm, { periodInMinutes: 2});
  browser.alarms.create(alarmNames.idleAlarm, { periodInMinutes: 1});


  browser.alarms.onAlarm.addListener(async (alarm) => {
    console.log('alarm', alarm);
      alarmHandlers[alarm.name]();
  });

}


function recordIdleEvent() {
  // add an idle event
  browser.idle.queryState(idleThreshHoldSeconds).then((state) => {
    const endTime = new Date().getTime();
    const startTime = endTime - secondsToMiliseconds(idleThreshHoldSeconds);

    const idleEvent:IdleEvent = {
      state: state,
      startTime: startTime,
      endTime: endTime,
    }

    // add event to local storage
    addIdleEventToLocalStore(idleEvent);
  });
}

async function onAlarmHeartbeatHandler() {
  // add a heartbeat event
  console.log('heartbeat');
  const idleEvents = await browser.idle.queryState(idleThreshHoldSeconds);
  console.log(idleEvents);
  // sendEvents();
}