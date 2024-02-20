import { Tabs } from 'antd';
import "./css/success.css";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key); // Yahaan aapko selected tab ka key mil jayega.
}

function MyTabs() {
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab={<div className='tabber-icon' style={{padding:"10px",backgroundColor:'white', borderRadius:'10px',  display:'flex', alignItems:'center', justifyContent:'center'}}><img width={'75%'} src="/assets/images/icons8-gmail.svg" alt="" /></div>} key="1">
      

        <div className='steps-container'>
        <h2>Check Your Emailsignature in Gmail: </h2>


					</div>
					<div className='add-steps'>
						<div className='stages-container'>
						<h3>1. Login to Gmail:</h3>
						<div>

						
						<ul>
							<li>Open your preferred browser and visit Gmail.</li>
							<li>Enter your email ID and password to log in.</li>
						</ul>
						<img className='img-res' src="/assets/images/signInGmail.png" alt="" />
						</div>
						</div>
						<div className='stages-container'>
						<h3>2. Compose a New Email:</h3>
						<div>
						<img src="/assets/images/composeMail.png" alt="" />
						<ul>
							<li>First <strong> Refresh </strong>the page</li>
							<li>On the top left corner, click on the 'Compose' button. This will open a new email window.</li>
						</ul>
						
						</div></div>

						<div className='stages-container'>
						<h3>3.Check Signature:</h3>
						<div>
						<ul>
							<li>As you open the new email window, you'll notice your signature at the bottom of the email body. This is where the email signature from your website should appear.</li>
						</ul>
						<img className='img-res' src="/assets/images/checkSig.png" alt="" />
						</div>
						</div>
						<div className='stages-container'>
						<h3>4.No Signature? Let's Add it:</h3>
						<div>
						{/* <img src="/assets/images/settingGmail.png" alt="" /> */}
						<ul>
							<li>If you don't see your signature, click on the settings gear icon ⚙️ in the top right corner.</li>
							<li>Scroll down and click on "See all settings".</li>
							<li>Go to the 'General' tab and scroll down till you find the 'Signature' section.</li>
							<li>Choose the relevant signature (if you have multiple ones) or add a new one and paste your signature there. Make sure to save changes.</li>
						</ul>
					
						</div>
						<div className='stages-container'>
						<h3>5.Test it Out:</h3>
						<div>
						<ul><li>Now, try composing an email again to ensure that your signature appears correctly.</li></ul>
						<img src="/assets/images/finalMail.png" alt=""  style={{width:"100%"}}/>
						</div>
					</div>
					</div>
					
				</div>
      </TabPane>
      <TabPane tab={<div className='tabber-icon' style={{padding:"10px",backgroundColor:'white', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}><img width={'75%'} src="/assets/images/icons8-outlook.svg" alt="" /></div>} key="2">
      <div className='steps-container'>
        <h2>Check Your Emailsignature in Outlook: </h2>
					</div>
                    <div className='add-steps'>
  <div className='stages-container'>
    <h3>1. Open Outlook:</h3>
    <div>
      <ul>
        <li>Start your Outlook application.</li>
      </ul>
      {/* <img src="/assets/images/openOutlook.png" alt="Open Outlook" /> */}
      <div className='template-img-wr'></div>
    </div>
  </div>

  <div className='stages-container'>
    <h3>2. Go to File:</h3>
    <div>
      {/* <img src="/assets/images/fileOptionOutlook.png" alt="File Option in Outlook" /> */}
      <div className='template-img-wr'></div>
      <ul>
        <li>Click on the 'File' option in the top left corner.</li>
      </ul>
    </div>
  </div>

  <div className='stages-container'>
    <h3>3. Options - Mail - Signatures:</h3>
    <div>
      <ul>
        <li>Select 'Options' from the menu.</li>
        <li>Then, click on 'Mail' from the sidebar and select 'Signatures'.</li>
      </ul>
      {/* <img src="/assets/images/signatureOptionOutlook.png" alt="Signature Option in Outlook" /> */}
      <div className='template-img-wr'></div>
    </div>
  </div>

  <div className='stages-container'>
    <h3>4. Add or Edit Signature:</h3>
    <div>
      <ul>
        <li>Click on 'New' to create a new signature or select an existing one and click 'Edit'.</li>
        <li>Paste your email signature in the edit area.</li>
        <li>After setting it up, click 'OK'.</li>
      </ul>
      {/* <img src="/assets/images/addEditSignatureOutlook.png" alt="Add or Edit Signature in Outlook" /> */}
      <div className='template-img-wr'></div>
    </div>
  </div>

  <div className='stages-container'>
    <h3>5. Test Your Signature:</h3>
    <div>
      <ul>
        <li>Compose a new email in Outlook to see if your new signature appears correctly.</li>
      </ul>
      {/* <img src="/assets/images/testSignatureOutlook.png" alt="Test Signature in Outlook" style={{width:"100%"}} /> */}
      <div className='template-img-wr'></div>
    </div>
  </div>
</div>

      </TabPane>
      <TabPane tab={<div className='tabber-icon' style={{padding:"10px",backgroundColor:'white', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}><img width={'75%'} src="/assets/images/icons8-apple-logo.svg" alt="" /></div>} key="3">
      <div className='steps-container'>
        <h2>Check Your Emailsignature in Apple Mail: </h2>
					</div>
                    <div className='add-steps'>
  <div className='stages-container'>
    <h3>1. Open Apple Mail:</h3>
    <div>
      <ul>
        <li>Start your Apple Mail application.</li>
      </ul>
      {/* <img src="/assets/images/openAppleMail.png" alt="Open Apple Mail" /> */}
      <div className='template-img-wr'></div>
    </div>
  </div>

  <div className='stages-container'>
    <h3>2. Go to Mail - Preferences:</h3>
    <div>
      <ul>
        <li>Click on 'Mail' in the top menu and select 'Preferences'.</li>
      </ul>
      {/* <img src="/assets/images/preferencesAppleMail.png" alt="Preferences in Apple Mail" /> */}
      <div className='template-img-wr'></div>
    </div>
  </div>

  <div className='stages-container'>
    <h3>3. Signatures Tab:</h3>
    <div>
      <ul>
        <li>Select the 'Signatures' tab in the Preferences window.</li>
        <li>Choose an email account from the left side if you have multiple accounts.</li>
      </ul>
      {/* <img src="/assets/images/signaturesTabAppleMail.png" alt="Signatures Tab in Apple Mail" /> */}
      <div className='template-img-wr'></div>
    </div>
  </div>

  <div className='stages-container'>
    <h3>4. Add or Edit Signature:</h3>
    <div>
      <ul>
        <li>Click the '+' button to create a new signature or select an existing one to edit.</li>
        <li>Paste your email signature in the right pane.</li>
        <li>Drag and drop the signature to your preferred email account if needed.</li>
      </ul>
      {/* <img src="/assets/images/addEditSignatureAppleMail.png" alt="Add or Edit Signature in Apple Mail" /> */}
      <div className='template-img-wr'></div>
    </div>
  </div>

  <div className='stages-container'>
    <h3>5. Test Your Signature:</h3>
    <div>
      <ul>
        <li>Compose a new email in Apple Mail to see if your new signature appears correctly.</li>
      </ul>
      {/* <img src="/assets/images/testSignatureAppleMail.png" alt="Test Signature in Apple Mail" style={{width:"100%"}} /> */}
      <div className='template-img-wr'></div>
    </div>
  </div>
</div>

      </TabPane>
    </Tabs>
  );
}

export default MyTabs;