let requestURL = 'https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
const tb = 

request.onload = function() {
    const events = request.response;
    eventsTable(events);
  }

function eventsTable(obj){
    for(let i = 0; i < obj.lenght; i++){
        console.log(obj[i]);
    }

}
