import Container from "./Container.jsx";
import IlliterateWrapper from "./IlliterateWrapper.jsx";

const __file__ = Symbol.for("__type__");
const __location__ = Symbol.for("__location__");
const __components__ = Symbol("components");

import entries from "dir!./entries.config";
import components from "dir!./components.config";

if (module.hot) {
  module.hot.accept();
}

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

  let location = entry["README.md"][__location__];

  let classes = Object.keys(component)
        .filter((key) => component[key][__file__] === "file")
        .map((key) => ({[keyTransform(key)] : component[key].src}))
        .reduce(function(sum, curr) {
          return Object.assign(sum, curr);
        },{});


  return {
    path: path,
    component: Container,
    indexRoute: {
      component: IlliterateWrapper,
      src: src,
      location: location,
      classes: classes
    },
    childRoutes: childRoutes
  };
}

export default class Book {
  constructor() {
    this.routes = getRoute("/", entries, components);
  }

  // Returns routes
  getRoutes() {
    return this.routes;
  }
};
