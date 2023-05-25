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

const userlistloadBtn = document.querySelector(".user-list-load-btn");
const userTableList = document.querySelector(".user-table-list");

userlistloadBtn.onclick = () => {

let userJSON = JSON.stringify(userList);

let userListObj = JSON.parse(userJSON);

userListObj.array.forEach(user => {
    
});
userListObj.forEach(user => {
    userTableList.innerHTML +=`
    <tr>
        <td>${user.usercode}</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role.join(", ")}</td>
        <td>${user.provider}</td>
  </tr>
    
 `;
});

}