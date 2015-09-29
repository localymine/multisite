# Toolkit Roadmap #

All releases will contain bug fixing and polishing for current features.

### 3.x ###
* Rewrite the JS layer using ES6: classes, modules, arrow funcs, etc.
* Remove jQuery as a dependency. Make use of new ES6 features.
* Remove RequireJS and use ES6 modules instead.
* Integrate a template rendering layer instead of using DOM manipulation. Possibly with ES6 template strings.
* Integrate Webpack as a build system.
* Add Less support (possibly through a Sass -> Less converter?)
* Add behaviors as a new module type.

### Future ###
* Support web components - http://w3c.github.io/webcomponents/explainer/
* Support React components

### Components ###
* Dialog - A component that prompts the user for an action. Sister to the modal component.
* Guide - A component that displays introduction guides (popovers) in a sequential order. Useful for show casing new features and functionality.

### Behaviors ###
* Form Validator - Provides form validation.
* Data Binding - Provides 2 way data binding.
* Drag & Drop - Provides a drag and drop system.

### Misc ###
* Take Google fundamentals into consideration - https://developers.google.com/web/fundamentals/
* https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd
* http://jankfree.org/

http://dibaiee.ir/autocomplete-predict-trie/

Component - Modules that require a specific element structure in the DOM, or an element structure that is rendered automatically. A component is usually a thing (a noun), like a button.
Behavior - Modules that add unique passive behavioral functionality to an element or elements. A behavior is usually an action (a verb), like mask or pin.
