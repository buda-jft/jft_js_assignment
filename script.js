// where are all the error catch block

// use an array of ids

var ids = []

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


async function displayHTML() {
    for (let i = 1; i <= localStorage.length; i++) {
            let user = JSON.parse(localStorage.getItem(`user${i}`));
            console.log(user);
            var tableHead = document.querySelector('table');

            let tr = tableHead.insertRow();

            let tname = tr.insertCell();
            text = document.createTextNode(user.name);
            tname.appendChild(text);

            let temail = tr.insertCell();
            text = document.createTextNode(user.email);
            temail.appendChild(text);

            let twebsite = tr.insertCell();
            text = document.createTextNode(user.website);
            twebsite.appendChild(text);

            let tcname = tr.insertCell();
            text = document.createTextNode(user.cname);
            tcname.appendChild(text);

            // create btn 1
            let tbtn1 = tr.insertCell();
            tbtn1.innerHTML = `<button onClick="deleteUser(".$num.")">Edit</button>`
            
            // create btn 2
            let tbtn2 = tr.insertCell();
            tbtn2.innerHTML = `<button onClick="editUser(".$num.")">Delete</button>`

        }
}


function addData(name, email, website, cname) {
    // this will add obj in the one that is used to display to the output
    let newid = localStorage.length + 1;
    obj = {
        id: newid, // this does not look too good 
        name: name,
        email: email,
        website: website,
        cname: cname
    }
    localStorage.setItem(`user${newid}`, JSON.stringify(obj));
}


function deleteUser(id) {
    // update the id too
    localStorage.removeItem(`user${id}`)
}

function findUserById(id) {
    return JSON.parse(localStorage.getItem(`user${id}`));
}

function start() {
    load();
    console.log(ids);
    // console.log(findUserById(2));
    displayHTML();    
}

start()