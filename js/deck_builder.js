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
  baltarActive = askForCondition('baltar-active', 'Baltar wybrany');
  boomerActive = askForCondition('boomer-active', 'Boomer wybrano');
  exodusActive = askForCondition('exodus-active', 'Exodus wybrano');

  deckConfig = calculateDeck();
  bufor = bufor + "<br/>"
  bufor = bufor + 'Konfiguracja: ludzie: ' + deckConfig.humansNumber +
                  ', cyloni: ' + deckConfig.cylonNumber +
                  ', sympatyk: ' + deckConfig.symphatizer;
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
  bufor = 'Wybrano: ' + bufor;
  document.getElementById('output').innerHTML = bufor;
}

function renderDeck(deckConfig){
  var markup = '';
  for (var i=0; i < deckConfig.humansNumber; i++) {
    markup = markup + '<img src="http://www.geekalerts.com/u/Battlestar-Galactica-Commander-Adama-Bobble-Head-125x125.jpg">';
  }
  for (var i=0; i < deckConfig.cylonNumber; i++) {
    markup = markup + '<img src="http://thumbs.ebaystatic.com/d/l96/m/meeljUZ8sh48VnVhLe5N1Aw.jpg">';
  }
  if (deckConfig.symphatizer) {
    markup = markup + '<img src="http://www.wallpaperno.com/thumbnails/cover/20121031/grace%20park%20battlestar%20galactica%20cylon%20sharon%20boomer%20valerii%201280x1024%20wallpaper_www.wallpaperno.com_40.jpg">';
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
  bufor = 'Graczy: ' + decision;
  return decision;
}
