import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../App';
import { AiFillEdit, AiFillDelete, AiOutlineIdcard, AiOutlineCloseSquare, AiOutlineClose } from 'react-icons/ai';
import userServices from '../services/userServices';
import parse from 'html-react-parser';
import ReactPaginate from 'react-paginate';
import { Oval } from 'react-loader-spinner';
import Meta from './Meta';
import Footer from './Footer';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import FallBack from './FallBack';
import Drawer from 'rc-drawer'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import '../drawer.css'
import Header from './Header';
import Swal from 'sweetalert2';
import { Empty } from 'antd';
import { enqueueSnackbar } from 'notistack';

const Drafts = () => {
	const itemsPerPage = 4;
	const navigate = useNavigate();
	const [openDrawer, setOpenDrawer] = useState(false);
	const { loggerData, setLoggerData } = useContext(LoginContext);
	const [drafts, setDrafts] = useState([]);
	const [trigger, setTrigger] = useState(false);
	const [loading, setLoading] = useState(false);
	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = drafts?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(drafts?.length / itemsPerPage);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % drafts?.length;
		setItemOffset(newOffset);
	};

	async function handleLogout() {
		try {
			await userServices.logout(loggerData?.email, loggerData?.access_token);
			setLoggerData(prev => ({...prev, access_token:"", email:"", username:"", user_id:"", isLoggedIn: false }));
			navigate('/');
		} catch (error) {
			console.log('Some error occurred : \n:', error.message);
			setLoggerData(prev => ({...prev, access_token:"", email:"", username:"", user_id:"", isLoggedIn: false }));
			navigate('/');
		}

	}

	console.log("IN DRAFTS, LOGGER DATA => ",loggerData);

	async function fetchDrafts() {
		try {
			setLoading(true);
			const result = await userServices.getDrafts(loggerData?.user_id, loggerData?.access_token, loggerData?.email);
			if (result?.status === 200 && result?.data?.success === true) {
				if(result?.data?.data?.drafts?.length === 0){
					setLoading(false);
					return false;
				} else {
					console.log('*** TOTAL DRAFTS ***', result?.data?.result?.drafts);
					setDrafts(result?.data?.result?.drafts);
					setLoading(false);
					return true;
				}
			}
		} catch (error) {
			console.log(error);
			enqueueSnackbar('Failed to fetch drafts',{
				variant:'customError'
			});
			setLoading(false);
			return true;
		}
	}

	function chooseDraft(draft) {
		console.log('CHOSEN DRAFT VALUES',draft?.values);
		navigate(`/create`,{state:{chosen_draft_data: draft.data, chosen_draft_template_id: draft.template_id, chosen_draft_userData:draft?.values, tabber:'filter-details'}});
	}

	async function deleteDraft(draft) {
		try {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#3085d6',
				confirmButtonText: 'Yes, delete it!'
			  }).then((result) => {
				console.log('SWAL RESULT', result);
				if (result.isConfirmed) {
					userServices.deleteDraft(loggerData?.user_id, loggerData?.access_token, loggerData?.email, draft._id)
					.then(res => {
						if(res.status === 200){
							setTrigger(prev => !prev);
						}
					})
				  
				}
			})
		} catch (error) {
			enqueueSnackbar('Oops! Some error has occurred while processing the request',{
				variant:"customError"
			});
		}
	}

	// useEffect(()=>{
	// 	if(Object.keys(loggerData)?.length === 0 || loggerData?.isLoggedIn === false){
	// 		navigate('/login')
	// 	}
	// })

	useEffect(() => {
		// this effect fetches the drafts only is user logged in.
        if(loggerData?.isLoggedIn === true){
            fetchDrafts().then(val =>{
				// if(!val){
				// 	navigate('/signature-templates');
				// }
			}).catch(err =>{})
        }
	}, [loggerData?.isLoggedIn,trigger])


	return (
		<ErrorBoundary FallbackComponent={<FallBack/>}>
		<>
			<Meta 
				title="Drafts | Email Signatures"
				desc=""
				keywords=""
			/>	
			
			<Header source={'drafts'} />

			<section className="page-banner-wr">
				<div className="center-wr">
					<div className="page-banner-content align-center">
						<div className="page-banner-heading">
							<h1>Your Saved Templates</h1>
						</div>
					</div>
				</div>
				<div className="wave-outer">
					<div className="wave-blk"></div>
					<div className="wave-blk"></div>
					<div className="wave-blk"></div>
					<div className="wave-blk"></div>
				</div>
			</section>

			<section className="signature-template-wr">
				<div>
					<Drawer
						className='drawer-layout'
						open={openDrawer}
						width="100%"
						handler={false}
						level={null}
						autoFocus={false}
						showMask={true}
						maskClosable={true}
						onClose={() => setOpenDrawer(false)}
					>
						<dix className='drawer-layout-close' onClick={()=>{setOpenDrawer(false)}}><AiOutlineClose style={{fontSize:'22px'}}/></dix>
						<div className='drawer-layout-heading'>
							<Link to="/">
								<img className="img-generic" src={loggerData?.layout_data?.logo ? loggerData?.layout_data?.logo : "assets/images/Email_Sign_Logo.svg"} alt="Email Signature Logo"/>
							</Link>
						</div>
						<Link to="/signature-templates" style={{width:'100%'}}><div className='drawer-layout-item'><span><AiOutlineIdcard style={{fontSize:'22px', color:"#9a78ff"}}/></span>Templates</div></Link>
						<div className='drawer-layout-item' onClick={handleLogout}><span><AiOutlineCloseSquare style={{fontSize:'22px', color:"#9a78ff"}}/></span>Logout</div>
					</Drawer>
				</div>
				<div className="center-wr">
					<div className="signature-template-content">
						{
							loading ? (
							<div style={{width:'fit-content', margin:'auto'}}>
							<Oval
								height={80}
								width={80}
								color="#625bf8"
								wrapperStyle={{}}
								wrapperClass=""
								visible={true}
								ariaLabel='oval-loading'
								secondaryColor="#625bf81a"
								strokeWidth={2}
								strokeWidthSecondary={2}

							/>
							</div>
							) : 
							loggerData.isLoggedIn ?
                                drafts?.length > 0 ?
								currentItems?.map(item => (
									<div key={item._id} className="signature-template-blk">
										<div className='draft-content'>
										{
											parse(item.data)
										}
										</div>
										<div className='draft-overlay'>
											<div className='draft-overlay-icon-container'>
												<div className='draft-overlay-icon' onClick={() => { chooseDraft(item) }} ><AiFillEdit/><div>Edit</div></div>
												<div className='draft-overlay-icon' onClick={() => { deleteDraft(item) }} ><AiFillDelete/><div>Delete</div></div>
											</div>
										</div>
									</div>
								
								))
								:
								<Empty
									description={
										<span>
										No Saved Templates. <Link to={"/create"} style={{color:"#625bf8", fontWeight:'500'}}>Create One!</Link>
										</span>
									}
								/>
								:
								<Empty
									description={
										<span>
										Please Login to save your templates. <Link to={"/login"} style={{color:"#625bf8", fontWeight:'500'}}>Login!</Link>
										</span>
									}
								/>
						}
					</div>
				</div>
			</section>

			<section className="pager-wr">
				<div className="center-wr">
					<div className="pager-content">
					{ pageCount > 1 && (
							<ReactPaginate
								className='paginator'
								breakLabel="..."
								nextLabel={'>'}
								onPageChange={handlePageClick}
								activeClassName='active-page'
								pageRangeDisplayed={5}
								pageCount={pageCount}
								previousLabel={'<'}
								renderOnZeroPageCount={null} 	
							/>
						)
					}
					</div>
				</div>
			</section>
			<Footer loggerData={loggerData} />
		</>
		</ErrorBoundary>
	)
}

export default Drafts