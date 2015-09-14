//Generate routes
import App from "./../App.jsx";
import Landing from "./../Landing.jsx";

//TODO: imeplement
import Container from "./Container.jsx";
import generateComponent from "./generateComponent.jsx";

const __file__ = Symbol.for("__type__");
const __components__ = Symbol("components");

class Route {
  constructor(path, container, index) {
    this.path = path;
    this.component = container;
    this.indexRoute = {
      component: index
    };
    this.childRoutes = [];
  }

  add(elem) {
    this.childRoutes.push(elem);
  }
}


//Takes "file.jsx" and returns file
function keyTransform(str) {
  return str.slice(0, str.lastIndexOf("."));
}

// takes an entry and recursively returns a route

function getRoute(path, entry) {
  let src = entry["README.md"].src;
  let classes = genClasses();

  let Component = generateComponent(src, classes);

  let route = new Route(path, Container, Component);
  Object.keys(entry).forEach(key);
}


//Simultaneously walk entries and components
// invariant: entry and component are at same location. Except
// when component is null, in which case
// component is turned into an empty object
function getRoute(path, entry, component){
  component = component || {};
  //invariant: entry and component are at same location:


  let childRoutes = Object.keys(entry)
        .filter((key) => entry[key][__file__] === "directory")
        .map((key) => (getRoute(key, entry[key], component[key])))
        .reduce(function(sum, curr) {
          return sum.concat([curr]);
        }, []);

  let src = entry["README.md"].src;
  let classes = Object.keys(component)
        .filter((key) => component[key][__file__] === "file")
        .map((key) => ({[keyTransform(key)] : component[key].src}))
        .reduce(function(sum, curr) {
          return Object.assign(sum, curr);
        },{});

  let IlliterateComponent = generateComponent(src, classes);

  return {
    path: path,
    component: Container,
    indexRoute: {component: IlliterateComponent},
    childRoutes: childRoutes
  };
}

export default class Book {
  constructor(entries, components) {
    this.routes = getRoute("/", entries, components);
  }

  // Returns routes
  getRoutes() {
    console.log(this.routes);
    return this.routes;
  }
};
