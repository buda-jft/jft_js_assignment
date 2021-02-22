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
        md += `<td><button onClick = "updateButton(${user.id})" type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#exampleModal"
        data-whatever="@getbootstrap">Edit</button></td>`
    }
    tableHead.innerHTML = md;
}

var updateId = null;

function curUpdateId() {
    // seems very hacky
    return updateId;
}

function updateButton(id) {
    // first generate that modal
    updateOperator('edit');
    // console.log('user id is ', id);

    let user = findUserById(id);
    // console.log(user, typeof(user));

    document.getElementById("recipient-name").value = user.name;
    document.getElementById("email-name").value = user.email;
    document.getElementById("website-name").value = user.website;
    document.getElementById("company-name").value = user.cname;

    updateId = user.id;
}


function clearModal() {
    // console.log('called');
    document.getElementById("recipient-name").value = "";
    document.getElementById("email-name").value = "";
    document.getElementById("website-name").value = "";
    document.getElementById("company-name").value = "";    
}

// this will clean up the form -- not working -- called once at start
// $("#exampleModal").on('hidden.bs.modal', clearModal());

// add a new user
function addUser(name, email, website, cname) {
    let newid = ids[ids.length - 1] + 1;
    let obj = {
        id: newid, 
        name: name,
        email: email,
        website: website,
        cname: cname
    }
    localStorage.setItem(`user${newid}`, JSON.stringify(obj));
    ids.push(newid);
    
    generateHTML();
    console.log(`user${newid} is added`);
}

function updateOperator(label) {
    let exampleModalLabel = document.getElementById("exampleModalLabel");
    let operation = document.getElementById("operation");

    exampleModalLabel.innerText = (label === "add" ? "New User" : "Edit User");
    operation.innerText = (label === "edit" ? "Update!" : "Add User" );
    
    // ideally should change what func to call too
}

function addeditButton() {
    // this will handle both adding and editing depending on context
    let operation = document.getElementById("operation");
    console.log(operation.innerText, "from ? ");

    let name = document.getElementById("recipient-name").value;
    let email = document.getElementById("email-name").value;
    let website = document.getElementById("website-name").value;
    let company = document.getElementById("company-name").value;

    if(operation.innerText === "Update!") {
        // how do i get the id here
        console.log("called update");
        let obj = {
            id: updateId, 
            name: name,
            email: email,
            website: website,
            cname: company
        };
        
        localStorage.setItem(`user${updateId}`, JSON.stringify(obj));
        generateHTML();        
    }
    if(operation.innerText === "Add User") {
        console.log("called add");
        addUser(name, email, website, company);
    }


    // clearModal();

    // also close after one user add
}

function deleteUser(id) {
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