import { useErrorBoundary } from "react-error-boundary"

const FallBack = ({error}) => {
	const {resetBoundary} = useErrorBoundary()
  return (
	<div style={{backgroundColor:"#f5f5f5"}} className="boundary-wr">
		<div class="boundary-container">
		<div style={{display:'flex', flexDirection:'row', textAlign:'center', alignItems:'center', justifyContent:'center', gap:'10px'}}>
				<img alt="Oops" src="assets/images/error-1.svg" style={{width:'50px', height:'50px'}} />
				<h1 style={{color:"#5d5d5d", fontWeight:"700", lineHeight:'35px'}}>Hold Up!</h1>
		</div>
		<h6 style={{color:"#5d5d5d", marginTop:'30px', fontWeight:"300"}}>The website is experiencing some error, or undergoing maintenance.</h6>
		<h6 style={{color:"#5d5d5d", fontWeight:"300"}}>You can reload the page or try again after some time.</h6>
		<p>Error Code : <strong>500</strong></p>
		<button style={{backgroundColor:"rgb(59,120,231)"}} onClick={resetBoundary}>Reload</button>
		</div>
	</div>
  )
}

export default FallBack