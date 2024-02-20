import React from 'react'
import HashLoader from "react-spinners/HashLoader";
import { createPortal } from 'react-dom';

const FullScreenLoader = ({loading}) => {
  return (
	<>
	{loading && createPortal(
	<div style={{position:'fixed',zIndex:1000, top:'0px', left:'0px', right:'0px', bottom:'0px', backgroundColor:'rgba(0,0,0,0.4)', display:"flex", alignItems:'center', justifyContent:'center'}}>
		<div style={{padding:'10px',backgroundColor:'whitesmoke',borderRadius:"15px", width:"80px", height:'80px', boxShadow:"4px 4px 12px 4px rgba(0,0,0,0.61)", display:'flex', alignItems:'center', justifyContent:'center'}}>
			<HashLoader color="#625bf8" />
		</div>
	</div>,
	document.getElementById('portal')
	)}
	</>
  )
}

export default FullScreenLoader