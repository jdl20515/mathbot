import React from 'react';
import Style from './About.module.scss';
import Terminal from "./Terminal";
import {Box} from "@mui/material";
import {info} from "../../info/Info";


export default function About() {
    const firstName = info.firstName.toLowerCase()

    function aboutMeText() {
        return <>
            <p><span style={{color: info.baseColor}}>{firstName}{info.lastName.toLowerCase()} $</span> 
                about {firstName} </p>
            <p><span style={{color: info.baseColor}}>about{firstName} <span
                className={Style.green}>(main)</span> $ </span>
              MathBot is not just a chatbot; it's your friendly and intelligent math tutor, designed to make learning mathematics an engaging and interactive experience. Imagine having a patient, knowledgeable, and always-available companion to guide you through the fascinating world of numbers, equations, and problem-solving. Whether you're a curious elementary school student exploring the basics or a high schooler tackling advanced calculus, MathBot is here to help you master math with ease and confidence.


            </p>
        </>;
    }

   
    

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'3rem'}>
            <Terminal text={aboutMeText()}/>
            {/* <Terminal text={skillsText()}/> */}
            {/* <Terminal text={miscText()}/> */}
        </Box>
    )
}