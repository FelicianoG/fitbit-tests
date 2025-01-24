import clock from "clock";
import { preferences } from "user-settings";

import { FitFont } from "fitfont";

const DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// declaration of the FitFont objects
const dayLbl = new FitFont({ id: "dayLbl", font: "Manga_speak_2_100", halign: "middle" });
const hourLbl = new FitFont({ id: "hourLbl", font: "Manga_speak_2_100", halign: "middle" });

const updateClock = () => {
  const now = new Date();
  let hours = now.getHours();
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
  }
  const minutes = now.getMinutes();
  hourLbl.text = hours + "." + ("0" + minutes).slice(-2);
  dayLbl.text = DayNames[now.getDay()];
};

clock.granularity = "minutes";
clock.ontick = (evt) => updateClock();

updateClock();
