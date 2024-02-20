import React from 'react'
import { Link } from 'react-router-dom';
import "./Footer.css"


const Footer = ({loggerData}) => {
	const handleScrollTop = () => {
		window.scrollTo({
			top: 0, 
			behavior: 'smooth'
		});
	}
  return (
	<footer class="common-footer-wrapper">
		<div class="for-clippath"></div>
		<div class="center-wrapper center-wr">
			
			<div class="common-footer-container">
				<figure class="footer-heading">
					<Link to="/">
						<img className="img-generic" src={loggerData?.layout_data?.logo ? loggerData?.layout_data?.logo : "/assets/images/Email_Sign_Logo.svg"} alt="Email Signature Logo"/>
					</Link>
				</figure>
			<div class="footer-container-for">
			<div class="footer-info-container">
					<h4 style={{display: (!loggerData?.layout_data?.social_links?.instagram && !loggerData?.layout_data?.social_links?.youtube && !loggerData?.layout_data?.social_links?.linkedIn && !loggerData?.layout_data?.social_links?.facebook) ?  'none':'block'}}>Follow Us</h4>
					<div class="footer-icons-container" style={{display: (!loggerData?.layout_data?.social_links?.instagram && !loggerData?.layout_data?.social_links?.youtube && !loggerData?.layout_data?.social_links?.linkedIn && !loggerData?.layout_data?.social_links?.facebook) ?  'none':'flex'}}>
						<a style={{display: loggerData?.layout_data?.social_links?.instagram ? 'inline':"none"}} data-tagname="anchor" href={loggerData?.layout_data?.social_links ? loggerData?.layout_data?.social_links?.instagram : "#"}><img src="/assets/images/insta.svg" alt="footer icons insta"/></a>
						<a style={{display: loggerData?.layout_data?.social_links?.youtube ? 'inline':"none"}} data-tagname="anchor" href={loggerData?.layout_data?.social_links ? loggerData?.layout_data?.social_links?.youtube : "#"}><img src="/assets/images/youtube.svg" alt="footer icons youtube"/></a>
						<a style={{display: loggerData?.layout_data?.social_links?.linkedIn ? 'inline':"none"}} data-tagname="anchor" href={loggerData?.layout_data?.social_links ? loggerData?.layout_data?.social_links?.linkedIn : "#"}><img src="/assets/images/linkedin.svg" alt="footer icons linkedin"/></a>
						<a style={{display: loggerData?.layout_data?.social_links?.facebook ? 'inline':"none"}} data-tagname="anchor" href={loggerData?.layout_data?.social_links ? loggerData?.layout_data?.social_links?.facebook : "#"}><img src="/assets/images/fb.svg" alt="footer icons facebook"/></a>
					</div>
					<h4>Drop us a line</h4>
					<a className='footer-gml' data-tagname="anchor" href={loggerData?.layout_data?.email ? 'mailto:'+loggerData?.layout_data?.email :"mailto: info@esignature.com"}>info@emailsignature.com</a>
			</div>
			<div class="footer-links">
				<ul>
					<li><Link to="/about-us">About Us</Link></li>
					<li><Link to="/signature-templates">View Templates</Link></li>
				</ul>
				<ul>
					<li><Link to ="/sitemap">Sitemap</Link></li>
					<li><Link to ="/privacy-policy">Privacy Policy</Link></li>
					<li><Link to ="/terms-of-service">Terms & Conditions</Link></li>
				</ul>
				<ul>
					<li><Link to="/procedure/gmail">Gmail Signature</Link></li>
					<li><Link to="/procedure/outlook">Outlook Signature</Link></li>
					<li><Link to="/procedure/apple">Apple Mail Signature</Link></li>
				</ul>
			</div>
			</div>
		

			<div class="copyright-container">
				<h5>Copyright &#169; 2023 <Link to="/">Email Signature</Link> </h5>
			</div>
			</div>
		</div>
	</footer>
	)
	}

export default Footer;

	// <footer className="footer-wr">
	// 	<div className="footer-top">
	// 		<div className="center-wr">
	// 			<div className="footer-top-content clearfix">
	// 				<div className="footer-top-text left">
	// 					<h4>Email Signatures that Fulfill Your Brand and Marketing Strategies</h4>
	// 				</div>
	// 				<div className="footer-top-btn right">
	// 					<Link to="/create" className="site-btn site-btn-white">Create your Email Signature</Link>
	// 				</div>
	// 			</div>	
	// 		</div>
	// 	</div>
	// 	<div className="footer-bottom align-center">
	// 		<div className="center-wr">
	// 			<div className="footer-botton-con">
	// 				<div className="footer-logo">
	// 					<Link to="/">
	// 						<img className="img-generic" src={loggerData?.layout_data?.logo ? loggerData?.layout_data?.logo : "assets/images/Email_Sign_Logo.svg"} alt="Email Signature Logo" />
	// 					</Link>
	// 				</div>
	// 				<div className="footer-bottom-content">
	// 					<div className="footer-mail-blk">
	// 						<div className="footer-head page-mini-heading">
	// 							<h4>Drop us a line!</h4>
	// 						</div>
	// 						<div className="footer-links footer-mail-link">
	// 							<h4><a data-tagname="anchor" href={loggerData?.layout_data?.email ? 'mailto:'+loggerData?.layout_data?.email :"mailto: info@esignature.com"}>info@emailsignature.com</a></h4>
	// 						</div>
	// 					</div>
	// 					<div className="footer-mail-blk">
	// 						<div className="footer-head page-mini-heading">
	// 							<h4>Follow Us</h4>
	// 						</div>
	// 						<div className="footer-links footer-social-icon">
	// 							<a data-tagname="anchor" href={loggerData?.layout_data?.social_links ? loggerData?.layout_data?.social_links?.instagram : "#"}><i className="fa-brands fa-instagram"></i></a>
	// 							<a data-tagname="anchor" href={loggerData?.layout_data?.social_links ? loggerData?.layout_data?.social_links?.youtube : "#"}><i className="fa-brands fa-youtube"></i></a>
	// 							<a data-tagname="anchor" href={loggerData?.layout_data?.social_links ? loggerData?.layout_data?.social_links?.linkedIn : "#"}><i className="fa-brands fa-linkedin-in"></i></a>
	// 							<a data-tagname="anchor" href={loggerData?.layout_data?.social_links ? loggerData?.layout_data?.social_links?.facebook : "#"}><i className="fa-brands fa-facebook-f"></i></a>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 			<div className="footer-copyright">
	// 				<p className='para'>{`Copyright ${new Date().getFullYear()}`} &copy; <Link to="/">eSignature</Link></p>
	// 				<p className='para'><Link to="/privacy-policy">Privacy Policy</Link></p>
	// 				<p className='para'><Link to="/terms-of-service">Terms of Service</Link></p>
	// 			</div>
	// 		</div>
	// 	</div>
		
	// 	<div className="popup-content">
	// 		<iframe height="315" src="" title="YouTube video player" frameBorder="0"  allow="accelerometer; autoplay;  clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="" data-origwidth="" data-origheight="315"></iframe>
	// 		<a data-tagname="anchor" href="#" className="close-btn">
	// 			<i className="fa-solid fa-xmark"></i>
	// 		</a>
	// 	</div>
	// 	<div className="popup-overlay-wr"></div>
		
	// 	<div className="scroll-top" onClick={handleScrollTop}>  
	// 		<i className="fa-solid fa-arrow-up-long"></i>
	// 	</div>
	// </footer>