const showHideBtn = document.querySelector(".party-btn");
const partyList = document.querySelector('[class*="FindParty_partyList"');
const partys = partyList.children;

const newSlot = document.createElement("div");
newSlot.className = "FindParty_partySlot__NldT8, FindParty_empty__3yQSJ";
let showFullPartyFlag = false;

showHideBtn.addEventListener("click", showHide);

function showHide() {
  showFullPartyFlag = showFullPartyFlag ? false : true;
  [...partys].forEach(function (party) {
    if (getPartySlotsInfo(party).length == 0 && showFullPartyFlag == false) {
      party.classList.add("hidden-party");
    } else {
      party.classList.remove("hidden-party");
    }
  });

  if (showFullPartyFlag) {
    showHideBtn.innerText = "Hide full";
  } else {
    showHideBtn.innerText = "Show all";
  }
}

function getPartySlotsInfo(party) {
  return party
    .querySelector('[class*="FindParty_partySlots"]')
    .querySelectorAll('[class*="FindParty_empty"]');
}

showHide();
