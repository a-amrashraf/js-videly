// STOPWATCH

// function Stopwatch() {
//   let isStarted, startTime, endTime, duration = 0;

//   this.start = function () {
//     if (isStarted) 
//         throw new Error("Stopwatch is already started");

//     isStarted = true;

//     startTime = new Date();
//   };

//   this.stop = function () {
//     if (!isStarted)
//          throw new Error("Stopwatch is not started");

//     isStarted = false;

//     endTime = new Date();
//     const seconds = (endTime.getTime() - startTime.getTime()) / 1000;

//     duration += seconds;
//   };

//   this.reset = function () {
//     duration = 0;
//     endTime = null;
//     startTime = null;
//     isStarted = false;
//   };

//   Object.defineProperty(this, "duration", {
//     get: function () {
//       if (isStarted) {
//         return new Date() - startTime;
//       }
//       return duration;
//     },
//   });
// }

// let sw = new Stopwatch();
// sw.duration;


//=============================================================================================