# JavaScript Concepts Cheat Sheet

====================================================================================
====================================================================================

## 1. The DOM (Document Object Model)

**Definition:**  
The DOM is a tree-like structure representing all elements on a web page. JavaScript uses the DOM to interact with and change the page.

**Example:**
```js
const videos = document.getElementsByTagName('video');
```

**Where/Why Used:**  
Used to find, change, or add elements on a web page. Essential for any browser-based JavaScript.

====================================================================================
====================================================================================

## 2. Variable Declarations: `var`, `let`, `const`

**Definition:**  
Ways to declare variables in JavaScript. `var` is function-scoped (old), `let` and `const` are block-scoped (modern). `const` cannot be reassigned.

**Example:**
```js
let count = 5;      // Can be changed, block-scoped
const name = 'Bae'; // Cannot be changed, block-scoped
var oldWay = 10;    // Can be changed, function-scoped (avoid in modern code)
```

**Where/Why Used:**  
Use `let` for variables that will change, `const` for those that won't. Avoid `var` in new code.

====================================================================================
====================================================================================

## 3. camelCase Naming

**Definition:**  
A naming convention where the first word is lowercase and each new word starts with a capital letter.

**Example:**
```js
let videoElement;
const numberOfVideos = 5;
function detectVideosOnPage() {}
```

**Where/Why Used:**  
Standard for variables and functions in JavaScript. Makes code readable and professional.

====================================================================================
====================================================================================

## 4. document.readyState & DOMContentLoaded

**Definition:**  
`document.readyState` tells you if the page is still loading or is ready. `DOMContentLoaded` is an event that fires when the HTML is fully loaded.

**Example:**
```js
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', myFunction);
} else {
  myFunction();
}
```

**Where/Why Used:**  
Ensures your code runs only after the page is ready, so you don't miss any elements.

====================================================================================
====================================================================================

## Looping Through DOM Collections (Best Practice)

**Definition:**  
When you use methods like `getElementsByTagName`, you get an HTMLCollection (not a true array). To process each element, you need to loop through the collection.

**Best Practice Example (Production):**
```js
const videos = document.getElementsByTagName('video');
for (const video of videos) {
  // Do something with video
}
```

**Other Options:**
- Classic for loop (useful if you need the index):
  ```js
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    // Do something
  }
  ```
- Convert to array if you want to use array methods:
  ```js
  const videosArr = Array.from(videos);
  videosArr.forEach(video => {
    // Do something
  });
  ```

**Where/Why Used:**  
- Use `for...of` for clean, modern code when looping through DOM collections.
- Use classic `for` if you need the index.
- Convert to array if you want to use array methods like `.map` or `.filter`.

====================================================================================
====================================================================================

*Add more concepts as you learn!* 