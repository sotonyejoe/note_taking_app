// fetch('http://localhost:3000/login', { method: 'post' },
//     {
//         "username": "mike",
//         "password": "123mike"
//     })


// const url = 'http://localhost:3000/login';
// const data = {
//     username: 'mike',
//   password: '123mike'
// };

// fetch(url, {
//     method: 'POST',
//     headers: {
//         'content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
// })
// .then(response => {
//     console.log(response)
//     if(!response.ok){
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// })
// .then(data => {
//     console.log('success:', data);
// })
// .catch(error => {
//     console.error('Error:', error);
// })

const noteData = {
    title: 'The Legend',
    content: 'only the brave can conquer the evil'
}
fetch('http://localhost:3000/notes',
      {method: 'POST', 
      headers: {
        'Content-Typed': 'application/json',
        'Authorization': 'Bearer 8a8d5b4a-e8d7-467b-8748-4845662ae1d6',
      },
     body : JSON.stringify(noteData)
     
    })
     .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok');
            
        }
        return response.json();
        
     })
.then(data => {
    console.log('Note has been created successfully:', Data);
})
.catch(error => {
    console.error('There is a problem fetching note(Error):', error);
})