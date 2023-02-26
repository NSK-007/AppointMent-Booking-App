const crudURL = 'http://localhost:8080';

window.addEventListener('DOMContentLoaded', function () {
    loadAppointments();
})

var sub_up = 'submit';

//submit button
let form = document.querySelector('#form-id');

//list of expenses
let itemList = document.querySelector('ul');
// loadItems();
//submitting for
form.addEventListener('submit', addAppointment);

//deleting expense
itemList.addEventListener('click', removeAppointment);

//editing expense
itemList.addEventListener('click', editAppointment);

let update_btn = document.forms['form-body']['update_btn'];
update_btn.addEventListener('click', updateAppointment);

//updating appointment

//add Expense
function addAppointment(e, sub_up) {
    try {
        e.preventDefault();
        let amount = document.forms['form-body']['name'].value;
        let desc = document.forms['form-body']['mail'].value;
        let type = document.forms['form-body']['number'].value;
        // console.log(amount, desc, type);

        if (amount == null || amount == '' || desc == null || desc == '' || type == null || type == '') {
            // console.log('Empty fields');
            let err_div = document.querySelector('#error');
            err_div.className = 'alert alert-danger';
            err_div.innerHTML = 'Please Enter all fields';

            setTimeout(function () {
                err_div.className = '';
                err_div.innerHTML = '';
            }, 3000);
            return;
        }
        // var id = getUniqueId();

        let obj = {
            name: amount,
            phone: type,
            mail: desc
        }

        axios.post(`${crudURL}/add-appointment`, obj)
            .then(response => {
                // console.log(response.data)
                let li = createNewLi(response.data._id, obj.name, obj.mail, obj.phone);
                let itemList = document.querySelector('ul');
                itemList.appendChild(li);
                document.forms['form-body'].reset();
            })
            .catch(err => {
                console.log(err)
            })
    }
    catch (err) {
        console.log(err)
    }
}

//creating new List Item
function createNewLi(id, amount, type, desc) {
    try {
        let li = document.createElement('li');
        li.className = 'list-group-item';

        //delete button
        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm delete';
        deleteBtn.id = 'delete' + id;
        deleteBtn.appendChild(document.createTextNode('delete appointment'));

        //edit button
        var editBtn = document.createElement('button');
        editBtn.className = 'btn btn-primary btn-sm';
        editBtn.id = 'edit' + id;
        editBtn.appendChild(document.createTextNode('edit appointment'));

        //creating a div to enclose them;
        var div = document.createElement('div');
        div.className = 'row-2 float-right';

        div.appendChild(deleteBtn);
        div.append(' '); // to space the delete and edit
        div.appendChild(editBtn);

        li.appendChild(document.createTextNode(`${amount} - ${type} - ${desc}`));
        li.appendChild(div);
        return li;
    }
    catch (err) {
        console.log(err)
    }
}

function removeAppointment(e) {
    try {
        if (e.target.classList.contains('delete')) {
            let li = e.target.parentElement.parentElement;
            // console.log(e.target.id.substring(6, e.target.id.length))
            let deletedListId = e.target.id.substring(6, e.target.id.length);
            axios.delete(`${crudURL}/appointmentData/${deletedListId}`)
                .then(response => (response))
                .catch(err => console.log(err))
            // console.log(e.target.id[e.target.id.length-1]);
            itemList.removeChild(li);
        }
    }
    catch (err) {
        console.log(err)
    }
}

function editAppointment(e) {
    try {
        if (e.target.id.startsWith('edit')) {
            let editListId = e.target.id.substring(4, e.target.id.length);

            let li = e.target.parentElement.parentElement;
            itemList.removeChild(li);
            // console.log(editListId);
            try {
                let asyncOp = async () => {
                    let appointment = axios.get(`${crudURL}/appointmentData/${editListId}`)
                        .then(response => response.data)
                        .catch(err => console.log(err))

                    let updateObj = await appointment;
                    // console.log(updateObj)
                    document.forms['form-body']['name'].value = updateObj.name;
                    document.forms['form-body']['mail'].value = updateObj.mail;
                    document.forms['form-body']['number'].value = updateObj.phone;

                    document.forms['form-body']['submit_btn'].style.display = "none";
                    document.forms['form-body']['update_btn'].style.display = "block";
                    document.forms['form-body']['update_btn'].id = updateObj._id;

                }
            }
            catch (err) {
                console.log(err)
            }
            asyncOp();
        }
    }
    catch (err) {
        console.log(err)
    }
}

function updateAppointment(e) {
    try {
        e.preventDefault();
        // console.log(e.target.id)
        let amount = document.forms['form-body']['name'].value;
        let desc = document.forms['form-body']['mail'].value;
        let type = document.forms['form-body']['number'].value;
        // console.log(amount, desc, type);

        if (amount == null || amount == '' || desc == null || desc == '' || type == null || type == '') {
            // console.log('Empty fields');
            let err_div = document.querySelector('#error');
            err_div.className = 'alert alert-danger';
            err_div.innerHTML = 'Please Enter all fields';

            setTimeout(function () {
                err_div.className = '';
                err_div.innerHTML = '';
            }, 3000);
            return;
        }
        // var id = getUniqueId();

        let obj = {
            name: amount,
            phone: type,
            mail: desc
        }
        axios.put(`${crudURL}/appointmentData/${e.target.id}`, obj)
            .then(response => {
                var li = createNewLi(e.target.id, obj.name, obj.mail, obj.phone);
                itemList.appendChild(li);
                document.forms['form-body'].reset();
                document.forms['form-body']['update_btn'].style.display = "none";
                document.forms['form-body']['submit_btn'].style.display = "block";
            })
            .catch(err => console.log(err))
    }
    catch (err) {
        console.log(err)
    }
}



function loadAppointments() {
    try {
        axios.get(`${crudURL}/`)
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                let mail = response.data[i].mail;
                let name = response.data[i].name;
                let phone = response.data[i].phone;
                let id = response.data[i]._id;
                let li = createNewLi(id, name, mail, phone);
                // console.log(response.data[i]);
                // console.log(id, name, mail, phone);
                itemList.appendChild(li);
            }
        })
        .catch(err => console.log(err))
    }
    catch (err) {
        console.log(err)
    }
}