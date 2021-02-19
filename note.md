note:

    don't use append child as it is very strong ???


async function displayHTML() {
    // console.log(ids);
   
    // destroy the already built table

    for (let i = 0; i < ids.length; i++) {
        // console.log(`user${ids[i]}`);
        
        let user = JSON.parse(localStorage.getItem(`user${ids[i]}`));
        // console.log(user);
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
s