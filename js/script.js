const gridSizeSlider = document.querySelector("#grid-size");
const gridSize = gridSizeSlider.value;

const gridSizeDisplay = document.querySelector('#grid-size-display')

const displayGridSize = (gridSize) => {
    gridSizeDisplay.textContent = `${gridSize}x${gridSize}`;
}

gridSizeSlider.addEventListener('change', e => {
    displayGridSize(e.target.value);
})
