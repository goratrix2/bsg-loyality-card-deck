var bufor = '';
var playersNumber;
var baltarActive;
var boomerActive;
var exodusActive;
var deckConfig;

function perform() {
  playersNumber = askForPlayers();
  if (playersNumber < 3 || playersNumber > 6) {
    alert('wrong number of players !');
    return;
  }
  baltarActive = askForCondition('baltar-active', 'Baltar Selected');
  boomerActive = askForCondition('boomer-active', 'Boomer Selected');
  exodusActive = askForCondition('exodus-active', 'Exodus Selected');

  deckConfig = calculateDeck();
  bufor = bufor + "<br/>"
  bufor = bufor + 'Configuration: humans: ' + deckConfig.humansNumber +
                  ', cylons: ' + deckConfig.cylonNumber +
                  ', symphatizer: ' + deckConfig.symphatizer ;
  renderDeck(deckConfig);
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
  bufor = 'Selected: ' + bufor;
  document.getElementById('output').innerHTML = bufor;
}

function renderDeck(deckConfig){
  var markup = '';
  for (var i=0; i < deckConfig.humansNumber; i++) {
    markup = markup + '<img src="img/loyalty-card2.jpg">';
  }
  for (var i=0; i < deckConfig.cylonNumber; i++) {
    markup = markup + '<img src="img/loyalty-card1.jpg">';
  }
  if (deckConfig.symphatizer) {
    markup = markup + '<img src="img/loyalty-card3.jpg">';
  }
  document.getElementById('deck-output').innerHTML = markup;
}

function askForCondition(checkboxId, labelForActive) {
  var decision = document.getElementById(checkboxId).checked;
  if (decision) {
    bufor = bufor + ', ' + labelForActive;
  }
  return decision;
}

function askForPlayers() {
  var decision = document.getElementById('players-count').value;
  bufor = 'players: ' + decision;
  return decision;
}
