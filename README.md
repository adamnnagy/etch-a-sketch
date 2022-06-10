# etch-a-sketch

## intructions

### the grid
Create a webpage with a 16x16 grid of square divs.
- make the grids adjustable with a range slider https://www.w3schools.com/howto/howto_js_rangeslider.asp
    - 1x1 to 100x100
- all divs have a class
- event listener to grid
- the event changes the color of the current target
- hover on the grid items -- so i know i can interact with them if i go over them with my mouse -- could be a simple "border"

creating a grid item
1. get the size of the screen
    screen.height -> func that returns that
1. calculate how large the item should be
    - height and width are the same
    - this size is equal to the length of the grid container divided by the number of grid items in a row - which is basically the grid size
1. create one grid item (pixel?) with the calculated size 
1. add a class that defines it as a grid item (pixel?)
1. create as many of them as needed -> size * size
1. add these into an array
1. add this array to the grid container (screen?)

PROBLEM!
creating and adding new grid items really slows down the browser
SOLUTION
instead of creating new divs, check how many there are, and either add or remove items from the array, while resizing the items
1. if there are more items in the current grid
    1. remove the items that overflow
    1. resize the items that should stay
1. if there are less items
    1. add new items
        1. create an item
        1. make the size appropriate
        1. multiply the items -- so I add the difference * difference items
    1. resize the items that are already there

resize function - loops over the items and changes the width and height
- resize each time!
to add / remove - could use the .splice() function on the gridItems array.
    when adding - .splice(array.length, 0, [...newItems])
    when removing - .splice(array.length, difference)

Drawing on the grid
1. draw when the mouse clicks
    currently mousedown only enables drawing, but it doesn't draw, as it draw is attached to the mouseover event.
1. draw after a click, as the mouse moves around
1. stop drawing when the mouse is up


### different brushes
- classic gray
- random colors
- eraser
- import nice colors from a color palette generator (outside library)

### how to change colors
- change background color of the divs through JS

### other functions
- could implement the animation repeat, that would make the drawing glow

## UI
- a screen (the grid)
- the different brushes
- the animation on off switch
- add touchend and touchstart for mobile
- 

## extras
- can save 3 pics and store them in session storage
    - save and load functions
    - store the grid as an array