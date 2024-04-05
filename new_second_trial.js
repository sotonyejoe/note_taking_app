const axios = require("axios");

class TestApi {
  constructor() {
    this.token = "";
    this.baseUrl = "http:localhost:3000";
  }

  get({ path, params, callback }) {
    axios
      .get(`${this.baseUrl}${path}`, { params })
      .then((response) => {
        if (callback) callback({ response });
      })
      .catch((error) => {
        if (callback) callback({ error });
      });
  }
  post({ path, body, params, callback }) {
    axios
      .post(`${this.baseUrl}${path}`, body, { params })
      .then((response) => {
        if (callback) callback({ response });
      })
      .catch((error) => {
        if (callback) callback({ error });
      });
  }
  patch({ path, body, params, callback }) {
    axios
      .patch(`${this.baseUrl}${path}`, body, { params })
      .then((response) => {
        if (callback) callback({ response });
      })
      .catch((error) => {
        if (callback) callback({ error });
      });
  }

  delete({ path, params, callback }) {
    axios
      .delete(`${this.baseUrl}${path}`, { params })
      .then((response) => {
        if (callback) callback({ response });
      })
      .catch((error) => {
        if (callback) callback({ error });
      });
  }

  //create User
  createUser({ username, password, callback }) {
    this.post({ path: "/create", body: { username, password }, callback });
  }

  //login
  login({ username, password, callback }) {
    const innerCallback = ({ response, error }) => {
      if (response) {
        const data = response.data;
        this.token = data.token;
      }
      callback({ response, error });
    };
    this.post({
      path: "/login",
      body: { username, password },
      callback: innerCallback,
    });
  }

  // create note
  note({ title, content, callback }) {
    this.post({ path: "/note", body: { title, content }, callback });
  }

  // all notes
  allNotes(callback) {
    this.get({ path: "/notes", callback });
  }

  // edit a note
  editNote({ title, content, callback }) {
    this.patch({ path: "/note/:id", body: { title, content }, callback });
  }

  //delete a note
  deleteNote({ title, content, callback }) {
    this.delete({ path: "/note/:id", body: { title, content }, callback });
  }
}

const testApi = new TestApi();

function callback({ response, error }) {
  if (response) {
    const data = response.data;
    console.log(data);
  } else if (error) {
    console.log(error);
  }
}

testApi.createUser({ username: "Sotonye", password: "123456", callback });
testApi.login({ username: "Sotonye", password: "123456", callback });
testApi.note({
  title: "Miracle the only backend Dev",
  content: "He has the power the save the world",
  callback,
});
testApi.allNotes(callback);
