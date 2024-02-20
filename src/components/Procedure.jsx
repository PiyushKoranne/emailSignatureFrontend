import React from "react";
import MyTabs from "./SucessTabber";
import Header from "./Header";
import Footer from "./Footer";
import "./css/success.css";


export default function Procedure(){
    return(
<>
<Header/>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div className="center-wr">
        <div className='steps-container'>
  <h1 style={{textAlign:'center', color:'#484848',margin:'10px 0',fontWeight:'500'}}>Crafting the Blueprint: Step-by-Step Procedures</h1>
					</div>
                    <div className='add-steps'>
  <div className='stages-container procedure'>
    <h3>1. Create or Browse Template:</h3>
    <div>
      <ul>
        <li>Dive into our collection, crafting your own or exploring our array of designs.</li>
      </ul>
      <img src="/assets/images/browseProce.png" alt="Open Outlook" />
      {/* {/ <div className='template-img-wr'></div> /} */}
    </div>
  </div>

  <div className='stages-container procedure'>
    <h3>2. Select Template:</h3>
    <div>
      <img src="/assets/images/selectProced.png" alt="File Option in Outlook" />
      {/* {/ <div className='template-img-wr'></div> /} */}
      <ul>
        <li>Pick the one that speaks to your style and resonates with your identity.</li>
      </ul>
    </div>
  </div>

  <div className='stages-container procedure'>
    <h3>3. Add Details</h3>
    <div>
      <ul>
        <li>Input your personal and professional information to make the signature uniquely yours.</li>
      </ul>
      <img src="/assets/images/detailProced.png" alt="Signature Option in Outlook" />
      {/* {/ <div className='template-img-wr'></div> /} */}
    </div>
  </div>

  <div className='stages-container procedure'>
    <h3>4.Copy Signature:</h3>
    <div>
      <ul>
        <li>Once satisfied, copy your signature for manual insertion wherever needed.</li>
      </ul>
      <img src="/assets/images/copyProced.png" alt="Add or Edit Signature in Outlook" />
      {/* {/ <div className='template-img-wr'></div> /} */}
    </div>
  </div>

  <div className='stages-container procedure'>
    <h3>5.Add to Gmail: </h3>
    <div>
      <ul>
        <li>Simplify your workflow by integrating your signature directly into Gmail with just a click.</li>
      </ul>
      <img src="/assets/images/addgmalProced.png" alt="Test Signature in Outlook" style={{width:"100%"}} />
      {/* {/ <div className='template-img-wr'></div> /} */}
    </div>
  </div>
</div>
                <div style={{margin:'50px 0 0'}}>
                <h1 style={{textAlign:'center', color:'#484848',margin:'10px 0',fontWeight:'500'}}>Adding the Signature to different email clients:</h1>
        <MyTabs/>
        </div>
        </div>
        </div>
        <Footer/>
        </>

    )
}
