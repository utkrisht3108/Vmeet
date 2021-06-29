attendies.addEventListener('click', () => {
  partOverlay.style.visibility = 'visible';

  participantsHead.innerHTML = 'Number of Participants: ' + participants.length;
  participantsCont.innerHTML = '';
  participants.sort()
  for (let i = 0; i < participants.length; i++) {
    participantsCont.innerHTML += `<div class="participants_head">
            <h3 class="participants_name">${i + 1}. ${participants[i]}</h3>
          </div>`;
  }
});
