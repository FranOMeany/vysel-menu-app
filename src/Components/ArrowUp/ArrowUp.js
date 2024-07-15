/**
 *   Name: ArrowUp.js
 * Author: Francisco J. O'Meany
 * Description: ArrowUp class component for all applications developed by Netequal Technology Solutions & Vysel
 *
 * Copyright (c) 2024 - Netequal Technology Solutions
 *
 */
import React from 'react';
import { FaArrowAltCircleUp } from "react-icons/fa";
import './ArrowUp.css';

class ArrowUp extends React.Component {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const scrollPos = window.scrollY;

        if( scrollPos >= 400 ) {
            document.getElementById("appUparrowGoTop").classList.remove("d-none");
            document.getElementById("appUparrowGoTop").classList.add("d-block");
        } else {
            document.getElementById("appUparrowGoTop").classList.remove("d-block");
            document.getElementById("appUparrowGoTop").classList.add("d-none");
        }
    }

    scrollToTop = () => {
        window.scrollTo( 0,0 );
    }

    render() {
        return(
            <>
            <section>
		        <div id='appUparrowGoTop' className="text-center mb-1" onClick={this.scrollToTop}>
                    <a title="Go Top" href="#appHeader" onClick={this.scrollToTop}>
                        <FaArrowAltCircleUp className='text-dark app-arrow-up' />
                    </a>
                </div>
	        </section>
            </>
        );
    }
}

export default ArrowUp;