// Get data from the server
let getServerData = (url = "http://localhost:3000/users") => {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    }
    
    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
    );
}

let startGetUsers = _ => {
    getServerData().then(
        data => fillDataTable(data, "userTable")
    );
}

document.querySelector("#getDataBtn").addEventListener("click", startGetUsers);

// Fill table with server data
let fillDataTable = (data, tableID) => {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${tableID}" is not found.`);
        return;
    }

    let tBody = table.querySelector("tbody");
    for (let row of data) {
        let tr = createAnyElement("tr");
        for (let k in row) {
            let td = createAnyElement("td");
            td.innerHTML = row[k];
            tr.appendChild(td);
        }
        let btnGroup = createBtnGroup();
        tr.appendChild(btnGroup);
        tBody.appendChild(tr)
    }
}

let createAnyElement = (name, attributes) => {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

let createBtnGroup = _ => {
    let group = createAnyElement("div", {class: "btn btn-group"});
    let infoBtn = createAnyElement("button", {class: "btn btn-info", onclick: "getInfo()"});
    infoBtn.innerHTML = '<i class="fa fa-refresh" aria-hidden="true"></i>';
    
    let delBtn = createAnyElement("button", {class: "btn btn-danger", onclick: "delRow(this)"});
    delBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

    group.appendChild(infoBtn);
    group.appendChild(delBtn);

    let td = createAnyElement("td");
    td.appendChild(group);

    return td;
}

let delRow = (btn) => {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;
    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"
    };

    fetch(`http://localhost:3000/users/${id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => {
            startGetUsers();
        }
    );
}