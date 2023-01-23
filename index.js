//array of ids for local storage
function getUniqueId(){
    let id=0;
    if(localStorage.length==0)
        return 1;
    let max = 1;
    for(x in localStorage){
        if(x=='length'){
            // console.log("ID:"+id, parseInt(id)+1)
            console.log(max);
            return max+1;
        }
        if(max<parseInt(x))
        max = parseInt(x);
        
    }
    // console.log(id);
    // console.log(localStorage.length)
}

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

//add Expense
function addExpense(e){
    e.preventDefault();
    let amount = document.forms['form-body']['amount'].value;
    let desc = document.forms['form-body']['desc'].value;
    let type = document.forms['form-body']['type'].value;
    // console.log(amount, desc, type);

    if(amount==null || amount=='' || desc==null || desc=='' || type==null || type==''){
        // console.log('Empty fields');
        let err_div = document.querySelector('#error');
        err_div.className = 'alert alert-danger';
        err_div.innerHTML = 'Please Enter all fields';

        setTimeout(function(){
            err_div.className = '';
            err_div.innerHTML = '';
        }, 4000);
        return;
    }
    var id = getUniqueId();
    let li = createNewLi(id, amount, type, desc);
    let itemList = document.querySelector('ul');
    itemList.appendChild(li);
    let obj = {
        amnt : amount,
        typ : type,
        dsc : desc
    }
    localStorage.setItem(id, JSON.stringify(obj));
    document.forms['form-body']['amount'].value = '';
    document.forms['form-body']['type'].value = '';
    document.forms['form-body']['desc'].value = '';
}

//creating new List Item
function createNewLi(id, amount, type, desc){
    let li = document.createElement('li');
    li.className  = 'list-group-item';

    //delete button
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm delete'; 
    deleteBtn.id = 'delete'+id;
    deleteBtn.appendChild(document.createTextNode('delete expense'));

    //edit button
    var editBtn = document.createElement('button');
    editBtn.className = 'btn btn-primary btn-sm';
    editBtn.id = 'edit'+id;
    editBtn.appendChild(document.createTextNode('edit expense'));

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
        console.log(e.target.id[e.target.id.length-1]);
        deleteInLocalStorage(e.target.id.substring(6, e.target.id.length));
        itemList.removeChild(li);
    }
}

function editExpense(e){
    if(e.target.id.startsWith('edit')){
        let id = e.target.id.substring(4, e.target.id.length);
        console.log(id);
        let obj = JSON.parse(localStorage.getItem(id));

        console.log(obj.amnt)

        document.forms['form-body']['amount'].value = obj.amnt;
        document.forms['form-body']['type'].value = obj.typ;
        document.forms['form-body']['desc'].value = obj.dsc;

        let li = e.target.parentElement.parentElement;
        deleteInLocalStorage(e.target.id.substring(4, e.target.id.length));
        itemList.removeChild(li);
    }
}

function deleteInLocalStorage(id){
    for(x in localStorage){
        if(parseInt(x)==parseInt(id)){
            localStorage.removeItem(x); 
            return;
        }
    }
}