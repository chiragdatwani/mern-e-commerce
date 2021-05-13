# BookAttic is an online bookstore made using the MERN stack.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is my first attempt at making a full-stack application. Node was the technology of choice here for the backend which further improved my understanding of JS.
This is a full fledged e-commerce site for books. People can create an account and look at all their orders.
This also has admin features built-in which can be accessed by signing in with an admin account. An Admin can add, edit or remove books and can also access a list of all orders.
	
## Technologies

* NodeJs
* Express
* React
* Redux
* MongoDB (mongoose)
* Styled-Components
* Material-UI
* GSAP (animations)
* PayPal SDK
* JWT (auth)
* Axios
	
## Setup
To run this project, install both server and client dependencies using npm:

```
$ npm install
$ cd client
$ npm install
```

Using concurrently you can run both express server and CRA server at the same time:

```
$ npm run dev
```