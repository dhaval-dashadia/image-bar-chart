"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface ImageBarProps {
  country: Array<any>;
}

const Graph: React.FC<ImageBarProps> = ({ country }) => {
  const [imageUrl, setImagePattern] = useState<string>(
    "https://c8.alamy.com/comp/2F9H9KG/smoking-industrial-chimney-icon-cartoon-of-smoking-industrial-chimney-vector-icon-for-web-design-isolated-on-white-background-2F9H9KG.jpg"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const base64Image = event.target.result as string;
        setImagePattern(base64Image);
      }
    };
    reader.readAsDataURL(file);
  };

  const dataValues = country.map((item) => item.value);
  const xValues = country.map((item) => item.country);

  const data: any = [
    {
      x: country.map((item) => item.country),
      y: country.map((item) => item.value),
      type: "bar",
      marker: {
        color: "rgba(0,0,0,0)", // Transparent bars
      },
    },
  ];

  const layout: any = {
    width: 600,
    height: 400,
    images: dataValues.map((y, index) => ({
      source: imageUrl,
      xref: "x",
      yref: "y",
      x: xValues[index],
      y: y / 2, // Position the image at the midpoint of the bar height
      sizex: 0.9, // Width of the bar
      sizey: y, // Full height of the bar (from y=0 to y=value)
      xanchor: "center",
      yanchor: "middle", // Center the image vertically at y/2
      sizing: "stretch", // Stretch the image to fit sizex and sizey
      layer: "below",
    })),
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <button onClick={() => fileInputRef.current?.click()}>
          {imageUrl ? "Change Image" : "Upload Bar Image"}
        </button>
      </div>

      <Plot data={data} layout={layout} />
    </div>
  );
};

export default Graph;







// working code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import dynamic from "next/dynamic";

// const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// interface ImageBarProps {
//   country: Array<any>;
// }

// const Graph: React.FC<ImageBarProps> = ({ country }) => {
//   const [imageUrl, setImagePattern] = useState<string>(
//     "https://c8.alamy.com/comp/2F9H9KG/smoking-industrial-chimney-icon-cartoon-of-smoking-industrial-chimney-vector-icon-for-web-design-isolated-on-white-background-2F9H9KG.jpg"
//   );
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       if (event.target?.result) {
//         // Set the base64 string directly, without url() wrapper
//         const base64Image = event.target.result as string;
//         setImagePattern(base64Image); // e.g., "data:image/png;base64,iVBORw0KGgo..."
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const dataValues = country.map((item) => item.value);
//   const xValues = country.map((item) => item.country);

//   const data: any = [
//     {
//       x: country.map((item) => item.country),
//       y: country.map((item) => item.value),
//       type: "bar",
//       marker: {
//         color: "rgba(0,0,0,0)", // Transparent bars
//       },
//     },
//   ];

//   const layout: any = {
//     width: 600,
//     height: 400,
//     images: dataValues.map((y, index) => ({
//       source: imageUrl, // Use the base64 string or URL directly
//       xref: "x",
//       yref: "y",
//       x: xValues[index],
//       y: y,
//       sizex: 0.9, // Width of the bar
//       sizey: y, // Height matches data value
//       xanchor: "center",
//       yanchor: "top",
//       layer: "below",
//     })),
//   };

//   return (
//     <div>
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           ref={fileInputRef}
//           style={{ display: "none" }}
//         />
//         <button onClick={() => fileInputRef.current?.click()}>
//           {imageUrl ? "Change Image" : "Upload Bar Image"}
//         </button>
//       </div>

//       <Plot data={data} layout={layout} />
//     </div>
//   );
// };

// export default Graph;







// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import dynamic from "next/dynamic";

// const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// interface ImageBarProps {
//   country: Array<any>;
// }

// const Graph: React.FC<ImageBarProps> = ({ country }) => {
//   const [imageUrl, setImagePattern] = useState<string>("https://c8.alamy.com/comp/2F9H9KG/smoking-industrial-chimney-icon-cartoon-of-smoking-industrial-chimney-vector-icon-for-web-design-isolated-on-white-background-2F9H9KG.jpg");
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       if (event.target?.result) {
//         // Create proper base64 pattern string
//         const base64Image = event.target.result;
//         setImagePattern(`url("${base64Image}")`);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const dataValues = country.map((item) => item.value);
//   const xValues = country.map((item) => item.country);

//   const data: any = [
//     {
//       x: country.map((item) => item.country),
//       y: country.map((item) => item.value),
//       type: "bar",
//       marker: {
//         color: "rgba(0,0,0,0)", // Transparent bars
//       },
//     },
//   ];

//   const layout: any = {
//     width: 600,
//     height: 400,
//     images: dataValues.map((y, index) => ({
//       source: imageUrl,
//       xref: "x",
//       yref: "y",
//       x: xValues[index],
//       y: y,
//       sizex: 0.9, // Width of the bar
//       sizey: y, // Height matches data value
//       xanchor: "center",
//       yanchor: "top",
//       layer: "below",
//     })),
//   };

//   return(
//     <div>
//         <div style={{ marginBottom: '20px' }}>
//            <input
//              type="file"
//              accept="image/*"
//              onChange={handleImageUpload}
//              ref={fileInputRef}
//              style={{ display: 'none' }}
//            />
//            <button onClick={() => fileInputRef.current?.click()}>
//              {imageUrl ? 'Change Image' : 'Upload Bar Image'}
//            </button>
//          </div>

//         <Plot data={data} layout={layout} />
//     </div>
// );


// };

// export default Graph;


  //     const [imagePattern, setImagePattern] = useState<string>('');
  //   const fileInputRef = useRef<HTMLInputElement>(null);

  //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (!file) return;

  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       if (event.target?.result) {
  //         // Create proper base64 pattern string
  //         const base64Image = event.target.result;
  //         setImagePattern(`url("${base64Image}")`);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   };

  //   // Create pattern shapes for each bar
  //   const shapes: any = country.map((_, index) => ({
  //     type: 'rect',
  //     xref: 'x',
  //     yref: 'y',
  //     x0: 0,
  //     y0: 0,
  //     x1: 0,
  //     y1: 0,
  //     line: { width: 0 },
  //     fillcolor: imagePattern,
  //     opacity: 1,
  //     layer: 'below'
  //   }));
  //   console.log("shapes: ", shapes)

  //   return (
  //     <div>
  //       <div style={{ marginBottom: '20px' }}>
  //         <input
  //           type="file"
  //           accept="image/*"
  //           onChange={handleImageUpload}
  //           ref={fileInputRef}
  //           style={{ display: 'none' }}
  //         />
  //         <button onClick={() => fileInputRef.current?.click()}>
  //           {imagePattern ? 'Change Image' : 'Upload Bar Image'}
  //         </button>
  //       </div>

  //       <Plot
  //         data={[{
  //           type: 'bar',
  //           x: country.map(item => item.country),
  //           y: country.map(item => item.value),
  //           marker: {
  //             color: 'rgba(0,0,0,0)', // Transparent bars
  //             line: {
  //               color: 'rgba(0,0,0,0.5)',
  //               width: 1
  //             }
  //           }
  //         }]}
  //         layout={{
  //           title: 'Country Values with Image Bars',
  //           xaxis: { title: 'Country' },
  //           yaxis: { title: 'Value' },
  //           plot_bgcolor: 'rgba(0,0,0,0)',
  //           paper_bgcolor: 'rgba(0,0,0,0)',
  //           shapes: shapes
  //         }}
  //         config={{ responsive: true }}
  //       />
  //     </div>
  //   );

  //     const [imageUrl, setImageUrl] = useState<string | null>(null);
  //   const [plotData, setPlotData] = useState<any[]>([]);
  //   const fileInputRef = useRef<HTMLInputElement>(null);

  //   useEffect(() => {
  //     updateChartData();
  //   }, [imageUrl, country]);

  //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         setImageUrl(event.target?.result as string);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   const updateChartData = () => {
  //     if (!imageUrl) {
  //       setPlotData([{
  //         type: 'bar',
  //         x: country.map(item => item.country),
  //         y: country.map(item => item.value),
  //         marker: { color: '#cccccc' }
  //       }]);
  //       return;
  //     }

  //     // Create a pattern for each bar
  //     const patterns = country.map((_, i) => {
  //       const patternId = `pattern-${i}`;
  //       return {
  //         type: 'pattern',
  //         id: patternId,
  //         path: '',
  //         shape: 'rect',
  //         x: 0,
  //         y: 0,
  //         width: 1,
  //         height: 1,
  //         patternContentUnits: 'objectBoundingBox',
  //         patternTransform: `rotate(${i * 10})`, // Optional rotation for visual interest
  //         image: imageUrl
  //       };
  //     });

  //     console.log("patterns: ", patterns)

  //     setPlotData([{
  //       type: 'bar',
  //       x: country.map(item => item.country),
  //       y: country.map(item => item.value),
  //       marker: {
  //         pattern: {
  //           shape: patterns.map(p => p.id),
  //           size: 20
  //         },
  //         line: {
  //           color: 'rgba(0,0,0,0.5)',
  //           width: 1
  //         }
  //       }
  //     }]);
  //   };

  //   return (
  //     <div>
  //       <div style={{ marginBottom: '20px' }}>
  //         <input
  //           type="file"
  //           accept="image/*"
  //           onChange={handleImageUpload}
  //           ref={fileInputRef}
  //           style={{ display: 'none' }}
  //         />
  //         <button onClick={() => fileInputRef.current?.click()}>
  //           {imageUrl ? 'Change Image' : 'Upload Bar Image'}
  //         </button>
  //         {imageUrl && (
  //           <div style={{ marginTop: '10px' }}>
  //             <img
  //               src={imageUrl}
  //               alt="Bar pattern"
  //               style={{ maxWidth: '100px', maxHeight: '100px' }}
  //             />
  //           </div>
  //         )}
  //       </div>

  //       <Plot
  //         data={plotData}
  //         layout={{
  //           title: 'Country Values',
  //           xaxis: { title: 'Country' },
  //           yaxis: { title: 'Value' },
  //           plot_bgcolor: 'rgba(0,0,0,0)',
  //           paper_bgcolor: 'rgba(0,0,0,0)',
  //         }}
  //         config={{ responsive: true }}
  //       />
  //     </div>
  //   );
