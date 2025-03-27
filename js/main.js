const hideFullPartyStyle = document.createElement('style');
hideFullPartyStyle.textContent = `
  .hidden-party {
    display: none !important;
  }
  `;

document.head.appendChild(hideFullPartyStyle);
let showHideBtn;
let showFullPartyFlag = true;

new MutationObserver(waitMainPanelElem).observe(document, {
    childList: true,
    subtree: true,
});

function waitMainPanelElem(changes, observer) {
    if (document.querySelector('.MainPanel_mainPanel__Ex2Ir')) {
        observer.disconnect();
        observeMainPanelChanges();
    }
}

function observeMainPanelChanges() {
    console.log('observeMainPanelChanges');
    new MutationObserver(onMainPanelChange).observe(
        document.querySelector('.MainPanel_mainPanel__Ex2Ir'),
        {
            childList: true,
            subtree: true,
        }
    );
}

function onMainPanelChange(mutationList) {
    console.log('onMainPanelChanges');
    try {
        if (
            document
                .querySelector('.FindParty_optionsContainer__3WFfI')
                .querySelector('.Button_button__1Fe9z')
        ) {
            console.log('try if');
            addButton();
        }
    } catch (error) {
        console.log(error);
        showFullPartyFlag = true;

        return false;
    }

    try {
        if (document.querySelector('.FindParty_partyList__3lirO')) {
            console.log('try if2');
            observePartyList();
        }
    } catch (error) {
        console.log('error 2');

        return false;
    }
}

function addButton() {
    console.log('addButton', showFullPartyFlag);

    if (!document.querySelector('.showHideFullparty-btn')) {
        showHideBtn = document.createElement('button');
        showHideBtn.classList.add(
            'showHideFullparty-btn',
            'Button_button__1Fe9z'
        );
        showHideBtn.innerText = 'Hide full';
        showHideBtn.addEventListener('click', showHide);
        document
            .querySelector('.FindParty_optionsContainer__3WFfI')
            .appendChild(showHideBtn);
    }
}

function observePartyList() {
    console.log('observePartyList');

    new MutationObserver(showHide).observe(
        document.querySelector('.FindParty_partyList__3lirO'),
        {
            childList: true,
        }
    );
}

function showHide(mutationList, observer) {
    observer ? observer.disconnect() : false;

    console.log('showHide', showFullPartyFlag);

    const partyList = document.querySelector(
        '.FindParty_partyList__3lirO'
    ).children;
    showFullPartyFlag = showFullPartyFlag ? false : true;
    [...partyList].forEach(function (party) {
        if (!isFree(party) && showFullPartyFlag == false) {
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

function isFree(party) {
    return party
        .querySelector('[class*="FindParty_partySlots"]')
        .querySelectorAll('[class*="FindParty_empty"]').length;
}
