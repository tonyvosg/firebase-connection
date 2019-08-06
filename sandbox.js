const list = document.querySelector("ul");
const form = document.querySelector("form");
//add data to the front-end
const addRecipe = ( (doc, id)=>{
    let time = doc.created_at.toDate();
    let html = `
        <li data-id="${id}">
            <div> ${doc.title} </div>
            <div> ${time} </div>
            <button class="btn btn-danger btn-sm my-2"> Delete </button>
        </li>
    `;
    list.innerHTML += html;
});
//retrieve data from database and add to the database
db.collection('recipes').get().then((snapshot)=>{
    //console.log(snapshot.docs[0].data());
    snapshot.docs.forEach( doc=>{
        addRecipe(doc.data(), doc.id);
    })
}).catch(err=>{
    console.log(err);
})
//when from is entered, add data to the database
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const now = new Date();
    const recipe = {
        title : form.recipe.value,
        created_at : firebase.firestore.Timestamp.fromDate(now),
        author : 'tony',
    }
    db.collection('recipe').add(recipe).then(()=>{
        console.log('Recipe added!');
    }).catch(err => {
        console.log(err);
    });
});
//deleting data using event delegation => you must get the id from the database
list.addEventListener('click', (e=>{
    if(e.target.tagName === "button"){
        const id = e.target.parentElement.getAttribute("data-id");
        db.collection('recipe').doc(id).delete().then(()=>{
            console.log('recipe deleted')
        }).catch(err => console.log(err));
    }
}))