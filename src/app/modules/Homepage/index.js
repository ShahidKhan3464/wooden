import React from 'react'
import Header from './header/Header'
import Hero from './hero/Hero'
import Wooden from './woodenProperty/Wooden'
import RunBusiness from './runBusiness/RunBusiness'
import Dashboard from './dashboard/Dashboard'
import Result from './result/Result'
import Footer from './footer/Footer';

const Index = () => {
  

    return (
        <React.Fragment>
            <Header />
            <Hero />
            <Wooden />
            <RunBusiness />
            <Dashboard />
            <Result />
            <Footer />
        </React.Fragment>
    )
}

export default Index