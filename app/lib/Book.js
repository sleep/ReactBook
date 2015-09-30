import DefaultContainer from "../DefaultContainer.jsx";
import IlliterateWrapper from "./IlliterateWrapper.jsx";

const __file__ = Symbol.for("__type__");
const __location__ = Symbol.for("__location__");
const __components__ = Symbol("components");

import entries from "dir!./entries.config";
import components from "dir!./components.config";
import containers from "dir!./containers.config";


// Webpack HMR pass through
if (module.hot) {
  module.hot.accept();
}

//Takes "file.jsx" and returns file
function keyTransform(str) {
  return str.slice(0, str.lastIndexOf("."));
}

//Simultaneously walk entries and components
// invariant: entry and component are at same location. Except
// when component is null, in which case
// component is turned into an empty object
function getRoute(path, entry, component, container){
  component = component || {};
  container = container || {};
  //invariant: entry and component are at same location:


  let childRoutes = Object.keys(entry)
        .filter((key) => entry[key][__file__] === "directory")
        .map((key) => (getRoute(key, entry[key], component[key], container[key])))
        .reduce(function(sum, curr) {
          return sum.concat([curr]);
        }, []);

  let classes = Object.keys(component)
        .filter((key) => component[key][__file__] === "file")
        .map((key) => ({[keyTransform(key)] : component[key].src}))
        .reduce(function(sum, curr) {
          return Object.assign(sum, curr);
        },{});


  // use the one in the directory, else default
  let containerComponent = container["__Container.jsx"]
        ? container["__Container.jsx"].src
        : DefaultContainer;

  let src = entry["README.md"].src;
  let __onHMRUpdate__ = entry["README.md"].__onHMRUpdate__;
  let location = entry["README.md"][__location__];

  return {
    path,
    component: containerComponent,
    indexRoute: {
      component: IlliterateWrapper,

      classes,
      src,
      __onHMRUpdate__,
      location
    },
    childRoutes
  };
}

export default class Book {
  constructor() {
    this.routes = getRoute("/", entries, components, containers);
  }

  // Returns routes
  getRoutes() {
    return this.routes;
  }
};
