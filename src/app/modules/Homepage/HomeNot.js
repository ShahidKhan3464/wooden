import React, { Suspense, useState } from "react";
import ButtonMailto  from "./buttonMailto";
import { login } from "../Auth/_redux/authCrud";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as auth from "../Auth/_redux/authRedux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './css/style.css';


function Home(props){

    const [toggleLoginForm, setToggleLoginForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValidation, setEmailValidation] = useState('');
    const [passwordValidation, setPasswordValidation] = useState('');
    const [loading, setLoading] = useState(false);
    
    const responsiveCaruselOne = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    const responsiveCaruselTwo = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    const handlesubmit=()=>{
        setEmailValidation("");
        setPasswordValidation("");
        let flag=true;
        
        if(email===""){
            setEmailValidation("Email can not be blank.");
          flag=false;
        }
        if(password===""){
            setPasswordValidation("Password can not be blank.");
          flag=false;
        }
        
        if(flag){
            setLoading(true)
            login(email, password)
            .then((data) => {
                // console.log("login data", data);
              props.login(data);
              setLoading(false)
            })
            .catch((response) => {
                 console.log("response",response);
                if(response.body){
                    let responseBody = JSON.parse(response.body);
                    if(responseBody.error==="invalid_grant"){
                        setEmailValidation('Login Failed. Email or password is not correct.')
                    }
                    
                  }
                setLoading(false)
            });
        }
    };

    return (
        <Suspense >
            <section className="header homepage">
                <div className="container">
                <nav className="navbar navbar-default navbar-custom">
                    <div className="navbar-header">             
                    <a className="navbar-brand" >WoodenDoor</a>
                    </div>
                    <div className="nav-right">
                        
                    <ul className="nav-right-search">
                    
                        <li className="user-list">
                            <a  className="dropdown-toggle" onClick={()=>{setToggleLoginForm(!toggleLoginForm)}}>
                                <small>Login</small> <i className="far fa-user"></i><span><img src="img/arrow-right.png" alt=""/></span>
                            </a>
                            <div className={`logindropdown-menu ${toggleLoginForm ? 'open' : ''}`} style={{ display: toggleLoginForm ? 'block' : 'none' }}>
                                <h4>Login Here</h4>
                                <form >
                                    <div className="form-group">
                                        <label htmlFor="login-username">Email Address</label>
                                        <input type="text" className={`form-control ${emailValidation!="" ? "is-invalid" : ""}`} placeholder="Enter email" value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}/>
                                        {emailValidation!="" ?  (
                                            <div className="invalid-feedback">{emailValidation}</div>
                                            ) : null}
                                    </div> 
                                    <div className="form-group">
                                        <label htmlFor="login-password">Password</label>
                                        <input type="password" className={`form-control ${passwordValidation!="" ? "is-invalid" : ""}`}  name="password" placeholder="Password" value={password} 
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}/>
                                        {passwordValidation!="" ?  (
                                            <div className="invalid-feedback">{passwordValidation}</div>
                                            ) : null}
                                    </div>
                                        
                                    <div className="form-group">
                                        <div className="login-check">
                                            <div className="remember">
                                            <input id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Remember</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="common-btn blue-btn" name="Login" value="Login" onClick={handlesubmit}>
                                            <span>Login</span>
                                            {loading && <span className="ml-3 spinner spinner-white"></span>}
                                        </button>
                                    </div>
                                    {/* <div className="forgot-pwd">
                                        <a >Forgot Password</a>
                                    </div> */}

                                </form>
                            </div>
                        </li>
                    </ul>
                    </div>
                </nav>   
                </div> 
            </section>
            <section className="banner homepage">
                <div className="banner-img"><img src="img/banner-img.jpg" alt=""/></div>
                <div className="banner-content">
                    <div className="container">
                        <div className="banner-tablecnt">
                            <div className="banner-tablecell">
                                <h2><small>CONNECTING</small>OWNERS to BROKERS to CUSTOMERS</h2>
                                <p>Designed for Owners and Brokers who need Scheduling, Searching, Lead Management, and Analytics for not 1 or 2, but 100's of Short Term Vacation Rental Properties!</p>
                                <button type="button" className="common-btn"><span><ButtonMailto label="Contact Us" mailto="mailto:info@woodendoorpm.com" /><img src="img/arrow-right.png" alt=""/><img src="img/arrow-right-white.png" alt=""/></span></button>
                            </div>
                        </div>
                    </div>
                </div>     
            </section>
            <section className="about-section homepage">
            
                <div className="properties-section">
                    

                    <div className="container">
                        <h4 className="main-heading head-center">Properties</h4>
                        <div className="properties-row">
                        <div className="property-slider owl-carousel owl-theme">
                            <Carousel responsive={responsiveCaruselOne} itemClass="item">
                                <div className="">
                                    <div className="properties-col">
                                    <div className="property-image">
                                        <img src="https://res.cloudinary.com/ddlx05ofh/image/upload/v1613596936/woodendoor/1497731542400%20Sunny.jpg.jpg" alt=""/>
                                        <span>$ 5,000 per/night</span>
                                    </div>
                                    <div className="property-content">
                                        <span className="sale">For Rent</span>
                                        <span className="offer">Hot Offer</span>
                                        <h6>Modern Apartment</h6>
                                        <div className="property-area">
                                            <label>Miami Luxury Condo</label>
                                            <ul className="area-list">
                                            <li><img src="img/icon1.png" alt=""/>4</li>
                                            <li><img src="img/icon2.png" alt=""/>4.5</li>
                                            <li><img src="img/icon3.png" alt=""/>1</li>
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="properties-col">
                                    <div className="property-image">
                                        <img src="https://res.cloudinary.com/ddlx05ofh/image/upload/v1614297154/woodendoor/727906127Mountain%20View.png.png" alt=""/>
                                        <span>$ 5,700 per/night</span>
                                    </div>
                                    <div className="property-content">
                                        <span className="rent">For Rent</span>
                                        <h6>Aspen Getaway</h6>
                                        <div className="property-area">
                                            <label>Alpine Abode</label>
                                            <ul className="area-list">
                                            <li><img src="img/icon1.png" alt=""/>5</li>
                                            <li><img src="img/icon2.png" alt=""/>7</li>
                                            <li><img src="img/icon3.png" alt=""/>2</li>
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="properties-col">
                                    <div className="property-image">
                                        <img src="https://res.cloudinary.com/ddlx05ofh/image/upload/v1613505486/woodendoor/1253678222Blue%20Lagoon.jpg.jpg" alt=""/>
                                        <span>$ 1,500 per/night</span>
                                    </div>
                                    <div className="property-content">
                                        <span className="sale">For Sale</span>
                                        <span className="offer">Hot Offer</span>
                                        <h6>Blue Lagoon</h6>
                                        <div className="property-area">
                                            <label>Miami house rental!</label>
                                            <ul className="area-list">
                                            <li><img src="img/icon1.png" alt=""/>4</li>
                                            <li><img src="img/icon2.png" alt=""/>2</li>
                                            <li><img src="img/icon3.png" alt=""/>1</li>
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="properties-col">
                                    <div className="property-image">
                                        <img src="https://res.cloudinary.com/ddlx05ofh/image/upload/v1613597627/woodendoor/1972267644Bond%20on%20the%20Water.jpg.jpg" alt=""/>
                                        <span>$ 9,000 per/night</span>
                                    </div>
                                    <div className="property-content">
                                        <span className="sale">For Sale</span>
                                        <span className="offer">Hot Offer</span>
                                        <h6>Bond on the Water</h6>
                                        <div className="property-area">
                                            <label>Miami Vegas-inspired</label>
                                            <ul className="area-list">
                                            <li><img src="img/icon1.png" alt=""/>7</li>
                                            <li><img src="img/icon2.png" alt=""/>6</li>
                                            <li><img src="img/icon3.png" alt=""/>2</li>
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                </div>

                            </Carousel>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="about-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 about-left">
                                <h4 className="main-heading">WoodenDoor Property Management</h4>
                                <p> We take Mom and Pops putting 1 or 2 Properties on Airbnb to the next level.  With Wooden Door, Brokers can add 100's of Properties with full Availability Searches visible to both Brokers to Customers.  We provide Agents with full Lead Management capabilities, and a wide array of Broker and Agent Property Performance Analytics.</p>
                                <button type="button" className="common-btn blue-btn"><span><ButtonMailto label="Contact Us" mailto="mailto:info@woodendoorpm.com" /><img src="img/arrow-right-white.png" alt=""/></span></button>
                            </div>
                            <div className="col-md-6 about-right">
                                <span className="aboutimg"><img src="img/image1.jpg" alt=""/></span>
                            </div>
                        </div>
                    </div>


                </div><br/><br/><br/><br/>
                <div className="business-section">
                    <div className="container">
                    <div className="business-section-inner">
                        <img src="img/img1.png" alt=""/>
                        <h4>Let us change the way you run your business</h4>
                    </div>
                    </div>
                </div>
            </section>
            <section className="technology-section homepage">
                <div className="container">
                <div className="real-time-section">
                    <h4 className="main-heading head-center">Custom Real-time metrics and Analytics Dashboard</h4>
                    <div className="graph-slider owl-carousel owl-theme">
                        <Carousel responsive={responsiveCaruselTwo} itemClass="item">
                            <div><img src="img/graph1.png" alt=""/></div>
                            <div><img src="img/graph2.png" alt=""/></div>                
                            <div><img src="img/graph1.png" alt=""/></div>
                            <div><img src="img/graph2.png" alt=""/></div>
                        </Carousel>
                    </div>
                </div>
                </div>
            </section>
            <section className="result-section homepage">
                <div className="container">
                <div className="result-section-in">
                    <div className="result-content">
                        <h4 className="main-heading">Results</h4>
                        <p>Wooden Door prides itself on CUSTOMIZATION!  We want to help you transform your pen and paper business processes into scalable data.  We make what is easy for 1 or 2 Properties easy for the largest of Property Portfolios.</p>
                        <button type="button" className="common-btn"><span><ButtonMailto label="Contact Us" mailto="mailto:info@woodendoorpm.com" /> <img src="img/arrow-right.png" alt=""/><img src="img/arrow-right-white.png" alt=""/></span></button>
                    </div>
                    <div className="result-img">
                        <img src="img/img2.png" alt=""/>
                    </div>
                </div>
                </div>
            </section> 

            <footer className="homepage">
                <div className="footer-top">
                <div className="container">
                    <div className="col-md-12 footer-top-in">
                        <div className="footer-top-left">
                        <a ><img src="img/footer-logo.png" alt=""/></a>
                        <ul className="footer-nav">
                            <li>Short Term</li>
                            <li>Long Term</li>
                            <li>For Sale</li>
                        </ul>
                        </div>
                    </div>
                </div>
                </div>
                <div className="footer-bottom">
                <div className="container">
                    <div className="col-md-12 footer-bottom-in">
                        <p className="copyright">Copyright © 2021 woodendoor. All rights reserved.</p>
                        <ul className="footer-list">
                            <li><a ><img src="img/card1.jpg" alt=""/></a></li>
                            <li><a ><img src="img/card2.jpg" alt=""/></a></li>
                            <li><a ><img src="img/card3.jpg" alt=""/></a></li>
                            <li><a ><img src="img/card4.jpg" alt=""/></a></li>
                            <li><a ><img src="img/card5.jpg" alt=""/></a></li>
                            <li><a ><img src="img/card6.jpg" alt=""/></a></li>
                        </ul>
                    </div>
                </div>
                </div>
            </footer>
        </Suspense>
    );
};
export default injectIntl(connect(null, auth.actions)(Home));