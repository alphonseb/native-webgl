import './style.scss'

const canvas = document.createElement('canvas')
canvas.width = document.body.clientWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

const gl = canvas.getContext('webgl2')
gl.clearColor(1.0, 0., 1.0, 0.6)
gl.clear(gl.COLOR_BUFFER_BIT)

const vertexShader = gl.createShader(gl.VERTEX_SHADER)
const vertexShaderSource = `
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`
gl.shaderSource(vertexShader, vertexShaderSource)
gl.compileShader(vertexShader)

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
const fragmentShaderSource = `
    precision mediump float;
    uniform vec4 color;

    void main() {
        gl_FragColor = color; 
    }
`
gl.shaderSource(fragmentShader, fragmentShaderSource)
gl.compileShader(fragmentShader)

const program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

const vertices = new Float32Array([
    -0.5, -0.5,
    0.5,-0.5,
    0.0,0.5
])

const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

gl.useProgram(program)
program.color = gl.getUniformLocation(program, 'color')
gl.uniform4fv(program.color, [0, 1, 0, 0.5])

program.position = gl.getAttribLocation(program, 'position')
gl.enableVertexAttribArray(program.position)
gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)

const h1 = document.querySelector('h1')
let time = 0


const loop = () => {
    requestAnimationFrame(loop)
    time += 0.1
    // time % 1 === 0 ? h1.textContent = time : null
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2)

    // gl.clear(gl.COLOR_BUFFER_BIT)
}

// loop()