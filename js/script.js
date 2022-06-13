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
	block.style.backgroundColor = screenColor;
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

const randomColorBrush = () => {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const blackBrush = () => {
	return "#232323";
};

const clearGrid = () => {
	getGridBlocks().forEach((i) => (i.style.backgroundColor = screenColor));
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
let currentColor = blackBrush;
const screenColor = "#FFFFFF";
let currentSize = 0;

const gridContainer = document.querySelector("#grid-container");
const gridSizeSlider = document.querySelector("#grid-size");
const blackBrushButton = document.querySelector("#black-brush-button");
const rainbowBrushButton = document.querySelector("#rainbow-brush-button");
const eraserBrushButton = document.querySelector("#eraser-brush-button");
const clearButton = document.querySelector("#clear-button");

gridSizeSlider.addEventListener("change", (e) => {
	displayGridSize(getNewGridSize());
	createGrid(getNewGridSize());
	console.log(getCurrentGridSize(), getNewGridSize());
});

const unfocusBrushes = () => {
	const brushes = document.querySelectorAll(".brush");
	brushes.forEach((brush) => brush.classList.remove("active-color"));
};

blackBrushButton.addEventListener("click", (e) => {
	currentColor = blackBrush;
	unfocusBrushes();
	e.target.classList.add("active-color");
});

eraserBrushButton.addEventListener("click", (e) => {
	currentColor = () => {
		return screenColor;
	};
	unfocusBrushes();
	e.target.classList.add("active-color");
});

rainbowBrushButton.addEventListener("click", (e) => {
	currentColor = randomColorBrush;
	unfocusBrushes();
	e.target.classList.add("active-color");
});

clearButton.addEventListener("click", clearGrid);

const changeBlockColor = (e) => {
	e.preventDefault();

    let block = null;
    if (e.targetTouches) {
		const x = e.targetTouches[0].clientX;
		const y = e.targetTouches[0].clientY;
		block = document.elementFromPoint(x, y);
	} else {
        block = e.target;
    }

	if (block.classList.contains("grid-block")) {
		block.style.backgroundColor = currentColor();
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

gridContainer.addEventListener("touchmove", (e) => {
	changeBlockColor(e);
	enableDraw();
});

gridContainer.addEventListener("touchstart", changeBlockColor);
gridContainer.addEventListener("touchend", disableDraw);

const initialRun = () => {
	createGrid(getNewGridSize());
	setCurrentGridSize(getNewGridSize());
};

initialRun();
