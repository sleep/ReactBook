import React from "react";
import "./style.scss"

import {Router, Route, Link} from "react-router";
import createHistory from "history/lib/createHashHistory";


import Book from "./lib/Book.js";

let book = new Book();
let routes = [
    book.getRoutes()
];



React.render((
    <Router history={createHistory({queryKey: false})}
            routes={routes}/>
), document.getElementById("app"));

