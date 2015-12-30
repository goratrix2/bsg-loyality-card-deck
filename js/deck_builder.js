var bufor = '';
var playersNumber;
var baltarActive;
var boomerActive;
var exodusActive;
var deckConfig;

function perform() {
  playersNumber = askForPlayers();
  if (playersNumber < 3 || playersNumber > 6) {
    alert('Zła liczba graczy!');
    return;
  }
  baltarActive = askForCondition('Czy wybrano Baltara ?', 'Baltar wybrany');
  boomerActive = askForCondition('Czy wybrano Boomer ?', 'Boomer wybrano');
  exodusActive = askForCondition('Czy grasz z dodatkiem Exodus ?', 'Exodus wybrano');

  deckConfig = calculateDeck();
  bufor = bufor + "<br/>"
  bufor = bufor + 'Konfiguracja: ludzie: ' + deckConfig.humansNumber +
                  ', cyloni: ' + deckConfig.cylonNumber +
                  ', sympatyk: ' + deckConfig.symphatizer;
  renderBufor();
}

function calculateDeck() {
  var defaultDeckConfig = {
    3: {'humansNumber': 5, 'cylonNumber': 1, 'symphatizer': false},
    4: {'humansNumber': 6, 'cylonNumber': 1, 'symphatizer': true},
    5: {'humansNumber': 8, 'cylonNumber': 2, 'symphatizer': false},
    6: {'humansNumber': 9, 'cylonNumber': 2, 'symphatizer': true}
  };
  var currentDeckConfig = defaultDeckConfig[playersNumber];
  [exodusActive, baltarActive, boomerActive].forEach(function(isActive){
      if (isActive) { currentDeckConfig.humansNumber++ }
  });
  return currentDeckConfig;
}

function renderBufor() {
  bufor = 'Wybrano: ' + bufor;
  document.getElementById('output').innerHTML = bufor;
}

function askForCondition(question, labelForActive) {
  var decision = confirm(question);
  if (decision) {
    bufor = bufor + ', ' + labelForActive;
  }
  return decision;
}

function askForPlayers() {
  var decision = prompt('Ilu graczy (3-6) ?');
  bufor = 'Graczy: ' + decision;
  return decision;
}
