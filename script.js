const normalFunction = () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //We returned the promis to continue chaining .then()
      return fetch(
        `https://jsonplaceholder.typicode.com/users/${data[0]?.userId}`
      );
    })
    .then((userResponse) => userResponse.json())
    .then((user) => console.log(user))
    .catch((error) => console.log(error + '🤬'));
};

const badFunction = () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //Take care you are doing the pyramid of doom or callback hell
      fetch(`https://jsonplaceholder.typicode.com/users/${data[0]?.userId}`)
        .then((userResponse) => userResponse.json())
        .then((user) => console.log(user))
        .catch((error) => console.log(error + '🤬'));
    });
};

normalFunction();
//badFunction();

const asyncFunction = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    //Here we have all todos data
    console.log(data);

    //Now instead of nesting with .then() we continue and fire another request
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${data[0]?.userId}`
    );
    const user = await userResponse.json();
    console.log(user);
  } catch (error) {
    console.log(error + '🤬');
  }
};
