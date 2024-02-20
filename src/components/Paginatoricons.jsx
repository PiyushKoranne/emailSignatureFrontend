import React from 'react'

export const PaginatoriconLeft = () => {
  return (
    <div style={{width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%'}}>
        <img src="assets/images/left-chevron.svg" alt='left' width={20} height={20}/>
    </div>
  )
}

export const PaginatoriconRight = () => {
  return (
    <div style={{width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%'}}>
        <img src="assets/images/right-chevron.svg" alt='right' width={20} height={20}/>
    </div>
  )
}


