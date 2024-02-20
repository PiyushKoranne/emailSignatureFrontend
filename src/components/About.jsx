import { useState, useContext, useEffect} from 'react'
import Meta from './Meta'
import Header from './Header'
import Footer from './Footer';
import { LoginContext } from '../App';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';


const About = () => {
	const {loggerData} = useContext(LoginContext);
	const [industrySwiper, setIndustrySwiper] = useState(null);
	const [industrySwiperShow, setIndustrySwiperShow] = useState(false);

	function handleSwiper(){
		if(window.screen.width < 980 && window.screen.width >= 768){
			setIndustrySwiperShow(false);
		}
		else if(window.screen.width < 768 && window.screen.width >=650){
			setIndustrySwiperShow(true);
		}
		else if(window.screen.width < 650){
			setIndustrySwiperShow(true);
		} else {
			setIndustrySwiperShow(false);
		}
    }

	useEffect(() => {
		window.addEventListener('resize', handleSwiper, { passive: true });
		return () => {
			window.removeEventListener('resize', handleSwiper);
		};
    }, []);

  return (
	<>
		<Meta 
			title="About Us | Email Signatures"
			desc=""
			keywords=""
		/>

	<Header />
	<section className="about-wr">
		<div className="center-wr" >
			<div className='craft-wr clearfix'>
				<div className='craft-card-blk left'>
					<div className='craft-card'>
						<figure>
							<img src="/assets/images/Centrally_managed.svg" alt="Centrally Managed" />
						</figure>
						<div className='card-content'>
							<h4>Centrally managed email signatures</h4>
							<p>
							Ensure consistent company signatures across all communication platforms.
							</p>
						</div>
					</div>
					<div className='craft-card'>
						<figure>
							<img src="/assets/images/Simple_implementation.svg" alt="Simple Implementation" />
						</figure>
						<div className='card-content'>
							<h4>Simple Implementation</h4>
							<p>
							Effortless IT setup. Users onboard seamlessly without manual signature input.
							</p>
						</div>
					</div>
					<div className='craft-card'>
						<figure>
							<img src="/assets/images/Flexible_customizable.svg" alt="Flexible And Customizable" />
						</figure>
						<div className='card-content'>
							<h4>Flexible & Customizable</h4>
							<p>
								Customize department signatures and replies, empowering flexible user field management.
							</p>
						</div>
					</div>
				</div>
				<div className='craft-content-blk right'>
					<div className='content-holder'>
						<h3>Crafting the Signature of Your Digital Identity</h3>
						<p className='para para-16'>
							Email Signature is an email signature generator with pro features like email tracking and email signature analytics.
						</p>
						<p className='para para-16'>
							We offer a variety of well-designed templates that users can customize to fit their personal or business branding needs. Email Signature supports various email clients and devices, including Gmail, Outlook, and Apple Mail.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section>
		<div className="center-wr" >
			<div className='stats-wr clearfix'>
				<div className='stats-image-blk left'>
					<h3>Some of our <br/>impressive Statistics</h3>
					<div className='stats-card-container'>
						<div className='stat-card'>
							<h4>5+</h4>
							<p>Years</p>
						</div>
						<div className='stat-card'>
							<h4>10+</h4>
							<p>Countries</p>
						</div>
					</div>
				</div>
				<div className='stats-content-blk right'>
					<p>Transform your email communication with our cutting-edge Email Signature App. Boost professionalism by creating sleek and personalized signatures that leave a lasting impression.</p>
					<p>Gain insights into your email interactions with our app's robust statistics feature. Track the performance of your signatures, monitor click-through rates, and understand recipient engagement.</p>
					<p>Our Email Signature App seamlessly integrates with your email client, ensuring effortless adoption.</p>
				</div>
			</div>
		</div>
	</section>
	<section className="industries-assits-wr">
		<div className="center-wr">
			<div className="industries-assits-content align-center">
				<div className="industries-assits-text">
					<h3>Industries we assist</h3>
					<p className='para-16'>We have a team of experts in all fields who are fast and resourceful, boosting individual and business performance and yielding a high return on investment</p>
					<p className='para-16'>We offer the most attractive and future-proof solutions for each industry!</p>
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
	<section>
		<div className='industries-about-wr'>
			<h3>
				Big & Small Business We serve
			</h3>
			<div className='industries-quote-blk'>
				<h3>
					We help you to stand out, express yourself, and be in touch with your audience
				</h3>
				<div className='industries-icon-container'>
					<div className='icon-card'>
						<figure>
							<a><img src="/assets/images/S_Logo_White.svg" alt="" /></a>
						</figure>
						<figure>
							<a><img src="/assets/images/S_Logo_Colored.svg" alt="" /></a>
						</figure>
					</div>
					<div className='icon-card'>
						<figure>
							<a><img src="/assets/images/K_logo_white.svg" alt="" /></a>
						</figure>
						<figure>
							<a><img src="/assets/images/Kitmedia_Logo_Color.svg" alt="" /></a>
						</figure>
					</div>

					<div className='icon-card'>
						<figure>
							<a><img src="/assets/images/Piecodes_White.svg" alt="" /></a>
						</figure>
						<figure>
							<a><img src="/assets/images/Piecodes_Colored.svg" alt="" /></a>
						</figure>
					</div>
					<div className='icon-card'>
						<figure>
							<a><img src="/assets/images/WebTerminal_White.svg" alt="" /></a>
						</figure>
						<figure>
							<a><img src="/assets/images/WebTerminal_Colored.svg" alt="" /></a>
						</figure>
					</div>
					<div className='icon-card'>
						<figure>
							<a><img src="/assets/images/ITT_logo_white.svg" alt="" /></a>
						</figure>
						<figure>
							<a><img src="/assets/images/IT_Training_Logo_Color.svg" alt="" /></a>
						</figure>
					</div>
					<div className='icon-card'>
						<figure>
							<a><img src="/assets/images/S_industry_logo_white.svg" alt="" /></a>
						</figure>
						<figure>
							<a><img src="/assets/images/Intuition_Softech_Logo_Color.svg" alt="" /></a>
						</figure>
					</div>
					<div className='icon-card'>
						<figure>
							<a><img src="/assets/images/Conative_white.svg" alt="" /></a>
						</figure>
						<figure>
							<a><img src="/assets/images/Conative_Logo_Color.svg" alt="" /></a>
						</figure>
					</div>
					<div className='icon-card'>
						<figure>
							<a><img src="/assets/images/WDT.svg" alt="" /></a>
						</figure>
						<figure>
							<a><img src="/assets/images/Blu.svg" alt="" /></a>
						</figure>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section className='comn-text-img-wr choose-about-wr'>
		<div className='center-wr'>
			<div className="comn-text-img-content why-choose-about-wr clearfix">
				<div className="comn-img-blk left">
					<figure>
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
						<h4>Why Choose our Email Templates</h4>
						<p className='para-16' style={{width:"100%"}}>
						Choose our email templates for an unparalleled professional touch to your correspondence. Crafted with precision and creativity, our templates exude sophistication, ensuring your emails stand out. Impress clients, partners, and colleagues with visually stunning layouts that convey your message with impact, reinforcing your brand's credibility and professionalism.
						</p>
						<p className='para-16' style={{width:"100%"}}>
						Opt for our email templates to streamline your communication workflow. Elevate your email game effortlessly and make every communication count.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<Footer loggerData={loggerData} />
	</>
  )
}

export default About