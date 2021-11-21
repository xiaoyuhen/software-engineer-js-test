import handleZoomRange from './handleZoomRange'
import handleDownloadJsonFile from './handleDownloadJsonFile'
import '../css/main.scss'

const store = {}

const AppView = () => {
  document.body.innerHTML = `<h1>Simple Example</h1>
        <form action="#">
            <fieldset>
                <label for="fileSelector">Import an JSON file</label>
                <input type="file" id="JsonSelector" />
            </fieldset>
        </form>
        <form action="#">
            <fieldset>
                <label for="fileSelector">Select an Image file</label>
                <input type="file" id="fileSelector" />
            </fieldset>
        </form>

        <canvas id="editorCanvas"></canvas>
        <div class="handler">
        Zoom:
        <input
          name="scale"
          type="range"
          min="1"
          max="5"
          value="1"
          step="0.1"
          id="zoom-range"
        />
        Submit:
        <button id="generateButton">download json file</button>
        </div>
        `

  // grab DOM elements inside index.html
  const fileSelector = document.getElementById('fileSelector')
  const editorCanvas = document.getElementById('editorCanvas')
  const generateButton = document.getElementById('generateButton')

  fileSelector.onchange = function (e) {
    // get all selected Files
    const files = e.target.files
    let file
    for (let i = 0; i < files.length; ++i) {
      file = files[i]
      const id = file.name

      generateButton.addEventListener('click', function (e) {
        handleDownloadJsonFile(id)
      })

      // check if file is valid Image (just a MIME check)
      switch (file.type) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
          // read Image contents from file
          const reader = new FileReader()
          reader.onload = function (e) {
            // create HTMLImageElement holding image data
            const img = new Image()
            img.src = reader.result
            store[id] = img.src

            img.onload = function () {
              // grab some data from the image
              const width = img.naturalWidth
              const height = img.naturalHeight

              editorCanvas.width = 500
              editorCanvas.height = (500 * height) / width

              const ctx = editorCanvas.getContext('2d')
              ctx.drawImage(
                img,
                0,
                0,
                width,
                height,
                0,
                0,
                editorCanvas.width,
                editorCanvas.height
              )

              const rangeEle = document.querySelector('.handler')
              if (rangeEle) {
                rangeEle.style.display = 'block'
                handleZoomRange(img)
              }
            }
            // do your magic here...
          }
          reader.readAsDataURL(file)
          // process just one file.
          return
      }
    }
  }

  JsonSelector.onchange = function (e) {
    const files = e.target.files
    if (files.length > 1) {
      return alert('please import one json file')
    }

    const file = files[0]
    if (file.type !== 'application/json') {
      return alert('please import json file')
    }

    const reader = new FileReader()

    reader.onload = function (e) {
      const data = JSON.parse(reader.result)
      const ctx = editorCanvas.getContext('2d')
      const {
        canvas: {
          photo: {id, x, y, width, height},
        },
      } = data

      if (!store[id]) {
        return alert(`can't find the origin image`)
      }

      const img = new Image()
      img.src = store[id]

      img.onload = function () {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(img, x, y, width, height)
        ctx.restore()
      }
    }
    reader.readAsText(file)
    return
  }
}

AppView()
