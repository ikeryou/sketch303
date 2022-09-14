uniform float rate;
uniform float time;
uniform vec3 color;
uniform vec2 center;

varying vec2 vUv;


void main(void) {
  float d = distance(vUv, center);
  float a = 1.0 - step(rate, d);
  if(a <= 0.01) {
    discard;
  }
  gl_FragColor = vec4(color, a);
}
