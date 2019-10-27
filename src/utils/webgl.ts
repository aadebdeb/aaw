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

export type CreateVboOoptions = {
  usage?: GLenum,
}

export function createVbo(gl: WebGL2RenderingContext, array: Int16Array | Float32Array,
  { usage = gl.STATIC_DRAW }: CreateVboOoptions = {}): WebGLBuffer {
  const vbo = gl.createBuffer() as WebGLBuffer;
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, array, usage);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return vbo;
}

export type CreateIboOptions = {
  usage?: GLenum,
}

export function createIbo(gl: WebGL2RenderingContext, array: Int16Array,
  { usage = gl.STATIC_DRAW }: CreateIboOptions = {}): WebGLBuffer {
  const ibo = gl.createBuffer() as WebGLBuffer;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, usage);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  return ibo;
}

export type CreateTextureOptions = {
  format?: GLenum,
  internalFormat?: GLenum,
  type?: GLenum,
  parameteri?: [GLenum, GLint][],
  parameterf?: [GLenum, GLfloat][],
  source?: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | ImageBitmap | ImageData | ArrayBufferView | null,
}

export function createTexture(gl: WebGL2RenderingContext, width: number, height: number,
    { internalFormat = gl.RGBA, format = gl.RGBA, type = gl.UNSIGNED_BYTE, parameteri = [], parameterf = [], source = null }: CreateTextureOptions = {}): WebGLTexture {
  const texture = gl.createTexture() as WebGLTexture;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, source as any);
  parameteri.forEach(param => gl.texParameteri(gl.TEXTURE_2D, param[0], param[1]));
  parameterf.forEach(param => gl.texParameterf(gl.TEXTURE_2D, param[0], param[1]));
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}

export type CreateFramebufferOptions = {
  colorTextures?: WebGLTexture[],
  depthTexture?: WebGLTexture,
}

export function createFramebuffer(gl: WebGL2RenderingContext,
    { colorTextures = [], depthTexture = undefined }: CreateFramebufferOptions = {}): WebGLFramebuffer {
  const framebuffer = gl.createFramebuffer() as WebGLFramebuffer;
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  colorTextures.forEach((texture, i) => gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, texture, 0));
  if (depthTexture !== undefined) {
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, 0);
  }

  if (colorTextures.length === 0) {
    gl.drawBuffers([gl.NONE]);
  } else if (colorTextures.length >= 2) {
    gl.drawBuffers(colorTextures.reduce<GLenum[]>((accum, _, i) => {
      accum.push(gl.COLOR_ATTACHMENT0 + i);
      return accum;
    }, []));
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return framebuffer;
}