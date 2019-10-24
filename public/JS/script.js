const search = document.getElementById('searchbox');
const matchlist = document.getElementById('match-list');

const searchCities = async searchText => {
  searchText = searchText.replace(/\s+/g, ' ');
  const res = await fetch(
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
  );
  const data = await res.json();

  let matches = data.filter(value => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return value.city.match(regex) || value.state.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    matchlist.innerHTML = '';
  } else {
    matchlist.innerHTML = 'No Result, search correctly';
  }
  output(matches);
};

const output = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
			
			<tr>
			<td>${highlight(match.city, search.value)}</td>
			<td>${highlight(match.state, search.value)}</td> 
			<td>${comma(match.population)}</td>
			<td>${designRate(match.growth_from_2000_to_2013)}</td>
			</tr>

			`
      )
      .join('');
    matchlist.innerHTML = html;
  }
};

search.addEventListener('keypress', () => searchCities(search.value));
search.addEventListener('keydown', () => searchCities(search.value));
let comma = number => {
  var n = new Intl.NumberFormat();
  return n.format(number);
};

let designRate = percent => {
  let output = '';
  if (percent.split('%')[0] < 0) {
    output += "<span class='red'>" + percent + '</span>';
  } else {
    output += "<span class='green'>" + percent + '</span>';
  }
  return output;
};

let highlight = (text, key) => {
  key = key.replace(/\s+/g, ' ');
  let index = text.toLowerCase().indexOf(key);
  let newText = '';

  if (index >= 0) {
    newText =
      text.substring(0, index) +
      "<span class='highlight'>" +
      text.substring(index, index + key.length) +
      '</span>' +
      text.substring(index + key.length);
  } else {
    newText = text;
  }
  return newText;
};
