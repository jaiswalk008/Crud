let form = document.getElementById('my-form');
form.addEventListener('submit' , onSubmit);
//array for storing users
let users=[];
//variable to keep a count of number of users
let i=0;
const list =document.getElementById('user-list');
list.addEventListener('click',change);

function onSubmit(e){
    e.preventDefault();
    //setting item in local storage as (name,value) pair.
    
    //localStorage.setItem('User Name: ',''+e.target.name.value,'User Email: ',''+e.target.email.value);
    //localStorage.setItem('User Email: ',''+e.target.email.value);
    // console.log(typeof localStorage.getItem('User Name: '));
    let userData = {
        userName : e.target.name.value,
        userEmail : e.target.email.value,
        userPhone : e.target.phone.value
    };
    users.push(userData);
    let info = userData.userName +' - '+userData.userEmail+' - '+userData.userPhone;
    let newLi = document.createElement('li');
    //delete button
    let btn = document.createElement('button');
    //btn.addEventListener('click',onDelete)
    btn.textContent='delete';
    newLi.style.margin='5px';
    btn.style.marginLeft='5px';
    btn.className='delete';
    //edit button
    let editBtn = document.createElement('button');
    editBtn.textContent='edit';
    editBtn.style.marginLeft='5px';
    editBtn.className='edit';
    newLi.appendChild(document.createTextNode(info));
    newLi.appendChild(btn);
    newLi.appendChild(editBtn);
    list.appendChild(newLi);

    localStorage.setItem(e.target.email.value,JSON.stringify(users[i]));
    i++;
    //console.log(users);
    //JSON.parse - to revert back to object form
    e.target.name.value='';
    e.target.email.value='';
    e.target.phone.value='';
    console.log(i);
}
function change(e){
    var li = e.target.parentElement;
    let arr = li.childNodes[0].textContent.split(' - ');
    i--;
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure to delete?')){
            list.removeChild(li);
            localStorage.removeItem(arr[1]);
        }
    }
    if(e.target.classList.contains('edit')){
        //removing user data to edit
        list.removeChild(li);
        //setting field values
        
        document.getElementById('name').value=arr[0];
        document.getElementById('email').value=arr[1];
        document.getElementById('phone').value=arr[2];
        localStorage.removeItem(arr[1]);

    }
}
