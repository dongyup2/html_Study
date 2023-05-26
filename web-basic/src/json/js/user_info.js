/*
    서버에서 가지고 있는 데이터
*/

let userList = [
    {
        usercode: 20220001,
        username: "junil1",
        password: "1234",
        name: "김준일",
        email: "aaaa@gmail.com",
        role: ["ROLE_ADMIN", "ROLE_USER"],
        provider: "naver"
    },
    {
        usercode: 20220002,
        username: "junil2",
        password: "1234",
        name: "김준이",
        email: "bbbb@gmail.com",
        role: ["ROLE_ADMIN", "ROLE_USER"],
        provider: "google"
    },
    {
        usercode: 20220003,
        username: "junil3",
        password: "1234",
        name: "김준삼",
        email: "cccc@gmail.com",
        role: ["ROLE_ADMIN", "ROLE_USER"],
        provider: "kakao"
    }
];


/*
    클라이언트
*/
const userTableList = document.querySelector(".user-table-list");


// AJAX 통신을 통해 데이터를 서버로 부터 받음
let userJSON = JSON.stringify(userList);

load();

function load() {
    let userListObj = JSON.parse(userJSON);

    for(let i = 0; i < userListObj.length; i++){
        userTableList.appendChild(createTr(userListObj[i]));
    }

    for(let i = 0; i < userListObj.length; i++){
        userTableList.appendChild(createTr2(userListObj[i]));
    }

    for(let i = 0; i < userListObj.length; i++){
        userTableList.innerHTML += createTr3(userListObj[i]);
    }

}

function createTr(userData) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const textNode1 = document.createTextNode(userData.usercode);
    const td2 = document.createElement("td");
    const textNode2 = document.createTextNode(userData.username);
    const td3 = document.createElement("td");
    const textNode3 = document.createTextNode(userData.password);
    const td4 = document.createElement("td");
    const textNode4 = document.createTextNode(userData.name);
    const td5 = document.createElement("td");
    const textNode5 = document.createTextNode(userData.email);
    const td6 = document.createElement("td");
    const textNode6 = document.createTextNode(userData.role.join(", "));
    const td7 = document.createElement("td");
    const textNode7 = document.createTextNode(userData.provider);
    td1.appendChild(textNode1);
    td2.appendChild(textNode2);
    td3.appendChild(textNode3);
    td4.appendChild(textNode4);
    td5.appendChild(textNode5);
    td6.appendChild(textNode6);
    td7.appendChild(textNode7);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    return tr;
}


function createTr2(userData) {
    let userDataArray = new Array();
    userDataArray.push(userData.usercode);
    userDataArray.push(userData.username);
    userDataArray.push(userData.password);
    userDataArray.push(userData.name);
    userDataArray.push(userData.email);
    userDataArray.push(userData.role.join(", "));
    userDataArray.push(userData.provider);

    const tr = document.createElement("tr");

    for(let i = 0; i < userDataArray.length; i++){
        const textNode = document.createTextNode(userDataArray[i]);
        const td = document.createElement("td");
        td.appendChild(textNode);
        tr.appendChild(td);
    }

    return tr;
}

function createTr3(userData) {
    let tr = `
        <tr>
            <td>${userData.usercode}</td>
            <td>${userData.username}</td>
            <td>${userData.password}</td>
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${userData.role.join(", ")}</td>
            <td>${userData.provider}</td>
        </tr>
    `;

    return tr;
}