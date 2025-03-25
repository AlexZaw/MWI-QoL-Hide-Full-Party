const ShowHideBtn = document.querySelector(".party-btn");
const partyList = document.querySelector('[class*="FindParty_partyList"');
const partys = partyList.children;
let showPartyFlag = 1;

ShowHideBtn.addEventListener("click", fun);

function fun() {
  showPartyFlag = showPartyFlag ? 0 : 1;
  [...partys].forEach(checkEmptySlot);

  if (showPartyFlag) {
    ShowHideBtn.innerText = "Hide full";
  } else {
    ShowHideBtn.innerText = "Show all";
  }
}
function showAllParty(party) {
  party.classList.remove("hidden-party");
}

function checkEmptySlot(party) {
  const EmptypartySlots = party
    .querySelector('[class*="FindParty_partySlots"]')
    .querySelectorAll('[class*="FindParty_empty"]');
  if (EmptypartySlots.length == 0 && !showPartyFlag) {
    party.classList.add("hidden-party");
  } else {
    party.classList.remove("hidden-party");
  }
}
fun();
