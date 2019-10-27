import { createShader } from '../utils/webgl';

abstract class Shader {
  readonly shader: WebGLShader;

  protected constructor(gl: WebGL2RenderingContext,
      readonly source: string, readonly uniforms: Set<string>, type: GLint) {
    this.shader = createShader(gl, source, type);
  }
}

export class VertexShader extends Shader {
  constructor(gl: WebGL2RenderingContext, source: string, uniforms: Set<string>) {
    super(gl, source, uniforms, gl.VERTEX_SHADER);
  }
}

export class FragmentShader extends Shader {
  constructor(gl: WebGL2RenderingContext, source: string, uniforms: Set<string>) {
    super(gl, source, uniforms, gl.FRAGMENT_SHADER);
  }
}