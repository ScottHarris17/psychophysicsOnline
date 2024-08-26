/************ 
 * smoothPursuitDemo *
 * Scott Harris
 * August 25, 2024
 ************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2024.2.1.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'sp2';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001',
};

// init psychoJS:
const psychoJS = new PsychoJS({
    debug: true
  });

// open window:
psychoJS.openWindow({
    fullscr: true,
    color: new util.Color([0, 0.5, 1]),
    units: 'height',
    waitBlanking: true,
    backgroundImage: '',
    backgroundFit: 'none',
  });

  // schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
    dictionary: expInfo,
    title: expName
  }));


  const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(trialRoutineBegin());
flowScheduler.add(trialRoutineEachFrame());
flowScheduler.add(trialRoutineEnd());
flowScheduler.add(quitPsychoJS, 'Thank you for participating.', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, 'Thank you for participating.', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.INFO);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2024.2.1';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var trialClock;
var fixationTarget;
var key_resp;
var globalClock;
var routineTimer;
var timerText;
async function experimentInit() {
  // Initialize components for Routine "trial"
  trialClock = new util.Clock();
  fixationTarget = new visual.Polygon({
    win: psychoJS.window,
    name: 'target',
    radius: 0.05,
    edges: 400,
    units: undefined, 
    pos: [0.3, 0],
    ori: 0.0,
    lineColor:[1, 1, 1],
    fillColor: [1, 0, 0],
    depth: 0.0 
  });

  timerText = new visual.TextStim({
    win: psychoJS.window,
    name: 'timerText',
    text: 'seconds remaining ',
    font: 'Arial',
    units: undefined, 
    pos: [-0.6, -0.4], draggable: false, height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var trialMaxDurationReached;
var _key_resp_allKeys;
var trialMaxDuration;
var trialComponents;
function trialRoutineBegin(snapshot) {
    return async function () {
      TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
      
      t = 0;
      trialClock.reset(); // clock
      frameN = -1;
      continueRoutine = true;
      trialMaxDurationReached = false;
      
      key_resp.keys = undefined;
      key_resp.rt = undefined;
      _key_resp_allKeys = [];
      psychoJS.experiment.addData('trial.started', globalClock.getTime());
      
      // Set the trial to last 10 seconds
      trialMaxDuration = 20.0; // in seconds
      
      trialComponents = [];
      trialComponents.push(fixationTarget);
      trialComponents.push(timerText);
      
      for (const thisComponent of trialComponents)
        if ('status' in thisComponent)
          thisComponent.status = PsychoJS.Status.NOT_STARTED;
      return Scheduler.Event.NEXT;
    }
  }
  
  function trialRoutineEachFrame() {
    return async function () {
      t = trialClock.getTime();
      frameN = frameN + 1;
      
      // Check if the polygon should be drawn
      if (fixationTarget.status === PsychoJS.Status.STARTED) {
        // Update polygon position (example movement)
        fixationTarget.pos = [0.3 * Math.cos(2 * Math.PI * t / 10), 0.3 * Math.sin(2 * Math.PI * t / 10)];
        timerText.text = trialMaxDuration - Math.round(t) + ' seconds remaining.';
      }
      
      // Start drawing the polygon if not already started
      if (t >= 0.0 && fixationTarget.status === PsychoJS.Status.NOT_STARTED) {
        fixationTarget.tStart = t;
        fixationTarget.frameNStart = frameN;
        fixationTarget.setAutoDraw(true);  // Ensure drawing is enabled

        timerText.tStart = t;
        timerText.frameNStart = frameN;
        timerText.setAutoDraw(true);
      }
      
      // End the routine after 10 seconds
      if (t >= trialMaxDuration) {
        continueRoutine = false;
      }
      
      // Check if the Routine should terminate
      if (!continueRoutine) {
        return Scheduler.Event.NEXT;
      }
      
      // Refresh the screen if continuing
      if (continueRoutine) {
        return Scheduler.Event.FLIP_REPEAT;
      } else {
        return Scheduler.Event.NEXT;
      }
    };
  }


function trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'trial' ---
    for (const thisComponent of trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('trial.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp.corr, level);
    }
    psychoJS.experiment.addData('key_resp.keys', key_resp.keys);
    if (typeof key_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp.rt', key_resp.rt);
        psychoJS.experiment.addData('key_resp.duration', key_resp.duration);
        routineTimer.reset();
        }
    
    key_resp.stop();
    // the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
