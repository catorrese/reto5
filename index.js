let requestURL = 'https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
const table = document.getElementById('eventos');
request.onload = function() {
    if (request.status == 200){
        const events = request.response;
        eventsTable(events);
    } 
  }

function eventsTable(lista){
    
    for(let i = 0; i < 90; i++){ 
        const entrada = lista[i];
        const tr = document.createElement('tr');
        const col1 = document.createElement('th');
        const col2 = document.createElement('td');
        const col3 = document.createElement('td');
        const eventos = entrada['events'];
        const squirrel = entrada.squirrel
        let texto = "";
        for(var j in eventos){
            texto += eventos[j] + ',';
        }
        texto = texto.slice(0, texto.length-1)
        col1.textContent = i+1;
        col2.textContent = texto;
        col3.textContent = squirrel;

        tr.appendChild(col1);
        tr.appendChild(col2);
        tr.appendChild(col3);

        table.appendChild(tr);
    }

}
