### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
<!-- Callbacks: Functions passed as arguments to other functions to be executed later.
Promises: Objects representing the eventual completion (or failure) of an asynchronous operation.
Async/Await: Syntax introduced in ES2017 to work with Promises in a more synchronous-like manner.
Generators: Functions that can be paused and resumed, used with libraries like co to handle asynchronous code.
Event Loop: The underlying mechanism that handles asynchronous operations in JavaScript. -->

- What is a Promise?

<!-- A Promise is an object representing the eventual completion or failure of an asynchronous operation. It has three states:

Pending: Initial state, neither fulfilled nor rejected.
Fulfilled: Operation completed successfully.
Rejected: Operation failed.
Promises provide .then(), .catch(), and .finally() methods to handle success, failure, and completion, respectively.

They can be chained together to handle complex asynchronous operations. -->

- What are the differences between an async function and a regular function?

<!-- Async Function: Uses the async keyword before the function declaration. It can use the await keyword to pause execution until a Promise is resolved. It always returns a Promise.

Regular Function: Does not use async or await. It executes synchronously and returns the value directly or undefined if no return statement is present. -->

- What is the difference between Node.js and Express.js?

<!-- Node.js: A runtime environment for executing JavaScript code server-side. It provides modules to handle file systems, HTTP requests, and more.

Express.js: A web application framework built on top of Node.js. It simplifies the process of building web applications and APIs by providing a robust set of features for routing, middleware, and handling HTTP requests. -->


- What is the error-first callback pattern?

<!-- The error-first callback pattern is a convention for handling errors in asynchronous code, where the first argument of the callback function is reserved for an error object (or null if no error occurred). Subsequent arguments are used for successful results. Example:

fs.readFile('file.txt', (err, data) => {
  if (err) {
    // handle error
  } else {
    // handle data
  }
}); -->


- What is middleware?
<!-- 
Middleware is a function that has access to the request object (req), the response object (res), and the next function in an Express.js application. Middleware can:

Execute code.
Modify the request and response objects.
End the request-response cycle.
Call the next middleware function in the stack. -->

- What does the `next` function do?

<!-- The next function in Express.js middleware is used to pass control to the next middleware function in the stack. If next is not called, the request-response cycle will be left hanging.

Example:
app.use((req, res, next) => {
  console.log('This middleware runs for every request');
  next(); // Pass control to the next middleware
}); -->


- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

<!-- async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}


Issues:

Parallel Requests: The requests are made sequentially. They should be made in parallel to improve performance.
Error Handling: There is no error handling for the API requests.
Order of Results: The returned array has matt before joel, which may not be intended.
Improved Code:

async function getUsers() {
  try {
    const [elie, joel, matt] = await Promise.all([
      $.getJSON('https://api.github.com/users/elie'),
      $.getJSON('https://api.github.com/users/joelburton'),
      $.getJSON('https://api.github.com/users/mmmaaatttttt')
    ]);

    return [elie, joel, matt];
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

Improvements:

Parallel Requests: Using Promise.all to make requests in parallel.

Error Handling: Adding a try-catch block to handle potential errors.

Correct Order: Returning users in the intended order. -->

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
