(async () => {
    const { createFFmpeg } = FFmpeg
  
    function generateImages() {
      const canvas = document.createElement('canvas')
      canvas.width = 320
      canvas.height = 240
  
      const ctx = canvas.getContext('2d')
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.font = '64px serif'
  
      const arr = []
  
      for (let i = 0; i < 4; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#000'
        ctx.fillText(i + 1, canvas.width / 2, canvas.height / 2)
  
        const dataUrl = canvas.toDataURL()
        arr.push(dataUrl)
      }
  
      return arr
    }
  
    async function generateVideo(images) {
      const ffmpeg = createFFmpeg({ log: true })
      await ffmpeg.load()
  
      images.forEach(async (image, i) => {
        await ffmpeg.write(`image${i}.png`, image)
      })
  
      await ffmpeg.run('-r 1 -i image%d.png -pix_fmt yuv420p output.mp4')
      const data = ffmpeg.read('output.mp4')
      return data
    }
  
    function createObjectUrl(array, options) {
      const blob = new Blob(array, options)
      const objectUrl = URL.createObjectURL(blob)
      return objectUrl
    }
  
    function insertVideo(src) {
      const video = document.createElement('video')
      video.controls = true
  
      video.onloadedmetadata = () => {
        document.body.appendChild(video)
      }
  
      video.src = src
    }
  
    const div = document.createElement('div')
    div.innerText = '動画生成中'
    document.body.appendChild(div)
  
    const images = generateImages()
    const video = await generateVideo(images)
    const objectUrl = createObjectUrl([video], { type: 'video/mp4' })
    insertVideo(objectUrl)
  
    document.body.removeChild(div)
  })()