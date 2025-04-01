import clock from "clock";
import { preferences } from "user-settings";
import * as document from "document";
import { me as device } from "device";

var CHARS = {
  height: 75,
  instances: {
    colon: { width: 18, name: "colon" },
    0: { width: 41, name: "0" },
    1: { width: 21, name: "1" },
    2: { width: 45, name: "2" },
    3: { width: 50, name: "3" },
    4: { width: 44, name: "4" },
    5: { width: 52, name: "5" },
    6: { width: 50, name: "6" },
    7: { width: 49, name: "7" },
    8: { width: 49, name: "8" },
    9: { width: 41, name: "9" },
    a: { width: 68, name: "getsu" },
    b: { width: 72, name: "ka" },
    c: { width: 74, name: "sui" },
    d: { width: 71, name: "moku" },
    e: { width: 71, name: "kin" },
    f: { width: 71, name: "do" },
    g: { width: 55, name: "nichi" },
    h: { width: 73, name: "you" },
    i: { width: 73, name: "nen" },
  },
};

var dayNames = ["a", "b", "c", "d", "e", "f", "g"];

// function objProps(obj) {
//   console.log("Iterating over object props: \n\n");
//   for (let key in obj) {
//     console.log(key);
//   }
// }

function rescale(num, factor) {
  return Math.round(num * factor);
}

console.log(`Screen Width: ${device.screen.width}`);
console.log(`Screen Height: ${device.screen.height}`);

function stringToKanas(str, parent, size = 1) {
  let kanas = str.split("");
  // console.log(kanas);
  let lastx = 0;
  let fullWidth = 0;
  for (let i = 0; i < kanas.length; i++) {
    // console.log(kanas[i]);
    let currentKana = parent.children[i];
    let strChar;
    if (kanas[i] === ":") {
      strChar = "colon";
    } else {
      strChar = kanas[i];
    }
    currentKana.href = "kana/" + strChar + ".png";
    currentKana.width = rescale(CHARS.instances[strChar].width, size);
    currentKana.height = rescale(CHARS.height, size);
    currentKana.x = lastx;
    fullWidth = fullWidth + currentKana.width;

    lastx = currentKana.x + currentKana.width;
  }
  console.log(Math.round(fullWidth / 2));
  return Math.round(fullWidth / 4);
}

const updateClock = () => {
  const XCENTER = 253;
  var hourElement = document.getElementById("hourElement");
  hourElement.x = XCENTER;
  hourElement.y = 132;

  var dayElement = document.getElementById("dayElement");
  dayElement.x = XCENTER;
  dayElement.y = 100;

  var monthElement = document.getElementById("monthElement");
  monthElement.x = XCENTER;
  monthElement.y = 70;

  const now = new Date();
  let hours = now.getHours();
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
  }
  const minutes = now.getMinutes();
  let nowTime = hours + ":" + ("0" + minutes).slice(-2);
  let hoursCenter = stringToKanas(nowTime, hourElement, 0.3);
  let today = new Date();
  let dayOfMonth = today.getDate(); // Returns the day of the month
  let month = today.getMonth() + 1; // Returns 0-11 (January is 0, February is 1, etc.)
  let weekday = today.getDay() - 1; // Returns a number from 0 (Sunday) to 6 (Saturday)
  if (weekday < 0) {
    weekday = 6;
  }

  let dayCenter = stringToKanas(`${dayNames[weekday]}hg`, dayElement, 0.3);
  let monthCenter = stringToKanas(`${dayOfMonth}g${month}a`, monthElement, 0.3);

  monthElement.x = monthElement.x - monthCenter;
  hourElement.x = hourElement.x - hoursCenter;
  dayElement.x = dayElement.x - dayCenter;
};

clock.granularity = "minutes";
clock.ontick = (evt) => updateClock();

updateClock();
