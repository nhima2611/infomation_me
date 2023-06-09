import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { graphcms, QUERY } from "../services";
import { ISkills, IJobs, IProjects, Theme } from "../typings";
import { Navbar } from "../components/Navbar";
import { About } from "../components/About";
import { Jobs } from "../components/Jobs";
import { Projects } from "../components/Projects";
import { Skills } from "../components/Skills";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import ScrollUp from "../assets/scrollup.webp";

interface IHomeProps {
  jobs: IJobs[];
  projects: IProjects[];
  skills: ISkills[];
}

const Home: NextPage<IHomeProps> = ({ jobs, projects, skills }) => {
  const jobsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const data = localStorage.getItem("themeValue");
    setTheme("dark");
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("themeValue", newTheme);
    setTheme(newTheme);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavItemClick = (item: string) => {
    let scrollObject = {};
    switch (item) {
      case "about":
        scrollObject = {
          top: 0,
          behavior: "smooth",
        };
        break;

      case "jobs":
        scrollObject = {
          top: jobsRef.current?.offsetTop! - 70,
          behavior: "smooth",
        };
        break;

      case "projects":
        scrollObject = {
          top: projectsRef.current?.offsetTop! - 70,
          behavior: "smooth",
        };
        break;

      case "skills":
        scrollObject = {
          top: skillsRef.current?.offsetTop! - 70,
          behavior: "smooth",
        };
        break;

      case "contact":
        scrollObject = {
          top: contactRef.current?.offsetTop! - 70,
          behavior: "smooth",
        };
        break;

      default:
        break;
    }

    window.scrollTo(scrollObject);
  };

  return (
    <div>
      <Head>
        <title>ME, MA NAM NHI</title>
        <meta name="keywords" content="software developer, web developer" />
        <meta
          name="description"
          content="Hey, Hi! I am MA NAM NHI from Ho Chi Minh City, Vietnam. I am front-end developer . I am
          passionate about writing clean, efficient and optimized code. I wrote my First Program in
          Javascript in 2019."
        />
        <meta name="author" content="MA NAM NHI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main data-theme={theme}>
        <Navbar onNavItemClick={handleNavItemClick} switchTheme={switchTheme} theme={theme} />

        <section className="about">
          <About />
        </section>

        {/* <section className="jobs" ref={jobsRef}>
          <Jobs jobs={jobs} />
        </section> */}

        {/* <section className="projects" ref={projectsRef}>
          <Projects projects={projects} />
        </section> */}

        <section className="skills" ref={skillsRef}>
          <Skills skills={skills} />
        </section>

        <section className="contact" ref={contactRef}>
          <Contact theme={theme} />
        </section>

        <Footer />

        {isVisible && <img src={ScrollUp.src} alt="" className="scroll-up" onClick={scrollToTop} />}

        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { skills, jobs, projects } = await graphcms.request(QUERY);

  return {
    props: {
      skills,
      jobs,
      projects,
    },
    revalidate: 10,
  };
};
