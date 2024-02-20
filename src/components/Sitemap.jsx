import {useContext} from 'react'
import Meta from './Meta'
import Header from './Header'
import {LoginContext} from "../App"
import Footer from './Footer'
import { Link } from 'react-router-dom'

const Sitemap = () => {
	const {loggerData} = useContext(LoginContext);
	
	return (
	<>
		<Meta 
			title="Privacy Policy | Email Signature"
			desc=""
			keywords=""
		/>
		<Header />
		<div>
			<div className="center-wr">
				<div className='sitemap-wr'>
					<h3>Here's how you find your way</h3>
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about-us">About Us</Link></li>
						<li><Link to="/signature-templates">Signature Templates</Link></li>
						<li><Link to="/create">Create Template</Link></li>
						<li><Link to="/drafts">Saved Templates</Link></li>
						<li><Link to="/procedure/gmail">How to add signature to Gmail ?</Link></li>
						<li><Link to="/procedure/outlook">How to add signature to Outlook ?</Link></li>
						<li><Link to="/procedure/apple">How to add signature to Apple Mail ?</Link></li>
						<li><Link to="/privacy-policy">Privacy Policy</Link></li>
						<li><Link to="/terms-of-service">Terms of Service</Link></li>
						<li><Link to="/sitemap"><span>Sitemap</span><span className='sitemap-pointer'>You Are Here</span></Link></li>
					</ul>
				</div>
			</div>
		</div>
		<Footer loggerData={loggerData}/>
	</>

  )
}

export default Sitemap;

{/* <Route exact path='/' errorElement={<FallBack />} element={<Landing />} />
<Route path='/about-us' element={<About />} />
<Route path='/login' element={<Login />} />
<Route path='/register' element={<Register />} />
<Route path='/create' element={<Create/>} />
<Route path='/success' element={<Success/>} />
<Route path='/get-started' element={<GetStarted />} />
<Route path='/signature-templates' element={<SignatureTemplates />} />
<Route path='/drafts' element={<Drafts/>} />
<Route path="/procedure/gmail" element={<GmailProcedure />} />
<Route path="/procedure/outlook" element={<OutlookProcedure />} />
<Route path="/procedure/apple" element={<AppleProcedure />} />
<Route path='/privacy-policy' element={<PrivacyPolicy />} />
<Route path='/terms-of-service' element={<TermsOfService />} />
<Route path='/finish' element={<FinishPage />} />
<Route path='/sitemap' element={<Sitemap />} /> */}