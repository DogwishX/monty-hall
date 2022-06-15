const rangeInput = document.querySelector("input");
const instancesEl = document.querySelector(".n-instances");
const button = document.querySelector("button");
instancesEl.innerText = rangeInput.value;

rangeInput.addEventListener("change", handleChange);
button.addEventListener("click", handleClick);

function handleChange({ currentTarget }) {
  instancesEl.innerText = currentTarget.value;
}

function handleClick() {
  const switchSpan = document.querySelector(".switch-span");
  const notSwitchSpan = document.querySelector(".not-switch-span");
  switchSpan.innerText = calculateProbability(
    () => runGameSwitching(true),
    rangeInput.value
  );
  notSwitchSpan.innerText = calculateProbability(
    () => runGameSwitching(false),
    rangeInput.value
  );
}

function runGameSwitching(boolean) {
  // Create 3 doors, randomly assigning what is behind them
  const doors = createDoors();

  // Player randomly selects a door
  const randomDoor = Math.floor(Math.random() * doors.length);
  const selectedDoor = doors[randomDoor];

  selectedDoor.selected = true;

  // Open one door which contains a goat and was not selected by player
  const goatDoorNotSelected = doors.find(
    ({ behindDoor, selected }) => behindDoor === "goat" && !selected
  );

  goatDoorNotSelected.doorOpened = true;

  // Player switches door
  if (boolean) return switchDoor(doors);

  return selectedDoor.behindDoor === "car";
}

function createDoors() {
  const doorsArr = [
    { behindDoor: "goat", doorOpened: false, selected: false },
    { behindDoor: "goat", doorOpened: false, selected: false },
    { behindDoor: "car", doorOpened: false, selected: false },
  ];

  // Put goats and car behind doors randomly
  return shuffleArray(doorsArr);
}

function shuffleArray(array) {
  return array.sort(() => (Math.random() >= 0.5 ? 1 : -1));
}

function switchDoor(doors) {
  const otherDoor = doors.find(
    ({ selected, doorOpened }) => !doorOpened && !selected
  );

  return otherDoor.behindDoor === "car";
}

function calculateProbability(fn, instances) {
  const resultsArr = [];
  for (let i = 0; i < instances; i++) {
    resultsArr.push(fn());
  }

  console.log(instances);
  const successes = resultsArr.filter((item) => item).length;
  return ((successes / instances) * 100).toFixed(2) + "%";
}
