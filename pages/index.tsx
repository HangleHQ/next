import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'


import TwitterIcon from '@material-ui/icons/Twitter';
import TranslateIcon from '@material-ui/icons/Translate';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

/**
 * landing page lol
 */



export default function Landing() {

    return (
        <div id="landing">
            <div id="landingHeader">


                <div id="landingHeaderItems">
                    <span id="logoText">
                        Hangle
                    </span>

                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <span id="landingDownload">
                        Download
                    </span>
                </div>

                <div id="landingHeaderSocials">
                    <span>
                        <TwitterIcon />
                    </span>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <span id="loginButton">
                        Login
                    </span>

                    &nbsp;&nbsp;&nbsp;
                    <span className="vertDiv" />
                    &nbsp;&nbsp;&nbsp;

                    <span id="landingHeaderLanguage">
                        <TranslateIcon />
                        <KeyboardArrowDownIcon />
                    </span>

                </div>
            </div>

            <div id="landingContent">
                <span id="landingMainText">
                    chat dev thank
                </span>

                <br />

                <div>
                    yo dude want some candies???
                </div>

<br />

                <div id="landingSignup">
                    <Formik
                    initialValues={{}}
                    onSubmit={(evt: any, actions) => {
                        console.log(evt.username)
                    }}
                    >
                        {props => (

                            <form onSubmit={props.handleSubmit}>

                                <input
                                placeholder=" Enter a username"
                                onChange={props.handleChange}
                                name="username"
                                autoComplete="off"
                                />

                                <button type="submit" className="signupButton" > <ArrowForwardIcon /> </button>

                            </form>
                        )}
                    </Formik>

                </div>
            </div>
        </div>
    )

}