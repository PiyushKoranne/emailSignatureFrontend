import {useContext, useEffect, useRef, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import { LoginContext } from '../App'
import jQuery from 'jquery'
import Meta from './Meta';
import { ErrorBoundary } from 'react-error-boundary'
import FallBack from './FallBack'
import Footer from './Footer'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/core.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import 'react-toastify/dist/ReactToastify.css';
import '../drawer.css'
import Header from './Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "react-responsive-modal/styles.css";
import ReactPlayer from "react-player";
import { Modal } from "react-responsive-modal";
// import "react-modal-video/scss/modal-video.scss";
// import "react-modal-video/scss/modal-video.scss";\
import CustomModal from "./Modal";



const Landing = () => {
	const testimonialRef = useRef(null);
    const [industrySwiperShow, setIndustrySwiperShow] = useState(false);
    const [industrySwiper, setIndustrySwiper] = useState(null);
    const [stepSwiper, setStepSwiper] = useState(null);
    const [stepSwiperShow, setStepSwiperShow] = useState(false);
	const [isOpen, setOpen] = useState(false);
    const [partnerSwiper, setPartnerSwiper] = useState(null);
    const [partnerSwiperShow, setPartnerSwiperShow] = useState(false);
	const [showModal, setShowModal] = useState(false);
	

	const {state}=useLocation();
	

	useEffect(()=>{
		if(state?.scrollToTestimonial){
			handleScrollToTestimonialRegister();
		}
		else{
			window.scroll(0,0);
		}

	},[state])
	

	function handleScrollToTestimonialRegister() {
		if (testimonialRef.current) {
			// Get the target div's position and calculate the offset
			const divOffset = testimonialRef.current.getBoundingClientRect().top + window.scrollY;
			 // Replace with your element's ID
			const offset = 300;
	  
			// Scroll to the target div with the offset
			window.scrollTo({
			  top: divOffset - offset,
			  behavior: 'smooth', // For smooth scrolling
			});
		  }
	}

	function handleScrollToTestimonial(e) {
		if(e.button===0||e.button===1){
			if (testimonialRef.current) {
				// Get the target div's position and calculate the offset
				const divOffset = testimonialRef.current.getBoundingClientRect().top + window.scrollY;
				 // Replace with your element's ID
				const offset = 250;
		  
				// Scroll to the target div with the offset
				window.scrollTo({
				  top: divOffset - offset,
				  behavior: 'smooth', // For smooth scrolling
				});
			}
		}
	}


    const {loggerData, setLoggerData} = useContext(LoginContext);

	function handlePlayVideo() {
		setOpen(true);
	}

    function handleSwiper(){
		if(window.screen.width < 980 && window.screen.width >= 768){
			setStepSwiperShow(true);
			setIndustrySwiperShow(false);
			setPartnerSwiperShow(false);
		}
		else if(window.screen.width < 768 && window.screen.width >=650){
			setIndustrySwiperShow(true);
			setStepSwiperShow(true);
			setPartnerSwiperShow(false);
		}
		else if(window.screen.width < 650){
			setStepSwiperShow(true);
			setIndustrySwiperShow(true);
			setPartnerSwiperShow(true);
		} else {
			setStepSwiperShow(false);
			setIndustrySwiperShow(false);
			setPartnerSwiperShow(false);
		}
    }

	const handleOpenModal = () => {
		setShowModal(true);
	}
	const handleCloseModal = () => {
		setShowModal(false);
		setLoggerData(prev =>({...prev, newUser:false}));
	}

	useEffect(() => {
		console.log("NEW USER USE EFFECT RAN...");
		if(loggerData?.isLoggedIn && loggerData?.newUser){
			handleOpenModal();
		}
	},[loggerData?.newUser, loggerData?.isLoggedIn])

    useEffect(() => {
		window.addEventListener('resize', handleSwiper, { passive: true });
		return () => {
			window.removeEventListener('resize', handleSwiper);
		};
    }, []);



	useEffect(()=>{
		jQuery(".accordion-heading").click(function(){
			jQuery(this).toggleClass("accordion-active");
			jQuery(this).parents(".accordion-blk").siblings().find(".accordion-heading").removeClass("accordion-active");
			jQuery(this).parents(".accordion-blk").find(".accordion-content").stop().slideToggle();
			jQuery(this).parents(".accordion-blk").siblings().find(".accordion-content").slideUp();
		});
		if (jQuery(window).width() >= 1200) {
			jQuery('.comn-text-img-content').mousemove(function(e) {
				var comnImg1 = jQuery(this).find("figure");
				var comnImg2 = jQuery(this).find("figure:nth-child(2)");
				var comnImg3 = jQuery(this).find("figure:nth-child(3)");
				var Image1X= (e.pageX * -1 / 50);
				var Image1Y= (e.pageY * -1 / 150);
				var Image2X= (e.pageX * -1 / 60);
				var Image2Y= (e.pageY * -1 / 180);
				var Image3X= (e.pageX * -1 / 65);
				var Image3Y= (e.pageY * -1 / 170);
				comnImg1.css('transform', 'translate3d('+Image1X+'px,'+Image1Y+'px, 0)');
				comnImg2.css('transform', 'translate3d('+Image2X+'px,'+Image2Y+'px, 0)');
				comnImg3.css('transform', 'translate3d('+Image3X+'px,'+Image3Y+'px, 0)');
				jQuery('.comn-text-img-content').mouseleave(function(e) {
					comnImg1.css('transform', 'unset');
					comnImg2.css('transform', 'unset');
					comnImg3.css('transform', 'unset');
				});
			});
		}
		if (jQuery(window).width() >= 1200) {
			jQuery('body').mousemove(function(e) {
				var comnImg1Banner = jQuery(this).find(".banner-bg-1");
				var comnImg2Banner = jQuery(this).find(".banner-bg-2");
				var comnImg3Banner = jQuery(this).find(".banner-bg-3");
				var comnImg4Banner = jQuery(this).find(".banner-bg-4");
				var comnImg5Banner = jQuery(this).find(".banner-bg-5");
				var comnImg6Banner = jQuery(this).find(".banner-bg-6");
				var comnImg7Banner = jQuery(this).find(".banner-bg-7");
				var Image1XBanner= (e.pageX * -1.5 / 50);
				var Image1YBanner= (e.pageY * -3.5 / 150);
				var Image2XBanner= (e.pageX * -1.5 / 60);
				var Image2YBanner= (e.pageY * -3.5 / 180);
				var Image3XBanner= (e.pageX * -1.5 / 65);
				var Image3YBanner= (e.pageY * -3.5 / 170);
				var Image4XBanner= (e.pageX * -1.5 / 70);
				var Image4YBanner= (e.pageY * -3.5 / 140);
				var Image5XBanner= (e.pageX * -1.5 / 80);
				var Image5YBanner= (e.pageY * -3.5 / 190);
				var Image6XBanner= (e.pageX * -1.5 / 90);
				var Image6YBanner= (e.pageY * -3.5 / 130);
				var Image7XBanner= (e.pageX * -1.5 / 100);
				var Image7YBanner= (e.pageY * -3.5 / 200);
				comnImg1Banner.css('transform', 'translate3d('+Image1XBanner+'px,'+Image1YBanner+'px, 0)');
				comnImg2Banner.css('transform', 'translate3d('+Image2XBanner+'px,'+Image2YBanner+'px, 0)');
				comnImg3Banner.css('transform', 'translate3d('+Image3XBanner+'px,'+Image3YBanner+'px, 0)');
				comnImg4Banner.css('transform', 'translate3d('+Image4XBanner+'px,'+Image4YBanner+'px, 0)');
				comnImg5Banner.css('transform', 'translate3d('+Image5XBanner+'px,'+Image5YBanner+'px, 0)');
				comnImg6Banner.css('transform', 'translate3d('+Image6XBanner+'px,'+Image6YBanner+'px, 0)');
				comnImg7Banner.css('transform', 'translate3d('+Image7XBanner+'px,'+Image7YBanner+'px, 0)');
				jQuery('.home-banner-wr').mouseleave(function(e) {
					// jQuery(".home-banner-wr .banner-bg").css('transform', 'unset');
				});
			});
		}
	},[]);


  return (
	<ErrorBoundary FallbackComponent={<FallBack/>}>
    <>
		<Meta 
			title="Home | Email Signatures"
			desc=""
			keywords=""
		/>

	<Header />
	<section className="home-banner-wr">
	
		<div className="center-wr">
		<div className='mob-banner-img'>
				<img className="img-generic" src="/assets/images/Top_IMG.png" alt="Banner"/>
				</div>
			<Modal
		        open={isOpen}
		        onClose={() => setOpen(false)}
		        center
		        classNames={{
		          overlay: "video-custom-overlay",
		          modal: "video-custom-modal",
		        }}
	      	>	
		        <ReactPlayer
		          url={'https://youtu.be/gE_0IRKGmCY'}
		          volume={true}
		          muted={false}
		          autoPlay={1}
		          loop={true}
		          controls={true}
		          playsinline
		          playing={true}
		        />
      		</Modal>
			<div className="home-banner-content clearfix">
				<div className="banner-left-blk left">
					<div className="banner-top-pager">
						<ul>
							<li>Create</li>
							<li>Add</li>
							<li>Update</li>
							<li>Grow</li>
						</ul>
					</div>
					<div className="banner-text">
						<h1>Want a concise way to introduce <span>yourself</span> in the form of an <span>Email signature?</span></h1>
					</div>
					<div className="banner-btn-blk">
						<Link to="/create" className="site-btn">Create Template</Link>
						<Link to="/signature-templates" className="site-btn site-btn-transparent">See Templates</Link>
					</div>
				</div>
				<div className="banner-right-blk right">
					<div className="banner-img clearfix">
						<figure className="left">
							<img className="img-generic" src="/assets/images/Banner_Image.jpg" alt="Banner"/>
							<figcaption className="e-sign-comn-box">
								<Link to="/signature-templates">
									<div className="banner-img-icon">
										<img className="img-generic" src="/assets/images/35000_Template_Icon.svg" alt="35000 Template Icon"/> 
									</div>
									<div className="banner-img-text">
										<h5>Device Compatibility</h5>
										<p className='para'>Check Now</p>
									</div>
								</Link>
							</figcaption>
						</figure>
						<figure className="right">
							<img className="img-generic" src="/assets/images/Banner_Image_1.png" alt="Banner"/>
							<figcaption className="e-sign-comn-box banner-img-second">
								<span onMouseDown={handleScrollToTestimonial}>
									<div className="banner-img-icon">
										<img className="img-generic" src="/assets/images/Highly_Rated_Icon.svg" alt="Highly Rated Icon"/> 
									</div>
									<div className="banner-img-text">
										<h5>Highly Rated</h5>
										<img className="img-generic" src="/assets/images/Review_Star.svg" alt="Review Star"/>
									</div>
								</span>
							</figcaption>
						</figure>
					</div>
					<div className="banner-outer-box">
					<Link data-tagname="anchor" to='/signature-templates'>
							<div className="banner-img-icon e-sign-comn-box">
								<img className="img-generic" src="/assets/images/Banner_150_Business.svg" alt="Banner 150 Business Icon"/>
							</div>
							<div className="banner-img-text">
								<h5>Professional Templates</h5>
								<p className='para'>Check Categories</p>
							</div>
				</Link>
					</div>
				</div>
				<div className="banner-bg banner-bg-1">
					<img className="img-generic" src="/assets/images/Banner_Cross_Bg.svg" alt="Banner Bg"/>
				</div>
				<div className="banner-bg banner-bg-2">
					<img className="img-generic" src="/assets/images/Banner_Cross_Bg.svg" alt="Banner Bg"/>
				</div>
				<div className="banner-bg banner-bg-3">
					<img className="img-generic" src="/assets/images/Banner_Cross_Bg.svg" alt="Banner Bg"/>
				</div>
				<div className="banner-bg banner-bg-4">
					<img className="img-generic" src="/assets/images/Banner_Add_Bg.svg" alt="Banner Bg"/>
				</div>
				<div className="banner-bg banner-bg-5 banner-circle-bg"></div>
				<div className="banner-bg banner-bg-6 banner-circle-bg"></div>
				{/* <div className="banner-bg banner-bg-7">
					<img className="img-generic" src="assets/images/Banner_Star_Bg.svg" alt="Banner Bg"/>
				</div> */}
			</div>
		</div>
		<div className="wave-outer">
		  	<div className="wave-blk"></div>
		  	<div className="wave-blk"></div>
		  	<div className="wave-blk"></div>
		  	<div className="wave-blk"></div>
		</div>
	</section>
	
	<section className="email-sign-wr align-center">
		<div className="center-wr">
			<div className="email-sign-content">
				<h4>Email Signature serves to expand the company’s brand!</h4>
				<p className='para'>Using customized signatures with multiple templates, Email Signature is the most effective software for businesses, as it assists in increasing brand recognition and business growth instantly.</p>
			</div>
			<div className="email-sign-btn">
				<Link to="/create" className="site-btn">Create your Email Signature</Link>
			</div>
		</div>
	</section>
	
	<section className="customized-emails-wr">
		<div className="center-wr">
			<div className="customized-emails-content clearfix">
				<div className="customized-emails-text left">
					<h3>Customized Email Signatures:</h3>
					<p className='para'>Our Email Signature connects customers socially in just a few clicks, and we developed it to save time in this fast-paced world.</p>
					<ul>
						<li>
							<span><img className="img-generic" alt='mobile' src="/assets/images/Mobile_Friendly.svg"/></span>
							Mobile friendly
						</li>
						<li>
							<span><img className="img-generic" alt='creative' src="/assets/images/Creative_Design.svg"/></span>
							Creative design
						</li>
						<li>
							<span><img className="img-generic" alt='low cost' src="/assets/images/Cost_Effective.svg"/></span>
							Free to use
						</li>
					</ul>
					<div className="clearfix">
					<div className="customized-emails-btn left">
						<Link to="/create" className="site-btn-second">Try Now</Link>
					</div>
					<div className="customized-img-box" onClick={handlePlayVideo} style={{cursor:"pointer"}}>
						<span ><img className="img-generic" src="/assets/images/Youtube_Icon.svg" alt="Youtube Icon"/></span>
						<span className='customized-img-box-text'><h5>View How to Create Email Signature</h5></span>
					</div>
				</div>
				</div>
				<div className="customized-emails-images right">
					<figure className="image-right-cut relative">
						<img className="img-generic" src="/assets/images/customizeImg1.png" alt="Customized Emails"/>
						<img className="img-generic" src="/assets/images/customizeImg2.png" alt="Customized Emails"/>
						<img className="img-generic" src="/assets/images/customizeImg3.jpg" alt="Customized Emails"/>
						<img className="img-generic" src="/assets/images/customizeImg4.jpg" alt="Customized Emails"/>
						<figcaption>
								{/* <div className="customized-figure-inner">
									<div className="customized-img-box" style={{cursor:"pointer"}}>
										<span onClick={handlePlayVideo}><img className="img-generic" src="/assets/images/Youtube_Icon.svg" alt="Youtube Icon"/></span>
									</div>
									<div className="customized-img-box-text">
										<h5>View How to Create Email Signature</h5>
									</div>
								</div> */}
						</figcaption>
					</figure>
				</div>
			</div>
		</div>
	</section>
	
	<section className="industries-assits-wr">
		<div className="center-wr">
			<div className="industries-assits-content align-center">
				<div className="industries-assits-text">
					<h3>Industries we assist</h3>
					<p className='para'>We cater to a diverse array of industries, providing tailored solutions that meet the unique needs of each sector.</p>
					<p className='para'>From dynamic startups and innovative tech companies to established enterprises and forward-thinking nonprofits, our services adapt to the nuances of industries such as finance, healthcare, technology, education, and beyond. </p>
				</div>
				<div className="industries-assits-blk">
	  			{ industrySwiperShow === true ? 
					(<Swiper
					    // install Swiper modules
					    spaceBetween={30}
					    slidesPerView={1}
						breakpoints={{
							568:{
								slidesPerView:2
							},
							320:{
								slidesPerView:1
							}
						}}
					    loop={true}
					    onSwiper={(swiper) => { setIndustrySwiper(swiper) }}
					    onSlideChange={() => {}}
					    
					>
						<SwiperSlide>
							<Link to="/signature-templates" state={{category:'Marketing'}}>
							<div className="industries-assits-box">
                                                		<div className="industries-box-img">
                                                        	<figure>
                                                                	<img className="img-generic" src="/assets/images/Marketing.svg" alt="Industries Marketing icon"/>
                                                        	</figure>
                                                		</div>
                                                		<div className="industries-box-text">
                                                        	<h5>Marketing</h5>
                                                		</div>
                                        		</div>
                                        		</Link>
						</SwiperSlide>
						<SwiperSlide>
							<Link to="/signature-templates" state={{category:'Designing'}}>
							 <div className="industries-assits-box">
                                                	<div className="industries-box-img">
                                                        <figure>
                                                                <img className="img-generic" src="/assets/images/Designing.svg" alt="Industries Designing icon"/>
                                                        </figure>
                                                	</div>
                                                	<div className="industries-box-text">
                                                        <h5>Designing</h5>
                                                	</div>
                                        		</div>
                                        		</Link>
						</SwiperSlide>
						<SwiperSlide>
							<Link to="/signature-templates" state={{category:'Development'}}>
							<div className="industries-assits-box">
                                                	<div className="industries-box-img">
                                                        <figure>
                                                                <img className="img-generic" src="/assets/images/Development.svg" alt="Industries Development icon"/>
                                                        </figure>
                                                	</div>
                                                	<div className="industries-box-text">
                                                        <h5>Development</h5>
                                                	</div>
                                        		</div>
                                        		</Link>
						</SwiperSlide>
						<SwiperSlide>
							<Link to="/signature-templates" state={{category:'Tourism'}}>
							<div className="industries-assits-box">
                                                	<div className="industries-box-img">
                                                        <figure>
                                                                <img className="img-generic" src="/assets/images/Tourism.svg" alt="Industries Tourism icon"/>
                                                        </figure>
                                                	</div>
                                                	<div className="industries-box-text">
                                                        <h5>Tourism</h5>
                                                	</div>
                                        		</div>
                                        		</Link>
						</SwiperSlide>
						<SwiperSlide>
							<Link to="/signature-templates" state={{category:'Education'}}>
							<div className="industries-assits-box">
                                                	<div className="industries-box-img">
                                                        <figure>
                                                                <img className="img-generic" src="/assets/images/Education.svg" alt="Industries Education icon"/>
                                                        </figure>
                                                	</div>
                                                	<div className="industries-box-text">
                                                        <h5>Education</h5>
                                                	</div>
                                        		</div>
                                        		</Link>
						</SwiperSlide>
						<SwiperSlide>
							<Link to="/signature-templates" state={{category:'Finance'}}>
							<div className="industries-assits-box">
                                                	<div className="industries-box-img">
                                                        <figure>
                                                                <img className="img-generic" src="/assets/images/Finance.svg" alt="Industries Finance icon"/>
                                                        </figure>
                                                	</div>
                                                	<div className="industries-box-text">
                                                        <h5>Finance</h5>
                                                	</div>
                                        		</div>
                                        		</Link>
						</SwiperSlide>
						<SwiperSlide>
							<Link to="/signature-templates" state={{category:'Health'}}>
							<div className="industries-assits-box">
                                                	<div className="industries-box-img">
                                                        <figure>
                                                                <img className="img-generic" src="/assets/images/Health.svg" alt="Industries Health icon"/>
                                                        </figure>
                                                	</div>
                                                	<div className="industries-box-text">
                                                        <h5>Health</h5>
                                                	</div>
                                        		</div>
                                        		</Link>
						</SwiperSlide>
						<SwiperSlide>
							<Link to="/signature-templates" state={{category:'All'}}>
                    		<div className="industries-assits-box">
                            	<div className="industries-box-img">
                                    <figure>
                                            <img className="img-generic" src="/assets/images/Photographer.svg" alt="Industries Photographer icon"/>
                                    </figure>
                            	</div>
                            	<div className="industries-box-text">
                                    <h5>Photography</h5>
                            	</div>
                    		</div>
                    		</Link>
						</SwiperSlide>
					</Swiper>)
					:
					<>
					<div className="industries-assits-box">
					<Link to="/signature-templates" state={{category:'Marketing'}}>
						<div className="industries-box-img">
							<figure>
								<img className="img-generic" src="/assets/images/Marketing.svg" alt="Industries Marketing icon"/>
							</figure>
						</div>
						<div className="industries-box-text">
							<h5>Marketing</h5>
						</div>
					</Link>
					</div>
					<div className="industries-assits-box">
					<Link to="/signature-templates" state={{category:'Designing'}}>
						<div className="industries-box-img">
							<figure>
								<img className="img-generic" src="/assets/images/Designing.svg" alt="Industries Designing icon"/>
							</figure>
						</div>
						<div className="industries-box-text">
							<h5>Designing</h5>
						</div>
					</Link>
					</div>
					<div className="industries-assits-box">
					<Link to="/signature-templates" state={{category:'Development'}}>
						<div className="industries-box-img">
							<figure>
								<img className="img-generic" src="/assets/images/Development.svg" alt="Industries Development icon"/>
							</figure>
						</div>
						<div className="industries-box-text">
							<h5>Development</h5>
						</div>
					</Link>
					</div>
					<div className="industries-assits-box">
					<Link to="/signature-templates" state={{category:'Tourism'}}>
						<div className="industries-box-img">
							<figure>
								<img className="img-generic" src="/assets/images/Tourism.svg" alt="Industries Tourism icon"/>
							</figure>
						</div>
						<div className="industries-box-text">
							<h5>Tourism</h5>
						</div>
					</Link>
					</div>
					<div className="industries-assits-box">
					<Link to="/signature-templates" state={{category:'Education'}}>
						<div className="industries-box-img">
							<figure>
								<img className="img-generic" src="/assets/images/Education.svg" alt="Industries Education icon"/>
							</figure>
						</div>
						<div className="industries-box-text">
							<h5>Education</h5>
						</div>
					</Link>
					</div>
					<div className="industries-assits-box">
					<Link to="/signature-templates" state={{category:'Finance'}}>
						<div className="industries-box-img">
							<figure>
								<img className="img-generic" src="/assets/images/Finance.svg" alt="Industries Finance icon"/>
							</figure>
						</div>
						<div className="industries-box-text">
							<h5>Finance</h5>
						</div>
					</Link>
					</div>
					<div className="industries-assits-box">
					<Link to="/signature-templates" state={{category:'Health'}}>
						<div className="industries-box-img">
							<figure>
								<img className="img-generic" src="/assets/images/Health.svg" alt="Industries Health icon"/>
							</figure>
						</div>
						<div className="industries-box-text">
							<h5>Health</h5>
						</div>
					</Link>
					</div>
					<div className="industries-assits-box">
					<Link to="/signature-templates" state={{category:'All'}}>
						<div className="industries-box-img">
							<figure>
								<img className="img-generic" src="/assets/images/Photographer.svg" alt="Industries Photographer icon"/>
							</figure>
						</div>
						<div className="industries-box-text">
							<h5>Photography</h5> 
						</div>
					</Link>
					</div>
					</>
				}
				</div>
				<div style={{position:'relative',zIndex:'3'}}>
					<div className="industries-assist-slider-btn" style={{position:'absolute', bottom:'0px',left:'50%',transform:"translateX(-50%)"}}>
					<div onClick={() => {industrySwiper.slidePrev()}} style={{display:'inline-block',backgroundColor:'#140342', backgroundImage:'url("/assets/images/Slider_Left_Arrow.svg")', backgroundSize:'60%', backgroundPosition:'center', backgroundRepeat:'no-repeat', width:'44px', height:'44px', borderRadius:'50%'}}></div>
					<div onClick={() => {industrySwiper.slideNext()}} style={{display:'inline-block',marginLeft:'25px',backgroundColor:'#140342', backgroundImage:'url("/assets/images/Slider_Right_Arrow.svg")', backgroundSize:'60%', backgroundPosition:'center', backgroundRepeat:'no-repeat', width:'44px', height:'44px', borderRadius:'50%'}}></div>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<section className="how-we-work-wr" id='section-how-we-work'>
		<div className="center-wr">
			<div className="how-we-work-content align-center">
				<div className="how-we-work-heading">
					<h3>How do we work?</h3>
				</div>
				<div className="how-work-circle-blk">
				
				{ stepSwiperShow === true ? 
					(
						<Swiper
					    	// install Swiper modules
					    	spaceBetween={30}
					    	slidesPerView={1}
							breakpoints={{
								320:{
									slidesPerView:1
								},
								568:{
									slidesPerView:2
								},
								768:{
									slidesPerView:3
								}
							}}
					    	onSwiper={(swiper) => { setStepSwiper(swiper) }}
					    	onSlideChange={() => {}}
					    	centeredSlides={true}
					    	style={{height:'auto'}}
						>
							<SwiperSlide>
								<div className="how-we-work-circle">
						<figure>
							{/* <!-- <img className="img-generic" src="assets/images/Browsing_Template.svg" alt="Browsing Template"> --> */}
							<svg width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_129_71)">
									<path d="M4.80272 51.9399C4.55251 51.9399 4.36044 51.9399 4.18327 51.9318C3.27584 51.8934 2.40297 51.5732 1.68597 51.0158C0.968966 50.4583 0.443459 49.6914 0.182567 48.8216C0.171684 48.7825 0.163558 48.7428 0.158232 48.7026C0.137921 48.5413 0.0840248 48.386 0 48.2469V4.6506C0.0863014 4.52331 0.137194 4.37537 0.147434 4.22193C0.147434 4.19624 0.154173 4.16243 0.156878 4.15161C0.592382 2.68303 1.52155 1.70398 2.99712 1.15766C3.05512 1.13984 3.11434 1.12629 3.17431 1.11709C3.35406 1.09305 3.52707 1.03278 3.68285 0.939941H47.117C47.272 1.03041 47.4487 1.07714 47.6282 1.07517C47.6695 1.07501 47.7107 1.07863 47.7513 1.08599C49.7544 1.6553 50.9973 3.33618 50.9973 5.47144C50.9973 13.2894 50.9973 21.1074 50.9973 28.9254C50.9973 35.0873 50.9973 41.2492 50.9973 47.4111C51.0033 47.8312 50.9551 48.2502 50.8539 48.6579C50.3129 50.6864 48.6169 51.9426 46.411 51.944H4.79866L4.80272 51.9399ZM4.70399 3.16444C3.05935 3.16444 2.22485 3.99339 2.22485 5.6283V47.2664C2.22485 48.8892 3.04718 49.7127 4.67018 49.7127H46.3109C47.946 49.7127 48.7751 48.8784 48.7751 47.2326V41.3827C48.7751 31.3122 48.7751 20.8969 48.7873 10.6547C48.7873 10.3762 48.7589 10.0908 48.552 9.88258C48.345 9.67433 48.0502 9.64729 47.7892 9.64729C42.5144 9.65676 36.7595 9.66081 30.1783 9.66081H19.1973C16.6087 9.66081 14.822 7.98263 14.6449 5.38895C14.5475 3.95824 13.713 3.16985 12.2928 3.1685H4.70399V3.16444ZM46.0607 7.43631C46.7243 7.43631 47.3884 7.43631 48.0529 7.43631C48.1536 7.44493 48.255 7.43256 48.3507 7.39997C48.4464 7.36738 48.5343 7.31529 48.6088 7.24699C48.6714 7.17393 48.7186 7.08892 48.7474 6.9971C48.7762 6.90529 48.7861 6.80858 48.7765 6.71283C48.7657 6.47213 48.7684 6.23277 48.7765 5.97854C48.7846 5.72432 48.7765 5.46062 48.7765 5.19693C48.7636 4.66488 48.5472 4.15802 48.1718 3.78069C47.7964 3.40336 47.2906 3.18426 46.7586 3.1685C45.8808 3.15903 44.9232 3.15498 43.7465 3.15498H41.753H39.7134H39.1169L39.3225 3.70265C39.4922 4.20863 39.5914 4.73556 39.6174 5.2686C39.6255 5.34568 39.6323 5.42411 39.6404 5.50119C39.679 6.02641 39.9168 6.51705 40.3052 6.87274C40.6936 7.22843 41.2033 7.42229 41.73 7.41467C42.7119 7.42278 43.6897 7.42278 44.6 7.42278L46.0607 7.43631ZM27.9372 3.68778C28.1071 4.19504 28.2059 4.7234 28.2307 5.25778C28.2631 6.56949 29.1409 7.42143 30.4664 7.4336H31.8906H34.0546H37.8415L37.6752 6.90621C37.5128 6.35952 37.4139 5.79597 37.3803 5.22668C37.2748 3.93795 36.4241 3.16715 35.1041 3.16444H27.7817L27.9372 3.68778ZM17.1794 3.15633C17.0854 3.15412 16.992 3.17177 16.9053 3.20812C16.8186 3.24447 16.7406 3.29871 16.6763 3.36729L16.5032 3.54579L16.5843 3.78109C16.7445 4.29062 16.8377 4.81884 16.8616 5.35244C16.9576 6.64928 17.7989 7.42819 19.1122 7.4336C19.728 7.4336 20.3425 7.4336 20.9556 7.4336H26.4413L26.2953 6.91703C26.1363 6.42376 26.0387 5.91282 26.0045 5.39571C25.9626 4.02179 25.0861 3.16715 23.7201 3.16444H21.218H17.3539H17.3093C17.2741 3.16039 17.2295 3.15633 17.1862 3.15633H17.1794Z" fill="#6440FB"/>
									<path d="M18.1532 27.5663C15.6348 27.5663 13.1043 27.5542 10.6293 27.5298C10.0777 27.5192 9.53412 27.396 9.03196 27.1676C8.5298 26.9392 8.07966 26.6106 7.70921 26.2019C6.9352 25.3788 6.50424 24.2917 6.50415 23.1619C6.5285 20.8225 8.40712 18.8887 10.6969 18.8495C11.5611 18.8346 12.4862 18.8279 13.6088 18.8279C14.3689 18.8279 15.1295 18.8279 15.8905 18.8279C16.6515 18.8279 17.4125 18.8279 18.1735 18.8279H18.5792H20.4349H22.6922C23.7945 18.8279 24.702 18.8279 25.5514 18.8441C26.1276 18.8455 26.6979 18.9614 27.2289 19.1852C27.7599 19.409 28.2412 19.7362 28.6445 20.1477C29.0477 20.5686 29.3629 21.0655 29.5719 21.6095C29.7809 22.1535 29.8795 22.7336 29.8618 23.3161C29.8226 25.5812 27.9358 27.5082 25.7421 27.5339C23.194 27.5542 20.6418 27.5663 18.1532 27.5663ZM13.9916 21.0564C12.9447 21.0564 11.8974 21.0591 10.8497 21.0646C10.2915 21.0638 9.7555 21.2834 9.35836 21.6757C8.96123 22.068 8.73506 22.6011 8.729 23.1592C8.72432 23.441 8.77598 23.7208 8.88096 23.9823C8.98594 24.2437 9.14213 24.4816 9.34034 24.6819C9.53809 24.8844 9.77431 25.0452 10.0351 25.1551C10.296 25.2649 10.5762 25.3215 10.8592 25.3215C13.2035 25.3215 15.551 25.3215 17.9016 25.3215H23.9879H25.5257C25.8198 25.3243 26.111 25.2631 26.3791 25.1421C26.6472 25.0212 26.8858 24.8434 27.0783 24.6211C27.3622 24.3268 27.5512 23.9542 27.6212 23.5514C27.6911 23.1486 27.6386 22.7341 27.4705 22.3614C27.3205 21.9687 27.0521 21.6323 26.7024 21.3988C26.3528 21.1652 25.9392 21.0461 25.5189 21.0578H22.3757H13.9902L13.9916 21.0564Z" fill="#6440FB"/>
									<path d="M12.6593 38.9311H7.84173C6.89498 38.9311 6.6583 38.4726 6.55686 38.1292C6.51315 37.9831 6.50032 37.8295 6.51918 37.6781C6.53804 37.5268 6.58819 37.3811 6.66642 37.2502C6.74186 37.1223 6.8433 37.0116 6.96423 36.9255C7.08515 36.8393 7.22284 36.7794 7.36836 36.7498C7.55679 36.7173 7.74794 36.7032 7.93911 36.7079H20.4511H28.4308C29.3776 36.7079 29.6643 37.0149 29.8103 37.5112C29.8589 37.6651 29.8728 37.8278 29.8511 37.9877C29.8293 38.1476 29.7725 38.3008 29.6846 38.4361C29.5957 38.5688 29.4785 38.6802 29.3415 38.7623C29.2045 38.8443 29.051 38.8951 28.892 38.9108C28.7064 38.9287 28.5199 38.9359 28.3334 38.9324H12.6661L12.6593 38.9311Z" fill="#6440FB"/>
									<path d="M43.4057 29.1756C43.0861 29.1672 42.7822 29.0354 42.5577 28.8078C42.1452 28.4115 41.6772 27.9612 41.258 27.5001C41.1726 27.3927 41.0648 27.3051 40.9422 27.2435C40.8196 27.1818 40.6851 27.1476 40.5479 27.1431C40.3877 27.1474 40.2298 27.1823 40.0826 27.2459C39.5788 27.4447 39.0419 27.5466 38.5002 27.5461C37.7129 27.5492 36.9397 27.3375 36.2639 26.9338C35.588 26.5302 35.035 25.9498 34.6645 25.2553C33.6353 23.2472 34.2588 20.7414 36.0752 19.55C36.8258 19.0774 37.6957 18.8288 38.5827 18.8333H38.6016C39.2979 18.8419 39.9815 19.0211 40.5924 19.3552C41.2034 19.6893 41.7231 20.168 42.106 20.7495C42.504 21.3224 42.7555 21.9842 42.8382 22.6769C42.921 23.3696 42.8326 24.0719 42.5807 24.7225C42.3738 25.2391 42.4576 25.615 42.862 25.9815C43.2664 26.3479 43.6735 26.7618 44.1307 27.2459C44.5878 27.73 44.6176 28.4034 44.1645 28.8524C44.066 28.9541 43.9481 29.0351 43.8178 29.0906C43.6875 29.1462 43.5474 29.175 43.4057 29.1756ZM38.5016 21.0619C38.2161 21.0639 37.9338 21.1221 37.6709 21.2332C37.4079 21.3444 37.1695 21.5063 36.9692 21.7096C36.7747 21.9049 36.6211 22.1371 36.5175 22.3925C36.4139 22.648 36.3624 22.9215 36.366 23.1971C36.3692 23.7615 36.5961 24.3017 36.9969 24.6991C37.3977 25.0966 37.9398 25.319 38.5043 25.3175C39.0699 25.3197 39.6132 25.0976 40.0153 24.6998C40.4174 24.3021 40.6454 23.7613 40.6493 23.1958C40.652 22.9198 40.5995 22.6461 40.4949 22.3907C40.3904 22.1353 40.236 21.9033 40.0407 21.7083C39.6347 21.2984 39.0826 21.0664 38.5056 21.0632L38.5016 21.0619Z" fill="#6440FB"/>
									<path d="M23.5633 45.4463H7.89595C7.56189 45.4463 7.21973 45.4179 6.94112 45.2137C6.75585 45.0656 6.62081 44.8638 6.55448 44.6361C6.48816 44.4084 6.49378 44.1657 6.57053 43.9412C6.63791 43.7305 6.77163 43.5473 6.95178 43.4188C7.13193 43.2904 7.34881 43.2236 7.57001 43.2286C8.19622 43.2205 8.8684 43.2178 9.75293 43.2178H20.366C21.5066 43.2178 22.6467 43.22 23.7865 43.2245C23.9785 43.2163 24.1696 43.254 24.3442 43.3344C24.5187 43.4149 24.6715 43.5357 24.79 43.687C24.8911 43.8327 24.9553 44.0007 24.9772 44.1766C24.9991 44.3526 24.9781 44.5312 24.9158 44.6972C24.866 44.861 24.7749 45.0092 24.6512 45.1276C24.5276 45.246 24.3756 45.3306 24.2098 45.3733C24.0021 45.4254 23.7881 45.4482 23.5741 45.4409L23.5633 45.4463Z" fill="#6440FB"/>
								</g>
								<defs>
									<clipPath id="clip0_129_71">
										<rect width="51" height="51" fill="white" transform="translate(0 0.939941)"/>
									</clipPath>
								</defs>
							</svg>
							<figcaption>
								<h5>1</h5>
							</figcaption>
						</figure>
						<div className="how-work-circle-text">
							<h5>Browsing Templates</h5>
						</div>
						<div className="arrow-outer-wr">
							<div className="arrow">
						      	<div className="curve"></div>
						      	<div className="point">
						      		<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						      			<path d="M0.256419 8.39968C0.448115 8.2526 0.639261 8.10513 0.831672 7.95937C2.01455 7.06535 3.19655 6.17727 4.37354 5.27994C4.45957 5.20438 4.52178 5.10545 4.5526 4.99518C5.01806 3.4616 5.4804 1.92584 5.93963 0.387883C5.95358 0.341047 5.97271 0.296197 6.00297 0.213206L8.13762 7.79986L0.27104 8.43618L0.256419 8.39968Z" fill="#6440FB"></path>
						      		</svg>
						      	</div>
						    </div>
						</div>
					</div>
					</SwiperSlide>
					<SwiperSlide>
					<div className="how-we-work-circle">
						<figure>
							<svg width="50" height="54" viewBox="0 0 50 54" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_128_40)">
									<path d="M50 27.4252C50 34.9029 50 42.3811 50 49.8596C50 51.8174 48.9624 53.2404 47.1817 53.7645C46.6871 53.8957 46.1747 53.9549 45.6618 53.94C32.3209 53.94 18.9796 53.94 5.63783 53.94C2.25067 53.94 0.00738798 51.7972 0.00615134 48.5469C0.00120476 39.5932 0.00120476 30.6387 0.00615134 21.6835C0.00615134 20.3257 0.00615134 18.968 0.00615134 17.6102C0.0197544 15.139 1.67069 13.5701 4.2528 13.5654C5.27921 13.5654 6.30687 13.5417 7.33205 13.5749C7.78466 13.5903 7.91945 13.4847 7.9145 13.0306C7.88977 10.4123 7.9009 7.79521 7.90337 5.17811C7.90337 2.4709 9.50234 0.942383 12.3268 0.942383C23.4921 0.942383 34.6578 0.942383 45.8238 0.942383C47.8828 0.942383 49.4336 2.06416 49.9048 3.87727C50.0148 4.3018 50.0024 4.73581 50.0024 5.16863C50.0016 12.5863 50.0008 20.0051 50 27.4252ZM47.3746 27.475V5.27654C47.3746 3.81443 47.0036 3.45631 45.5011 3.45631H12.4369C10.8936 3.45631 10.5411 3.79071 10.5411 5.25045C10.5411 19.6747 10.5411 34.0997 10.5411 48.5256C10.5411 49.3213 10.4719 50.1086 10.1021 50.8237C9.84118 51.3277 9.94259 51.4095 10.5016 51.4095C22.201 51.3953 33.9001 51.3917 45.5988 51.3988C46.9986 51.3988 47.3709 51.0348 47.3709 49.6734L47.3746 27.475ZM7.90214 32.7578V26.6188C7.90214 23.2986 7.89224 19.9688 7.91326 16.6438C7.91326 16.1694 7.78218 16.0449 7.29494 16.0627C6.33159 16.0995 5.36701 16.0734 4.40243 16.0746C3.02852 16.0746 2.64764 16.4398 2.64764 17.7596V41.4344C2.64764 43.9531 2.6365 46.4718 2.65752 48.9892C2.6618 49.5649 2.8803 50.1201 3.27367 50.5549C3.66705 50.9897 4.20943 51.2755 4.8031 51.3609C6.18814 51.5494 7.40006 50.8486 7.77971 49.6284C7.88082 49.2466 7.92249 48.8526 7.90337 48.4592L7.90214 32.7578Z" fill="#6440FB"/>
									<path d="M21.0402 19.8525C20.2858 19.8252 19.524 19.9379 18.7759 19.7434C17.0656 19.2999 15.8858 17.9327 15.824 16.2465C15.7894 15.2836 15.7857 14.3183 15.824 13.3554C15.8668 12.4132 16.2806 11.5215 16.982 10.8603C17.6833 10.199 18.62 9.81727 19.6032 9.79206C20.5678 9.76755 21.5324 9.76755 22.4969 9.79206C23.501 9.8155 24.4572 10.2083 25.1675 10.889C25.8779 11.5698 26.2881 12.4864 26.3132 13.4491C26.333 14.3527 26.333 15.2575 26.3132 16.1634C26.293 17.1161 25.896 18.0258 25.2025 18.7083C24.5091 19.3908 23.5712 19.7952 22.5786 19.8395C22.0666 19.8679 21.5534 19.8525 21.0402 19.8525ZM21.0909 12.2929C20.6605 12.2929 20.2252 12.2787 19.7998 12.2929C18.9342 12.3261 18.4482 12.8076 18.4395 13.6424C18.4288 14.4282 18.4288 15.2144 18.4395 16.001C18.4531 16.8311 18.949 17.3244 19.8085 17.3421C20.6494 17.3603 21.4899 17.3603 22.33 17.3421C23.14 17.3267 23.6544 16.8832 23.6903 16.1136C23.7299 15.2516 23.7299 14.3835 23.6903 13.5214C23.6532 12.753 23.1449 12.3238 22.33 12.2929C21.9108 12.2763 21.5002 12.2894 21.0909 12.2894V12.2929Z" fill="#6440FB"/>
									<path d="M15.8155 27.3931C15.8428 26.6294 15.7302 25.8598 15.9639 25.1068C16.1927 24.357 16.6601 23.6945 17.301 23.212C17.9418 22.7296 18.7239 22.4513 19.5378 22.4162C20.542 22.3814 21.547 22.3814 22.5528 22.4162C23.5572 22.4501 24.5091 22.8546 25.21 23.5452C25.9109 24.2359 26.3067 25.1594 26.3147 26.1231C26.3307 27.0077 26.3332 27.8935 26.3147 28.7781C26.2956 29.7519 25.8839 30.6807 25.1658 31.3695C24.4477 32.0582 23.4792 32.4534 22.4637 32.4719C21.5412 32.4909 20.6174 32.4897 19.6949 32.4719C18.6796 32.463 17.7076 32.076 16.9842 31.3928C16.2608 30.7096 15.8427 29.7835 15.818 28.8101C15.7995 28.337 15.8155 27.865 15.8155 27.3931ZM21.0874 24.9136C20.678 24.9136 20.2675 24.9064 19.8581 24.9136C18.948 24.9313 18.4484 25.3997 18.4347 26.2606C18.4236 27.0468 18.4224 27.8318 18.4347 28.618C18.4484 29.4481 18.9381 29.9355 19.8062 29.958C20.6455 29.9794 21.4856 29.9794 22.3265 29.958C23.1439 29.9378 23.6485 29.4955 23.6868 28.7259C23.7276 27.8639 23.7276 26.997 23.6868 26.1338C23.6497 25.3665 23.1352 24.9385 22.3191 24.9159C21.9073 24.9041 21.4967 24.9136 21.0874 24.9136Z" fill="#6440FB"/>
									<path d="M19.7244 43.8179C19.3175 43.8333 19.0096 43.6507 18.735 43.3934C17.8941 42.587 17.0433 41.789 16.2148 40.9708C15.5964 40.3589 15.589 39.6972 16.1591 39.1482C16.7292 38.5991 17.4143 38.6015 18.0611 39.1849C18.5236 39.6023 18.9824 40.0269 19.4065 40.481C19.6625 40.7538 19.8072 40.7419 20.0731 40.481C21.3493 39.23 22.6515 38.0039 23.9388 36.7635C24.3098 36.4077 24.7155 36.1706 25.2509 36.2714C25.4864 36.3063 25.7065 36.405 25.8855 36.5559C26.0645 36.7067 26.1948 36.9034 26.2613 37.1228C26.3445 37.3478 26.3571 37.5913 26.2975 37.8231C26.238 38.055 26.1088 38.265 25.9261 38.4272C25.232 39.0976 24.5366 39.7656 23.8399 40.4312C22.8399 41.3917 21.8394 42.3514 20.8386 43.3104C20.5257 43.6128 20.1906 43.8487 19.7244 43.8179Z" fill="#6440FB"/>
									<path d="M35.4892 26.1787C33.7851 26.1787 32.081 26.1787 30.3782 26.1787C29.4099 26.1787 28.8855 25.7246 28.8843 24.9123C28.883 24.1 29.4062 23.653 30.3794 23.6506C33.8074 23.6435 37.2349 23.6411 40.6621 23.6435C41.7948 23.6435 42.433 24.3751 42.1461 25.2906C41.9531 25.8965 41.5277 26.1752 40.7264 26.1776C38.9778 26.1823 37.2341 26.1787 35.4892 26.1787Z" fill="#6440FB"/>
									<path d="M35.5524 38.7924C33.8722 38.7924 32.192 38.7924 30.5118 38.7924C30.0048 38.7924 29.5225 38.7272 29.2047 38.2896C29.0707 38.1149 28.9854 37.9103 28.9572 37.6951C28.9289 37.48 28.9585 37.2615 29.0432 37.0604C29.1278 36.8593 29.2647 36.6824 29.4408 36.5463C29.6169 36.4103 29.8264 36.3197 30.0493 36.2832C30.2955 36.2559 30.5437 36.248 30.7913 36.2595C34.0494 36.2595 37.3059 36.2595 40.5608 36.2595C41.0257 36.2595 41.466 36.3188 41.79 36.6757C42.1437 37.0682 42.1919 37.5342 42.0225 38.0038C41.9538 38.2232 41.8138 38.4158 41.6229 38.5536C41.4321 38.6914 41.2003 38.7672 40.9614 38.7699C40.3901 38.7971 39.8151 38.7924 39.2425 38.7936C38.0108 38.7947 36.7816 38.7924 35.5524 38.7924Z" fill="#6440FB"/>
									<path d="M35.4892 13.5677C33.7678 13.5677 32.0463 13.5795 30.3249 13.5677C29.2651 13.557 28.6518 12.7056 29.0277 11.8032C29.2664 11.2292 29.7511 11.0466 30.3546 11.0478C31.6865 11.0478 33.0183 11.0478 34.3502 11.0478C36.4612 11.0478 38.5721 11.0419 40.6831 11.0478C41.613 11.0478 42.1336 11.5115 42.1411 12.287C42.1485 13.0625 41.6155 13.5594 40.714 13.5653C38.9728 13.5677 37.2304 13.5677 35.4892 13.5677Z" fill="#6440FB"/>
									<path d="M32.9071 16.0733C33.7468 16.0733 34.5865 16.0602 35.4262 16.0733C36.324 16.0899 36.8607 16.5867 36.8495 17.3587C36.8396 18.1081 36.3227 18.5931 35.4484 18.6026C33.7493 18.62 32.0501 18.62 30.351 18.6026C29.4779 18.5931 28.9635 18.1022 28.9573 17.3516C28.9573 16.5784 29.4866 16.0887 30.3893 16.0733C31.2277 16.0578 32.0674 16.0733 32.9071 16.0733Z" fill="#6440FB"/>
									<path d="M32.9367 28.6915C33.7764 28.6915 34.6161 28.6832 35.4558 28.6915C36.3214 28.7022 36.8569 29.173 36.8866 29.9117C36.9162 30.6719 36.382 31.196 35.4817 31.2078C33.7826 31.2308 32.0834 31.2308 30.3843 31.2078C29.4729 31.1972 28.977 30.7003 28.9993 29.9034C29.0203 29.1505 29.536 28.6987 30.4189 28.688C31.2574 28.6821 32.097 28.6915 32.9367 28.6915Z" fill="#6440FB"/>
									<path d="M32.8726 43.8284C32.0131 43.8284 31.1524 43.8438 30.2929 43.8284C29.4681 43.8094 28.9648 43.3268 28.9574 42.594C28.9487 41.841 29.478 41.3322 30.3251 41.3275C32.044 41.3156 33.7634 41.3156 35.4831 41.3275C36.329 41.3275 36.8595 41.8421 36.8509 42.5951C36.8422 43.3268 36.3389 43.8106 35.5128 43.8296C34.6336 43.845 33.758 43.8284 32.8726 43.8284Z" fill="#6440FB"/>
								</g>
								<defs>
									<clipPath id="clip0_128_40">
										<rect width="50" height="53" fill="white" transform="translate(0 0.939941)"/>
									</clipPath>
								</defs>
							</svg>
							<figcaption>
								<h5>2</h5>
							</figcaption>
						</figure>
						<div className="how-work-circle-text">
							<h5>Adding Details</h5>
						</div>
						<div className="arrow-outer-wr">
							<div className="arrow">
						      	<div className="curve"></div>
						      	<div className="point">
						      		<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						      			<path d="M0.256419 8.39968C0.448115 8.2526 0.639261 8.10513 0.831672 7.95937C2.01455 7.06535 3.19655 6.17727 4.37354 5.27994C4.45957 5.20438 4.52178 5.10545 4.5526 4.99518C5.01806 3.4616 5.4804 1.92584 5.93963 0.387883C5.95358 0.341047 5.97271 0.296197 6.00297 0.213206L8.13762 7.79986L0.27104 8.43618L0.256419 8.39968Z" fill="#6440FB"></path>
						      		</svg>
						      	</div>
						    </div>
						</div>
					</div>
					</SwiperSlide>
					<SwiperSlide>
					<div className="how-we-work-circle">
						<figure>
							<svg width="54" height="55" viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_129_52)">
									<path d="M53.9253 4.42521C53.8706 4.40158 53.8594 4.36551 53.8469 4.24734C53.8429 4.19647 53.8341 4.14609 53.8208 4.09683C53.1987 2.13898 51.6396 0.967262 49.6526 0.959799C46.1003 0.948604 42.8093 0.942383 39.5904 0.942383C36.3716 0.942383 33.1913 0.942382 30.1815 0.96104C27.7614 0.970991 25.9361 2.75345 25.8391 5.20138C25.8254 5.54967 25.7669 5.57454 25.4372 5.57454C21.8015 5.56584 18.243 5.56459 15.2419 5.56459H8.69471C6.70393 5.56459 5.66125 6.61069 5.66125 8.58843V23.9639C5.66125 26.5536 6.44762 27.3634 9.02817 27.4293C9.26209 27.4293 9.26832 27.4728 9.26458 27.6992C9.24841 28.601 9.24841 29.5016 9.26458 30.3797C9.27578 31.09 9.59181 31.5204 10.2027 31.6559C10.2884 31.6756 10.3761 31.6856 10.464 31.6858C10.8983 31.6858 11.2106 31.4246 11.4706 31.1696L12.4959 30.1471C13.281 29.3647 14.0922 28.5562 14.8798 27.7502C14.9772 27.6421 15.0977 27.5573 15.2323 27.5019C15.3669 27.4466 15.5122 27.4222 15.6575 27.4305C19.2894 27.4305 23.1528 27.4392 28.1857 27.4392H35.7059C37.5723 27.4392 38.651 26.3621 38.6573 24.4851C38.6573 24.2798 38.6573 24.0758 38.6573 23.8718C38.6573 23.3133 38.6697 22.7374 38.6411 22.1702C38.6311 21.9899 38.6485 21.8816 38.6958 21.8331C38.7431 21.7846 38.8476 21.761 39.0355 21.761H39.0517C40.974 21.7722 42.8665 21.7734 44.4629 21.7734H49.4473C51.0262 21.7734 52.2891 21.1515 53.2036 19.9337C53.3977 19.6513 53.5541 19.3448 53.669 19.022C53.7546 18.7916 53.8582 18.5682 53.9788 18.354L53.9962 18.3242V4.45506L53.9253 4.42521ZM12.0952 27.2377L11.6087 27.7228C11.6087 27.6184 11.6087 27.5188 11.6087 27.4206C11.6087 27.03 11.6087 26.6929 11.6025 26.3521C11.5764 25.5511 11.1347 25.1157 10.3259 25.0958C10.1169 25.0958 9.90661 25.0958 9.69633 25.0958H9.2285H8.76191H8.59145C8.03776 25.0958 8.01162 25.0672 8.01038 24.5273C8.01038 23.6152 8.01038 22.7005 8.01038 21.7834V8.56729C8.01038 7.9155 8.01038 7.9155 8.66734 7.9155H14.9346C18.2766 7.9155 21.8662 7.9155 25.4733 7.90679C25.645 7.90679 25.7346 7.92297 25.7744 7.96277C25.8142 8.00257 25.8329 8.09711 25.8316 8.25757C25.8142 10.958 25.8117 13.8276 25.8242 17.2856C25.8316 19.4113 27.0336 21.0271 29.0405 21.6092C29.4918 21.7282 29.9576 21.7826 30.4241 21.7709H30.673H32.0342H33.3954C34.4156 21.7709 35.2007 21.7709 35.9386 21.7548H35.9647C36.0679 21.7411 36.1725 21.7649 36.2596 21.8219C36.3044 21.8692 36.3218 21.9712 36.3143 22.1516C36.2944 22.6727 36.2994 23.2014 36.3031 23.7126C36.3031 23.9614 36.3031 24.2102 36.3031 24.4589C36.3031 25.0473 36.2646 25.0809 35.6611 25.0809H26.7026C23.5385 25.0809 19.3691 25.0809 15.1735 25.0684C14.4755 25.0684 13.9641 25.2849 13.5161 25.7675C13.0682 26.2501 12.5979 26.7352 12.0952 27.2352V27.2377ZM28.1708 17.1326C28.1708 13.2865 28.1708 9.44048 28.1708 5.59445C28.1708 4.07195 28.9435 3.29951 30.4652 3.29951H49.3527C50.8769 3.29951 51.6496 4.07071 51.6508 5.59071C51.6508 9.43675 51.6508 13.2832 51.6508 17.1301C51.6508 18.6513 50.8782 19.4238 49.3552 19.425H30.4689C28.9472 19.4213 28.1708 18.6501 28.1708 17.1301V17.1326Z" fill="#6440FB"/>
									<path d="M32.68 37.1874C31.7369 36.8043 31.59 36.308 31.6199 35.3427C31.6672 33.7904 31.656 32.2107 31.6448 30.6832C31.6448 30.2068 31.6386 29.7304 31.6373 29.254C31.6373 28.4542 31.1857 27.938 30.4939 27.938C30.284 27.942 30.0765 27.9841 29.8817 28.0624C29.8145 28.0873 29.7473 28.1159 29.6801 28.1457L29.542 28.2042L26.2485 29.5289C21.6034 31.3988 16.9619 33.2688 12.3242 35.1387C12.0812 35.237 11.8211 35.286 11.559 35.283L10.1393 35.2756C9.51474 35.2706 8.89014 35.2677 8.26553 35.2669C7.39456 35.2669 6.67041 35.2743 5.99355 35.2917C5.07007 35.3125 4.16331 35.5422 3.34138 35.9636C2.51946 36.385 1.80374 36.9871 1.24802 37.7247C0.687884 38.4651 0.302843 39.3226 0.121822 40.2331C-0.0591986 41.1435 -0.0314952 42.0831 0.202853 42.9813C0.910825 45.7327 3.37567 47.5836 6.33571 47.5836C6.52359 47.5836 6.62188 47.6035 6.66792 47.6495C6.72373 47.7425 6.74531 47.8521 6.7289 47.9593C6.71521 48.7827 6.71769 49.6173 6.71894 50.4259C6.71894 51.2854 6.71894 52.1747 6.7065 53.0479C6.6953 53.6823 6.73761 54.4013 7.39456 54.9137L7.42816 54.9398H12.43L12.4524 54.9311C13.087 54.6724 13.3794 54.1923 13.3707 53.4211C13.3557 52.1374 13.3582 50.8799 13.3607 49.5489C13.3607 49.0875 13.3607 48.6247 13.3607 48.1583L14.7057 48.6994L18.1734 50.0937L20.5922 51.0652C23.5684 52.2601 26.5442 53.4572 29.5196 54.6562C29.5676 54.6748 29.6166 54.6906 29.6665 54.7035C29.8058 54.7421 29.8867 54.7682 29.929 54.8652L29.9613 54.9398H30.6954L30.7166 54.9324C31.3586 54.6948 31.6535 54.2196 31.646 53.4397C31.6323 52.1474 31.6336 50.8338 31.6336 49.5626C31.6336 48.5675 31.6336 47.5314 31.6336 46.5151C31.6336 46.2116 31.6784 46.1022 31.972 46.0176C32.8853 45.7304 33.6906 45.1747 34.2831 44.4229C34.8755 43.6711 35.2274 42.7582 35.2929 41.8034C35.4584 39.7796 34.3821 37.8852 32.68 37.1874ZM31.656 43.5945V39.2783C32.3764 39.6005 32.9152 40.4065 32.9624 41.2623C32.9965 41.7367 32.8904 42.2108 32.6573 42.6254C32.4241 43.0401 32.0742 43.3771 31.651 43.5945H31.656ZM13.352 45.2613C13.3731 42.6193 13.3657 39.9537 13.3594 37.6016C13.3594 37.3429 13.3831 37.2284 13.6319 37.1277C16.4589 36.0082 19.3293 34.8477 22.104 33.7294L24.5489 32.7455C24.5618 32.74 24.5751 32.7355 24.5887 32.7318V40.8518C24.5887 41.0496 24.5887 41.2474 24.5887 41.4439C24.5887 41.9228 24.58 42.4166 24.6024 42.903C24.6323 43.5535 24.9906 43.9901 25.5866 44.1008C25.649 44.1122 25.7123 44.118 25.7757 44.1182C25.9996 44.1142 26.2177 44.047 26.4051 43.9244C26.5924 43.8018 26.7413 43.6288 26.8346 43.4254C26.9276 43.1848 26.9642 42.9261 26.9416 42.6691V40.6789C26.9416 37.9063 26.9416 35.0392 26.9304 32.2206C26.9304 31.8636 27.0187 31.7293 27.3298 31.6211C27.8275 31.4469 28.3065 31.2479 28.8117 31.0389L29.2733 30.8486V52.0193L28.1622 51.5715C27.2928 51.2207 26.4265 50.8716 25.563 50.5241L23.607 49.738C20.372 48.4369 17.02 47.0923 13.7215 45.7788C13.4416 45.6693 13.3445 45.5748 13.347 45.2613H13.352ZM2.34543 41.368C2.40018 39.3032 4.0289 37.6986 6.13664 37.6364C6.63434 37.6202 7.1905 37.614 7.86986 37.614H8.95235H10.0348H10.81C10.922 37.614 10.9643 37.6327 10.9805 37.6489C11.0102 37.7125 11.0218 37.7831 11.0141 37.8528C11.0053 38.7236 11.0066 39.6191 11.0141 40.4799C11.0141 40.7933 11.0141 42.2064 11.0141 42.2064C11.0141 43.1318 11.0141 44.0577 11.0141 44.9839C11.0141 45.0113 11.0141 45.0387 11.0141 45.066C11.0216 45.1169 11.0174 45.1688 11.0016 45.2178C11.0016 45.2178 10.973 45.2414 10.8772 45.2414H10.3795C9.98258 45.2414 9.58318 45.2414 9.18503 45.2489C8.78687 45.2563 8.39119 45.2576 7.99428 45.2576C7.15815 45.2576 6.51612 45.2389 5.90893 45.1991C4.93378 45.1477 4.01683 44.7192 3.35186 44.0043C2.68689 43.2894 2.32599 42.344 2.34543 41.368ZM9.05687 47.7839C9.05687 47.6595 9.07304 47.6234 9.08673 47.6085C9.10041 47.5936 9.12654 47.5836 9.21115 47.5836H9.24101C9.50106 47.5936 9.76608 47.5973 10.0299 47.5973C10.2936 47.5973 10.5574 47.5973 10.8212 47.5836H10.8498C10.8952 47.5783 10.941 47.5879 10.9805 47.611C10.9954 47.6259 11.0116 47.6682 11.0103 47.7864C11.0004 48.3548 11.0016 48.932 11.0029 49.4892C11.0029 49.7081 11.0029 49.9271 11.0029 50.1447C11.0029 50.3624 11.0029 50.5664 11.0029 50.7766C11.0029 51.3078 11.0029 51.8575 11.0103 52.3937C11.0103 52.5081 10.9954 52.5504 10.9817 52.5641C10.9414 52.5884 10.8941 52.5984 10.8473 52.5927H10.8175C10.5425 52.584 10.2725 52.579 10.0149 52.579C9.75737 52.579 9.48861 52.579 9.23728 52.5939H9.20741C9.12156 52.5939 9.09294 52.579 9.08299 52.569C9.05558 52.5136 9.04519 52.4513 9.05313 52.3899C9.06682 50.8301 9.06682 49.279 9.05687 47.7839Z" fill="#6440FB"/>
									<path d="M45.0539 40.2983C44.684 40.2983 44.3144 40.2983 43.9453 40.2983H42.2955H40.5722C40.1956 40.2983 39.8177 40.2983 39.4387 40.2983C38.6287 40.3046 38.116 40.7412 38.1024 41.4365C38.0955 41.5864 38.1192 41.7362 38.172 41.8767C38.2249 42.0171 38.3057 42.1454 38.4097 42.2537C38.5478 42.3835 38.7103 42.4845 38.8878 42.5509C39.0653 42.6173 39.2543 42.6478 39.4436 42.6405C40.454 42.6405 41.3872 42.6505 42.2967 42.6505C43.2473 42.6505 44.1767 42.6505 45.0564 42.6405C45.849 42.6343 46.3604 42.1716 46.3604 41.4614C46.3604 40.7511 45.8602 40.307 45.0539 40.2983Z" fill="#6440FB"/>
									<path d="M38.5503 46.5923L38.4085 46.453C38.2878 46.3304 38.1427 46.2346 37.9826 46.1716C37.8225 46.1086 37.6509 46.0799 37.479 46.0873C37.4504 46.0873 37.4205 46.0873 37.3845 46.0873C37.1902 46.1089 37.0054 46.1824 36.8495 46.3002C36.6936 46.418 36.5723 46.5756 36.4985 46.7565C36.3917 46.9772 36.3582 47.2262 36.403 47.4672C36.4478 47.7082 36.5684 47.9286 36.7474 48.0962C37.428 48.794 38.0962 49.4744 38.7867 50.1349C39.0229 50.3781 39.3448 50.5196 39.6838 50.5292C39.8383 50.5272 39.9907 50.4936 40.1317 50.4305C40.2728 50.3674 40.3994 50.2761 40.5038 50.1622C40.9554 49.6871 40.9305 48.9992 40.444 48.4905C39.8269 47.8462 39.1787 47.2143 38.5503 46.5923Z" fill="#6440FB"/>
									<path d="M37.54 36.6875C37.7753 36.688 38.0032 36.6052 38.1833 36.4536C39.0317 35.7423 39.8177 34.9595 40.5324 34.1139C40.8211 33.7756 40.8435 33.3303 40.5934 32.8912C40.5033 32.7169 40.3672 32.5705 40.1999 32.4678C40.0325 32.3652 39.8403 32.3103 39.644 32.3091C39.3952 32.3091 39.1239 32.3414 38.9149 32.5292C38.095 33.2454 37.3259 34.0176 36.613 34.8404C36.4396 35.059 36.355 35.3349 36.3759 35.6132C36.3969 35.8914 36.522 36.1515 36.7263 36.3417C36.9422 36.5584 37.2341 36.6825 37.54 36.6875Z" fill="#6440FB"/>
									<path d="M35.2531 11.3238C35.2531 11.7243 35.2531 12.1253 35.2531 12.5266C35.2531 13.4396 35.2531 14.3837 35.2531 15.3117C35.2531 16.1351 35.6923 16.6662 36.3604 16.6662C36.646 16.658 36.9244 16.5753 37.1679 16.4262C39.4623 15.1126 41.7716 13.7829 44.0113 12.4756C44.5015 12.1908 44.784 11.7828 44.784 11.3562C44.784 10.9295 44.5152 10.5389 44.0274 10.2541C41.6746 8.88584 39.3553 7.54371 37.1356 6.27372C36.903 6.13257 36.6374 6.05493 36.3654 6.04858C35.7035 6.04858 35.2543 6.58593 35.2456 7.38574C35.2456 8.29874 35.2456 9.22791 35.2456 10.1222C35.2514 10.5244 35.2539 10.925 35.2531 11.3238ZM37.6171 13.4546V9.26523L41.2478 11.3587L37.6171 13.4546Z" fill="#6440FB"/>
									<path d="M12.4076 14.3177H22.374C22.6151 14.3304 22.8563 14.2944 23.0832 14.212C23.2556 14.1394 23.408 14.0264 23.5273 13.8824C23.6467 13.7384 23.7295 13.5677 23.7688 13.3848C23.8091 13.2038 23.805 13.0157 23.7569 12.8366C23.7088 12.6575 23.6181 12.4926 23.4925 12.3561C23.1715 12.0116 22.746 11.9668 22.3964 11.9668C21.6208 11.9668 20.8452 11.9668 20.0696 11.9668H17.4182H15.9251H14.432C13.717 11.9668 13.0015 11.9689 12.2857 11.973C12.0769 11.9658 11.8693 12.0076 11.6795 12.095C11.4898 12.1825 11.3233 12.3133 11.1932 12.4768C11.0857 12.6227 11.0147 12.7923 10.9864 12.9713C10.958 13.1503 10.973 13.3335 11.0302 13.5055C11.1472 13.8786 11.4769 14.3165 12.4076 14.3177Z" fill="#6440FB"/>
									<path d="M18.5878 20.1963C18.7626 20.2047 18.9373 20.1758 19.1002 20.1114C19.263 20.0471 19.4102 19.9488 19.5321 19.8232C19.8768 19.45 19.9589 19.0196 19.7698 18.5793C19.5657 18.1041 19.1676 17.8516 18.6176 17.8479C18.1647 17.8479 17.711 17.8479 17.2564 17.8479H13.5349C13.1156 17.8479 12.6975 17.8479 12.2782 17.8541C11.4968 17.8616 10.9767 18.338 10.9842 19.0383C10.9917 19.7386 11.5006 20.1913 12.2496 20.1951C13.1878 20.2001 14.1263 20.2021 15.0653 20.2013L18.5878 20.1963Z" fill="#6440FB"/>
									<path d="M22.6999 17.8591H22.6327C22.3295 17.8658 22.0405 17.9894 21.8263 18.204C21.612 18.4187 21.4891 18.7078 21.483 19.011C21.4832 19.3138 21.5993 19.6051 21.8076 19.8251C22.0158 20.0451 22.3004 20.177 22.6028 20.1939H22.6364C22.9351 20.1863 23.2198 20.0661 23.4333 19.8572C23.6468 19.6484 23.7733 19.3665 23.7874 19.0682C23.7959 18.7656 23.6878 18.4714 23.4854 18.2463C23.283 18.0213 23.0017 17.8826 22.6999 17.8591Z" fill="#6440FB"/>
									<path d="M25.7657 48.417H25.7881C26.0922 48.4036 26.3795 48.2741 26.5909 48.0552C26.8023 47.8362 26.9215 47.5446 26.9241 47.2403C26.9234 46.9339 26.8015 46.6402 26.5849 46.4235C26.3683 46.2067 26.0747 46.0845 25.7682 46.0835H25.7172C25.4115 46.098 25.1234 46.2311 24.9143 46.4546C24.7052 46.678 24.5915 46.9742 24.5974 47.2801C24.6174 47.5804 24.7478 47.8626 24.9635 48.0725C25.1792 48.2824 25.465 48.4051 25.7657 48.417Z" fill="#6440FB"/>
								</g>
								<defs>
									<clipPath id="clip0_129_52">
										<rect width="54" height="54" fill="white" transform="translate(0 0.939941)"/>
									</clipPath>
								</defs>
							</svg>
							<figcaption>
								<h5>3</h5>
							</figcaption>
						</figure>
						<div className="how-work-circle-text">
							<h5>Get Socialised</h5>
						</div>
						<div className="arrow-outer-wr">
							<div className="arrow">
						      	<div className="curve"></div>
						      	<div className="point">
						      		<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						      			<path d="M0.256419 8.39968C0.448115 8.2526 0.639261 8.10513 0.831672 7.95937C2.01455 7.06535 3.19655 6.17727 4.37354 5.27994C4.45957 5.20438 4.52178 5.10545 4.5526 4.99518C5.01806 3.4616 5.4804 1.92584 5.93963 0.387883C5.95358 0.341047 5.97271 0.296197 6.00297 0.213206L8.13762 7.79986L0.27104 8.43618L0.256419 8.39968Z" fill="#6440FB"></path>
						      		</svg>
						      	</div>
						    </div>
						</div>
					</div>
					</SwiperSlide>
					<SwiperSlide>
					<div className="how-we-work-circle">
						<figure>
							<svg width="59" height="60" viewBox="0 0 59 60" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_129_63)">
									<path d="M58.9923 10.6361C58.945 10.4456 58.9008 10.252 58.8582 10.0585C58.7695 9.62502 58.6576 9.19665 58.5229 8.77521C57.0309 4.39807 53.9997 1.80561 49.5054 1.06644L49.481 0.939941H9.42277L9.39229 1.05577H9.32826C3.84949 1.99155 0.0151277 6.52263 0.00293571 12.0748C0.00293571 12.9324 0.00293571 13.7899 0.00293571 14.6475C0.00293571 15.6717 0.00293571 16.6958 0.00293571 17.72C-0.00198621 18.7369 0.134957 19.7495 0.409831 20.7285C1.0444 23.047 2.42339 25.0926 4.33446 26.5505C6.24553 28.0084 8.58277 28.7977 10.9864 28.797C12.9523 28.8061 15.0341 28.8107 17.3521 28.8107C20.5906 28.8107 23.8825 28.8016 27.0737 28.7939C27.133 28.7916 27.1923 28.7962 27.2505 28.8077C27.2618 28.8643 27.2664 28.9221 27.2642 28.9799C27.252 31.2889 27.252 33.6359 27.252 35.9053C27.252 37.0016 27.252 38.0974 27.252 39.1927C27.1094 38.8898 27.0069 38.5696 26.9472 38.2402C26.8754 37.7977 26.7372 37.3687 26.5373 36.9676C26.223 36.3786 25.7557 35.8854 25.1847 35.5396C24.6138 35.1939 23.9601 35.0085 23.2927 35.003C23.0044 35.0028 22.7173 35.0381 22.4377 35.1082C20.5952 35.5654 19.411 37.1123 19.4933 38.955C19.667 42.8048 21.1575 46.1928 23.9251 49.0245C24.7724 49.8917 25.6442 50.762 26.4854 51.6048L27.4638 52.5848C28.6129 53.737 29.1814 55.0233 29.2012 56.5336C29.2286 58.6338 30.556 59.9384 32.6637 59.9399H43.8392C45.9819 59.9399 47.32 58.5972 47.3352 56.4346V55.6725C47.3352 54.6316 47.3474 53.5541 47.3627 52.4948C47.3627 51.436 47.6112 50.392 48.0881 49.4467C48.7592 48.1192 49.143 46.6651 49.2143 45.1793C49.3667 42.2378 49.3118 39.2704 49.2524 36.7207C49.2376 35.7466 48.8406 34.8174 48.1469 34.1334C47.4533 33.4494 46.5187 33.0655 45.5445 33.0644C44.8803 33.0664 44.2291 33.2492 43.6609 33.5933L43.6365 33.607L43.6014 33.5689C42.7541 32.5691 41.8397 32.0844 40.8079 32.0844C40.1165 32.105 39.4388 32.2833 38.8267 32.6057L38.7734 32.63C38.7666 32.6225 38.7605 32.6143 38.7551 32.6057C38.3774 32.0798 37.8623 31.668 37.2662 31.4153C36.8234 31.2243 36.3463 31.1257 35.8641 31.1258C35.4669 31.1286 35.0719 31.1865 34.6906 31.298V30.9398C34.6906 30.3302 34.7043 29.748 34.6708 29.1567C34.6556 28.8808 34.6936 28.8366 34.6952 28.8351C34.6967 28.8336 34.7409 28.7894 35 28.7894H35.0168C37.9123 28.8092 40.305 28.8168 42.5255 28.8168C44.5234 28.8168 46.3583 28.8168 48.1353 28.7955C50.5679 28.7693 52.9228 27.9355 54.8299 26.425C56.7369 24.9146 58.088 22.8132 58.6707 20.4512C58.7 20.325 58.7219 20.1973 58.7362 20.0686C58.7682 19.8263 58.7957 19.619 58.9267 19.459L58.9984 19.3736V10.6727L58.9923 10.6361ZM36.9751 35.7361C37.0147 36.4981 37.4902 37.0209 38.1943 37.0575H38.2766C38.9426 37.0575 39.4105 36.6155 39.5278 35.8748C39.6482 35.1051 40.0841 34.6266 40.6632 34.6266H40.7424C41.3993 34.6723 41.8473 35.2362 41.8565 36.0409C41.8565 36.1278 41.8565 36.2162 41.8565 36.3046C41.8565 36.4265 41.8565 36.55 41.8565 36.6719C41.8778 37.469 42.3761 38.0176 43.0955 38.0359H43.1336C43.8133 38.0359 44.3116 37.5543 44.4046 36.8167C44.41 36.7747 44.413 36.7325 44.4137 36.6902C44.4122 36.6612 44.4122 36.6322 44.4137 36.6033C44.4521 36.341 44.5801 36.1 44.7759 35.9214C44.9718 35.7428 45.2234 35.6374 45.4881 35.6233H45.5339C45.7906 35.628 46.0388 35.7162 46.241 35.8746C46.4431 36.033 46.5881 36.253 46.654 36.5012C46.6899 36.6226 46.7104 36.7481 46.715 36.8746C46.715 37.789 46.715 38.7202 46.7226 39.6179C46.7363 41.3874 46.75 43.2178 46.6662 45.0132C46.6057 46.2433 46.2787 47.4456 45.7076 48.5368C45.1443 49.6477 44.8435 50.873 44.8283 52.1184C44.7978 53.1487 44.7902 54.1957 44.7825 55.2077C44.7825 55.6055 44.7825 56.0017 44.7719 56.3995C44.7627 57.2073 44.5768 57.3917 43.7752 57.3932H32.6591C31.9749 57.3932 31.7539 57.1859 31.7447 56.5428C31.7371 54.3832 30.9294 52.475 29.346 50.8717C28.7293 50.2468 28.1105 49.6245 27.4898 49.0047C26.9157 48.4286 26.3422 47.8515 25.7692 47.2733C23.4725 44.9522 22.2182 42.1509 22.0369 38.9489C21.9973 38.2219 22.4407 37.661 23.1174 37.5863C23.1746 37.5804 23.2321 37.5773 23.2896 37.5772C23.887 37.5772 24.2833 37.9552 24.4052 38.644C24.7679 40.6863 25.8758 42.2012 27.7016 43.1462C27.9741 43.2987 28.2794 43.3834 28.5916 43.3931C29.1753 43.3931 29.8001 42.9922 29.8016 41.869C29.8016 39.4173 29.8016 36.966 29.8016 34.5153V29.2313C29.8016 26.6557 29.8016 24.081 29.8016 21.5073C29.8016 21.0196 29.887 20.7255 30.0973 20.4908C30.3716 20.186 30.6337 20.0427 30.9263 20.0427C31.0054 20.0429 31.0842 20.0526 31.161 20.0717C31.6746 20.1951 31.9718 20.4893 32.0754 20.9724C32.1159 21.2146 32.1333 21.46 32.1273 21.7055C32.1273 24.6195 32.1273 27.533 32.1273 30.446V34.4086C32.1219 34.5928 32.1285 34.7771 32.1471 34.9604C32.1739 35.266 32.3137 35.5508 32.5391 35.759C32.7645 35.9672 33.0594 36.084 33.3663 36.0866C33.6527 36.1023 33.9355 36.0165 34.1649 35.8442C34.3943 35.6719 34.5557 35.4242 34.6205 35.1448C34.6525 35.0243 34.6749 34.9015 34.6876 34.7775C34.6876 34.7378 34.6982 34.6982 34.7043 34.6586C34.736 34.3854 34.868 34.1338 35.0747 33.9525C35.2814 33.7711 35.548 33.673 35.823 33.6771H35.8534C36.1328 33.6878 36.3989 33.7993 36.6025 33.9909C36.8062 34.1825 36.9336 34.4413 36.9614 34.7195C36.9758 34.9041 36.9809 35.0892 36.9766 35.2743C36.969 35.4282 36.9614 35.5822 36.9751 35.7361ZM34.6891 26.2426C34.677 26.1804 34.6724 26.117 34.6754 26.0537C34.6937 24.6317 34.6952 23.1 34.6754 21.3717C34.6586 19.5428 33.5293 18.0263 31.8621 17.6072C31.5745 17.5351 31.2792 17.4982 30.9827 17.4975C30.0126 17.5003 29.0817 17.8803 28.3868 18.5573C27.6919 19.2343 27.2877 20.1551 27.2596 21.1248C27.2246 22.7723 27.2383 24.4153 27.2596 26.0933C27.261 26.1443 27.258 26.1952 27.2505 26.2457C27.2001 26.2541 27.1491 26.2576 27.0981 26.2564C25.9469 26.2564 24.7968 26.2564 23.6477 26.2564H17.3993C14.7964 26.2564 12.8106 26.2564 10.9605 26.2396C6.27264 26.2122 2.57848 22.4965 2.548 17.781C2.53886 16.2066 2.548 14.6048 2.548 13.0563V12.1419C2.55715 7.21761 6.26504 3.50039 11.1738 3.49581C13.5878 3.49581 16.0029 3.49581 18.4189 3.49581H29.5273H40.5412H47.8823C52.0489 3.49581 55.4231 6.25439 56.278 10.3465C56.386 10.8654 56.4407 11.394 56.4411 11.924C56.4411 12.6352 56.4411 13.3464 56.4411 14.0577C56.4411 15.2769 56.4411 16.5541 56.4411 17.8008C56.4435 18.909 56.2274 20.0068 55.8052 21.0315C55.383 22.0561 54.7629 22.9874 53.9804 23.7722C53.1979 24.557 52.2685 25.1798 51.2451 25.605C50.2218 26.0302 49.1246 26.2495 48.0165 26.2503C46.5885 26.2594 45.0584 26.264 43.0528 26.264H38.176C37.0686 26.264 35.9581 26.264 34.8446 26.264C34.791 26.2639 34.7377 26.2567 34.6861 26.2426H34.6891Z" fill="#6440FB"/>
									<path d="M14.9595 12.7362C13.9811 12.0519 12.9783 11.3646 12.0121 10.697C11.3263 10.2246 10.64 9.75108 9.95318 9.27658C9.49821 8.93895 8.94985 8.75048 8.38346 8.73706C7.98039 8.7411 7.58418 8.84198 7.22826 9.03121C6.31386 9.50215 5.82924 10.3373 5.83229 11.4484C5.83229 12.2409 5.83229 13.0334 5.83229 13.8259V15.8743C5.83229 16.676 5.83229 17.4781 5.83229 18.2808C5.83229 19.3934 6.30932 20.2301 7.22219 20.701C7.58049 20.893 7.98005 20.995 8.38651 20.9982C8.9496 20.9863 9.49521 20.8005 9.94861 20.4663L11.526 19.3766C12.6507 18.6009 13.812 17.7977 14.9549 17.0021C15.755 16.4443 16.1955 15.6853 16.1955 14.8684C16.1955 14.0515 15.7565 13.294 14.9595 12.7362ZM8.39109 15.696V14.0134C8.39109 13.1833 8.39109 12.3527 8.39109 11.5215C8.39109 11.485 8.39109 11.4469 8.39109 11.4088C8.39109 11.3707 8.39109 11.3356 8.39109 11.3082C8.42971 11.3288 8.46642 11.3527 8.50081 11.3798L8.55416 11.4164L10.0903 12.4832C11.215 13.2585 12.3408 14.0337 13.4675 14.809C13.5072 14.8364 13.5361 14.8577 13.5574 14.876L13.4843 14.9309C12.3062 15.7356 11.1145 16.5601 9.96081 17.3588L8.54196 18.3403C8.49505 18.3768 8.44387 18.4075 8.38956 18.4317C8.38956 18.4012 8.38956 18.3555 8.38956 18.3235C8.38956 18.2915 8.39719 18.2275 8.39719 18.1818C8.38957 17.3496 8.39109 16.522 8.39109 15.6899V15.696Z" fill="#6440FB"/>
									<path d="M32.7339 11.005C32.7339 10.7307 32.7339 10.4563 32.7339 10.182C32.7339 9.5556 32.7339 8.90787 32.7339 8.26929C32.7248 7.37618 32.2112 6.77417 31.4568 6.77417H31.4172C30.6552 6.79398 30.1797 7.36551 30.1766 8.26167C30.1766 10.0235 30.1766 11.8448 30.1766 13.6721C30.1766 14.5866 30.6338 15.1368 31.4096 15.1581H31.4538C32.2158 15.1581 32.7232 14.579 32.7339 13.6813C32.7339 13.0564 32.7339 12.4193 32.7339 11.8051C32.7354 11.5415 32.7339 11.2702 32.7339 11.005Z" fill="#6440FB"/>
									<path d="M27.4517 14.6506C26.9437 14.0512 26.4398 13.4527 25.9399 12.8553C25.2287 12.0038 24.5125 11.1534 23.7911 10.304C23.4558 9.90771 23.0641 9.69434 22.6587 9.69434C22.3748 9.69776 22.101 9.80018 21.8846 9.98391C21.7567 10.0827 21.6503 10.2065 21.5717 10.3477C21.4931 10.4889 21.444 10.6446 21.4274 10.8054C21.4175 11.0176 21.4502 11.2297 21.5235 11.4291C21.5968 11.6286 21.7092 11.8114 21.8541 11.9667C22.295 12.492 22.737 13.0168 23.18 13.5411L23.8322 14.3138L24.4586 15.0591C24.8355 15.5072 25.2124 15.9542 25.5894 16.4003C25.7046 16.546 25.8512 16.664 26.0182 16.7455C26.1851 16.827 26.3683 16.87 26.5541 16.8712C26.7273 16.87 26.8988 16.837 27.0601 16.7737C27.2898 16.6879 27.4887 16.5354 27.6312 16.3358C27.7738 16.1362 27.8535 15.8986 27.8602 15.6535V15.6291C27.8485 15.2639 27.7032 14.9157 27.4517 14.6506Z" fill="#6440FB"/>
									<path d="M37.821 15.8026C37.8865 15.7233 37.9521 15.6426 38.0191 15.5633L38.9488 14.4599C39.66 13.6115 40.3757 12.7631 41.096 11.9147C41.5944 11.3249 41.5121 10.7869 41.3552 10.4379C41.1418 9.96387 40.7364 9.71697 40.1649 9.7063H40.1116C39.9325 9.71561 39.7578 9.76428 39.5998 9.84884C39.4417 9.9334 39.3042 10.0518 39.1972 10.1955L38.2904 11.2624C37.3257 12.4054 36.3275 13.5866 35.3552 14.7571C34.8766 15.3332 34.9239 16.0724 35.4695 16.554C35.6935 16.7561 35.9846 16.868 36.2863 16.8679C36.4804 16.8637 36.6715 16.8192 36.8475 16.7374C37.0235 16.6556 37.1806 16.5381 37.3089 16.3924C37.4888 16.2034 37.6579 15.9946 37.821 15.8026Z" fill="#6440FB"/>
									<path d="M39.5172 21.9783H41.1662H42.8426H43.9627C44.8101 21.9783 45.3633 21.4799 45.3724 20.724C45.3782 20.5592 45.3506 20.395 45.2911 20.2412C45.2317 20.0874 45.1416 19.9473 45.0265 19.8293C44.8879 19.6972 44.7247 19.5938 44.546 19.525C44.3674 19.4562 44.1769 19.4234 43.9856 19.4285C43.0712 19.4285 42.1543 19.4285 41.2348 19.4285C40.2909 19.4285 39.3465 19.4285 38.4017 19.4285C37.5756 19.4285 36.9905 19.9512 36.9798 20.692C36.9745 20.8516 37.0014 21.0107 37.059 21.1597C37.1166 21.3087 37.2037 21.4446 37.3151 21.5591C37.4645 21.6996 37.6403 21.809 37.8323 21.8809C38.0243 21.9529 38.2287 21.986 38.4336 21.9783C38.7903 21.9783 39.1545 21.9783 39.5172 21.9783Z" fill="#6440FB"/>
									<path d="M24.5378 19.4269C23.5808 19.4208 22.6237 19.4208 21.6666 19.4269C20.7431 19.4269 19.8195 19.4269 18.896 19.4269C18.7077 19.4197 18.5198 19.451 18.344 19.5189C18.1682 19.5867 18.008 19.6898 17.8734 19.8217C17.7575 19.9444 17.6678 20.0895 17.6096 20.248C17.5515 20.4065 17.5261 20.5751 17.5351 20.7437C17.5549 21.4829 18.0898 21.963 18.896 21.9752H20.0131H21.6895H23.3781C23.7652 21.9752 24.1523 21.9752 24.5394 21.9752C25.3273 21.9676 25.8927 21.4616 25.911 20.7437C25.9173 20.5783 25.8902 20.4132 25.8313 20.2584C25.7724 20.1037 25.6828 19.9624 25.5681 19.843C25.433 19.7082 25.2721 19.6019 25.0952 19.5304C24.9182 19.4589 24.7287 19.4238 24.5378 19.4269Z" fill="#6440FB"/>
								</g>
								<defs>
									<clipPath id="clip0_129_63">
										<rect width="59" height="59" fill="white" transform="translate(0 0.939941)"/>
									</clipPath>
								</defs>
							</svg>
							<figcaption>
								<h5>4</h5>
							</figcaption>
						</figure>
						<div className="how-work-circle-text">
							<h5>Attaching Template</h5>
						</div>
						<div className="arrow-outer-wr">
							<div className="arrow">
						      	<div className="curve"></div>
						      	<div className="point">
						      		<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						      			<path d="M0.256419 8.39968C0.448115 8.2526 0.639261 8.10513 0.831672 7.95937C2.01455 7.06535 3.19655 6.17727 4.37354 5.27994C4.45957 5.20438 4.52178 5.10545 4.5526 4.99518C5.01806 3.4616 5.4804 1.92584 5.93963 0.387883C5.95358 0.341047 5.97271 0.296197 6.00297 0.213206L8.13762 7.79986L0.27104 8.43618L0.256419 8.39968Z" fill="#6440FB"></path>
						      		</svg>
						      	</div>
						    </div>
						</div>
					</div>
							</SwiperSlide>
						</Swiper>
					)
					:
					(
					<>
					<div className="how-we-work-circle circle-special">
						<figure>
							{/* <!-- <img className="img-generic" src="assets/images/Browsing_Template.svg" alt="Browsing Template"> --> */}
							<svg width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_129_71)">
									<path d="M4.80272 51.9399C4.55251 51.9399 4.36044 51.9399 4.18327 51.9318C3.27584 51.8934 2.40297 51.5732 1.68597 51.0158C0.968966 50.4583 0.443459 49.6914 0.182567 48.8216C0.171684 48.7825 0.163558 48.7428 0.158232 48.7026C0.137921 48.5413 0.0840248 48.386 0 48.2469V4.6506C0.0863014 4.52331 0.137194 4.37537 0.147434 4.22193C0.147434 4.19624 0.154173 4.16243 0.156878 4.15161C0.592382 2.68303 1.52155 1.70398 2.99712 1.15766C3.05512 1.13984 3.11434 1.12629 3.17431 1.11709C3.35406 1.09305 3.52707 1.03278 3.68285 0.939941H47.117C47.272 1.03041 47.4487 1.07714 47.6282 1.07517C47.6695 1.07501 47.7107 1.07863 47.7513 1.08599C49.7544 1.6553 50.9973 3.33618 50.9973 5.47144C50.9973 13.2894 50.9973 21.1074 50.9973 28.9254C50.9973 35.0873 50.9973 41.2492 50.9973 47.4111C51.0033 47.8312 50.9551 48.2502 50.8539 48.6579C50.3129 50.6864 48.6169 51.9426 46.411 51.944H4.79866L4.80272 51.9399ZM4.70399 3.16444C3.05935 3.16444 2.22485 3.99339 2.22485 5.6283V47.2664C2.22485 48.8892 3.04718 49.7127 4.67018 49.7127H46.3109C47.946 49.7127 48.7751 48.8784 48.7751 47.2326V41.3827C48.7751 31.3122 48.7751 20.8969 48.7873 10.6547C48.7873 10.3762 48.7589 10.0908 48.552 9.88258C48.345 9.67433 48.0502 9.64729 47.7892 9.64729C42.5144 9.65676 36.7595 9.66081 30.1783 9.66081H19.1973C16.6087 9.66081 14.822 7.98263 14.6449 5.38895C14.5475 3.95824 13.713 3.16985 12.2928 3.1685H4.70399V3.16444ZM46.0607 7.43631C46.7243 7.43631 47.3884 7.43631 48.0529 7.43631C48.1536 7.44493 48.255 7.43256 48.3507 7.39997C48.4464 7.36738 48.5343 7.31529 48.6088 7.24699C48.6714 7.17393 48.7186 7.08892 48.7474 6.9971C48.7762 6.90529 48.7861 6.80858 48.7765 6.71283C48.7657 6.47213 48.7684 6.23277 48.7765 5.97854C48.7846 5.72432 48.7765 5.46062 48.7765 5.19693C48.7636 4.66488 48.5472 4.15802 48.1718 3.78069C47.7964 3.40336 47.2906 3.18426 46.7586 3.1685C45.8808 3.15903 44.9232 3.15498 43.7465 3.15498H41.753H39.7134H39.1169L39.3225 3.70265C39.4922 4.20863 39.5914 4.73556 39.6174 5.2686C39.6255 5.34568 39.6323 5.42411 39.6404 5.50119C39.679 6.02641 39.9168 6.51705 40.3052 6.87274C40.6936 7.22843 41.2033 7.42229 41.73 7.41467C42.7119 7.42278 43.6897 7.42278 44.6 7.42278L46.0607 7.43631ZM27.9372 3.68778C28.1071 4.19504 28.2059 4.7234 28.2307 5.25778C28.2631 6.56949 29.1409 7.42143 30.4664 7.4336H31.8906H34.0546H37.8415L37.6752 6.90621C37.5128 6.35952 37.4139 5.79597 37.3803 5.22668C37.2748 3.93795 36.4241 3.16715 35.1041 3.16444H27.7817L27.9372 3.68778ZM17.1794 3.15633C17.0854 3.15412 16.992 3.17177 16.9053 3.20812C16.8186 3.24447 16.7406 3.29871 16.6763 3.36729L16.5032 3.54579L16.5843 3.78109C16.7445 4.29062 16.8377 4.81884 16.8616 5.35244C16.9576 6.64928 17.7989 7.42819 19.1122 7.4336C19.728 7.4336 20.3425 7.4336 20.9556 7.4336H26.4413L26.2953 6.91703C26.1363 6.42376 26.0387 5.91282 26.0045 5.39571C25.9626 4.02179 25.0861 3.16715 23.7201 3.16444H21.218H17.3539H17.3093C17.2741 3.16039 17.2295 3.15633 17.1862 3.15633H17.1794Z" fill="#6440FB"/>
									<path d="M18.1532 27.5663C15.6348 27.5663 13.1043 27.5542 10.6293 27.5298C10.0777 27.5192 9.53412 27.396 9.03196 27.1676C8.5298 26.9392 8.07966 26.6106 7.70921 26.2019C6.9352 25.3788 6.50424 24.2917 6.50415 23.1619C6.5285 20.8225 8.40712 18.8887 10.6969 18.8495C11.5611 18.8346 12.4862 18.8279 13.6088 18.8279C14.3689 18.8279 15.1295 18.8279 15.8905 18.8279C16.6515 18.8279 17.4125 18.8279 18.1735 18.8279H18.5792H20.4349H22.6922C23.7945 18.8279 24.702 18.8279 25.5514 18.8441C26.1276 18.8455 26.6979 18.9614 27.2289 19.1852C27.7599 19.409 28.2412 19.7362 28.6445 20.1477C29.0477 20.5686 29.3629 21.0655 29.5719 21.6095C29.7809 22.1535 29.8795 22.7336 29.8618 23.3161C29.8226 25.5812 27.9358 27.5082 25.7421 27.5339C23.194 27.5542 20.6418 27.5663 18.1532 27.5663ZM13.9916 21.0564C12.9447 21.0564 11.8974 21.0591 10.8497 21.0646C10.2915 21.0638 9.7555 21.2834 9.35836 21.6757C8.96123 22.068 8.73506 22.6011 8.729 23.1592C8.72432 23.441 8.77598 23.7208 8.88096 23.9823C8.98594 24.2437 9.14213 24.4816 9.34034 24.6819C9.53809 24.8844 9.77431 25.0452 10.0351 25.1551C10.296 25.2649 10.5762 25.3215 10.8592 25.3215C13.2035 25.3215 15.551 25.3215 17.9016 25.3215H23.9879H25.5257C25.8198 25.3243 26.111 25.2631 26.3791 25.1421C26.6472 25.0212 26.8858 24.8434 27.0783 24.6211C27.3622 24.3268 27.5512 23.9542 27.6212 23.5514C27.6911 23.1486 27.6386 22.7341 27.4705 22.3614C27.3205 21.9687 27.0521 21.6323 26.7024 21.3988C26.3528 21.1652 25.9392 21.0461 25.5189 21.0578H22.3757H13.9902L13.9916 21.0564Z" fill="#6440FB"/>
									<path d="M12.6593 38.9311H7.84173C6.89498 38.9311 6.6583 38.4726 6.55686 38.1292C6.51315 37.9831 6.50032 37.8295 6.51918 37.6781C6.53804 37.5268 6.58819 37.3811 6.66642 37.2502C6.74186 37.1223 6.8433 37.0116 6.96423 36.9255C7.08515 36.8393 7.22284 36.7794 7.36836 36.7498C7.55679 36.7173 7.74794 36.7032 7.93911 36.7079H20.4511H28.4308C29.3776 36.7079 29.6643 37.0149 29.8103 37.5112C29.8589 37.6651 29.8728 37.8278 29.8511 37.9877C29.8293 38.1476 29.7725 38.3008 29.6846 38.4361C29.5957 38.5688 29.4785 38.6802 29.3415 38.7623C29.2045 38.8443 29.051 38.8951 28.892 38.9108C28.7064 38.9287 28.5199 38.9359 28.3334 38.9324H12.6661L12.6593 38.9311Z" fill="#6440FB"/>
									<path d="M43.4057 29.1756C43.0861 29.1672 42.7822 29.0354 42.5577 28.8078C42.1452 28.4115 41.6772 27.9612 41.258 27.5001C41.1726 27.3927 41.0648 27.3051 40.9422 27.2435C40.8196 27.1818 40.6851 27.1476 40.5479 27.1431C40.3877 27.1474 40.2298 27.1823 40.0826 27.2459C39.5788 27.4447 39.0419 27.5466 38.5002 27.5461C37.7129 27.5492 36.9397 27.3375 36.2639 26.9338C35.588 26.5302 35.035 25.9498 34.6645 25.2553C33.6353 23.2472 34.2588 20.7414 36.0752 19.55C36.8258 19.0774 37.6957 18.8288 38.5827 18.8333H38.6016C39.2979 18.8419 39.9815 19.0211 40.5924 19.3552C41.2034 19.6893 41.7231 20.168 42.106 20.7495C42.504 21.3224 42.7555 21.9842 42.8382 22.6769C42.921 23.3696 42.8326 24.0719 42.5807 24.7225C42.3738 25.2391 42.4576 25.615 42.862 25.9815C43.2664 26.3479 43.6735 26.7618 44.1307 27.2459C44.5878 27.73 44.6176 28.4034 44.1645 28.8524C44.066 28.9541 43.9481 29.0351 43.8178 29.0906C43.6875 29.1462 43.5474 29.175 43.4057 29.1756ZM38.5016 21.0619C38.2161 21.0639 37.9338 21.1221 37.6709 21.2332C37.4079 21.3444 37.1695 21.5063 36.9692 21.7096C36.7747 21.9049 36.6211 22.1371 36.5175 22.3925C36.4139 22.648 36.3624 22.9215 36.366 23.1971C36.3692 23.7615 36.5961 24.3017 36.9969 24.6991C37.3977 25.0966 37.9398 25.319 38.5043 25.3175C39.0699 25.3197 39.6132 25.0976 40.0153 24.6998C40.4174 24.3021 40.6454 23.7613 40.6493 23.1958C40.652 22.9198 40.5995 22.6461 40.4949 22.3907C40.3904 22.1353 40.236 21.9033 40.0407 21.7083C39.6347 21.2984 39.0826 21.0664 38.5056 21.0632L38.5016 21.0619Z" fill="#6440FB"/>
									<path d="M23.5633 45.4463H7.89595C7.56189 45.4463 7.21973 45.4179 6.94112 45.2137C6.75585 45.0656 6.62081 44.8638 6.55448 44.6361C6.48816 44.4084 6.49378 44.1657 6.57053 43.9412C6.63791 43.7305 6.77163 43.5473 6.95178 43.4188C7.13193 43.2904 7.34881 43.2236 7.57001 43.2286C8.19622 43.2205 8.8684 43.2178 9.75293 43.2178H20.366C21.5066 43.2178 22.6467 43.22 23.7865 43.2245C23.9785 43.2163 24.1696 43.254 24.3442 43.3344C24.5187 43.4149 24.6715 43.5357 24.79 43.687C24.8911 43.8327 24.9553 44.0007 24.9772 44.1766C24.9991 44.3526 24.9781 44.5312 24.9158 44.6972C24.866 44.861 24.7749 45.0092 24.6512 45.1276C24.5276 45.246 24.3756 45.3306 24.2098 45.3733C24.0021 45.4254 23.7881 45.4482 23.5741 45.4409L23.5633 45.4463Z" fill="#6440FB"/>
								</g>
								<defs>
									<clipPath id="clip0_129_71">
										<rect width="51" height="51" fill="white" transform="translate(0 0.939941)"/>
									</clipPath>
								</defs>
							</svg>
							<figcaption>
								<h5>1</h5>
							</figcaption>
						</figure>
						<div className="how-work-circle-text">
							<h5>Browsing Templates</h5>
						</div>
						<div className="arrow-outer-wr">
							<div className="arrow">
						      	<div className="curve"></div>
						      	<div className="point">
						      		<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						      			<path d="M0.256419 8.39968C0.448115 8.2526 0.639261 8.10513 0.831672 7.95937C2.01455 7.06535 3.19655 6.17727 4.37354 5.27994C4.45957 5.20438 4.52178 5.10545 4.5526 4.99518C5.01806 3.4616 5.4804 1.92584 5.93963 0.387883C5.95358 0.341047 5.97271 0.296197 6.00297 0.213206L8.13762 7.79986L0.27104 8.43618L0.256419 8.39968Z" fill="#6440FB"></path>
						      		</svg>
						      	</div>
						    </div>
						</div>
					</div>
					<div className="how-we-work-circle circle-special">
						<figure>
							<svg width="50" height="54" viewBox="0 0 50 54" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_128_40)">
									<path d="M50 27.4252C50 34.9029 50 42.3811 50 49.8596C50 51.8174 48.9624 53.2404 47.1817 53.7645C46.6871 53.8957 46.1747 53.9549 45.6618 53.94C32.3209 53.94 18.9796 53.94 5.63783 53.94C2.25067 53.94 0.00738798 51.7972 0.00615134 48.5469C0.00120476 39.5932 0.00120476 30.6387 0.00615134 21.6835C0.00615134 20.3257 0.00615134 18.968 0.00615134 17.6102C0.0197544 15.139 1.67069 13.5701 4.2528 13.5654C5.27921 13.5654 6.30687 13.5417 7.33205 13.5749C7.78466 13.5903 7.91945 13.4847 7.9145 13.0306C7.88977 10.4123 7.9009 7.79521 7.90337 5.17811C7.90337 2.4709 9.50234 0.942383 12.3268 0.942383C23.4921 0.942383 34.6578 0.942383 45.8238 0.942383C47.8828 0.942383 49.4336 2.06416 49.9048 3.87727C50.0148 4.3018 50.0024 4.73581 50.0024 5.16863C50.0016 12.5863 50.0008 20.0051 50 27.4252ZM47.3746 27.475V5.27654C47.3746 3.81443 47.0036 3.45631 45.5011 3.45631H12.4369C10.8936 3.45631 10.5411 3.79071 10.5411 5.25045C10.5411 19.6747 10.5411 34.0997 10.5411 48.5256C10.5411 49.3213 10.4719 50.1086 10.1021 50.8237C9.84118 51.3277 9.94259 51.4095 10.5016 51.4095C22.201 51.3953 33.9001 51.3917 45.5988 51.3988C46.9986 51.3988 47.3709 51.0348 47.3709 49.6734L47.3746 27.475ZM7.90214 32.7578V26.6188C7.90214 23.2986 7.89224 19.9688 7.91326 16.6438C7.91326 16.1694 7.78218 16.0449 7.29494 16.0627C6.33159 16.0995 5.36701 16.0734 4.40243 16.0746C3.02852 16.0746 2.64764 16.4398 2.64764 17.7596V41.4344C2.64764 43.9531 2.6365 46.4718 2.65752 48.9892C2.6618 49.5649 2.8803 50.1201 3.27367 50.5549C3.66705 50.9897 4.20943 51.2755 4.8031 51.3609C6.18814 51.5494 7.40006 50.8486 7.77971 49.6284C7.88082 49.2466 7.92249 48.8526 7.90337 48.4592L7.90214 32.7578Z" fill="#6440FB"/>
									<path d="M21.0402 19.8525C20.2858 19.8252 19.524 19.9379 18.7759 19.7434C17.0656 19.2999 15.8858 17.9327 15.824 16.2465C15.7894 15.2836 15.7857 14.3183 15.824 13.3554C15.8668 12.4132 16.2806 11.5215 16.982 10.8603C17.6833 10.199 18.62 9.81727 19.6032 9.79206C20.5678 9.76755 21.5324 9.76755 22.4969 9.79206C23.501 9.8155 24.4572 10.2083 25.1675 10.889C25.8779 11.5698 26.2881 12.4864 26.3132 13.4491C26.333 14.3527 26.333 15.2575 26.3132 16.1634C26.293 17.1161 25.896 18.0258 25.2025 18.7083C24.5091 19.3908 23.5712 19.7952 22.5786 19.8395C22.0666 19.8679 21.5534 19.8525 21.0402 19.8525ZM21.0909 12.2929C20.6605 12.2929 20.2252 12.2787 19.7998 12.2929C18.9342 12.3261 18.4482 12.8076 18.4395 13.6424C18.4288 14.4282 18.4288 15.2144 18.4395 16.001C18.4531 16.8311 18.949 17.3244 19.8085 17.3421C20.6494 17.3603 21.4899 17.3603 22.33 17.3421C23.14 17.3267 23.6544 16.8832 23.6903 16.1136C23.7299 15.2516 23.7299 14.3835 23.6903 13.5214C23.6532 12.753 23.1449 12.3238 22.33 12.2929C21.9108 12.2763 21.5002 12.2894 21.0909 12.2894V12.2929Z" fill="#6440FB"/>
									<path d="M15.8155 27.3931C15.8428 26.6294 15.7302 25.8598 15.9639 25.1068C16.1927 24.357 16.6601 23.6945 17.301 23.212C17.9418 22.7296 18.7239 22.4513 19.5378 22.4162C20.542 22.3814 21.547 22.3814 22.5528 22.4162C23.5572 22.4501 24.5091 22.8546 25.21 23.5452C25.9109 24.2359 26.3067 25.1594 26.3147 26.1231C26.3307 27.0077 26.3332 27.8935 26.3147 28.7781C26.2956 29.7519 25.8839 30.6807 25.1658 31.3695C24.4477 32.0582 23.4792 32.4534 22.4637 32.4719C21.5412 32.4909 20.6174 32.4897 19.6949 32.4719C18.6796 32.463 17.7076 32.076 16.9842 31.3928C16.2608 30.7096 15.8427 29.7835 15.818 28.8101C15.7995 28.337 15.8155 27.865 15.8155 27.3931ZM21.0874 24.9136C20.678 24.9136 20.2675 24.9064 19.8581 24.9136C18.948 24.9313 18.4484 25.3997 18.4347 26.2606C18.4236 27.0468 18.4224 27.8318 18.4347 28.618C18.4484 29.4481 18.9381 29.9355 19.8062 29.958C20.6455 29.9794 21.4856 29.9794 22.3265 29.958C23.1439 29.9378 23.6485 29.4955 23.6868 28.7259C23.7276 27.8639 23.7276 26.997 23.6868 26.1338C23.6497 25.3665 23.1352 24.9385 22.3191 24.9159C21.9073 24.9041 21.4967 24.9136 21.0874 24.9136Z" fill="#6440FB"/>
									<path d="M19.7244 43.8179C19.3175 43.8333 19.0096 43.6507 18.735 43.3934C17.8941 42.587 17.0433 41.789 16.2148 40.9708C15.5964 40.3589 15.589 39.6972 16.1591 39.1482C16.7292 38.5991 17.4143 38.6015 18.0611 39.1849C18.5236 39.6023 18.9824 40.0269 19.4065 40.481C19.6625 40.7538 19.8072 40.7419 20.0731 40.481C21.3493 39.23 22.6515 38.0039 23.9388 36.7635C24.3098 36.4077 24.7155 36.1706 25.2509 36.2714C25.4864 36.3063 25.7065 36.405 25.8855 36.5559C26.0645 36.7067 26.1948 36.9034 26.2613 37.1228C26.3445 37.3478 26.3571 37.5913 26.2975 37.8231C26.238 38.055 26.1088 38.265 25.9261 38.4272C25.232 39.0976 24.5366 39.7656 23.8399 40.4312C22.8399 41.3917 21.8394 42.3514 20.8386 43.3104C20.5257 43.6128 20.1906 43.8487 19.7244 43.8179Z" fill="#6440FB"/>
									<path d="M35.4892 26.1787C33.7851 26.1787 32.081 26.1787 30.3782 26.1787C29.4099 26.1787 28.8855 25.7246 28.8843 24.9123C28.883 24.1 29.4062 23.653 30.3794 23.6506C33.8074 23.6435 37.2349 23.6411 40.6621 23.6435C41.7948 23.6435 42.433 24.3751 42.1461 25.2906C41.9531 25.8965 41.5277 26.1752 40.7264 26.1776C38.9778 26.1823 37.2341 26.1787 35.4892 26.1787Z" fill="#6440FB"/>
									<path d="M35.5524 38.7924C33.8722 38.7924 32.192 38.7924 30.5118 38.7924C30.0048 38.7924 29.5225 38.7272 29.2047 38.2896C29.0707 38.1149 28.9854 37.9103 28.9572 37.6951C28.9289 37.48 28.9585 37.2615 29.0432 37.0604C29.1278 36.8593 29.2647 36.6824 29.4408 36.5463C29.6169 36.4103 29.8264 36.3197 30.0493 36.2832C30.2955 36.2559 30.5437 36.248 30.7913 36.2595C34.0494 36.2595 37.3059 36.2595 40.5608 36.2595C41.0257 36.2595 41.466 36.3188 41.79 36.6757C42.1437 37.0682 42.1919 37.5342 42.0225 38.0038C41.9538 38.2232 41.8138 38.4158 41.6229 38.5536C41.4321 38.6914 41.2003 38.7672 40.9614 38.7699C40.3901 38.7971 39.8151 38.7924 39.2425 38.7936C38.0108 38.7947 36.7816 38.7924 35.5524 38.7924Z" fill="#6440FB"/>
									<path d="M35.4892 13.5677C33.7678 13.5677 32.0463 13.5795 30.3249 13.5677C29.2651 13.557 28.6518 12.7056 29.0277 11.8032C29.2664 11.2292 29.7511 11.0466 30.3546 11.0478C31.6865 11.0478 33.0183 11.0478 34.3502 11.0478C36.4612 11.0478 38.5721 11.0419 40.6831 11.0478C41.613 11.0478 42.1336 11.5115 42.1411 12.287C42.1485 13.0625 41.6155 13.5594 40.714 13.5653C38.9728 13.5677 37.2304 13.5677 35.4892 13.5677Z" fill="#6440FB"/>
									<path d="M32.9071 16.0733C33.7468 16.0733 34.5865 16.0602 35.4262 16.0733C36.324 16.0899 36.8607 16.5867 36.8495 17.3587C36.8396 18.1081 36.3227 18.5931 35.4484 18.6026C33.7493 18.62 32.0501 18.62 30.351 18.6026C29.4779 18.5931 28.9635 18.1022 28.9573 17.3516C28.9573 16.5784 29.4866 16.0887 30.3893 16.0733C31.2277 16.0578 32.0674 16.0733 32.9071 16.0733Z" fill="#6440FB"/>
									<path d="M32.9367 28.6915C33.7764 28.6915 34.6161 28.6832 35.4558 28.6915C36.3214 28.7022 36.8569 29.173 36.8866 29.9117C36.9162 30.6719 36.382 31.196 35.4817 31.2078C33.7826 31.2308 32.0834 31.2308 30.3843 31.2078C29.4729 31.1972 28.977 30.7003 28.9993 29.9034C29.0203 29.1505 29.536 28.6987 30.4189 28.688C31.2574 28.6821 32.097 28.6915 32.9367 28.6915Z" fill="#6440FB"/>
									<path d="M32.8726 43.8284C32.0131 43.8284 31.1524 43.8438 30.2929 43.8284C29.4681 43.8094 28.9648 43.3268 28.9574 42.594C28.9487 41.841 29.478 41.3322 30.3251 41.3275C32.044 41.3156 33.7634 41.3156 35.4831 41.3275C36.329 41.3275 36.8595 41.8421 36.8509 42.5951C36.8422 43.3268 36.3389 43.8106 35.5128 43.8296C34.6336 43.845 33.758 43.8284 32.8726 43.8284Z" fill="#6440FB"/>
								</g>
								<defs>
									<clipPath id="clip0_128_40">
										<rect width="50" height="53" fill="white" transform="translate(0 0.939941)"/>
									</clipPath>
								</defs>
							</svg>
							<figcaption>
								<h5>2</h5>
							</figcaption>
						</figure>
						<div className="how-work-circle-text">
							<h5>Adding Details</h5>
						</div>
						<div className="arrow-outer-wr">
							<div className="arrow">
						      	<div className="curve"></div>
						      	<div className="point">
						      		<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						      			<path d="M0.256419 8.39968C0.448115 8.2526 0.639261 8.10513 0.831672 7.95937C2.01455 7.06535 3.19655 6.17727 4.37354 5.27994C4.45957 5.20438 4.52178 5.10545 4.5526 4.99518C5.01806 3.4616 5.4804 1.92584 5.93963 0.387883C5.95358 0.341047 5.97271 0.296197 6.00297 0.213206L8.13762 7.79986L0.27104 8.43618L0.256419 8.39968Z" fill="#6440FB"></path>
						      		</svg>
						      	</div>
						    </div>
						</div>
					</div>
					<div className="how-we-work-circle circle-special">
						<figure>
							<svg width="54" height="55" viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_129_52)">
									<path d="M53.9253 4.42521C53.8706 4.40158 53.8594 4.36551 53.8469 4.24734C53.8429 4.19647 53.8341 4.14609 53.8208 4.09683C53.1987 2.13898 51.6396 0.967262 49.6526 0.959799C46.1003 0.948604 42.8093 0.942383 39.5904 0.942383C36.3716 0.942383 33.1913 0.942382 30.1815 0.96104C27.7614 0.970991 25.9361 2.75345 25.8391 5.20138C25.8254 5.54967 25.7669 5.57454 25.4372 5.57454C21.8015 5.56584 18.243 5.56459 15.2419 5.56459H8.69471C6.70393 5.56459 5.66125 6.61069 5.66125 8.58843V23.9639C5.66125 26.5536 6.44762 27.3634 9.02817 27.4293C9.26209 27.4293 9.26832 27.4728 9.26458 27.6992C9.24841 28.601 9.24841 29.5016 9.26458 30.3797C9.27578 31.09 9.59181 31.5204 10.2027 31.6559C10.2884 31.6756 10.3761 31.6856 10.464 31.6858C10.8983 31.6858 11.2106 31.4246 11.4706 31.1696L12.4959 30.1471C13.281 29.3647 14.0922 28.5562 14.8798 27.7502C14.9772 27.6421 15.0977 27.5573 15.2323 27.5019C15.3669 27.4466 15.5122 27.4222 15.6575 27.4305C19.2894 27.4305 23.1528 27.4392 28.1857 27.4392H35.7059C37.5723 27.4392 38.651 26.3621 38.6573 24.4851C38.6573 24.2798 38.6573 24.0758 38.6573 23.8718C38.6573 23.3133 38.6697 22.7374 38.6411 22.1702C38.6311 21.9899 38.6485 21.8816 38.6958 21.8331C38.7431 21.7846 38.8476 21.761 39.0355 21.761H39.0517C40.974 21.7722 42.8665 21.7734 44.4629 21.7734H49.4473C51.0262 21.7734 52.2891 21.1515 53.2036 19.9337C53.3977 19.6513 53.5541 19.3448 53.669 19.022C53.7546 18.7916 53.8582 18.5682 53.9788 18.354L53.9962 18.3242V4.45506L53.9253 4.42521ZM12.0952 27.2377L11.6087 27.7228C11.6087 27.6184 11.6087 27.5188 11.6087 27.4206C11.6087 27.03 11.6087 26.6929 11.6025 26.3521C11.5764 25.5511 11.1347 25.1157 10.3259 25.0958C10.1169 25.0958 9.90661 25.0958 9.69633 25.0958H9.2285H8.76191H8.59145C8.03776 25.0958 8.01162 25.0672 8.01038 24.5273C8.01038 23.6152 8.01038 22.7005 8.01038 21.7834V8.56729C8.01038 7.9155 8.01038 7.9155 8.66734 7.9155H14.9346C18.2766 7.9155 21.8662 7.9155 25.4733 7.90679C25.645 7.90679 25.7346 7.92297 25.7744 7.96277C25.8142 8.00257 25.8329 8.09711 25.8316 8.25757C25.8142 10.958 25.8117 13.8276 25.8242 17.2856C25.8316 19.4113 27.0336 21.0271 29.0405 21.6092C29.4918 21.7282 29.9576 21.7826 30.4241 21.7709H30.673H32.0342H33.3954C34.4156 21.7709 35.2007 21.7709 35.9386 21.7548H35.9647C36.0679 21.7411 36.1725 21.7649 36.2596 21.8219C36.3044 21.8692 36.3218 21.9712 36.3143 22.1516C36.2944 22.6727 36.2994 23.2014 36.3031 23.7126C36.3031 23.9614 36.3031 24.2102 36.3031 24.4589C36.3031 25.0473 36.2646 25.0809 35.6611 25.0809H26.7026C23.5385 25.0809 19.3691 25.0809 15.1735 25.0684C14.4755 25.0684 13.9641 25.2849 13.5161 25.7675C13.0682 26.2501 12.5979 26.7352 12.0952 27.2352V27.2377ZM28.1708 17.1326C28.1708 13.2865 28.1708 9.44048 28.1708 5.59445C28.1708 4.07195 28.9435 3.29951 30.4652 3.29951H49.3527C50.8769 3.29951 51.6496 4.07071 51.6508 5.59071C51.6508 9.43675 51.6508 13.2832 51.6508 17.1301C51.6508 18.6513 50.8782 19.4238 49.3552 19.425H30.4689C28.9472 19.4213 28.1708 18.6501 28.1708 17.1301V17.1326Z" fill="#6440FB"/>
									<path d="M32.68 37.1874C31.7369 36.8043 31.59 36.308 31.6199 35.3427C31.6672 33.7904 31.656 32.2107 31.6448 30.6832C31.6448 30.2068 31.6386 29.7304 31.6373 29.254C31.6373 28.4542 31.1857 27.938 30.4939 27.938C30.284 27.942 30.0765 27.9841 29.8817 28.0624C29.8145 28.0873 29.7473 28.1159 29.6801 28.1457L29.542 28.2042L26.2485 29.5289C21.6034 31.3988 16.9619 33.2688 12.3242 35.1387C12.0812 35.237 11.8211 35.286 11.559 35.283L10.1393 35.2756C9.51474 35.2706 8.89014 35.2677 8.26553 35.2669C7.39456 35.2669 6.67041 35.2743 5.99355 35.2917C5.07007 35.3125 4.16331 35.5422 3.34138 35.9636C2.51946 36.385 1.80374 36.9871 1.24802 37.7247C0.687884 38.4651 0.302843 39.3226 0.121822 40.2331C-0.0591986 41.1435 -0.0314952 42.0831 0.202853 42.9813C0.910825 45.7327 3.37567 47.5836 6.33571 47.5836C6.52359 47.5836 6.62188 47.6035 6.66792 47.6495C6.72373 47.7425 6.74531 47.8521 6.7289 47.9593C6.71521 48.7827 6.71769 49.6173 6.71894 50.4259C6.71894 51.2854 6.71894 52.1747 6.7065 53.0479C6.6953 53.6823 6.73761 54.4013 7.39456 54.9137L7.42816 54.9398H12.43L12.4524 54.9311C13.087 54.6724 13.3794 54.1923 13.3707 53.4211C13.3557 52.1374 13.3582 50.8799 13.3607 49.5489C13.3607 49.0875 13.3607 48.6247 13.3607 48.1583L14.7057 48.6994L18.1734 50.0937L20.5922 51.0652C23.5684 52.2601 26.5442 53.4572 29.5196 54.6562C29.5676 54.6748 29.6166 54.6906 29.6665 54.7035C29.8058 54.7421 29.8867 54.7682 29.929 54.8652L29.9613 54.9398H30.6954L30.7166 54.9324C31.3586 54.6948 31.6535 54.2196 31.646 53.4397C31.6323 52.1474 31.6336 50.8338 31.6336 49.5626C31.6336 48.5675 31.6336 47.5314 31.6336 46.5151C31.6336 46.2116 31.6784 46.1022 31.972 46.0176C32.8853 45.7304 33.6906 45.1747 34.2831 44.4229C34.8755 43.6711 35.2274 42.7582 35.2929 41.8034C35.4584 39.7796 34.3821 37.8852 32.68 37.1874ZM31.656 43.5945V39.2783C32.3764 39.6005 32.9152 40.4065 32.9624 41.2623C32.9965 41.7367 32.8904 42.2108 32.6573 42.6254C32.4241 43.0401 32.0742 43.3771 31.651 43.5945H31.656ZM13.352 45.2613C13.3731 42.6193 13.3657 39.9537 13.3594 37.6016C13.3594 37.3429 13.3831 37.2284 13.6319 37.1277C16.4589 36.0082 19.3293 34.8477 22.104 33.7294L24.5489 32.7455C24.5618 32.74 24.5751 32.7355 24.5887 32.7318V40.8518C24.5887 41.0496 24.5887 41.2474 24.5887 41.4439C24.5887 41.9228 24.58 42.4166 24.6024 42.903C24.6323 43.5535 24.9906 43.9901 25.5866 44.1008C25.649 44.1122 25.7123 44.118 25.7757 44.1182C25.9996 44.1142 26.2177 44.047 26.4051 43.9244C26.5924 43.8018 26.7413 43.6288 26.8346 43.4254C26.9276 43.1848 26.9642 42.9261 26.9416 42.6691V40.6789C26.9416 37.9063 26.9416 35.0392 26.9304 32.2206C26.9304 31.8636 27.0187 31.7293 27.3298 31.6211C27.8275 31.4469 28.3065 31.2479 28.8117 31.0389L29.2733 30.8486V52.0193L28.1622 51.5715C27.2928 51.2207 26.4265 50.8716 25.563 50.5241L23.607 49.738C20.372 48.4369 17.02 47.0923 13.7215 45.7788C13.4416 45.6693 13.3445 45.5748 13.347 45.2613H13.352ZM2.34543 41.368C2.40018 39.3032 4.0289 37.6986 6.13664 37.6364C6.63434 37.6202 7.1905 37.614 7.86986 37.614H8.95235H10.0348H10.81C10.922 37.614 10.9643 37.6327 10.9805 37.6489C11.0102 37.7125 11.0218 37.7831 11.0141 37.8528C11.0053 38.7236 11.0066 39.6191 11.0141 40.4799C11.0141 40.7933 11.0141 42.2064 11.0141 42.2064C11.0141 43.1318 11.0141 44.0577 11.0141 44.9839C11.0141 45.0113 11.0141 45.0387 11.0141 45.066C11.0216 45.1169 11.0174 45.1688 11.0016 45.2178C11.0016 45.2178 10.973 45.2414 10.8772 45.2414H10.3795C9.98258 45.2414 9.58318 45.2414 9.18503 45.2489C8.78687 45.2563 8.39119 45.2576 7.99428 45.2576C7.15815 45.2576 6.51612 45.2389 5.90893 45.1991C4.93378 45.1477 4.01683 44.7192 3.35186 44.0043C2.68689 43.2894 2.32599 42.344 2.34543 41.368ZM9.05687 47.7839C9.05687 47.6595 9.07304 47.6234 9.08673 47.6085C9.10041 47.5936 9.12654 47.5836 9.21115 47.5836H9.24101C9.50106 47.5936 9.76608 47.5973 10.0299 47.5973C10.2936 47.5973 10.5574 47.5973 10.8212 47.5836H10.8498C10.8952 47.5783 10.941 47.5879 10.9805 47.611C10.9954 47.6259 11.0116 47.6682 11.0103 47.7864C11.0004 48.3548 11.0016 48.932 11.0029 49.4892C11.0029 49.7081 11.0029 49.9271 11.0029 50.1447C11.0029 50.3624 11.0029 50.5664 11.0029 50.7766C11.0029 51.3078 11.0029 51.8575 11.0103 52.3937C11.0103 52.5081 10.9954 52.5504 10.9817 52.5641C10.9414 52.5884 10.8941 52.5984 10.8473 52.5927H10.8175C10.5425 52.584 10.2725 52.579 10.0149 52.579C9.75737 52.579 9.48861 52.579 9.23728 52.5939H9.20741C9.12156 52.5939 9.09294 52.579 9.08299 52.569C9.05558 52.5136 9.04519 52.4513 9.05313 52.3899C9.06682 50.8301 9.06682 49.279 9.05687 47.7839Z" fill="#6440FB"/>
									<path d="M45.0539 40.2983C44.684 40.2983 44.3144 40.2983 43.9453 40.2983H42.2955H40.5722C40.1956 40.2983 39.8177 40.2983 39.4387 40.2983C38.6287 40.3046 38.116 40.7412 38.1024 41.4365C38.0955 41.5864 38.1192 41.7362 38.172 41.8767C38.2249 42.0171 38.3057 42.1454 38.4097 42.2537C38.5478 42.3835 38.7103 42.4845 38.8878 42.5509C39.0653 42.6173 39.2543 42.6478 39.4436 42.6405C40.454 42.6405 41.3872 42.6505 42.2967 42.6505C43.2473 42.6505 44.1767 42.6505 45.0564 42.6405C45.849 42.6343 46.3604 42.1716 46.3604 41.4614C46.3604 40.7511 45.8602 40.307 45.0539 40.2983Z" fill="#6440FB"/>
									<path d="M38.5503 46.5923L38.4085 46.453C38.2878 46.3304 38.1427 46.2346 37.9826 46.1716C37.8225 46.1086 37.6509 46.0799 37.479 46.0873C37.4504 46.0873 37.4205 46.0873 37.3845 46.0873C37.1902 46.1089 37.0054 46.1824 36.8495 46.3002C36.6936 46.418 36.5723 46.5756 36.4985 46.7565C36.3917 46.9772 36.3582 47.2262 36.403 47.4672C36.4478 47.7082 36.5684 47.9286 36.7474 48.0962C37.428 48.794 38.0962 49.4744 38.7867 50.1349C39.0229 50.3781 39.3448 50.5196 39.6838 50.5292C39.8383 50.5272 39.9907 50.4936 40.1317 50.4305C40.2728 50.3674 40.3994 50.2761 40.5038 50.1622C40.9554 49.6871 40.9305 48.9992 40.444 48.4905C39.8269 47.8462 39.1787 47.2143 38.5503 46.5923Z" fill="#6440FB"/>
									<path d="M37.54 36.6875C37.7753 36.688 38.0032 36.6052 38.1833 36.4536C39.0317 35.7423 39.8177 34.9595 40.5324 34.1139C40.8211 33.7756 40.8435 33.3303 40.5934 32.8912C40.5033 32.7169 40.3672 32.5705 40.1999 32.4678C40.0325 32.3652 39.8403 32.3103 39.644 32.3091C39.3952 32.3091 39.1239 32.3414 38.9149 32.5292C38.095 33.2454 37.3259 34.0176 36.613 34.8404C36.4396 35.059 36.355 35.3349 36.3759 35.6132C36.3969 35.8914 36.522 36.1515 36.7263 36.3417C36.9422 36.5584 37.2341 36.6825 37.54 36.6875Z" fill="#6440FB"/>
									<path d="M35.2531 11.3238C35.2531 11.7243 35.2531 12.1253 35.2531 12.5266C35.2531 13.4396 35.2531 14.3837 35.2531 15.3117C35.2531 16.1351 35.6923 16.6662 36.3604 16.6662C36.646 16.658 36.9244 16.5753 37.1679 16.4262C39.4623 15.1126 41.7716 13.7829 44.0113 12.4756C44.5015 12.1908 44.784 11.7828 44.784 11.3562C44.784 10.9295 44.5152 10.5389 44.0274 10.2541C41.6746 8.88584 39.3553 7.54371 37.1356 6.27372C36.903 6.13257 36.6374 6.05493 36.3654 6.04858C35.7035 6.04858 35.2543 6.58593 35.2456 7.38574C35.2456 8.29874 35.2456 9.22791 35.2456 10.1222C35.2514 10.5244 35.2539 10.925 35.2531 11.3238ZM37.6171 13.4546V9.26523L41.2478 11.3587L37.6171 13.4546Z" fill="#6440FB"/>
									<path d="M12.4076 14.3177H22.374C22.6151 14.3304 22.8563 14.2944 23.0832 14.212C23.2556 14.1394 23.408 14.0264 23.5273 13.8824C23.6467 13.7384 23.7295 13.5677 23.7688 13.3848C23.8091 13.2038 23.805 13.0157 23.7569 12.8366C23.7088 12.6575 23.6181 12.4926 23.4925 12.3561C23.1715 12.0116 22.746 11.9668 22.3964 11.9668C21.6208 11.9668 20.8452 11.9668 20.0696 11.9668H17.4182H15.9251H14.432C13.717 11.9668 13.0015 11.9689 12.2857 11.973C12.0769 11.9658 11.8693 12.0076 11.6795 12.095C11.4898 12.1825 11.3233 12.3133 11.1932 12.4768C11.0857 12.6227 11.0147 12.7923 10.9864 12.9713C10.958 13.1503 10.973 13.3335 11.0302 13.5055C11.1472 13.8786 11.4769 14.3165 12.4076 14.3177Z" fill="#6440FB"/>
									<path d="M18.5878 20.1963C18.7626 20.2047 18.9373 20.1758 19.1002 20.1114C19.263 20.0471 19.4102 19.9488 19.5321 19.8232C19.8768 19.45 19.9589 19.0196 19.7698 18.5793C19.5657 18.1041 19.1676 17.8516 18.6176 17.8479C18.1647 17.8479 17.711 17.8479 17.2564 17.8479H13.5349C13.1156 17.8479 12.6975 17.8479 12.2782 17.8541C11.4968 17.8616 10.9767 18.338 10.9842 19.0383C10.9917 19.7386 11.5006 20.1913 12.2496 20.1951C13.1878 20.2001 14.1263 20.2021 15.0653 20.2013L18.5878 20.1963Z" fill="#6440FB"/>
									<path d="M22.6999 17.8591H22.6327C22.3295 17.8658 22.0405 17.9894 21.8263 18.204C21.612 18.4187 21.4891 18.7078 21.483 19.011C21.4832 19.3138 21.5993 19.6051 21.8076 19.8251C22.0158 20.0451 22.3004 20.177 22.6028 20.1939H22.6364C22.9351 20.1863 23.2198 20.0661 23.4333 19.8572C23.6468 19.6484 23.7733 19.3665 23.7874 19.0682C23.7959 18.7656 23.6878 18.4714 23.4854 18.2463C23.283 18.0213 23.0017 17.8826 22.6999 17.8591Z" fill="#6440FB"/>
									<path d="M25.7657 48.417H25.7881C26.0922 48.4036 26.3795 48.2741 26.5909 48.0552C26.8023 47.8362 26.9215 47.5446 26.9241 47.2403C26.9234 46.9339 26.8015 46.6402 26.5849 46.4235C26.3683 46.2067 26.0747 46.0845 25.7682 46.0835H25.7172C25.4115 46.098 25.1234 46.2311 24.9143 46.4546C24.7052 46.678 24.5915 46.9742 24.5974 47.2801C24.6174 47.5804 24.7478 47.8626 24.9635 48.0725C25.1792 48.2824 25.465 48.4051 25.7657 48.417Z" fill="#6440FB"/>
								</g>
								<defs>
									<clipPath id="clip0_129_52">
										<rect width="54" height="54" fill="white" transform="translate(0 0.939941)"/>
									</clipPath>
								</defs>
							</svg>
							<figcaption>
								<h5>3</h5>
							</figcaption>
						</figure>
						<div className="how-work-circle-text">
							<h5>Get Socialised</h5>
						</div>
						<div className="arrow-outer-wr">
							<div className="arrow">
						      	<div className="curve"></div>
						      	<div className="point">
						      		<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						      			<path d="M0.256419 8.39968C0.448115 8.2526 0.639261 8.10513 0.831672 7.95937C2.01455 7.06535 3.19655 6.17727 4.37354 5.27994C4.45957 5.20438 4.52178 5.10545 4.5526 4.99518C5.01806 3.4616 5.4804 1.92584 5.93963 0.387883C5.95358 0.341047 5.97271 0.296197 6.00297 0.213206L8.13762 7.79986L0.27104 8.43618L0.256419 8.39968Z" fill="#6440FB"></path>
						      		</svg>
						      	</div>
						    </div>
						</div>
					</div>
					<div className="how-we-work-circle circle-special">
						<figure>
							<svg width="59" height="60" viewBox="0 0 59 60" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_129_63)">
									<path d="M58.9923 10.6361C58.945 10.4456 58.9008 10.252 58.8582 10.0585C58.7695 9.62502 58.6576 9.19665 58.5229 8.77521C57.0309 4.39807 53.9997 1.80561 49.5054 1.06644L49.481 0.939941H9.42277L9.39229 1.05577H9.32826C3.84949 1.99155 0.0151277 6.52263 0.00293571 12.0748C0.00293571 12.9324 0.00293571 13.7899 0.00293571 14.6475C0.00293571 15.6717 0.00293571 16.6958 0.00293571 17.72C-0.00198621 18.7369 0.134957 19.7495 0.409831 20.7285C1.0444 23.047 2.42339 25.0926 4.33446 26.5505C6.24553 28.0084 8.58277 28.7977 10.9864 28.797C12.9523 28.8061 15.0341 28.8107 17.3521 28.8107C20.5906 28.8107 23.8825 28.8016 27.0737 28.7939C27.133 28.7916 27.1923 28.7962 27.2505 28.8077C27.2618 28.8643 27.2664 28.9221 27.2642 28.9799C27.252 31.2889 27.252 33.6359 27.252 35.9053C27.252 37.0016 27.252 38.0974 27.252 39.1927C27.1094 38.8898 27.0069 38.5696 26.9472 38.2402C26.8754 37.7977 26.7372 37.3687 26.5373 36.9676C26.223 36.3786 25.7557 35.8854 25.1847 35.5396C24.6138 35.1939 23.9601 35.0085 23.2927 35.003C23.0044 35.0028 22.7173 35.0381 22.4377 35.1082C20.5952 35.5654 19.411 37.1123 19.4933 38.955C19.667 42.8048 21.1575 46.1928 23.9251 49.0245C24.7724 49.8917 25.6442 50.762 26.4854 51.6048L27.4638 52.5848C28.6129 53.737 29.1814 55.0233 29.2012 56.5336C29.2286 58.6338 30.556 59.9384 32.6637 59.9399H43.8392C45.9819 59.9399 47.32 58.5972 47.3352 56.4346V55.6725C47.3352 54.6316 47.3474 53.5541 47.3627 52.4948C47.3627 51.436 47.6112 50.392 48.0881 49.4467C48.7592 48.1192 49.143 46.6651 49.2143 45.1793C49.3667 42.2378 49.3118 39.2704 49.2524 36.7207C49.2376 35.7466 48.8406 34.8174 48.1469 34.1334C47.4533 33.4494 46.5187 33.0655 45.5445 33.0644C44.8803 33.0664 44.2291 33.2492 43.6609 33.5933L43.6365 33.607L43.6014 33.5689C42.7541 32.5691 41.8397 32.0844 40.8079 32.0844C40.1165 32.105 39.4388 32.2833 38.8267 32.6057L38.7734 32.63C38.7666 32.6225 38.7605 32.6143 38.7551 32.6057C38.3774 32.0798 37.8623 31.668 37.2662 31.4153C36.8234 31.2243 36.3463 31.1257 35.8641 31.1258C35.4669 31.1286 35.0719 31.1865 34.6906 31.298V30.9398C34.6906 30.3302 34.7043 29.748 34.6708 29.1567C34.6556 28.8808 34.6936 28.8366 34.6952 28.8351C34.6967 28.8336 34.7409 28.7894 35 28.7894H35.0168C37.9123 28.8092 40.305 28.8168 42.5255 28.8168C44.5234 28.8168 46.3583 28.8168 48.1353 28.7955C50.5679 28.7693 52.9228 27.9355 54.8299 26.425C56.7369 24.9146 58.088 22.8132 58.6707 20.4512C58.7 20.325 58.7219 20.1973 58.7362 20.0686C58.7682 19.8263 58.7957 19.619 58.9267 19.459L58.9984 19.3736V10.6727L58.9923 10.6361ZM36.9751 35.7361C37.0147 36.4981 37.4902 37.0209 38.1943 37.0575H38.2766C38.9426 37.0575 39.4105 36.6155 39.5278 35.8748C39.6482 35.1051 40.0841 34.6266 40.6632 34.6266H40.7424C41.3993 34.6723 41.8473 35.2362 41.8565 36.0409C41.8565 36.1278 41.8565 36.2162 41.8565 36.3046C41.8565 36.4265 41.8565 36.55 41.8565 36.6719C41.8778 37.469 42.3761 38.0176 43.0955 38.0359H43.1336C43.8133 38.0359 44.3116 37.5543 44.4046 36.8167C44.41 36.7747 44.413 36.7325 44.4137 36.6902C44.4122 36.6612 44.4122 36.6322 44.4137 36.6033C44.4521 36.341 44.5801 36.1 44.7759 35.9214C44.9718 35.7428 45.2234 35.6374 45.4881 35.6233H45.5339C45.7906 35.628 46.0388 35.7162 46.241 35.8746C46.4431 36.033 46.5881 36.253 46.654 36.5012C46.6899 36.6226 46.7104 36.7481 46.715 36.8746C46.715 37.789 46.715 38.7202 46.7226 39.6179C46.7363 41.3874 46.75 43.2178 46.6662 45.0132C46.6057 46.2433 46.2787 47.4456 45.7076 48.5368C45.1443 49.6477 44.8435 50.873 44.8283 52.1184C44.7978 53.1487 44.7902 54.1957 44.7825 55.2077C44.7825 55.6055 44.7825 56.0017 44.7719 56.3995C44.7627 57.2073 44.5768 57.3917 43.7752 57.3932H32.6591C31.9749 57.3932 31.7539 57.1859 31.7447 56.5428C31.7371 54.3832 30.9294 52.475 29.346 50.8717C28.7293 50.2468 28.1105 49.6245 27.4898 49.0047C26.9157 48.4286 26.3422 47.8515 25.7692 47.2733C23.4725 44.9522 22.2182 42.1509 22.0369 38.9489C21.9973 38.2219 22.4407 37.661 23.1174 37.5863C23.1746 37.5804 23.2321 37.5773 23.2896 37.5772C23.887 37.5772 24.2833 37.9552 24.4052 38.644C24.7679 40.6863 25.8758 42.2012 27.7016 43.1462C27.9741 43.2987 28.2794 43.3834 28.5916 43.3931C29.1753 43.3931 29.8001 42.9922 29.8016 41.869C29.8016 39.4173 29.8016 36.966 29.8016 34.5153V29.2313C29.8016 26.6557 29.8016 24.081 29.8016 21.5073C29.8016 21.0196 29.887 20.7255 30.0973 20.4908C30.3716 20.186 30.6337 20.0427 30.9263 20.0427C31.0054 20.0429 31.0842 20.0526 31.161 20.0717C31.6746 20.1951 31.9718 20.4893 32.0754 20.9724C32.1159 21.2146 32.1333 21.46 32.1273 21.7055C32.1273 24.6195 32.1273 27.533 32.1273 30.446V34.4086C32.1219 34.5928 32.1285 34.7771 32.1471 34.9604C32.1739 35.266 32.3137 35.5508 32.5391 35.759C32.7645 35.9672 33.0594 36.084 33.3663 36.0866C33.6527 36.1023 33.9355 36.0165 34.1649 35.8442C34.3943 35.6719 34.5557 35.4242 34.6205 35.1448C34.6525 35.0243 34.6749 34.9015 34.6876 34.7775C34.6876 34.7378 34.6982 34.6982 34.7043 34.6586C34.736 34.3854 34.868 34.1338 35.0747 33.9525C35.2814 33.7711 35.548 33.673 35.823 33.6771H35.8534C36.1328 33.6878 36.3989 33.7993 36.6025 33.9909C36.8062 34.1825 36.9336 34.4413 36.9614 34.7195C36.9758 34.9041 36.9809 35.0892 36.9766 35.2743C36.969 35.4282 36.9614 35.5822 36.9751 35.7361ZM34.6891 26.2426C34.677 26.1804 34.6724 26.117 34.6754 26.0537C34.6937 24.6317 34.6952 23.1 34.6754 21.3717C34.6586 19.5428 33.5293 18.0263 31.8621 17.6072C31.5745 17.5351 31.2792 17.4982 30.9827 17.4975C30.0126 17.5003 29.0817 17.8803 28.3868 18.5573C27.6919 19.2343 27.2877 20.1551 27.2596 21.1248C27.2246 22.7723 27.2383 24.4153 27.2596 26.0933C27.261 26.1443 27.258 26.1952 27.2505 26.2457C27.2001 26.2541 27.1491 26.2576 27.0981 26.2564C25.9469 26.2564 24.7968 26.2564 23.6477 26.2564H17.3993C14.7964 26.2564 12.8106 26.2564 10.9605 26.2396C6.27264 26.2122 2.57848 22.4965 2.548 17.781C2.53886 16.2066 2.548 14.6048 2.548 13.0563V12.1419C2.55715 7.21761 6.26504 3.50039 11.1738 3.49581C13.5878 3.49581 16.0029 3.49581 18.4189 3.49581H29.5273H40.5412H47.8823C52.0489 3.49581 55.4231 6.25439 56.278 10.3465C56.386 10.8654 56.4407 11.394 56.4411 11.924C56.4411 12.6352 56.4411 13.3464 56.4411 14.0577C56.4411 15.2769 56.4411 16.5541 56.4411 17.8008C56.4435 18.909 56.2274 20.0068 55.8052 21.0315C55.383 22.0561 54.7629 22.9874 53.9804 23.7722C53.1979 24.557 52.2685 25.1798 51.2451 25.605C50.2218 26.0302 49.1246 26.2495 48.0165 26.2503C46.5885 26.2594 45.0584 26.264 43.0528 26.264H38.176C37.0686 26.264 35.9581 26.264 34.8446 26.264C34.791 26.2639 34.7377 26.2567 34.6861 26.2426H34.6891Z" fill="#6440FB"/>
									<path d="M14.9595 12.7362C13.9811 12.0519 12.9783 11.3646 12.0121 10.697C11.3263 10.2246 10.64 9.75108 9.95318 9.27658C9.49821 8.93895 8.94985 8.75048 8.38346 8.73706C7.98039 8.7411 7.58418 8.84198 7.22826 9.03121C6.31386 9.50215 5.82924 10.3373 5.83229 11.4484C5.83229 12.2409 5.83229 13.0334 5.83229 13.8259V15.8743C5.83229 16.676 5.83229 17.4781 5.83229 18.2808C5.83229 19.3934 6.30932 20.2301 7.22219 20.701C7.58049 20.893 7.98005 20.995 8.38651 20.9982C8.9496 20.9863 9.49521 20.8005 9.94861 20.4663L11.526 19.3766C12.6507 18.6009 13.812 17.7977 14.9549 17.0021C15.755 16.4443 16.1955 15.6853 16.1955 14.8684C16.1955 14.0515 15.7565 13.294 14.9595 12.7362ZM8.39109 15.696V14.0134C8.39109 13.1833 8.39109 12.3527 8.39109 11.5215C8.39109 11.485 8.39109 11.4469 8.39109 11.4088C8.39109 11.3707 8.39109 11.3356 8.39109 11.3082C8.42971 11.3288 8.46642 11.3527 8.50081 11.3798L8.55416 11.4164L10.0903 12.4832C11.215 13.2585 12.3408 14.0337 13.4675 14.809C13.5072 14.8364 13.5361 14.8577 13.5574 14.876L13.4843 14.9309C12.3062 15.7356 11.1145 16.5601 9.96081 17.3588L8.54196 18.3403C8.49505 18.3768 8.44387 18.4075 8.38956 18.4317C8.38956 18.4012 8.38956 18.3555 8.38956 18.3235C8.38956 18.2915 8.39719 18.2275 8.39719 18.1818C8.38957 17.3496 8.39109 16.522 8.39109 15.6899V15.696Z" fill="#6440FB"/>
									<path d="M32.7339 11.005C32.7339 10.7307 32.7339 10.4563 32.7339 10.182C32.7339 9.5556 32.7339 8.90787 32.7339 8.26929C32.7248 7.37618 32.2112 6.77417 31.4568 6.77417H31.4172C30.6552 6.79398 30.1797 7.36551 30.1766 8.26167C30.1766 10.0235 30.1766 11.8448 30.1766 13.6721C30.1766 14.5866 30.6338 15.1368 31.4096 15.1581H31.4538C32.2158 15.1581 32.7232 14.579 32.7339 13.6813C32.7339 13.0564 32.7339 12.4193 32.7339 11.8051C32.7354 11.5415 32.7339 11.2702 32.7339 11.005Z" fill="#6440FB"/>
									<path d="M27.4517 14.6506C26.9437 14.0512 26.4398 13.4527 25.9399 12.8553C25.2287 12.0038 24.5125 11.1534 23.7911 10.304C23.4558 9.90771 23.0641 9.69434 22.6587 9.69434C22.3748 9.69776 22.101 9.80018 21.8846 9.98391C21.7567 10.0827 21.6503 10.2065 21.5717 10.3477C21.4931 10.4889 21.444 10.6446 21.4274 10.8054C21.4175 11.0176 21.4502 11.2297 21.5235 11.4291C21.5968 11.6286 21.7092 11.8114 21.8541 11.9667C22.295 12.492 22.737 13.0168 23.18 13.5411L23.8322 14.3138L24.4586 15.0591C24.8355 15.5072 25.2124 15.9542 25.5894 16.4003C25.7046 16.546 25.8512 16.664 26.0182 16.7455C26.1851 16.827 26.3683 16.87 26.5541 16.8712C26.7273 16.87 26.8988 16.837 27.0601 16.7737C27.2898 16.6879 27.4887 16.5354 27.6312 16.3358C27.7738 16.1362 27.8535 15.8986 27.8602 15.6535V15.6291C27.8485 15.2639 27.7032 14.9157 27.4517 14.6506Z" fill="#6440FB"/>
									<path d="M37.821 15.8026C37.8865 15.7233 37.9521 15.6426 38.0191 15.5633L38.9488 14.4599C39.66 13.6115 40.3757 12.7631 41.096 11.9147C41.5944 11.3249 41.5121 10.7869 41.3552 10.4379C41.1418 9.96387 40.7364 9.71697 40.1649 9.7063H40.1116C39.9325 9.71561 39.7578 9.76428 39.5998 9.84884C39.4417 9.9334 39.3042 10.0518 39.1972 10.1955L38.2904 11.2624C37.3257 12.4054 36.3275 13.5866 35.3552 14.7571C34.8766 15.3332 34.9239 16.0724 35.4695 16.554C35.6935 16.7561 35.9846 16.868 36.2863 16.8679C36.4804 16.8637 36.6715 16.8192 36.8475 16.7374C37.0235 16.6556 37.1806 16.5381 37.3089 16.3924C37.4888 16.2034 37.6579 15.9946 37.821 15.8026Z" fill="#6440FB"/>
									<path d="M39.5172 21.9783H41.1662H42.8426H43.9627C44.8101 21.9783 45.3633 21.4799 45.3724 20.724C45.3782 20.5592 45.3506 20.395 45.2911 20.2412C45.2317 20.0874 45.1416 19.9473 45.0265 19.8293C44.8879 19.6972 44.7247 19.5938 44.546 19.525C44.3674 19.4562 44.1769 19.4234 43.9856 19.4285C43.0712 19.4285 42.1543 19.4285 41.2348 19.4285C40.2909 19.4285 39.3465 19.4285 38.4017 19.4285C37.5756 19.4285 36.9905 19.9512 36.9798 20.692C36.9745 20.8516 37.0014 21.0107 37.059 21.1597C37.1166 21.3087 37.2037 21.4446 37.3151 21.5591C37.4645 21.6996 37.6403 21.809 37.8323 21.8809C38.0243 21.9529 38.2287 21.986 38.4336 21.9783C38.7903 21.9783 39.1545 21.9783 39.5172 21.9783Z" fill="#6440FB"/>
									<path d="M24.5378 19.4269C23.5808 19.4208 22.6237 19.4208 21.6666 19.4269C20.7431 19.4269 19.8195 19.4269 18.896 19.4269C18.7077 19.4197 18.5198 19.451 18.344 19.5189C18.1682 19.5867 18.008 19.6898 17.8734 19.8217C17.7575 19.9444 17.6678 20.0895 17.6096 20.248C17.5515 20.4065 17.5261 20.5751 17.5351 20.7437C17.5549 21.4829 18.0898 21.963 18.896 21.9752H20.0131H21.6895H23.3781C23.7652 21.9752 24.1523 21.9752 24.5394 21.9752C25.3273 21.9676 25.8927 21.4616 25.911 20.7437C25.9173 20.5783 25.8902 20.4132 25.8313 20.2584C25.7724 20.1037 25.6828 19.9624 25.5681 19.843C25.433 19.7082 25.2721 19.6019 25.0952 19.5304C24.9182 19.4589 24.7287 19.4238 24.5378 19.4269Z" fill="#6440FB"/>
								</g>
								<defs>
									<clipPath id="clip0_129_63">
										<rect width="59" height="59" fill="white" transform="translate(0 0.939941)"/>
									</clipPath>
								</defs>
							</svg>
							<figcaption>
								<h5>4</h5>
							</figcaption>
						</figure>
						<div className="how-work-circle-text">
							<h5>Attaching Template</h5>
						</div>
						<div className="arrow-outer-wr">
							<div className="arrow">
						      	<div className="curve"></div>
						      	<div className="point">
						      		<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						      			<path d="M0.256419 8.39968C0.448115 8.2526 0.639261 8.10513 0.831672 7.95937C2.01455 7.06535 3.19655 6.17727 4.37354 5.27994C4.45957 5.20438 4.52178 5.10545 4.5526 4.99518C5.01806 3.4616 5.4804 1.92584 5.93963 0.387883C5.95358 0.341047 5.97271 0.296197 6.00297 0.213206L8.13762 7.79986L0.27104 8.43618L0.256419 8.39968Z" fill="#6440FB"></path>
						      		</svg>
						      	</div>
						    </div>
						</div>
					</div>
					</>
					)
					}
				</div>
				<div  style={{position:'relative'}}>
					<div className="steps-slider-btn" style={{position:'absolute', bottom:'0px',left:'50%',transform:"translateX(-50%)"}}>
					<div onClick={() => {stepSwiper.slidePrev()}} style={{display:'inline-block',backgroundColor:'#140342', backgroundImage:'url("/assets/images/Slider_Left_Arrow.svg")', backgroundSize:'60%', backgroundPosition:'center', backgroundRepeat:'no-repeat', width:'44px', height:'44px', borderRadius:'50%'}}></div>
					<div onClick={() => {stepSwiper.slideNext()}} style={{display:'inline-block',marginLeft:'25px',backgroundColor:'#140342', backgroundImage:'url("/assets/images/Slider_Right_Arrow.svg")', backgroundSize:'60%', backgroundPosition:'center', backgroundRepeat:'no-repeat', width:'44px', height:'44px', borderRadius:'50%'}}></div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section className="why-choose-wr">
		<div className="center-wr">
			<div className="why-choose-content clearfix">
				<div className="why-choose-heading left">
					<h3>Why choose Email Signature?</h3>
				</div>
				<div className="why-choose-para right">
					<p className='para'>Email Signature software makes you a time saver instead of spending hours manually coding HTML signatures because it has already been thoroughly tested on all popular email clients. We offer our customers access to a bespoke email signature generator via an easy link that they can use to create self-serve company signatures.</p>
				</div>
			</div>
			<div className="why-choose-bottom align-center image-left-cut">
				<div className="why-choose-bottom-heading">
					<h4>We are serving smaller businesses to large organizations around the world.</h4>
				</div>
				<div className="why-choose-bottom-box-blk">
				<div className="partner-slider-btn" style={{position:'absolute', bottom:'0px',left:'50%',transform:"translateX(-50%)", width:'100%'}}>
					<div onClick={() => {partnerSwiper.slidePrev()}} style={{display:'inline-block',backgroundColor:'#140342', backgroundImage:'url("/assets/images/Slider_Left_Arrow.svg")', backgroundSize:'60%', backgroundPosition:'center', backgroundRepeat:'no-repeat', width:'44px', height:'44px', borderRadius:'50%'}}></div>
					<div onClick={() => {partnerSwiper.slideNext()}} style={{display:'inline-block',marginLeft:'25px',backgroundColor:'#140342', backgroundImage:'url("/assets/images/Slider_Right_Arrow.svg")', backgroundSize:'60%', backgroundPosition:'center', backgroundRepeat:'no-repeat', width:'44px', height:'44px', borderRadius:'50%'}}></div>
				</div>
				{ partnerSwiperShow === true ? 
					(
					<Swiper
					    // install Swiper modules
					    spaceBetween={30}
					    slidesPerView={2}
					    loop={true}
					    onSwiper={(swiper) => { setPartnerSwiper(swiper) }}
					    onSlideChange={() => {}}
					    style={{height:'auto'}}
					>
						<SwiperSlide>
							<div className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.conativeitsolutions.com" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/Conative_Logo_White.svg" alt="Conative Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/Conative_Logo_Color.svg" alt="Conative Logo"/>
							</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
						<div className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.intuitionsoftech.com" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/Intuition_Softech_Logo_White.svg" alt="Intuition Softech Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/Intuition_Softech_Logo_Color.svg" alt="Intuition Softech Logo"/>
							</div>
						</div>
						</SwiperSlide>
						<SwiperSlide>
						<div className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.kitmedia.us" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/Kitmedia_Logo_White.svg" alt="Kitmedia Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/Kitmedia_Logo_Color.svg" alt="Kitmedia Logo"/>
							</div>
						</div>
						</SwiperSlide>
						<SwiperSlide>
						<div className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.ittrainingindore.in" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/IT_Training_Logo_White.svg" alt="IT Training Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/IT_Training_Logo_Color.svg" alt="IT Training Logo"/>
							</div>
						</div>
						</SwiperSlide>
						<SwiperSlide>
						<div className="why-choose-bottom-box">
							<a data-tagname="anchor" href="www.conativeitsolutions.com" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/WebTerminal_White.svg" alt="Web Terminal Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/WebTerminal_Colored.svg" alt="Web Terminal Logo"/>
							</div>
						</div>
						</SwiperSlide>
						<SwiperSlide>
						<div className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://piecodes.in/" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/Piecodes_White.svg" alt="Pie Codes Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/Piecodes_Colored.svg" alt="Pie Codes Logo"/>
							</div>
						</div>
						</SwiperSlide>
						<SwiperSlide>
						<div className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.conativeitsolutions.com" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/WDT.svg" alt="Conative Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/Blu.svg" alt="Conative Logo"/>
							</div>
						</div>
						</SwiperSlide>
						<SwiperSlide>
						<div className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.intuitionsoftech.com" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/S_Logo_White.svg" alt="Intuition Softech Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/S_Logo_Colored.svg" alt="Intuition Softech Logo"/>
							</div>
						</div>
						</SwiperSlide>
					</Swiper>
					) 
					:
					(
					<ul>
						<li className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.conativeitsolutions.com" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/Conative_Logo_White.svg" alt="Conative Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/Conative_Logo_Color.svg" alt="Conative Logo"/>
							</div>
						</li>
						<li className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.intuitionsoftech.com" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/Intuition_Softech_Logo_White.svg" alt="Intuition Softech Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/Intuition_Softech_Logo_Color.svg" alt="Intuition Softech Logo"/>
							</div>
						</li>
						<li className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.kitmedia.us" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/Kitmedia_Logo_White.svg" alt="Kitmedia Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/Kitmedia_Logo_Color.svg" alt="Kitmedia Logo"/>
							</div>
						</li>
						<li className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.ittrainingindore.in" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/IT_Training_Logo_White.svg" alt="IT Training Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/IT_Training_Logo_Color.svg" alt="IT Training Logo"/>
							</div>
						</li>
						<li className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.wdt.com" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/WDT.svg" alt="Kitmedia Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/Blu.svg" alt="Kitmedia Logo"/>
							</div>
						</li>
						<li className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.conativeitsolutions.com" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/WebTerminal_White.svg" alt="Web Terminal Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/WebTerminal_Colored.svg" alt="Web Terminal Logo"/>
							</div>
						</li>
						<li className="why-choose-bottom-box">
							<a data-tagname="anchor" href="https://www.piecodes.in" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/Piecodes_White.svg" alt="Piecodes Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/Piecodes_Colored.svg" alt="Piecodes Logo"/>
							</div>
						</li>
						<li className="why-choose-bottom-box">
							<a data-tagname="anchor" href="www.conativeitsolutions.com" target='_blank'>
								<figure>
									<img className="img-generic" src="/assets/images/S_Logo_White.svg" alt="Intuition Softech Logo"/>
								</figure>
							</a>
							<div className="why-choose-box-info">
								<img className="img-generic" src="/assets/images/S_Logo_Colored.svg" alt="Intuition Softech Logo"/>
							</div>
						</li>
					</ul>
					)
					}
				</div>
			</div>
		</div>
	</section>

	<section className="create-signature-wr">
		<div className="center-wr">
			<div className="create-signature-img align-center">
				<figure>
					<img className="img-generic" src="/assets/images/Meeting_Image.png" alt="Create Signature"/>
					
					<figcaption>
						<Link to="/create">
							<div className="create-signature-text">
								<h6>Create Email Signature</h6>
								<img className="img-generic" src="/assets/images/Create_Signature_Arrow.svg" alt="Create Signature Arrow"/>
							</div>
							<div className="create-signature-icon">
								<img className="img-generic" src="/assets/images/Create_Signature_Icon.svg" alt="Create Signature Icon"/>
							</div>
						</Link>
					</figcaption>
				</figure>
				<figure className='createSigAbs-img'>
				<img src="/assets/images/createSigAbs.png" alt="Create Signature"/>
				</figure>
			</div>
		</div>
	</section>
	
	<section className="comn-text-img-wr">
		<div className="center-wr">
			<div className="comn-text-img-content clearfix" id="comn-content-first">
				<div className="comn-img-blk left">
					<figure>
						<img className="img-generic" src="/assets/images/Easily_Accessible_Img_1.svg" alt="Easily Accessible"/>
					</figure>
					<figure>
						<img className="img-generic" src="/assets/images/Easily_Accessible_Img_2.svg" alt="Easily Accessible"/>
					</figure>
					<figure style={{boxShadow:"none"}}>
						<img className="img-generic" src="/assets/images/Easily_Accessible_Img_3.png" alt="Easily Accessible"/>
					</figure>	
				</div>
				<div className="comn-img-blk-mob left">
					<figure>
						<img className="img-generic" alt='accessible' src="/assets/images/Easily_Accessible_Mob.jpg"/>
					</figure>
				</div>
				<div className="comn-text-blk right">
					<div className="comn-text-con">
						<h4>Easily Accessible:</h4>
						<p className='para'>Our Email Signature software is ready to serve you in all types of devices and customers can use it with no hustles. Our mobile-friendly and user-friendly software allow the user to create considerable email signatures at the same time.</p>
					</div>
					<div className="comn-text-btn">
					<Link to="/create" className="site-btn-second">Let's Start</Link>
					</div>
				</div>
			</div>
			<div className="comn-text-img-content clearfix" id="comn-content-second">
				<div className="comn-img-blk left">
					<figure>
						<img className="img-generic" src="/assets/images/Ample_Templates_Img_1.png" alt="Ample Templates"/>
					</figure>
					<figure>
						<img className="img-generic" src="/assets/images/Ample_Templates_Img_2.svg" alt="Ample Templates"/>
					</figure>
					<figure>
						<img className="img-generic" src="/assets/images/Ample_Templates_Img_3.svg" alt="Ample Templates"/>
					</figure>
				</div>
				<div className="comn-img-blk-mob left">
					<figure>
						<img className="img-generic" alt='ample templates' src="/assets/images/Ample_Templates_Mob.jpg"/>
					</figure>
				</div>
				<div className="comn-text-blk right">
					<div className="comn-text-con">
						<h4>Ample Templates:</h4>
						<p className='para'>Creative and innovative templates in Email Signature will overwhelm you. Our unique designs make your emails more appealing and attractive from the receiver's point of view. We serve clients worldwide and aren't limited to a specific field.</p>
					</div>
					<div className="comn-text-btn">
					<Link to="/create" className="site-btn-second">Let's Start</Link>
					</div>
				</div>
			</div>
			<div className="comn-text-img-content clearfix" id="comn-content-third">
				<div className="comn-img-blk left">
					<figure style={{boxShadow:"none"}}>
						<img className="img-generic" src="/assets/images/Easily_Accessible_Img_3.svg" alt="Feasible"/>
					</figure>
					<figure>
						<img className="img-generic" src="/assets/images/Feasible_Img_2.svg" alt="Feasible"/>
					</figure>
					<figure>
						<img className="img-generic" src="/assets/images/Feasible_Img_3.svg" alt="Feasible"/>
					</figure>
				</div>
				<div className="comn-img-blk-mob left">
					<figure>
						<img className="img-generic" alt='feasible' src="/assets/images/Feasible_Mob.jpg"/>
					</figure>
				</div>
				<div className="comn-text-blk right">
					<div className="comn-text-con">
						<h4>Feasible:</h4>
						<p className='para'>In today's fast-paced world, we are delivering a better way to connect with the right audience on different platforms. Moreover, we have come up with products that work on multiple devices and give user-friendly solutions.</p>
					</div>
					<div className="comn-text-btn">
						<Link to="/create" className="site-btn-second">Let's Start</Link>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<section ref={testimonialRef} className="testimonials-wr " id='testimonial-section'>
		<div className="large-center-wr">
			<div className="testimonials-content align-center" >
				<div className="testimonials-heading">
					<h3>Testimonials</h3>
				</div>
				<div className="testimonials-quote-icon">
					<img className="img-generic" src="/assets/images/Testimonials_Quote_Icon.svg" alt="Testimonials Quote Icon"/>
				</div>
				<Swiper
					centeredSlides={true}
					slidesPerView={1}
					pagination={{clickable:true}}
					navigation={false}
					modules={[Navigation, Pagination, Autoplay]}
					autoplay={true}
					loop={true}
				>
							{	loggerData?.layout_data?.testimonials?.length > 0 && loggerData?.layout_data?.testimonials.map(item=>(
								<SwiperSlide key={item.substring(0,12)} style={{height:'auto'}}>
									<div style={{paddingBottom:'35px', height:'auto'}}>
									<p className='para'>
										{item}
									</p>
									</div>
								</SwiperSlide>
								))
							}
							{/* <div className="testimonials-slider">
								{	loggerData?.layout_data?.testimonials.length > 0 && 
									<div id={`slider-content-${testimonialSlide}`} className="testimonials-slider-content">
									<p className='para'>{loggerData?.layout_data?.testimonials[testimonialSlide]}</p>
									</div>
								}
								</div>
								<div className='slider-main'>
								<div onClick={handleSliderLeft}><img src={'/assets/images/Slider_Arrow_Left.svg'}/></div>
								{	loggerData?.layout_data?.testimonials.length > 0 && loggerData?.layout_data?.testimonials.map((item,idx)=>(	
									<div id={`slider-dot-${idx}`} className='slider-dot' ><img src={'/assets/images/dot-small.svg'}/></div>
									)) 
								}
								<div onClick={handleSliderRight}><img src={'/assets/images/Slider_Arrow_Right.svg'}/></div>
							</div> */}
				</Swiper>
			</div>
		</div>
	</section>
	<div className="faq-wr">
		<div className="center-wr">
			<div className="faq-main-content">
				<div className="faq-main-heading align-center">
					<h3>Frequently Asked Questions</h3>
				</div>
				<div className="accordion-outer-con">
					<div className="accordion-blk">
						<div id='Q1' className="accordion-heading" /*onClick={()=>{handleAccrodionClick('Q1')}}*/>
							<h6>{loggerData?.layout_data?.faqs?.Q1?.question}</h6>
						</div>
						<div className="accordion-content">
							<p className='para'>{loggerData?.layout_data?.faqs?.Q1?.answer}</p>
						</div>
					</div>
					<div className="accordion-blk">
						<div id='Q2' className="accordion-heading" /*onClick={()=>{handleAccrodionClick('Q2')}}*/>
							<h6>{loggerData?.layout_data?.faqs?.Q2?.question}</h6>
						</div>
						<div className="accordion-content">
							<p className='para'>{loggerData?.layout_data?.faqs?.Q2?.answer}</p>
						</div>
					</div>
					<div className="accordion-blk">
						<div id='Q3' className="accordion-heading" /*onClick={()=>{handleAccrodionClick('Q3')}}*/>
							<h6>{loggerData?.layout_data?.faqs?.Q3?.question}</h6>
						</div>
						<div className="accordion-content">
							<p className='para'>{loggerData?.layout_data?.faqs?.Q3?.answer}</p>
						</div>
					</div>
					<div className="accordion-blk">
						<div id='Q4' className="accordion-heading" /*onClick={()=>{handleAccrodionClick('Q4')}}*/>
							<h6>{loggerData?.layout_data?.faqs?.Q4?.question}</h6>
						</div>
						<div className="accordion-content">
							<p className='para'>{loggerData?.layout_data?.faqs?.Q4?.answer}</p>
						</div>
					</div>
					<div className="accordion-blk">
						<div id='Q5' className="accordion-heading" /*onClick={()=>{handleAccrodionClick('Q5')}}*/>
							<h6>{loggerData?.layout_data?.faqs?.Q5?.question}</h6>
						</div>
						<div className="accordion-content">
							<p className='para'>{loggerData?.layout_data?.faqs?.Q5?.answer}</p>
							
						</div>
					</div>
					<div className="accordion-blk">
						<div id='Q6' className="accordion-heading" /*onClick={()=>{handleAccrodionClick('Q6')}}*/>
							<h6>{loggerData?.layout_data?.faqs?.Q6?.question}</h6>
						</div>
						<div className="accordion-content">
							<p className='para'>{loggerData?.layout_data?.faqs?.Q6?.answer}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div style={{position:"relative",zIndex:"1000"}}>
		<CustomModal show={showModal} onClose={handleCloseModal}>
			<h2>Hey, this is your Modal!</h2>
			<p>Whatever content you want can go here.</p>
		</CustomModal>
	</div>
	<div className="footer-top">
			<div className="center-wr">
				<div className="footer-top-content clearfix">
					<div className="footer-top-text left">
						<h4>Email Signatures that Fulfill Your Brand and Marketing Strategies</h4>
					</div>
					<div className="footer-top-btn right">
						<Link to="/create" className="site-btn site-btn-white">Create Your eMail Signature</Link>
					</div>
				</div>	
			</div>
		</div>
	<Footer loggerData={loggerData} />
    </>
	</ErrorBoundary>
  )
}

export default Landing
