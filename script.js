var ids = [];

async function load() {
    let res = await fetch('https://jsonplaceholder.typicode.com/users'); // will be a res obj
    let users = await res.json(); // will return json

    users.map(u => {
        let obj = {};
        obj.id = u.id;
        obj.name = u.name;
        obj.email = u.email;
        obj.website = u.website;
        obj.cname = u.company.name;
        // console.log(obj);
        ids.push(u.id);
        localStorage.setItem(`user${u.id}`, JSON.stringify(obj));
    })
}

function generateHTML() {
    let md = "";
    let tableHead = document.getElementById('grid');
    for(let i = 0; i < ids.length; i++) {
        let user = JSON.parse(localStorage.getItem(`user${ids[i]}`));
        md += "<tr><td>" +user.name + "</td>";
        md += "<td>" +user.email + "</td>";
        md += "<td>" +user.website + "</td>";
        md += "<td>" +user.cname + "</td>";
        md += `<td><button onClick = "deleteUser(${user.id})">Delete</button></td>`;
        md += `<td><button onClick = "editUser(${user.id})" type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#exampleModal"
        data-whatever="@getbootstrap">Edit</button></td>`
        // md += `<td><button onClick = "editUser(${user.id})">Edit</button></td></tr>`;
    }
    // console.log(md);
    tableHead.innerHTML = md;
}

function editUser(id) {
    // first generate that modal
    document.getElementById("exampleModalLabel").innerText = "Edit User";
    document.getElementById("operation").innerText = "Update!";
    console.log('user id is ', id);
}

// add a new user
function addUser(name, email, website, cname) {
    // let newid = the the last in the id list + 1
    
    let newid = ids[ids.length - 1] + 1;
    // console.log(newid); // 11
    obj = {
        id: newid, 
        name: name,
        email: email,
        website: website,
        cname: cname
    }
    localStorage.setItem(`user${newid}`, JSON.stringify(obj));
    ids.push(newid);
    // ids -> 10
    // localStorage -> [10] 

    // console.log(JSON.parse(localStorage.getItem(`user${newid}`))); // log
    // console.log(localStorage.getItem(`user${newid}`)); // log
    
    generateHTML();
    console.log(`user${newid} is added`);
}

function updateOperator() {
    console.log('nanai ');
    document.getElementById("exampleModalLabel").innerText = "New User";
    document.getElementById("operation").innerText = "Add User";    
}

function addButton() {
    let name = document.getElementById("recipient-name").value;
    let email = document.getElementById("email-name").value;
    let website = document.getElementById("website-name").value;
    let company = document.getElementById("company-name").value;
    // console.log(name);
    addUser(name, email, website, company);

    document.getElementById("recipient-name").value = "";
    document.getElementById("email-name").value = "";
    document.getElementById("website-name").value = "";
    document.getElementById("company-name").value = "";
}

function deleteUser(id) {
    // update the id too
    // console.log(id); // 1
    // console.log(ids); // [10]
    
    localStorage.removeItem(`user${id}`);
    ids = ids.filter(d => d !== id);
    generateHTML();
    console.log(`user${id} is deleted`);
}

// for editing 
function findUserById(id) {
    // console.log(JSON.parse(localStorage.getItem(`user${id}`)));

    return JSON.parse(localStorage.getItem(`user${id}`));
}

async function start() {
    localStorage.clear()
    await load();
    generateHTML();
    
    // addUser("ashu", "ashu@mail", "website.com", "jft");
    // deleteUser();
    // findUserById(3);
}

start();


/* note
    start is an async func because load is async
*/