export function createShader(gl: WebGL2RenderingContext, source: string, type: GLint): WebGLShader {
  const shader = gl.createShader(type) as WebGLShader;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) + source);
  }
  return shader;
}

export type CreateProgramOptions = {
  varyings?: Iterable<string>,
}

export function createProgram(gl: WebGL2RenderingContext,
    vertShader: WebGLShader, fragShader: WebGLShader, options: CreateProgramOptions = {}): WebGLProgram {
  const program = gl.createProgram() as WebGLProgram;
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  if (options.varyings !== undefined) {
    gl.transformFeedbackVaryings(program, options.varyings, gl.SEPARATE_ATTRIBS);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) as string);
  }
  return program;
}

export function getUniforms(gl: WebGL2RenderingContext, program: WebGLProgram, names: Set<string>): Map<string, WebGLUniformLocation> {
  return [...names].reduce((map, name) => {
    map.set(name, gl.getUniformLocation(program, name));
    return map;
  }, new Map());
}

export function createVbo(gl: WebGL2RenderingContext, array: Int16Array | Float32Array, usage: GLenum = gl.STATIC_DRAW): WebGLBuffer {
  const vbo = gl.createBuffer() as WebGLBuffer;
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, array, usage);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return vbo;
}

export function createIbo(gl: WebGL2RenderingContext, array: Int16Array, usage: GLenum = gl.STATIC_DRAW): WebGLBuffer {
  const ibo = gl.createBuffer() as WebGLBuffer;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, usage);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  return ibo;
}