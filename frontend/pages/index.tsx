import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import axios from 'axios'


import TwitterIcon from '@material-ui/icons/Twitter';
import TranslateIcon from '@material-ui/icons/Translate';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

/**
 * landing page lol
 */



export default function Landing({ user }) {

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
                        {
                        user ? <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => { window.location.href = `${window.CONFIG.BASE_URL}/channels/me` }}>
                            Open Hangle
                        </span>
                            :
                            <span id="loginButton" onClick={() => { window.location.href = 'http://localhost/auth/github' }}>
                                Login
                    </span>

                    }

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

            </div>
        </div>
    )

}