import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Download, ExternalLink, ImagePlus, Moon, RotateCcw, Sun, Upload } from 'lucide-react';
import './styles.css';

import type { LegoColor } from './types';
import { LEGO_PARTS } from './legoParts';
type Cell = LegoColor;
const PALETTE = LEGO_PARTS;
const fallback = 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=85';

function nearest(r: number, g: number, b: number): LegoColor {
  return PALETTE.reduce((best, color) => {
    const h = color.hex.slice(1);
    const cr = parseInt(h.slice(0, 2), 16), cg = parseInt(h.slice(2, 4), 16), cb = parseInt(h.slice(4, 6), 16);
    const distance = (r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2;
    const bh = best.hex.slice(1);
    const br = parseInt(bh.slice(0, 2), 16), bg = parseInt(bh.slice(2, 4), 16), bb = parseInt(bh.slice(4, 6), 16);
    return distance < ((r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2) ? color : best;
  }, PALETTE[0]);
}

function App() {
  const [image, setImage] = useState(fallback);
  const [width, setWidth] = useState(48);
  const [height, setHeight] = useState(36);
  const [dark, setDark] = useState(false);
  const [cells, setCells] = useState<Cell[]>([]);
  const [isDragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { makeMosaic(image, width, height, setCells); }, [image, width, height]);
  const bom = useMemo(() => PALETTE.map(color => ({ ...color, count: cells.filter(c => c.name === color.name && c.element === color.element).length })).filter(x => x.count), [cells]);
  const total = width * height;

  function handleFile(file?: File) {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file); setImage(url);
  }
  function exportCsv() {
    const csv = ['Color,LEGO element,Part name,Quantity', ...bom.map(x => `${x.name},${x.element},${x.part},${x.count}`)].join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'michelego-bom.csv'; a.click();
  }
  return <main className={`shell ${dark ? 'dark' : ''}`}>
    <header className="topbar"><div className="brand"><span className="brand-mark">M</span><span>michelego</span></div><div className="top-actions"><div className="top-meta"><span className="live-dot" />Live preview <span className="slash">/</span> LEGO palette</div><button className="theme-toggle" onClick={() => setDark(value => !value)} aria-label={dark ? 'Activer le thème clair' : 'Activer le thème sombre'}>{dark ? <Sun size={16}/> : <Moon size={16}/>}<span>{dark ? 'Light' : 'Dark'}</span></button></div></header>
    <section className="intro"><div><p className="kicker">PHOTO TO MOSAIC</p><h1>Make a memory.<br /><em>One brick at a time.</em></h1></div><p className="intro-copy">Upload a photo, tune the grid, and get a buildable parts list using real LEGO colours and 1x1 plates.</p></section>
    <section className="workspace">
      <aside className="controls">
        <div className="panel-head"><span>01</span><h2>Source image</h2></div>
        <div className={`dropzone ${isDragging ? 'dragging' : ''}`} onClick={() => inputRef.current?.click()} onDragOver={e => {e.preventDefault(); setDragging(true)}} onDragLeave={() => setDragging(false)} onDrop={e => {e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0])}}>
          <img src={image} alt="Source preview" /><div className="drop-overlay"><ImagePlus size={22} /><strong>Drop a photo here</strong><span>or browse your files</span></div>
        </div><input ref={inputRef} type="file" accept="image/*" hidden onChange={e => handleFile(e.target.files?.[0])} />
        <button className="upload-button" onClick={() => inputRef.current?.click()}><Upload size={16}/> Choose another image</button>
        <div className="panel-head dimensions"><span>02</span><h2>Mosaic size</h2></div>
        <label>Width <output>{width} studs</output><input type="range" min="12" max="96" value={width} onChange={e => {const v = Number(e.target.value); setWidth(v); setHeight(Math.round(v * 0.75))}} /></label>
        <label>Height <output>{height} studs</output><input type="range" min="12" max="72" value={height} onChange={e => setHeight(Number(e.target.value))} /></label>
        <div className="size-presets">{[24, 36, 48, 64].map(v => <button className={width === v ? 'active' : ''} onClick={() => {setWidth(v); setHeight(Math.round(v * .75))}} key={v}>{v}x{Math.round(v * .75)}</button>)}</div>
        <p className="helper"><span>i</span> Each square is a LEGO Plate 1 x 1. Colours are rounded to the nearest available LEGO shade.</p>
      </aside>
      <section className="preview-panel"><div className="panel-head preview-head"><div><span>03</span><h2>Mosaic preview</h2></div><span className="resolution">{width} x {height} <b>•</b> {total.toLocaleString('fr-FR')} plates</span></div><div className="mosaic-stage"><div className="mosaic" style={{gridTemplateColumns: `repeat(${width}, 1fr)`, aspectRatio: `${width}/${height}`}}>{cells.map((c, i) => <i key={i} style={{backgroundColor: c.hex}} title={c.name} />)}</div></div><div className="preview-foot"><span>Hover a tile to inspect its LEGO colour</span><button className="reset" onClick={() => {setImage(fallback); setWidth(48); setHeight(36)}}><RotateCcw size={14}/> Reset</button></div></section>
    </section>
    <section className="bom-section"><div className="bom-title"><div><p className="kicker">BUILD LIST</p><h2>Bill of materials</h2></div><button className="export" onClick={exportCsv}><Download size={16}/> Export CSV</button></div><div className="bom-grid">{bom.map(item => <a className="bom-row" href={`https://www.lego.com/fr-fr/pick-and-build/pick-a-brick?query=${item.element}${item.elementId ? `&selectedElement=${item.elementId}` : ''}`} target="_blank" rel="noreferrer" key={item.name + item.element}><img className="part-preview" src={item.imageUrl} alt={`${item.part} ${item.name}`} loading="lazy"/><div><strong>{item.name}</strong><small>{item.part} · LEGO {item.element}</small></div><b>{item.count}</b><span className="pieces">pieces <ExternalLink size={12}/></span></a>)}</div><p className="bom-note">Parts are all LEGO 3024, Plate 1 x 1. Quantities are calculated from the current preview and every colour maps to a named LEGO shade.</p></section>
    <footer><span>michelego</span><span>Made for tiny pixels and big feelings.</span></footer>
  </main>
}

function makeMosaic(src: string, width: number, height: number, done: (cells: Cell[]) => void) {
  const img = new Image(); img.crossOrigin = 'anonymous'; img.onload = () => { const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height; const ctx = canvas.getContext('2d'); if (!ctx) return; ctx.drawImage(img, 0, 0, width, height); const data = ctx.getImageData(0, 0, width, height).data; const out: Cell[] = []; for (let i = 0; i < data.length; i += 4) out.push(nearest(data[i], data[i + 1], data[i + 2])); done(out); }; img.src = src;
}
createRoot(document.getElementById('root')!).render(<App />);
