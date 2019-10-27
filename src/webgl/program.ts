import { VertexShader, FragmentShader } from './shader';
import { createProgram, getUniforms } from '../utils/webgl';

export class Program {
  readonly program: WebGLProgram;
  readonly uniforms: Map<string, WebGLUniformLocation>;

  constructor(gl: WebGL2RenderingContext, readonly vertShader: VertexShader, readonly fragShader: FragmentShader) {
    this.program = createProgram(gl, vertShader.shader, fragShader.shader);
    this.uniforms = getUniforms(gl, this.program,
      new Set([...vertShader.uniforms, ...fragShader.uniforms]));
  }
}