import { useState } from 'react';
import './App.css'
import { hexToHsl } from "@/utils"


function App() {
  const [hueAngle, setHueAngle] = useState<string>("0");
  const [saturation, setSaturation] = useState<string>("0");
  const [ligntness, setLigntness] = useState<string>("0");
  const copy = () => {
    navigator.clipboard.writeText(`hsl(${hueAngle} ${saturation}% ${ligntness}%)`)
    alert("Copied")
  }
  const pickColor = () => {
    //@ts-expect-error: EyeEyeDropper should be able to use;
    if (!EyeDropper) {
      alert("EyeDropper not supported");
      return;
    }
    //@ts-expect-error: EyeEyeDropper should be able to use;
    const eyeDropper = new EyeDropper();
    eyeDropper.open().then((result: { sRGBHex: string }) => {
      setHueAngle(() => hexToHsl(result.sRGBHex).h.toString());
      setSaturation(() => hexToHsl(result.sRGBHex).s.toString());
      setLigntness(() => hexToHsl(result.sRGBHex).l.toString());
    })
  };

  const setHsl = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'h':
        setHueAngle(() => event.target.value);
        break;
      case 's':
        setSaturation(() => event.target.value);
        break;
      case 'l':
        setLigntness(() => event.target.value);
        break;
    }
  }
  return (
    <>
      <div className='center' style={{ zIndex: 1 }}>
        <div className='fixed flex right-0 flex-col top-0 gap-1'>
          <div className='flex flex-col w-fit'>
            <label htmlFor="h">
              Hue Angle:&nbsp;
              <input className='float-right' type="range" min="0" max="359" value={hueAngle} name="h" onChange={setHsl} />
            </label>
            <label htmlFor="s">
              Saturation:&nbsp;
              <input className='float-right' type="range" name="s" value={saturation} onChange={setHsl} />
            </label>
            <label htmlFor="l">
              Ligntness:&nbsp;
              <input className='float-right' type="range" name="l" value={ligntness} onChange={setHsl} />
            </label>
          </div>
          <div className='flex flex-row gap-1'>
            <button className="rounded bg-blue-500 hover:bg-blue-700 py-1 px-4 text-white" onClick={pickColor}>Pick</button>
            <button className="rounded bg-green-400 hover:bg-green-600 py-1 px-4 text-white" onClick={copy}>Copy</button>
            <button className="rounded bg-red-500 hover:bg-red-700 py-1 px-4 text-white" onClick={() => {
              setHueAngle(() => Math.floor(Math.random() * 360).toString());
              setSaturation(() => Math.floor(Math.random() * 100).toString());
              setLigntness(() => Math.floor(Math.random() * 100).toString());
            }}>Random</button>
          </div>
        </div>
        <div className="h-[300px] w-[300px] rounded-full" style={{ "backgroundColor": `hsl(${hueAngle} ${saturation}% ${ligntness}%)` }}></div>
      </div>
      <div className="color-table"></div>
    </>
  )
}

export default App
