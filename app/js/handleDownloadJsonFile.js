import calculatePosition from './calculatePosition'

/**
 * reconstruct the json from the canvas and save json file to local
 * @params {String} id
 */
function handleDownloadJsonFile(id) {
  const editorCanvas = document.getElementById('editorCanvas')
  const context = editorCanvas.getContext('2d')
  const scale = Number(document.querySelector('#zoom-range').value)
  const position = calculatePosition(context, scale)
  const {width, height} = context.canvas

  const json = {
    canvas: {
      width,
      height,
      photo: {
        id,
        ...position,
      },
    },
  }

  saveJson(json)
}

/**
 * save json to local file
 * @params {Object} json
 */
function saveJson(json) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(json, null, 2)], {
      type: 'text/plain',
    })
  )
  a.setAttribute('download', 'data.json')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export default handleDownloadJsonFile
