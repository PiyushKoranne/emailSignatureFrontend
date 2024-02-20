import React, { useContext } from 'react'
import { LoginContext } from '../App';
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Meta from './Meta';

const TermsOfService = () => {
	const {loggerData} = useContext(LoginContext);
	return (
		<>
			<Meta 
				title="Terms Of Service | Email Signature"
				desc=""
				keywords=""
			/>
		<Header loggerData={loggerData} />
		<div style={{paddingBottom:'50px'}}>
			<div className="center-wr">
				<div>
					<div>
						<div>
							<h3 style={{marginTop:'50px', marginBottom:'35px'}}>Website Terms and Conditions of Use</h3>
							<h2>1. Terms</h2>
							<p className="para">By accessing this Website, accessible from emailssignature.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>
							<h2>2. Use License</h2>
							<p className="para">Permission is granted to temporarily download one copy of the materials on Email Signature's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
							<ul className="es-special-list">
								<li className="para">Modify or copy the materials</li>
								<li className="para">Use the materials for any commercial purpose or for any public display</li>
								<li className="para">Attempt to reverse engineer any software contained on Email Signature's Website</li>
								<li className="para">Remove any copyright or other proprietary notations from the materials</li>
								<li className="para">Transferring the materials to another person or "mirror" the materials on any other server</li>
							</ul>
							<br />
							<p className="para">This will let Email Signature to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.</p>
							<h2>3. Disclaimer</h2>
							<p className="para">All the materials on Email Signature's Website are provided "as is". Email Signature makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Email Signature does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>
							<h2>4. Limitations</h2>
							<p className="para">Email Signature or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Email Signature's Website, even if Email Signature or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</p>
							<h2>5. Revisions and Errata</h2>
							<p className="para">The materials appearing on Email Signature's Website may include technical, typographical, or photographic errors. Email Signature will not promise that any of the materials in this Website are accurate, complete, or current. Email Signature may change the materials contained on its Website at any time without notice. Email Signature does not make any commitment to update the materials.</p>
							<h2>6. Links</h2>
							<p className="para">Email Signature has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Email Signature of the site. The use of any linked website is at the user's own risk.</p>
							<h2>7. Site Terms of Use Modifications</h2>
							<p className="para">Email Signature may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</p>
							<h2>8. Your Privacy</h2>
							<p className="para">Please read our Privacy Policy.</p>
							<h2>9. Governing Law</h2>
							<p className="para">Any claim related to Email Signature's Website shall be governed by the laws of in without regards to its conflict of law provisions.</p>
							<hr />
							<p className="para">Also read our <Link to="/privacy-policy"><span>Privacy Policy</span></Link></p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Footer loggerData={loggerData} />
		</>
	)
}

export default TermsOfService