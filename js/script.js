const gridSizeSlider = document.querySelector("#grid-size");
const getNewGridSize = () => Number(gridSizeSlider.value);

let currentSize = 0;
const getCurrentGridSize = () => Number(currentSize);
const setCurrentGridSize = (size) => (currentSize = size);

const sliderLabel = document.querySelector("#grid-size-display");

const displayGridSize = (gridSize) => {
	sliderLabel.textContent = `${gridSize}x${gridSize}`;
};

const gridContainer = document.querySelector("#grid-container");

const getGridItemSize = (gridSize, gridContainer) => {
	const containerWidth = gridContainer.offsetWidth;
	const itemSize = containerWidth / gridSize;
	return itemSize;
};

const createGridItem = (size) => {
	const gridItem = document.createElement("div");
	gridItem.classList.add("grid-item");
	gridItem.style.width = `${size}px`;
	gridItem.style.height = `${size}px`;
	return gridItem;
};

const resizeItem = (item, size) => {
	item.style.width = `${size}px`;
	item.style.height = `${size}px`;
};

const isLargerGrid = (currSize, newSize) => {
	return currSize < newSize;
};

const getSizeDifference = (currSize, newSize) => Math.abs(currSize - newSize);
const addGridItemToContainer = (item) => {
	gridContainer.appendChild(item);
};

const createGrid = (newSize) => {
	let gridItems = [...document.querySelectorAll(".grid-item")];
	gridContainer.innerHTML = "";
	const currSize = getCurrentGridSize();
	const diff = getSizeDifference(currSize, newSize);
	gridItems.forEach((i) =>
		resizeItem(i, getGridItemSize(newSize, gridContainer))
	);
	if (isLargerGrid(currSize, newSize)) {
		for (let i = 0; i < newSize * newSize - currSize * currSize; i++) {
			gridItems.push(
				createGridItem(getGridItemSize(newSize, gridContainer))
			);
		}
	} else {
		gridItems = gridItems.slice(0, newSize * newSize);
	}

	gridItems.forEach((i) => addGridItemToContainer(i));

	setCurrentGridSize(newSize);
};

const resizeGrid = (newSize) => {
	const gridItems = [...document.querySelectorAll(".grid-item")];
	const resized = gridItems.map((item) => {
		item.style.height = `${newSize}px`;
		item.style.width = `${newSize}px`;
	});
	return resized;
};

gridSizeSlider.addEventListener("change", (e) => {
	displayGridSize(e.target.value);
	createGrid(getNewGridSize());
	console.log(getCurrentGridSize(), getNewGridSize());
});

const initialRun = () => {
	createGrid(getNewGridSize());
	setCurrentGridSize(getNewGridSize());
};

initialRun();
