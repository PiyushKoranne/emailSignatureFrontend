const Input = ({maxLength, setUserData, stateName, value, type, name, placeholder}) => {
	const handleFocus = () => {
		if(value === placeholder) setUserData(prev =>({...prev, prev[stateName]:""}))
		return;
	}
	return(
		<input maxLength={maxLength} onChange={(e)=>{setUserData(prev => ({...prev, [stateName]:e.target.value}))}} value={value}  type={type} name={name} autoComplete="off"/>
	)	
}

export default Input;
