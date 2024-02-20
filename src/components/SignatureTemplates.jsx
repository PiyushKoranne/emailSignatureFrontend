import { useNavigate, createSearchParams, useLocation, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../App';
import userServices from '../services/userServices';
import ErrorHandler from './ErrorHandler';
import { Oval } from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import Meta from './Meta';
import Footer from './Footer';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import FallBack from './FallBack';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Header from './Header';
import { useSnackbar } from 'notistack';

function SignatureTemplates() {
	const { enqueueSnackbar } = useSnackbar();
	const itemsPerPage = 30;
	const navigate = useNavigate();
	const [imageLoading, setImageLoading] = useState(true);
	const { loggerData } = useContext(LoginContext);
	const [templates, setTemplates] = useState([]);
	const [filteredTemplates, setFilteredTemplates] = useState([]);
	const [err, seterr] = useState(false);
	const [stateCategories, setStateCategories] = useState([]);
	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = filteredTemplates.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(filteredTemplates.length / itemsPerPage);
	const {state} = useLocation();


	const handletemplateCategory = (e) => {
		if(e.target.value === 'All'){
			setFilteredTemplates(templates);
			return;
		} else {
			setFilteredTemplates(templates?.filter(item=>(item.category === e.target.value)));
		}
	};

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % templates.length;
		setItemOffset(newOffset);
	};

	async function fetchTemplates() {
		try {
			const data = await userServices.getTemplates({});
			if (data?.status === 200 && data?.data?.success === true) {
				setTemplates(data?.data?.data);
				if(state?.category){
					setFilteredTemplates(data?.data?.data?.filter(item => item?.category === state?.category));
				} else {
					setFilteredTemplates(data?.data?.data);
				}
				seterr(false);
			} else {
				console.log('Template Null');
			}
		} catch (error) {
			console.log('Some error occurred.', error.message);
			enqueueSnackbar('Failed to get templates', {
				variant: 'customError',
				autoHideDuration:2000
			});
			seterr(true);
		}
	}
	
	async function fetchCategories() {
		try {
			const result = await userServices.getCategories();
			if(result.status === 200) {
				setStateCategories(result?.data?.categories);
			}
		} catch (error) {
			console.log('Some error occurred.',error.message);
		}
	}

	function chooseTemplate(template) {
		navigate("/create", { state:{ template_id:template?._id } });
	}

	const handleScrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
	useEffect(() => {
		handleScrollTop();
	})
	useEffect(() => {
		fetchTemplates();
		fetchCategories();
	}, []);


	return ( 
		<ErrorBoundary FallbackComponent={<FallBack/>}>
		<>
			<Meta 
				title="Templates | Email Signatures"
				desc=""
				keywords=""
			/>
			
			<Header />
			<section className="page-banner-wr">
				<div className="center-wr">
					<div className="page-banner-content align-center">
						<div className="page-banner-heading">
							<h1>Signature Templates</h1>
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
				<div className="center-wr">
					<div className='select-container'>
						<div>
							<h2 style={{ color: '#140342' }}>Choose a template</h2>
						</div>
						<div className="choose-categories">
							<select onChange={handletemplateCategory} value={state?.category} style={{ backgroundColor: '#ECF2FF' }}>
								<option name="choose-template" value="All">All</option>
								{
									stateCategories.length > 0 && 
									stateCategories.map(item=>(
										<option key={item.category} name="choose-template" value={item.category}>{item.category}</option>
									))
								}
							</select>
						</div>
					</div>
					<div className="signature-template-content">

						{templates.length > 0 ?
							currentItems?.map(item => (
								<div className="signature-template-blk" key={item._id} 
									onMouseDown={(e) => {
										if(e.button === 0 || e.button === 1){
											chooseTemplate(item); 
										} 
									} }>
									<div className='signature-template-blk-content' style={{pointerEvents:'none', objectFit:'contain'}}>
										{ imageLoading && <Skeleton width='100%' height='239px' /> }
										<img 
										onLoad={()=>{setImageLoading(false)}} 
										style={{objectFit:'contain'}} 
										alt='template'
										src={process.env.REACT_APP_BACKEND_URL+'/templates/'+item.template_img} /> 
									</div>
								</div>
							))
							:
							err ?
								<ErrorHandler />
								:
								<div style={{ width: 'fit-content', margin: 'auto' }}>
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
	);
}

export default SignatureTemplates
