let requestURL =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
const eventTable = document.getElementById("eventos");
const correlationTable = document.getElementById("correlationTable");
const correlationTableBody = document.getElementById("correlation");

request.onload = function () {
  if (request.status == 200) {
    const events = request.response;
    data = eventsTable(events);
    correlationsTable(data);
  }
};

/* Función que crea la tabla de eventos y hace el conteo de apariciones de cada evento. */
function eventsTable(lista) {
  const preData = {};
  let numSquirrel = 0;

  for (let i = 0; i < 90; i++) {
    let entrada = lista[i];
    let tr = document.createElement("tr");
    let col1 = document.createElement("th");
    let col2 = document.createElement("td");
    let col3 = document.createElement("td");
    let eventos = entrada["events"];
    let squirrel = entrada.squirrel;
    let texto = "";
    for (var j in eventos) {
      let evento = eventos[j];
      texto += evento + ",";
      if (Object.keys(preData).includes(evento)) {
        if (squirrel == true) {
          preData[evento].TP += 1;
        } else {
          preData[evento].FN += 1;
        }
      } else {
        preData[evento] = {
          TP: 0,
          FN: 0,
          TN: 0,
          FP: 0,
        };
        if (squirrel == true) {
          preData[evento].TP += 1;
        } else {
          preData[evento].FN += 1;
        }
      }
    }
    texto = texto.slice(0, texto.length - 1);
    col1.textContent = i + 1;
    col2.textContent = texto;
    col3.textContent = squirrel;

    tr.appendChild(col1);
    tr.appendChild(col2);
    tr.appendChild(col3);

    if (squirrel == true) {
      tr.style.backgroundColor = "pink";
      numSquirrel += 1;
    }

    eventTable.appendChild(tr);
  }

  preData.squirrel = numSquirrel;
  return preData;
}

/* Función que crea la tabla de correlaciones. */
function correlationsTable(data) {
  numSquirrel = data.squirrel;
  delete data.squirrel;
  let cont = 1;
  for (var evento in data) {
    let tp = data[evento].TP;
    let fn = data[evento].FN;
    let fp = numSquirrel - tp;
    let tn = 90 - tp - fn - fp;

    let mcc =
      (tp * tn - fp * fn) /
      Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn));

    let tr = document.createElement("tr");
    let col1 = document.createElement("th");
    let col2 = document.createElement("td");
    let col3 = document.createElement("td");

    col2.textContent = evento + "";
    col3.textContent = mcc;

    tr.appendChild(col1);
    tr.appendChild(col2);
    tr.appendChild(col3);

    correlationTableBody.appendChild(tr);
  }
  sortTable();
  enumerateTable();
}

/* Función que ordena la tabla de acuerdo a la correlación. */
function sortTable() {
  let rows, sorted, i, x, y, sortFlag;
  sorted = true;
  while (sorted) {
    sorted = false;
    rows = correlationTable.rows;
    for (i = 1; i < rows.length - 1; i++) {
      sortFlag = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
        sortFlag = true;
        break;
      }
    }
    if (sortFlag) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      sorted = true;
    }
  }
}

/* Función que enumera la tabla de correlaciones. */
function enumerateTable() {
  let rows = correlationTable.rows;
  for (i = 1; i < rows.length; i++) {
    x = rows[i].getElementsByTagName("TH")[0];
    x.textContent = i;
  }
}
