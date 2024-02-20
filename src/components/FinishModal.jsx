import React from 'react';
import './modals.css';
import { Link } from 'react-router-dom';
import ReactPlayer from "react-player";

function CustomFinishModal(props) {
    if (!props.show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content" style={{maxWidth:'810px',
            borderRadius:' 20px',
            padding: '49px',
            paddingBottom: '27px'}}>
                <span className="close-batn" style={{
                    color:'black',
                    backgroundColor:'#fff',
                    fontSize:'29px',
                    right: '35px',
                    boxShadow:'none'
                }} onClick={props.onClose}>&times;</span>
               
                <h4 style={{
                    color:'#000',
                      fontSize: '26px',
                      lineHeight: '38px'
                }}><span style={{fontSize: '29px',color: '#625bf8',fontFamily: 'Dancing Script',paddingRight:'8px'}}>Just a step away!</span> Your email signature masterpiece is almost ready. Want to proceed or give it another brush stroke?</h4> 
                <div>
                    <div style={{    padding: '0px 0px 10px'}}>
              
                <div className="comn-text-btn">
					<Link to="/create" id="finishModalBtn">Login To Finish!</Link>
					</div>
                         </div>
                </div>

            </div>
        </div>
    );
}

export default CustomFinishModal;
