"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="w-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ translateY: [20, 0], opacity: [0, 1] }}
      >
        <div className="max-w-2xl flex-wrap">
          <h1 className="my-8">
            Hello, I am <h1 className="text-primary inline">Gabe Shin</h1>
          </h1>
          <p>
            I am a full stack developer with 5+ years of experience from Seoul,
            Korea. I am currently based in Seoul - actively looking for a new
            opportunity.
          </p>
          <div className="grid grid-cols-3 my-8">
            <Image
              alt="Profile Image"
              src="/about-me-image.jpg"
              width={200}
              height={300}
            />
            <div className="col-start-2 col-end-4">
              <h2 className="text-primary font-semibold mb-2">Contacts</h2>
              <p> ✉️ gabeshin.ts@gmail.com</p>
              <p>🇰🇷 (+82) 10-****-****</p>
              <h2 className="text-primary font-semibold my-2">Channels</h2>
              <a className="text-text" href="https://www.gabeshin.com/gabeshin">
                Github
              </a>
              <br />
              <a
                className="text-text"
                href="https://www.linkedin.com/in/gabeshin0929"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div>
            <h1 className="text-primary my-8"> Introduction </h1>
            <p>
              I am a full stack developer with 5+ years of experience in startup
              with developing, deploying and maintaining services. I had mostly
              been in charge of web development, but also bring leadership
              experience in leading a team of engineers. I initially joined a
              small team as a machine learning researcher, but expanded my
              skillsets and responsibilities as the product and the team grew. I
              prioritizes features that bring business value and in order to
              bring meaningful business value, I tried to deliver features
              frequently and understand user&apos; behavior through data.
            </p>
          </div>
          <div>
            <h1 className="text-primary my-8"> Latest Interest</h1>
            <p>
              Lately, I had been working on{" "}
              <Link className="text-blue-500" href="https://www.fomoapp.co.kr">
                FOMO app
              </Link>
              , a web application that summarizes various stock reports from
              different sources and provide ai summary. It&apos;s composed of
              many different parts and required learning more about prompt
              engineering and properly calibrating the LLM to provide the
              required output. If you are interested, I would be happy to share
              more about it. the LLM model locally without using the server.
            </p>
            <br />
            <p>
              Also there&apos;s chatbot that answers questions about me, (please{" "}
              <Link className="text-blue-500" href="/chat">
                check it out
              </Link>{" "}
              if you hadn&apos;t already). (as of 2025.03 the vector database
              stopped working, so the chatbot is not working)
            </p>
            <br />
            <p>
              {" "}
              I had also been looking into HTMX and Golang, I think it solves
              many problems and complexity that React is bringing to the web
              development and makes DX most pleasureable. I will be doing a
              small project soon.{" "}
            </p>
          </div>
          <div>
            <h1 className="text-primary my-8"> Work Experience</h1>
            <h2 className="font-semibold">
              <Link href="https://www.visual.camp">Visualcamp</Link>
            </h2>
            <p>
              Provides world leading mobile gaze tracking SDK to developers
              world-wide.
            </p>
            <div className="grid grid-cols-4 my-4">
              <div className="col-start-1">
                <p className="font-semibold"> Backend Engineer</p>
                <p className="text-subtext"> 2022.09 - 2024.04</p>
              </div>
              <div className="col-start-2 col-end-5">
                <p>
                  ◦ Deployed scalable service with using Kubernetes. Created
                  monitoring system utilizing Fluentd and Grafana.
                </p>
                <p>
                  ◦ Designed and developed event-driven architecture, handling
                  asynchronous operations efficiently while maintaining data
                  integrity.
                </p>
                <p>
                  ◦ Applied TDD methodology to create maintainable codebase.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 my-4">
              <div className="col-start-1">
                <p className="font-semibold">Tech Lead</p>
                <p className="text-subtext"> 2020.03 - 2022.09</p>
              </div>
              <div className="col-start-2 col-end-5">
                <p>
                  ◦ Refactored legacy monolith authentication server to
                  microservice architecture, resulting in reduced server cost
                  approximately 70%.
                </p>
                <p>
                  ◦ Designed and deployed global support for SDK authentication
                  utilizing CDN.
                </p>
                <p>
                  ◦ Applied Infrastructure-as-Code principle to the team and
                  deployed service using AWS CDK.
                </p>
                <p>
                  ◦ Developed the SDK&apos;s core pipeline using C++ and
                  integrated TensorFlow models, focused on a robust product that
                  supports multi-platform.
                </p>
                <p>
                  ◦ Managed the product development roadmap, successfully
                  extending the SeeSo SDK support to six different platforms,
                  currently handling over 5 million monthly authentications
                  reliably.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 my-4">
            <div className="col-start-1">
              <p className="font-semibold">Machine Learning Researcher</p>
              <p className="text-subtext"> 2018.09 - 2020.03</p>
            </div>
            <div className="col-start-2 col-end-5">
              <p>
                ◦ Conducted comprehensive research on state-of-the-art models
                and replicated the results, infusing insights from these studies
                to refine our model.
              </p>
              <p>
                ◦ Collaborated with the development team to crowdsourced data,
                ensuring a steady supply of quality training data for the model.
              </p>
              <p>
                ◦ Achieved 25% increase in model accuracy through continuous
                optimization, marking a significant enhancement in accuracy and
                reaching SotA accuracy in mobile gaze tracking.
              </p>
            </div>
          </div>
          <h1 className="text-primary my-8">Education</h1>
          <div className="grid grid-cols-4 my-4">
            <div className="col-start-1">
              <p className="font-semibold">
                Washington University in St. Louis - Missouri, USA
              </p>
              <p className="text-subtext"> 2009.09 - 2016.05</p>
            </div>
            <div className="col-start-2 col-end-5">
              <p>◦ Bachelor of Business Administration (BSBA) in 2016</p>
            </div>
          </div>
          <div className="grid grid-cols-4 my-4">
            <div className="col-start-1">
              <p className="font-semibold">
                Shawniganlake Secondary School - BC, Canada
              </p>
              <p className="text-subtext"> 2005.09 - 2009.05</p>
            </div>
            <div className="col-start-2 col-end-5">
              <p>◦ Graduated with Academic Honors</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
