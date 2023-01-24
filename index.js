const crudURL = 'https://crudcrud.com/api/2a816f4c8d994577804d5ea38fe9f43c';
loadAppointments();

//submit button
let form = document.querySelector('#form-id');

//list of expenses
let itemList = document.querySelector('ul');
// loadItems();
//submitting for
form.addEventListener('submit', addExpense);

//deleting expense
itemList.addEventListener('click', removeExpense);

//editing expense
itemList.addEventListener('click', editExpense);

//updating appointment

//add Expense
function addExpense(e){
    e.preventDefault();
    let amount = document.forms['form-body']['name'].value;
    let desc = document.forms['form-body']['mail'].value;
    let type = document.forms['form-body']['number'].value;
    // console.log(amount, desc, type);

    if(amount==null || amount=='' || desc==null || desc=='' || type==null || type==''){
        // console.log('Empty fields');
        let err_div = document.querySelector('#error');
        err_div.className = 'alert alert-danger';
        err_div.innerHTML = 'Please Enter all fields';

        setTimeout(function(){
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
    axios.post(`${crudURL}/appointmentData`, obj)
        .then(response => {
            console.log(response.data)
            let li = createNewLi(response.data._id, obj.name, obj.mail, obj.phone);
            let itemList = document.querySelector('ul');
            itemList.appendChild(li);
            document.forms['form-body'].reset();
        })
        .catch(err => {
            console.log(err)
        })
    
}

//creating new List Item
function createNewLi(id, amount, type, desc){
    let li = document.createElement('li');
    li.className  = 'list-group-item';

    //delete button
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm delete'; 
    deleteBtn.id = 'delete'+id;
    deleteBtn.appendChild(document.createTextNode('delete appointment'));

    //edit button
    var editBtn = document.createElement('button');
    editBtn.className = 'btn btn-primary btn-sm';
    editBtn.id = 'edit'+id;
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

function removeExpense(e){
    if(e.target.classList.contains('delete')){
        let li = e.target.parentElement.parentElement;
        // console.log(e.target.id.substring(6, e.target.id.length))
        let deletedListId = e.target.id.substring(6, e.target.id.length);
        axios.delete(`${crudURL}/appointmentData/${deletedListId}`)
            .then(response => console.log(response))
            .catch(err => console.log(err))
        // console.log(e.target.id[e.target.id.length-1]);
        itemList.removeChild(li);
    }
}

function editExpense(e){
    if(e.target.id.startsWith('edit')){
        let editListId = e.target.id.substring(4, e.target.id.length);
        // console.log(editListId);
       
        axios.get(`${crudURL}/appointmentData/${editListId}`)
                .then(response => {
                    // console.log(response)
                    editObj = {
                        name : response.data.name,
                        mail : response.data.mail,
                        id : response.data._id,
                        phone : response.data.phone
                    }

                    document.forms['form-body']['name'].value = editObj.name;
                    document.forms['form-body']['mail'].value = editObj.mail;
                    document.forms['form-body']['number'].value = editObj.phone;

                    document.forms['form-body']['submit_btn'].type = "button";
                    document.forms['form-body']['submit_btn'].value = "update";

                    let li = e.target.parentElement.parentElement;
                    itemList.removeChild(li);

                    document.forms['form-body']['submit_btn'].addEventListener('click', function(){
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

                        let updateObj = {
                            id : editObj.id,
                            name: amount,
                            phone: type,
                            mail: desc
                        }


                        axios.put(`${crudURL}/appointmentData/${editObj.id}`, updateObj)
                        .then(response => {
                            // console.log(editObj); console.log(response)
                            document.forms['form-body'].reset();
                            console.log(response);
                            // loadAppointments();

                            let li = createNewLi(updateObj.id, updateObj.name, updateObj.mail, updateObj.phone);
                            itemList.appendChild(li);
                            // console.log(response.data)

                            document.forms['form-body']['submit_btn'].type = "submit";
                            document.forms['form-body']['submit_btn'].value = "Submit";
                        })
                        .catch(err => console.log(err))


                    })
                    
                })
                .catch(err => console.log(err))    

    }
}

function loadAppointments(){
    axios.get(`${crudURL}/appointmentData`)
        .then(response => {
            for(let i=0;i<response.data.length;i++){
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