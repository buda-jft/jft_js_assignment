// where are all the error catch block

// use an array of ids

var ids = []
// var ids = new Array();

// fetch and store the value to local staorage
async function load() {
    // localStorage.clear()
    let res = await fetch('https://jsonplaceholder.typicode.com/users'); // will be a res obj
    let users = await res.json(); // will return json
    // console.log('what type');
    // console.log(typeof(users));

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

async function generateHTML() {
    let md = "";
    let tableHead = document.getElementById('grid');
    for(let i = 0; i < ids.length; i++) {
        let user = JSON.parse(localStorage.getItem(`user${ids[i]}`));
        md += "<tr><td>" +user.name + "</td>";
        md += "<td>" +user.email + "</td>";
        md += "<td>" +user.website + "</td>";
        md += "<td>" +user.cname + "</td>";
        md += `<td><button onClick = "deleteUser(${user.id})">Delete</button></td>`;
        md += `<td><button onClick = "editUser(${user.id})">Edit</button></td></tr>`;
    }
    // console.log(md);
    tableHead.innerHTML = md;
}

function addUser(name, email, website, cname) {
    // this will add obj in the one that is used to display to the output
    // let newid = the the last in the id list + 1
    
    let newid = ids[ids.length - 1] + 1;
    console.log(newid); // 11
    obj = {
        id: newid, 
        name: name,
        email: email,
        website: website,
        cname: cname
    }
    localStorage.setItem(`user${newid}`, JSON.stringify(obj));
    // ids -> 9
    console.log(ids);
    ids.push(newid);
    // ids -> 10
    // localStorage -> [10] 

    console.log(JSON.parse(localStorage.getItem(`user${newid}`))); // log
    console.log(localStorage.getItem(`user${newid}`)); // log
    
    generateHTML();
}


function deleteUser(id) {
    // update the id too
    // console.log(id); // 1
    // console.log(ids); // [10]
    
    localStorage.removeItem(`user${id}`);
    ids = ids.filter(d => d !== id);
    
    // console.log(ids); // [10]
    
    generateHTML();
    // console.log('deleted');
}

function findUserById(id) {
    // return console.log(JSON.parse(localStorage.getItem(`user${id}`)));
    // can use for editing 

    return JSON.parse(localStorage.getItem(`user${id}`));
}

async function start() {
    localStorage.clear()
    await load();
    generateHTML();
    
    addUser("ashu", "ashu@mail", "website.com", "jft");
    // deleteUser(1);
    // findUserById(3);
}

start();


/* note

start is an async func because load is async

*/