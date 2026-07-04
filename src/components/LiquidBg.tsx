import { useEffect, useRef } from 'react';

/**
 * Hero背景のWebGL液体歪みキャンバス。
 * 紙色＋ドットグリッド＋巨大タイポ「INVENT」をテクスチャに描き、
 * カーソルの軌跡に沿ったリップルと常時の揺らぎでUVを歪ませる。
 * WebGL非対応環境ではCSSフォールバック（親要素のドット背景）のまま。
 */

const TRAIL_COUNT = 16;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform float uTime;
uniform float uScrollX;
uniform vec3 uTrail[${TRAIL_COUNT}];
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;

  // 常時ゆらめく液体の揺らぎ
  vec2 offset = vec2(
    sin(uv.y * 9.0 + uTime * 0.7) + sin(uv.y * 4.0 - uTime * 0.4),
    cos(uv.x * 8.0 + uTime * 0.6) + cos(uv.x * 3.5 + uTime * 0.35)
  ) * 0.0022;

  // カーソル軌跡のリップル（押し出し歪み）
  for (int i = 0; i < ${TRAIL_COUNT}; i++) {
    vec3 p = uTrail[i];
    vec2 d = uv - p.xy;
    d.x *= aspect;
    float dist2 = dot(d, d);
    float influence = p.z * exp(-dist2 * 70.0);
    offset += normalize(d + 0.0001) * influence * 0.045;
    // リング状の波紋
    float ring = sin(sqrt(dist2) * 40.0 - uTime * 6.0);
    offset += normalize(d + 0.0001) * ring * influence * 0.012;
  }

  vec2 suv = uv + offset + vec2(uScrollX / uRes.x, 0.0);
  gl_FragColor = texture2D(uTex, suv);
}
`;

function drawTexture(ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#fbf7f1';
  ctx.fillRect(0, 0, w, h);

  // 右上のコーラルの淡いグロー
  const glow = ctx.createRadialGradient(w * 0.82, h * 0.12, 0, w * 0.82, h * 0.12, w * 0.5);
  glow.addColorStop(0, 'rgba(255, 138, 92, 0.16)');
  glow.addColorStop(1, 'rgba(255, 138, 92, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // ドットグリッド
  const gap = 30 * dpr;
  ctx.fillStyle = '#e7ddca';
  for (let y = gap / 2; y < h; y += gap) {
    for (let x = gap / 2; x < w; x += gap) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 巨大アウトラインタイポ
  ctx.font = `800 ${Math.min(w * 0.3, h * 0.62)}px Syne, sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 2 * dpr;
  ctx.strokeStyle = 'rgba(255, 90, 31, 0.18)';
  ctx.strokeText('INVENT', -w * 0.01, h * 0.24);
}

export default function LiquidBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    // --- シェーダー ---
    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // --- フルスクリーンクアッド ---
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // --- テクスチャ（2Dキャンバスに描画） ---
    const texCanvas = document.createElement('canvas');
    const texCtx = texCanvas.getContext('2d');
    if (!texCtx) return;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const uTex = gl.getUniformLocation(program, 'uTex');
    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uScrollX = gl.getUniformLocation(program, 'uScrollX');
    const uTrail = gl.getUniformLocation(program, 'uTrail');
    gl.uniform1i(uTex, 0);

    const uploadTexture = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texCanvas);
    };

    const resize = () => {
      const w = Math.round(parent.clientWidth * dpr);
      const h = Math.round(parent.clientHeight * dpr);
      if (w === 0 || h === 0) return;
      canvas.width = w;
      canvas.height = h;
      texCanvas.width = w;
      texCanvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      drawTexture(texCtx, w, h, dpr);
      uploadTexture();
    };
    resize();

    // Webフォント読み込み後にタイポを描き直す
    document.fonts.ready.then(() => {
      drawTexture(texCtx, texCanvas.width, texCanvas.height, dpr);
      uploadTexture();
    });

    // --- カーソル軌跡 ---
    const trail = new Float32Array(TRAIL_COUNT * 3);
    let trailIndex = 0;
    let lastX = -1;
    let lastY = -1;
    const pushPoint = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) return;
      const dx = clientX - lastX;
      const dy = clientY - lastY;
      if (dx * dx + dy * dy < 64) return;
      lastX = clientX;
      lastY = clientY;
      trail[trailIndex * 3] = x;
      trail[trailIndex * 3 + 1] = y;
      trail[trailIndex * 3 + 2] = 1;
      trailIndex = (trailIndex + 1) % TRAIL_COUNT;
    };
    const onMouseMove = (e: MouseEvent) => pushPoint(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) pushPoint(t.clientX, t.clientY);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // --- 描画ループ ---
    let visible = true;
    let rafId = 0;
    const start = performance.now();
    const render = () => {
      if (visible) {
        for (let i = 0; i < TRAIL_COUNT; i += 1) {
          trail[i * 3 + 2] *= 0.955;
        }
        gl.uniform1f(uTime, (performance.now() - start) / 1000);
        gl.uniform1f(uScrollX, window.scrollY * 0.25 * dpr);
        gl.uniform3fv(uTrail, trail);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <canvas className="hero__canvas" ref={canvasRef} aria-hidden="true" />;
}
