let form = document.getElementById('my-form');
form.addEventListener('submit' , onSubmit);
const list =document.getElementById('user-list');
list.addEventListener('click',change);

function onSubmit(e){
    e.preventDefault();
    //setting item in local storage as (name,value) pair.
    
    //localStorage.setItem('User Name: ',''+e.target.name.value,'User Email: ',''+e.target.email.value);
    //localStorage.setItem('User Email: ',''+e.target.email.value);
    let userData = {
        userName : e.target.name.value,
        userEmail : e.target.email.value,
        userPhone : e.target.phone.value
    };

    axios.post('https://crudcrud.com/api/0dc464af3af9408790d619aaf79253c0/appointmentData',userData)
    .then((res) => showDetails(res.data))
    .catch((err)=> console.err(err));
   
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/0dc464af3af9408790d619aaf79253c0/appointmentData")
    .then ((res) =>{
        for(let i=0;i<res.data.length;i++){
            showDetails(res.data[i])
        }
    })
    .catch((err)=> console.log(err));
})

function showDetails(userData){
    
        let info = userData.userName +' - '+userData.userEmail+' - '+userData.userPhone;
        let newLi = document.createElement('li');
              
        newLi.id = userData._id;
        
        newLi.innerHTML = `${info}<button class='edit'>edit</button> <button class='delete'>delete</button>
        `
        console.log(newLi);
        list.appendChild(newLi);
        
        form.reset();

}



function change(e){
    var li = e.target.parentElement;
    let arr = li.childNodes[0].textContent.split(' - ');
    console.log(arr)
    let user_id = li.id;
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure to delete?')){
            //deleting using id
            list.removeChild(li);
            axios.delete("https://crudcrud.com/api/0dc464af3af9408790d619aaf79253c0/appointmentData/"+user_id)
            .then(res => console.log(res.status))
            .catch((err)=> console.log(err));
        }
    }
    if(e.target.classList.contains('edit')){
        //removing user data to edit
        list.removeChild(li);
        //setting field values
        
        document.getElementById('name').value=arr[0];
        document.getElementById('email').value=arr[1];
        document.getElementById('phone').value=arr[2];
        
        axios.delete("https://crudcrud.com/api/0dc464af3af9408790d619aaf79253c0/appointmentData/"+user_id)
        .then(res => console.log(res.status))
        .catch((err)=> console.log(err));
        
    }
}
