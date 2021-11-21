/**
 * calculate the position of the image to the canvas
 * @params {CanvasRenderingContext2D} context
 * @params {Number} scale
 * @returns {Object} position
 */
function calculatePosition(context, scale) {
  const width = context.canvas.width * scale
  const height = context.canvas.height * scale
  const x = (context.canvas.width - width) / 2
  const y = (context.canvas.height - height) / 2

  return {
    width,
    height,
    x,
    y,
  }
}

export default calculatePosition
