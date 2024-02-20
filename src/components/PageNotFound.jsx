import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/pagenotfound.css";

const PageNotFound = () => {
	const navigate = useNavigate();

  return (
	<div className='page-not-found'>
		<header>
		<div class="head-text">
			<p>404 Not Found</p>
		</div>
		</header>

		<main className='not-found-main-blk'>
		<div class="main-wrapper">
			<picture class="scarecrow-img">
			<img src="/assets/images/Scarecrow.png" alt="scarecrow" />
			</picture>
			<div class="error-text">
			<h2>I have bad news for you</h2>
			<p>The page you are looking for might be removed or is temporarily unvailable.</p>
			<span class="input-group-btn">
				<button class="btn" type="button" onClick={()=>{navigate("/")}}>Back to homepage</button>
			</span>
			</div>
		</div>

		</main>

		<footer className='not-found-footer'>
		<p> Email Signatures</p>
		</footer>

	</div>
  )
}

export default PageNotFound