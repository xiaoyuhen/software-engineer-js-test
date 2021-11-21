import calculatePosition from './calculatePosition'

/**
 * handle zoom range change event
 * @params {HTMLImageElement} img
 */
function handleZoomRangeEvent(img) {
  const zoomRangeEle = document.querySelector('#zoom-range')
  zoomRangeEle.addEventListener('change', function (e) {
    const scale = parseFloat(e.target.value)

    handleImageScaledToCanvas(img, scale)
  })
}

/**
 * update the scale of the image to the canvas
 * @params {HTMLImageElement} img
 * @params {Number} scale
 */
function handleImageScaledToCanvas(img, scale) {
  const editorCanvas = document.getElementById('editorCanvas')
  const context = editorCanvas.getContext('2d')

  const position = calculatePosition(context, scale)
  context.drawImage(
    img,
    position.x,
    position.y,
    position.width,
    position.height
  )

  context.restore()
}

export default handleZoomRangeEvent
