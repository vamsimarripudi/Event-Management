// index.jsx

import { useEffect, useState, useCallback } from "react";

import {
    Container,
    Overlay,
    GlowOne,
    GlowTwo,
    Content,
    Badge,
    Title,
    AnimatedDot,
    Description,
    CountdownWrapper,
    CountdownCard,
    CountdownValue,
    CountdownLabel,
    FeatureGrid,
    FeatureCard,
    RecruiterNote,
    RecruiterText,
    FocusTitle,
    StatusRow,
    StatusDot,
    FooterText,
    SubTitle
} from "./styledComponents";

const launchDate = new Date("2026-05-20T06:00:00").getTime();

const UnderConstruction = () => {

    const calculateTimeLeft = useCallback(() => {

        const difference =
            launchDate - new Date().getTime();

        let timeLeft = {
            days:0,
            hours:0,
            minutes:0,
            seconds:0
        };

        if(difference > 0){

            timeLeft = {

                days:
                    Math.floor(
                        difference / (1000 * 60 * 60 * 24)
                    ),

                hours:
                    Math.floor(
                        (difference / (1000 * 60 * 60)) % 24
                    ),

                minutes:
                    Math.floor(
                        (difference / (1000 * 60)) % 60
                    ),

                seconds:
                    Math.floor(
                        (difference / 1000) % 60
                    )
            };
        }

        return timeLeft;

    }, []);

    const [timeLeft, setTimeLeft] = useState(
        calculateTimeLeft()
    );

    useEffect(() => {

        const timer = setInterval(() => {

            setTimeLeft(calculateTimeLeft());

        }, 1000);

        return () => clearInterval(timer);

    }, [calculateTimeLeft]);

    return (

        <Container>

            <Overlay />

            <GlowOne />
            <GlowTwo />

            <Content>

                <Badge>
                    🚀 Relaunching Soon
                </Badge>

                <Title>
                    Vmetron
                    <AnimatedDot />
                </Title>
                <SubTitle>

                    Previously known as
                    <span>
                        Event Management Platform
                    </span>
                    — now evolving into Vmetron.

                </SubTitle>

                <Description>

                    We’re rebuilding Vmetron into a
                    realtime event operations infrastructure platform
                    with observability systems,
                    websocket-driven experiences,
                    intelligent onboarding,
                    and production-grade SaaS architecture.

                </Description>

                <CountdownWrapper>

                    <CountdownCard>

                        <CountdownValue>
                            {timeLeft.days}
                        </CountdownValue>

                        <CountdownLabel>
                            Days
                        </CountdownLabel>

                    </CountdownCard>

                    <CountdownCard>

                        <CountdownValue>
                            {timeLeft.hours}
                        </CountdownValue>

                        <CountdownLabel>
                            Hours
                        </CountdownLabel>

                    </CountdownCard>

                    <CountdownCard>

                        <CountdownValue>
                            {timeLeft.minutes}
                        </CountdownValue>

                        <CountdownLabel>
                            Minutes
                        </CountdownLabel>

                    </CountdownCard>

                    <CountdownCard>

                        <CountdownValue>
                            {timeLeft.seconds}
                        </CountdownValue>

                        <CountdownLabel>
                            Seconds
                        </CountdownLabel>

                    </CountdownCard>

                </CountdownWrapper>

                <FeatureGrid>

                    <FeatureCard>
                        ⚡ Realtime Infrastructure
                    </FeatureCard>

                    <FeatureCard>
                        📊 Observability Systems
                    </FeatureCard>

                    <FeatureCard>
                        🧠 Intelligent Profiles
                    </FeatureCard>

                    <FeatureCard>
                        🚀 Production UX
                    </FeatureCard>

                    <FeatureCard>
                        📡 Websocket Architecture
                    </FeatureCard>

                    <FeatureCard>
                        🏗️ SaaS Ecosystem
                    </FeatureCard>

                </FeatureGrid>

                <RecruiterNote>

                    <FocusTitle>
                        Current Engineering Focus
                    </FocusTitle>

                    <ul>

                        <li>
                            Realtime Observability Systems
                        </li>

                        <li>
                            Websocket Infrastructure
                        </li>

                        <li>
                            Multi-Role SaaS Architecture
                        </li>

                        <li>
                            Intelligent Onboarding Experience
                        </li>

                        <li>
                            Developer Documentation Ecosystem
                        </li>

                    </ul>

                </RecruiterNote>

                <RecruiterNote>

                    <FocusTitle>
                        Message For Recruiters & Visitors
                    </FocusTitle>

                    <RecruiterText>

                        Thank you for visiting Nexora.

                        <br /><br />

                        This platform is currently in an intentional
                        engineering and infrastructure refinement phase.

                        The public experience is temporarily limited while
                        major upgrades are being completed around:
                        realtime systems,
                        observability,
                        websocket architecture,
                        intelligent onboarding,
                        scalable SaaS infrastructure,
                        and production-grade UX.

                        <br /><br />

                        The goal is not simply to build another project,
                        but to engineer a polished realtime operational ecosystem
                        with strong architecture foundations and scalable system design.

                        <br /><br />

                        Public launch coming soon.

                    </RecruiterText>

                </RecruiterNote>

                <RecruiterNote>

                    <FocusTitle>
                        System Status
                    </FocusTitle>

                    <StatusRow>

                        <StatusDot />

                        Infrastructure Upgrade Active

                    </StatusRow>

                    <RecruiterText>

                        Public access is temporarily limited while
                        major platform improvements and production
                        infrastructure upgrades are being completed.

                    </RecruiterText>

                </RecruiterNote>

                <FooterText>
                    🚀 Public Launch • May 20 • Engineered by Vamsi Marripudi
                </FooterText>

            </Content>

        </Container>
    );
};

export default UnderConstruction;
