import React from 'react';
import { SnackbarContent, CustomContentProps, useSnackbar } from 'notistack';
import "../css/customsnackbar.css";
//  219C90
const CustomSnackBar = React.forwardRef((props, ref) => {
  const {
    // You have access to notistack props and options 👇🏼
    id,
    message,
	variant
    // as well as your own custom props 👇🏼
  } = props
  const { closeSnackbar } = useSnackbar();

  return (
    <SnackbarContent ref={ref} role="alert">
		<div className="snackbar-container" style={{backgroundColor:variant ==="customWarning" ? "#F99417": variant === "customSuccess" ? "#13946d":"#B04759", width:variant ==="customWarning" && '600px'}}>
			<div className="snackbar-header">
				<figure>
					<img src={variant ==="customWarning" ? "/assets/images/icons8-warning-30.png": variant === "customSuccess" ? "/assets/images/sucess.svg":"/assets/images/icons8-error-30.png"} style={{height:"30px",width:"30px"}} alt="sucess icon" />
				</figure>
				<h4>{variant ==="customWarning" ? "Hold up!": variant === "customSuccess" ? "Great!":"Oops!"}</h4>
				<figure className="close-btn"> 
					<img src="/assets/images/close.png" alt="close button" onClick={()=>closeSnackbar(id)} />
				</figure>
			</div>
			<div className="snackbar-content">
				<p>{message}</p>
			</div>
		</div>
    </SnackbarContent>
  )
})

export default CustomSnackBar;