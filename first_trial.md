
class TokenHandler{
    constructor(){
        this.token = null;
        this.users = [];
        let sessions = {};
    }
    setToken(token){
        this.token = token
    }
    getToken(token){
        return this.token
    }

    async CreateUser(username, password){
        const url = 'http:localhost:3000/create_user';
         username = prompt('Enter username:');
         password = prompt('Enter password:');
        const bodyData = {username, password};

        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(bodyData),
            });

            if(!response.ok){
                throw new Error('Network response is not okay');
            }

            const data = await response.json();
            console.log('User created successfully:', data);

            this.users.push({ username, password });
            
            return data;
            }
        catch(error){
            console.error('Error creating user', error);
            return null;
        }
    }
   

//login 

async Login(username, password){
    let url = 'http://localhost:3000/login';
    const bodyData = {username, password};

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyData),
        });

        if(!response.ok){
            throw new Error('Network response is not okay');
        }

        const data = await response.json();
        this.setToken(data.token);
        console.log('login successful. Token: ', data);
        
        return data.token;
    } catch(error) {
        console.error('Error invalid', error);
        return null;
    }
}
//middleware

middleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const expectedToken = 'your_hardcoded_token_here';
    if (token !== expectedToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
}
//creating a note
async createNote(title, content) {
    const url = 'http://localhost:3000/create_note';
     title = prompt('Enter title:');
     content = prompt('Enter content:');
    const bodyData = { title, content };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(bodyData),
        });

        if (!response.ok) {
            throw new Error('Network response is not okay');
        }

        const data = await response.json();
        console.log('Note created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating note', error);
        return null;
    }
};

};



const tokenHandler = new TokenHandler();

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
  