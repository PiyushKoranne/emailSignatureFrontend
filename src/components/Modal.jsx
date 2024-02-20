import React from 'react';
import './modals.css';
import { Link } from 'react-router-dom';
import ReactPlayer from "react-player";

function CustomModal(props) {
    if (!props.show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-batn" onClick={props.onClose}>&times;</span>
                <h2> Welcome Aboard, Voyager! <span><img src="./assets/images/icons8-confetti-48.png" alt="modal icon" /></span> </h2>
                <div>
                    <div style={{ padding: '0px 0px 10px'}}>
                        <h3><span> 1.Procedure </span> <Link to={'/procedure'}>Procedure</Link></h3>
                        <h4>It's smooth sailing from here! Follow our step-by-step guide, and you'll craft the perfect email signature in no time. Remember, a good captain always knows their course.</h4>
                        </div>

                        <div style={{ padding: '0px 0px 10px'}}>
                            <h3> <span>2.Browse Templates</span><Link className='browse-temp-mod-btn' to={'/signature-templates'}>Browse</Link></h3>
                            <h4>Explore our galaxy of templates! From minimalistic stars to vibrant nebulas, find the design that resonates with your cosmic personality.</h4>
                        </div>
                        <div  style={{ padding: '0px 0px 10px'}}>
                            <h3><span>3.Create Your Signature</span><Link className='create-temp-mod-btn' to={'/create'}>Create</Link></h3>
                            <h4>Unleash your inner artist! Customize your chosen template or start from scratch. Add your personal touch and let your email signature be as unique as your journey.</h4>
                        </div>
						<div className='modal-video-container'>
						<h3>View how to create an email signature:</h3>
						<ReactPlayer
							url={'https://youtu.be/gE_0IRKGmCY'}
							volume={true}
							muted={false}
							loop={true}
							controls={true}
							playsinline
							playing={false}
						/>
						</div>
                </div>

            </div>
        </div>
    );
}

export default CustomModal;
