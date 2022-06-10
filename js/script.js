const gridContainer = document.querySelector("#grid-container");
const gridSizeSlider = document.querySelector("#grid-size");

const getNewGridSize = () => Number(gridSizeSlider.value);

const getCurrentGridSize = () => Number(currentSize);
const setCurrentGridSize = (size) => (currentSize = size);

const displayGridSize = (gridSize) => {
	const sliderLabel = document.querySelector("#grid-size-display");
	sliderLabel.textContent = `${gridSize}x${gridSize}`;
};

const getGridBlockSize = (gridSize, gridContainer) => {
	const containerWidth = gridContainer.offsetWidth;
	const blockSize = containerWidth / gridSize;
	return blockSize;
};

const createGridBlock = (size) => {
	const block = document.createElement("div");
	block.classList.add("grid-block");
	block.style.width = `${size}px`;
	block.style.height = `${size}px`;
	block.draggable = false;
	return block;
};

const resizeBlock = (block, size) => {
	block.style.width = `${size}px`;
	block.style.height = `${size}px`;
};

const isLargerGrid = (currSize, newSize) => {
	return currSize < newSize;
};

const getSizeDifference = (currSize, newSize) =>
	Math.abs(newSize * newSize - currSize * currSize);

const addGridBlockToContainer = (block) => {
	gridContainer.appendChild(block);
};

const resizeGrid = (newSize) => {
	const gridBlocks = getGridBlocks();
	const resized = gridBlocks.map((block) => {
		block.style.height = `${newSize}px`;
		block.style.width = `${newSize}px`;
	});
	return resized;
};

const getGridBlocks = () => {
	return [...document.querySelectorAll(".grid-block")];
};

const removeGrid = () => {
	gridContainer.innerHTML = "";
};

const clearGrid = () => {
	getGridBlocks().forEach((i) => (i.style.backgroundColor = "#FFF"));
};

const createGrid = (newSize) => {
	let gridBlocks = getGridBlocks();
	clearGrid();
	removeGrid();
	const currentGridSize = getCurrentGridSize();
	const diff = getSizeDifference(currentGridSize, newSize);
	gridBlocks.forEach((i) =>
		resizeBlock(i, getGridBlockSize(newSize, gridContainer))
	);
	if (isLargerGrid(currentGridSize, newSize)) {
		for (
			let i = 0;
			i < newSize * newSize - currentGridSize * currentGridSize;
			i++
		) {
			gridBlocks.push(
				createGridBlock(getGridBlockSize(newSize, gridContainer))
			);
		}
	} else {
		gridBlocks = gridBlocks.slice(0, newSize * newSize);
	}

	gridBlocks.forEach((i) => addGridBlockToContainer(i));

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
	e.preventDefault();
	if (e.target.classList.contains("grid-block")) {
		e.target.style.backgroundColor = currentColor;
	}
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
gridContainer.addEventListener("mousedown", (e) => {
	changeBlockColor(e);
	enableDraw();
});
gridContainer.addEventListener("mouseup", disableDraw);
gridContainer.addEventListener("mouseleave", disableDraw);
// gridContainer.addEventListener("drag", e => {
//     e.preventDefault();
// });

const initialRun = () => {
	createGrid(getNewGridSize());
	setCurrentGridSize(getNewGridSize());
};

initialRun();
