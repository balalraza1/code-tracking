import {
  DEFAULT_CANVAS_HEIGHT,
  DEFAULT_CANVAS_WIDTH,
  MAX_NUMBER_OF_TILES_IN_PIP,
} from "./PIPManager";

let CANVAS_FILL_COLOR;
let CANVAS_STROKE_COLOR;

function setPIPCanvasColors() {
  if (!CANVAS_FILL_COLOR) {
    CANVAS_FILL_COLOR = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--hms-ui-colors-surface_bright");
  }
  if (!CANVAS_STROKE_COLOR) {
    CANVAS_STROKE_COLOR = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--hms-ui-colors-border_bright");
  }
}

export function resetPIPCanvasColors() {
  CANVAS_FILL_COLOR = "";
  CANVAS_STROKE_COLOR = "";
}
/**
 * no tile - blank canvas, black image
 * 1 tile - takes full space on canvas
 * 2 tile - stack two video adjacent to each other
 * 3 tile - two rows first row has two tile second row has one tile centered.
 * 4 tiles - two rows two columns - all equal size
 * All videos will respect their aspect ratios.
 */
export function drawVideoElementsOnCanvas(videoElements, canvas) {
  let videoTiles = videoElements.filter(
    (videoElement) => videoElement.srcObject !== null
  );

  const ctx = canvas.getContext("2d");
  setPIPCanvasColors();
  ctx.fillStyle = CANVAS_FILL_COLOR;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (videoTiles.length === 0) {
    // no tile to render, render black image
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return;
  }

  fillGridTiles(videoTiles.slice(0, MAX_NUMBER_OF_TILES_IN_PIP), ctx, canvas);
}

// this is to send some data for stream and resolve video element's play for a
// video element rendering this canvas' capture stream
export function dummyChangeInCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  setPIPCanvasColors();
  ctx.fillStyle = CANVAS_FILL_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Imagine the canvas as a grid with passed in number of rows and columns. Go
 * over the tiles in the grid in order while drawing the videoElements upon them.
 */
function fillGridTiles(videoElements, ctx, canvas) {
  const offset = 8;
  const buffer = 10; // Buffer space between each video tile
  const containerPadding = 20; // Padding space between container canvas and video tile
  const numVideos = videoElements.length;
  canvas.width = DEFAULT_CANVAS_WIDTH;
  canvas.height = DEFAULT_CANVAS_HEIGHT * numVideos - buffer + containerPadding;

  ctx.fillStyle = CANVAS_FILL_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (numVideos > 0) {
    ctx.strokeStyle = CANVAS_STROKE_COLOR;
    ctx.lineWidth = offset / 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }

  videoElements.forEach((video, index) => {
    const availableHeight = DEFAULT_CANVAS_HEIGHT - offset;
    const { width, height } = getRenderDimensions(
      video,
      canvas.width - offset - 2 * containerPadding,
      availableHeight
    );

    const xOffset = (canvas.width - width) / 2;
    const yOffset =
      containerPadding + index * (DEFAULT_CANVAS_HEIGHT - buffer * 4);

    ctx.drawImage(video, xOffset, yOffset, width, height);
  });
}

/**
 * Restrict the dimensions within the available dimension with aspect ratio
 * constraint applied
 * @param {HTMLVideoElement} video
 * @param {number} width
 * @param {number} height
 * @returns { width: number, height: number }
 */
function getRenderDimensions(video, width, height, widthIncreaseFactor = 1.1) {
  let finalWidth =
    (video.videoWidth / video.videoHeight) * height * widthIncreaseFactor;
  let finalHeight = height;

  if (finalWidth > width) {
    finalWidth = width;
    finalHeight = (video.videoHeight / video.videoWidth) * width;
  }
  return { width: finalWidth, height: finalHeight };
}
