const hideFullPartyStyle = document.createElement('style');
hideFullPartyStyle.textContent = `
.party-btn {
  position: fixed;
  right: 0;
  top: 0;
}
.hidden-party {
  display: none;
}
`;
const showHideBtn = document.createElement('button');
showHideBtn.classList.add('party-btn');
showHideBtn.innerText = 'Show all';
document.body.appendChild(showHideBtn);
showHideBtn.addEventListener('click', showHide);

document.head.appendChild(hideFullPartyStyle);

let showFullPartyFlag = false;

new MutationObserver(check).observe(document, {
    childList: true,
    subtree: true,
});
function check(changes, observer) {
    if (document.querySelector('.MainPanel_mainPanel__Ex2Ir')) {
        // actions to perform after selector is found
        observer.disconnect();
        init();
    }
}

function showHide() {
    showFullPartyFlag = showFullPartyFlag ? false : true;
    [...partyList].forEach(function (party) {
        if (
            getPartySlotsInfo(party).length == 0 &&
            showFullPartyFlag == false
        ) {
            party.classList.add('hidden-party');
        } else {
            party.classList.remove('hidden-party');
        }
    });

    if (showFullPartyFlag) {
        showHideBtn.innerText = 'Hide full';
    } else {
        showHideBtn.innerText = 'Show all';
    }
}

function getPartySlotsInfo(party) {
    return party
        .querySelector('[class*="FindParty_partySlots"]')
        .querySelectorAll('[class*="FindParty_empty"]');
}

//for test only:

// partyListElement = document.querySelector('[class*="FindParty_partyList"');
// partyList = partyListElement.children;

// const newSlot = document.createElement("div");
// newSlot.className = "FindParty_partySlot__NldT8, FindParty_empty__3yQSJ";

// showHide();
check();
