const gridContainer = document.querySelector("#grid-container");
const gridSizeSlider = document.querySelector("#grid-size");

const getNewGridSize = () => Number(gridSizeSlider.value);

const getCurrentGridSize = () => Number(currentSize);
const setCurrentGridSize = (size) => (currentSize = size);

const displayGridSize = (gridSize) => {
	const sliderLabel = document.querySelector("#grid-size-display");
	sliderLabel.textContent = `${gridSize}x${gridSize}`;
};

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

const getSizeDifference = (currSize, newSize) =>
	Math.abs(newSize * newSize - currSize * currSize);

const addGridItemToContainer = (item) => {
	gridContainer.appendChild(item);
};

const resizeGrid = (newSize) => {
	const gridItems = getGridItems();
	const resized = gridItems.map((item) => {
		item.style.height = `${newSize}px`;
		item.style.width = `${newSize}px`;
	});
	return resized;
};

const getGridItems = () => {
	return [...document.querySelectorAll(".grid-item")];
};

const removeGrid = () => {
	gridContainer.innerHTML = "";
};

const clearGrid = () => {
	getGridItems().forEach((i) => (i.style.backgroundColor = "#FFF"));
};

const createGrid = (newSize) => {
	let gridItems = getGridItems();
	clearGrid();
	removeGrid();
	const currentGridSize = getCurrentGridSize();
	const diff = getSizeDifference(currentGridSize, newSize);
	gridItems.forEach((i) =>
		resizeItem(i, getGridItemSize(newSize, gridContainer))
	);
	if (isLargerGrid(currentGridSize, newSize)) {
		for (
			let i = 0;
			i < newSize * newSize - currentGridSize * currentGridSize;
			i++
		) {
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

// main
const currentColor = "#232323";
const screenColor = "#FFFFFF";
let currentSize = 0;

gridSizeSlider.addEventListener("change", (e) => {
	displayGridSize(getCurrentGridSize());
	createGrid(getNewGridSize());
	console.log(getCurrentGridSize(), getNewGridSize());
});

const changeBlockColor = (e) => {
	e.target.style.backgroundColor = currentColor;
    console.log(`${e}`);
    // e.stopPropagation();
};

const enableDraw = () => {
	gridContainer.addEventListener("click", changeBlockColor);
	gridContainer.addEventListener("mouseover", changeBlockColor);
};

const disableDraw = () => {
    gridContainer.removeEventListener("click", changeBlockColor);
	gridContainer.removeEventListener("mouseover", changeBlockColor);
};

gridContainer.addEventListener("click", changeBlockColor);
gridContainer.addEventListener("mousedown", enableDraw);
gridContainer.addEventListener("mouseup", disableDraw);
gridContainer.addEventListener("mouseleave", disableDraw);

const initialRun = () => {
	createGrid(getNewGridSize());
	setCurrentGridSize(getNewGridSize());
};

initialRun();
