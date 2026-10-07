import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
const projects = [
  {
    id: "cicd",
    number: "01",
    title: "Node.js CI/CD Platform",
    category: "CI/CD AUTOMATION",
    description:
      "Automated testing, Docker image creation and deployment of a Node.js application to AWS EC2 using GitHub Actions.",
    technologies: ["GitHub Actions", "Docker", "AWS EC2", "Node.js"],
    status: "DEPLOYED",
    statusClass: "green",
    repo: "https://github.com/zahed-shaik-dev/devops-nodejs-cicd",
    color: "blue",
    metrics: [
      ["Pipeline", "Automated"],
      ["Container", "Docker"],
      ["Cloud", "AWS EC2"],
    ],
  },
  {
    id: "cloudops",
    number: "02",
    title: "CloudOps360",
    category: "DEVOPS PLATFORM",
    description:
      "A DevOps operations platform combining containerized services, CI/CD workflows and observability with Prometheus and Grafana.",
    technologies: ["Docker", "Jenkins", "Prometheus", "Grafana"],
    status: "RUNNING",
    statusClass: "cyan",
    repo: "https://github.com/zahed-shaik-dev",
    color: "cyan",
    metrics: [
      ["Services", "Containerized"],
      ["Monitoring", "Prometheus"],
      ["Dashboard", "Grafana"],
    ],
  },
  {
    id: "terraform",
    number: "03",
    title: "AWS Infrastructure with Terraform",
    category: "INFRASTRUCTURE AS CODE",
    description:
      "Infrastructure-as-code project for provisioning a structured AWS environment using reusable Terraform configuration.",
    technologies: ["Terraform", "AWS", "VPC", "EC2", "RDS"],
    status: "BUILDING",
    statusClass: "amber",
    repo: "https://github.com/zahed-shaik-dev",
    color: "purple",
    metrics: [
      ["IaC", "Terraform"],
      ["Network", "VPC"],
      ["Compute", "EC2"],
    ],
  },
  {
    id: "petclinic",
    number: "04",
    title: "Spring Petclinic Deployment",
    category: "JAVA / CI/CD",
    description:
      "Containerized Java application with Maven build automation, Jenkins pipeline integration and Docker deployment.",
    technologies: ["Java", "Maven", "Jenkins", "Docker"],
    status: "STABLE",
    statusClass: "green",
    repo: "https://github.com/zahed-shaik-dev",
    color: "orange",
    metrics: [
      ["Build", "Maven"],
      ["Automation", "Jenkins"],
      ["Runtime", "Docker"],
    ],
  },
];

const stackGroups = [
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    icon: "☁",
    color: "blue",
    description:
      "Cloud platforms and infrastructure components used to provision and operate applications.",
    technologies: [
      {
        name: "AWS",
        level: "Hands-on",
        detail: "EC2 • VPC • IAM • RDS",
      },
      {
        name: "EC2",
        level: "Hands-on",
        detail: "Compute • SSH • Deployment",
      },
      {
        name: "VPC",
        level: "Learning",
        detail: "Networking • Subnets • Routing",
      },
      {
        name: "Azure",
        level: "Learning",
        detail: "App Service • Cloud deployment",
      },
    ],
  },
  {
    id: "cicd",
    title: "CI / CD",
    icon: "⇢",
    color: "cyan",
    description:
      "Automation tools used to move code from source control through testing and deployment.",
    technologies: [
      {
        name: "GitHub Actions",
        level: "Hands-on",
        detail: "Build • Test • Deploy",
      },
      {
        name: "Jenkins",
        level: "Hands-on",
        detail: "Pipelines • Automation",
      },
      {
        name: "Git",
        level: "Hands-on",
        detail: "Version control • Branching",
      },
      {
        name: "Maven",
        level: "Hands-on",
        detail: "Java builds • Dependencies",
      },
    ],
  },
  {
    id: "containers",
    title: "Containers",
    icon: "▣",
    color: "green",
    description:
      "Containerization workflows for consistent application builds and deployments.",
    technologies: [
      {
        name: "Docker",
        level: "Hands-on",
        detail: "Images • Containers • Compose",
      },
      {
        name: "Docker Compose",
        level: "Hands-on",
        detail: "Multi-container applications",
      },
      {
        name: "Kubernetes",
        level: "Learning",
        detail: "Pods • Deployments • Services",
      },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code",
    icon: "⌘",
    color: "purple",
    description:
      "Declarative infrastructure management with a focus on repeatable cloud provisioning.",
    technologies: [
      {
        name: "Terraform",
        level: "Learning",
        detail: "AWS provisioning • Modules",
      },
      {
        name: "Terraform Cloud",
        level: "Exploring",
        detail: "Remote infrastructure workflows",
      },
    ],
  },
  {
    id: "observability",
    title: "Observability",
    icon: "◉",
    color: "orange",
    description:
      "Metrics and visualization tools used to understand system health and performance.",
    technologies: [
      {
        name: "Prometheus",
        level: "Hands-on",
        detail: "Metrics • Queries • Targets",
      },
      {
        name: "Grafana",
        level: "Hands-on",
        detail: "Dashboards • Visualization",
      },
    ],
  },
  {
    id: "linux",
    title: "Linux & Automation",
    icon: "$",
    color: "amber",
    description:
      "Core operating-system and scripting knowledge supporting automation and infrastructure work.",
    technologies: [
      {
        name: "Linux",
        level: "Hands-on",
        detail: "Shell • Processes • Services",
      },
      {
        name: "Bash",
        level: "Hands-on",
        detail: "Automation • CLI workflows",
      },
      {
        name: "Python",
        level: "Learning",
        detail: "Automation • APIs • Scripts",
      },
    ],
  },
];

const pipelineStages = [
  {
    id: "source",
    step: "01",
    title: "Source",
    tool: "GitHub",
    color: "blue",
    description:
      "Developer pushes code to the main branch and the automated workflow starts.",
    command: "git push origin main",
  },
  {
    id: "build",
    step: "02",
    title: "Build",
    tool: "GitHub Actions",
    color: "cyan",
    description:
      "The CI runner installs dependencies, validates the application and prepares the build.",
    command: "npm ci && npm run build",
  },
  {
    id: "test",
    step: "03",
    title: "Test",
    tool: "CI Tests",
    color: "purple",
    description:
      "Automated tests validate the application before an image is promoted for deployment.",
    command: "npm test",
  },
  {
    id: "deploy",
    step: "04",
    title: "Deploy",
    tool: "Docker + AWS",
    color: "green",
    description:
      "The Docker image is published and the application is deployed to AWS infrastructure.",
    command: "docker build && docker push",
  },
];

const architectureNodes = [
  {
    id: "developer",
    label: "Developer",
    icon: "⌘",
    color: "blue",
    text: "Write code, commit changes and push the application to source control.",
  },
  {
    id: "github",
    label: "GitHub",
    icon: "●",
    color: "cyan",
    text: "Source control and the starting point for the CI/CD workflow.",
  },
  {
    id: "pipeline",
    label: "CI Pipeline",
    icon: "⇢",
    color: "purple",
    text: "Automates build, validation, testing and release activities.",
  },
  {
    id: "docker",
    label: "Docker",
    icon: "▣",
    color: "cyan",
    text: "Packages the application into a portable container image.",
  },
  {
    id: "aws",
    label: "AWS EC2",
    icon: "☁",
    color: "orange",
    text: "Runs the deployed containerized application in the cloud.",
  },
  {
    id: "observe",
    label: "Observability",
    icon: "◉",
    color: "green",
    text: "Prometheus collects metrics while Grafana provides visualization.",
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeStage, setActiveStage] = useState("source");
  const [activeStack, setActiveStack] = useState("cloud");
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const [selectedArchitecture, setSelectedArchitecture] =
    useState("developer");
  const [selectedProject, setSelectedProject] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light-mode", !darkMode);
    document.documentElement.style.colorScheme = darkMode
      ? "dark"
      : "light";
  }, [darkMode]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.35, 0.6],
        rootMargin: "-15% 0px -55% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        setMobileMenu(false);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileMenu(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("zahed.h.shaik@gmail.com");
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      window.location.href = "mailto:zahed.h.shaik@gmail.com";
    }
  };

  const activePipeline =
    pipelineStages.find((stage) => stage.id === activeStage) ||
    pipelineStages[0];

  const currentStack =
    stackGroups.find((group) => group.id === activeStack) ||
    stackGroups[0];

  const currentArchitecture =
    architectureNodes.find(
      (node) => node.id === selectedArchitecture
    ) || architectureNodes[0];

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <header className="site-header">
        <div className="header-inner">
          <a
  className="brand"
  href="#home"
  onClick={() => scrollTo("home")}
>
  <span className="brand-infinity">∞</span>
  <span className="brand-name">
    zahed<span>.devops</span>
  </span>
</a>

          <nav className={`main-nav ${mobileMenu ? "open" : ""}`}>
            {[
              ["home", "Home"],
              ["work", "Work"],
              ["stack", "Stack"],
              ["pipeline", "Pipeline"],
              ["architecture", "Architecture"],
              ["about", "About"],
            ].map(([id, label]) => (
              <button
                key={id}
                className={activeSection === id ? "active" : ""}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}

            <button
              className="nav-contact"
              onClick={() => scrollTo("contact")}
            >
              Contact <span>↗</span>
            </button>
          </nav>

          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={() => setDarkMode((value) => !value)}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              <span>{darkMode ? "☼" : "☾"}</span>
            </button>

            <button
              className="mobile-toggle"
              onClick={() => setMobileMenu((value) => !value)}
              aria-label="Toggle navigation"
            >
              {mobileMenu ? "×" : "☰"}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow">
                <span className="live-dot" />
                AVAILABLE FOR ENTRY-LEVEL OPPORTUNITIES
              </div>

              <h1>
                Engineering the path
                <span> from code to cloud.</span>
              </h1>

              <p className="hero-description">
                I'm Zahed Hussain Shaik, a DevOps Engineer
                focused on automation, cloud infrastructure,
                containerization and reliable delivery.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => scrollTo("work")}
                >
                  Explore my work
                  <span>↗</span>
                </button>

                <button
                  className="secondary-button"
                  onClick={() => scrollTo("contact")}
                >
                  Let's connect
                </button>
              </div>

              <div className="hero-techline">
                <span>BUILDING WITH</span>
                <b>AWS</b>
                <i />
                <b>DOCKER</b>
                <i />
                <b>TERRAFORM</b>
                <i />
                <b>CI/CD</b>
              </div>
            </div>

            <div className="hero-visual reveal reveal-delay">
              <div className="visual-header">
                <span>DELIVERY PIPELINE</span>
                <span className="visual-live">
                  <i /> LIVE SYSTEM
                </span>
              </div>

              <div className="pipeline-visual">
                <div className="pipeline-line" />

                {pipelineStages.map((stage, index) => (
                  <button
                    key={stage.id}
                    className={`pipeline-node ${
                      activeStage === stage.id ? "selected" : ""
                    } ${stage.color}`}
                    onClick={() => setActiveStage(stage.id)}
                    style={{
                      "--node-index": index,
                    }}
                  >
                    <span className="node-number">
                      {stage.step}
                    </span>

                    <span className="node-icon">
                      {stage.id === "source" && "⌘"}
                      {stage.id === "build" && "⚙"}
                      {stage.id === "test" && "✓"}
                      {stage.id === "deploy" && "↗"}
                    </span>

                    <strong>{stage.title}</strong>
                    <small>{stage.tool}</small>
                  </button>
                ))}
              </div>

              <div className="pipeline-detail">
                <div className="pipeline-detail-top">
                  <span className={`stage-tag ${activePipeline.color}`}>
                    {activePipeline.step} / 04
                  </span>

                  <span className="stage-tool">
                    {activePipeline.tool}
                  </span>
                </div>

                <h3>{activePipeline.title}</h3>

                <p>{activePipeline.description}</p>

                <div className="command-line">
                  <span>$</span>
                  {activePipeline.command}
                  <b>▋</b>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-scroll">
            <span>SCROLL TO EXPLORE</span>
            <i />
          </div>
        </section>

        {/* MARQUEE */}
        <div className="technology-marquee">
          <div className="marquee-track">
            {[
              "AWS",
              "DOCKER",
              "JENKINS",
              "GITHUB ACTIONS",
              "TERRAFORM",
              "KUBERNETES",
              "PROMETHEUS",
              "GRAFANA",
            ].map((item) => (
              <span key={item}>
                <b>◆</b> {item}
              </span>
            ))}

            {[
              "AWS",
              "DOCKER",
              "JENKINS",
              "GITHUB ACTIONS",
              "TERRAFORM",
              "KUBERNETES",
              "PROMETHEUS",
              "GRAFANA",
            ].map((item) => (
              <span key={`copy-${item}`}>
                <b>◆</b> {item}
              </span>
            ))}
          </div>
        </div>

        {/* WORK */}
        <section id="work" className="section work-section">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="section-kicker">01 / SELECTED WORK</span>

                <h2>
                  Systems I've
                  <span> built.</span>
                </h2>
              </div>

              <p>
                Hands-on projects focused on deployment automation,
                infrastructure, containers and observability.
              </p>
            </div>

            <div className="project-grid">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className={`project-card ${project.color} reveal`}
                  style={{ "--delay": `${index * 80}ms` }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-top">
                    <span className="project-number">
                      {project.number}
                    </span>

                    <span className={`status ${project.statusClass}`}>
                      <i />
                      {project.status}
                    </span>
                  </div>

                  <div className="project-visual">
                    <div className="visual-grid" />

                    <div className="project-orbit orbit-one" />
                    <div className="project-orbit orbit-two" />

                    <div className="project-core">
                      <span>
                        {project.id === "cicd" && "CI"}
                        {project.id === "cloudops" && "OPS"}
                        {project.id === "terraform" && "TF"}
                        {project.id === "petclinic" && "JVM"}
                      </span>
                    </div>

                    <div className="floating-label label-one">
                      {project.technologies[0]}
                    </div>

                    <div className="floating-label label-two">
                      {project.technologies[2]}
                    </div>
                  </div>

                  <div className="project-content">
                    <span className="project-category">
                      {project.category}
                    </span>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <div className="project-footer">
                      <div className="tech-list">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>

                      <span className="open-project">↗</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="section stack-section">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="section-kicker">02 / TECHNOLOGY STACK</span>

                <h2>
                  Tools behind
                  <span> the work.</span>
                </h2>
              </div>

              <p>
                A growing engineering toolkit built through projects,
                experimentation and hands-on practice.
              </p>
            </div>

            <div className="stack-layout">
              <div className="stack-navigation reveal">
                {stackGroups.map((group) => (
                  <button
                    key={group.id}
                    className={`${activeStack === group.id ? "active" : ""} ${group.color}`}
                    onClick={() => {
                      setActiveStack(group.id);
                      setSelectedTechnology(null);
                    }}
                  >
                    <span className="stack-icon">{group.icon}</span>

                    <span>
                      <strong>{group.title}</strong>
                      <small>
                        {group.technologies.length} technologies
                      </small>
                    </span>

                    <b>→</b>
                  </button>
                ))}
              </div>

              <div className="stack-inspector reveal reveal-delay">
                <div className="inspector-top">
                  <div>
                    <span className={`inspector-icon ${currentStack.color}`}>
                      {currentStack.icon}
                    </span>

                    <div>
                      <span className="section-kicker">
                        TECHNOLOGY GROUP
                      </span>

                      <h3>{currentStack.title}</h3>
                    </div>
                  </div>

                  <span className="inspector-count">
                    {String(currentStack.technologies.length).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                <p className="inspector-description">
                  {currentStack.description}
                </p>

                <div className="technology-list">
                  {currentStack.technologies.map((technology) => (
                    <button
                      key={technology.name}
                      className={
                        selectedTechnology?.name === technology.name
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setSelectedTechnology(technology)
                      }
                    >
                      <span className="technology-dot" />

                      <span>
                        <strong>{technology.name}</strong>
                        <small>{technology.detail}</small>
                      </span>

                      <em>{technology.level}</em>
                    </button>
                  ))}
                </div>

                <div className="inspector-terminal">
                  <span>$</span>
                  {selectedTechnology
                    ? `focus --tool ${selectedTechnology.name
                        .toLowerCase()
                        .replaceAll(" ", "-")}`
                    : `stack --inspect ${currentStack.id}`}
                  <b>▋</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PIPELINE */}
        <section id="pipeline" className="section pipeline-section">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="section-kicker">03 / AUTOMATION</span>

                <h2>
                  From commit
                  <span> to production.</span>
                </h2>
              </div>

              <p>
                The delivery mindset behind my DevOps projects:
                repeatable, automated and observable.
              </p>
            </div>

            <div className="pipeline-system reveal">
              <div className="pipeline-stage-list">
                {pipelineStages.map((stage) => (
                  <button
                    key={stage.id}
                    className={`${activeStage === stage.id ? "active" : ""} ${stage.color}`}
                    onClick={() => setActiveStage(stage.id)}
                  >
                    <span className="stage-index">{stage.step}</span>

                    <span className="stage-symbol">
                      {stage.id === "source" && "⌘"}
                      {stage.id === "build" && "⚙"}
                      {stage.id === "test" && "✓"}
                      {stage.id === "deploy" && "↗"}
                    </span>

                    <span className="stage-copy">
                      <strong>{stage.title}</strong>
                      <small>{stage.tool}</small>
                    </span>

                    <span className="stage-arrow">→</span>
                  </button>
                ))}
              </div>

              <div className="pipeline-explanation">
                <div className="explanation-number">
                  {activePipeline.step}
                </div>

                <span className={`section-kicker ${activePipeline.color}`}>
                  PIPELINE STAGE
                </span>

                <h3>{activePipeline.title}</h3>

                <p>{activePipeline.description}</p>

                <div className="execution-box">
                  <div className="execution-header">
                    <span>EXECUTION</span>
                    <span>
                      <i /> READY
                    </span>
                  </div>

                  <div className="execution-command">
                    <span>~</span>
                    {activePipeline.command}
                  </div>
                </div>

                <div className="execution-progress">
                  {pipelineStages.map((stage) => (
                    <span
                      key={stage.id}
                      className={
                        stage.id === activeStage ? "active" : ""
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section
          id="architecture"
          className="section architecture-section"
        >
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="section-kicker">
                  04 / SYSTEM ARCHITECTURE
                </span>

                <h2>
                  Think in
                  <span> systems.</span>
                </h2>
              </div>

              <p>
                A simplified view of how source control, automation,
                containers, cloud infrastructure and observability
                connect.
              </p>
            </div>

            <div className="architecture-layout reveal">
              <div className="architecture-map">
                <div className="map-grid" />

                <svg
                  className="architecture-lines"
                  viewBox="0 0 900 500"
                  preserveAspectRatio="none"
                >
                  <path d="M120 250 C200 250 220 120 300 120" />
                  <path d="M300 120 C390 120 410 250 480 250" />
                  <path d="M480 250 C570 250 580 120 670 120" />
                  <path d="M480 250 C570 250 580 380 670 380" />
                  <path d="M670 120 C760 120 780 250 830 250" />
                  <path d="M670 380 C760 380 780 250 830 250" />
                </svg>

                <div className="architecture-node node-developer">
                  <button
                    className={
                      selectedArchitecture === "developer"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedArchitecture("developer")
                    }
                  >
                    <span>⌘</span>
                    <strong>Developer</strong>
                    <small>Code</small>
                  </button>
                </div>

                <div className="architecture-node node-github">
                  <button
                    className={
                      selectedArchitecture === "github" ? "active" : ""
                    }
                    onClick={() =>
                      setSelectedArchitecture("github")
                    }
                  >
                    <span>●</span>
                    <strong>GitHub</strong>
                    <small>Source</small>
                  </button>
                </div>

                <div className="architecture-node node-pipeline">
                  <button
                    className={
                      selectedArchitecture === "pipeline"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedArchitecture("pipeline")
                    }
                  >
                    <span>⇢</span>
                    <strong>CI Pipeline</strong>
                    <small>Automate</small>
                  </button>
                </div>

                <div className="architecture-node node-docker">
                  <button
                    className={
                      selectedArchitecture === "docker" ? "active" : ""
                    }
                    onClick={() =>
                      setSelectedArchitecture("docker")
                    }
                  >
                    <span>▣</span>
                    <strong>Docker</strong>
                    <small>Package</small>
                  </button>
                </div>

                <div className="architecture-node node-aws">
                  <button
                    className={
                      selectedArchitecture === "aws" ? "active" : ""
                    }
                    onClick={() => setSelectedArchitecture("aws")}
                  >
                    <span>☁</span>
                    <strong>AWS EC2</strong>
                    <small>Deploy</small>
                  </button>
                </div>

                <div className="architecture-node node-observe">
                  <button
                    className={
                      selectedArchitecture === "observe"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedArchitecture("observe")
                    }
                  >
                    <span>◉</span>
                    <strong>Observability</strong>
                    <small>Monitor</small>
                  </button>
                </div>
              </div>

              <div className="architecture-info">
                <span className={`architecture-status ${currentArchitecture.color}`}>
                  SYSTEM COMPONENT
                </span>

                <div className="architecture-info-icon">
                  {currentArchitecture.icon}
                </div>

                <h3>{currentArchitecture.label}</h3>

                <p>{currentArchitecture.text}</p>

                <div className="architecture-flow">
                  <span>INPUT</span>
                  <i />
                  <span>PROCESS</span>
                  <i />
                  <span>OUTPUT</span>
                </div>

                <div className="architecture-note">
                  <span>01</span>
                  <p>
                    Click any architecture node to inspect its role
                    in the delivery system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section about-section">
          <div className="container">
            <div className="about-grid">
              <div className="reveal">
                <span className="section-kicker">05 / ABOUT</span>

                <h2>
                  Curious about
                  <span> how systems work.</span>
                </h2>
              </div>

              <div className="about-copy reveal reveal-delay">
                <p className="large-copy">
                  I'm building my career around the intersection of
                  software delivery, cloud infrastructure and
                  automation.
                </p>

                <p>
                  My approach is practical: learn a technology, build
                  something with it, break it, troubleshoot it and
                  understand why it works. My projects reflect that
                  process.
                </p>

                <div className="about-points">
                  <div>
                    <span>01</span>
                    <strong>Automate</strong>
                    <p>Reduce repetitive manual work.</p>
                  </div>

                  <div>
                    <span>02</span>
                    <strong>Containerize</strong>
                    <p>Build portable application environments.</p>
                  </div>

                  <div>
                    <span>03</span>
                    <strong>Observe</strong>
                    <p>Understand what systems are doing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <div className="contact-card reveal">
              <div className="contact-glow" />

              <div className="contact-content">
                <span className="section-kicker">
                  06 / LET'S CONNECT
                </span>

                <h2>
                  Let's build something
                  <span> reliable.</span>
                </h2>

                <p>
                  Looking for an entry-level DevOps or Cloud
                  opportunity where I can learn, contribute and grow
                  with an engineering team.
                </p>

                <div className="contact-actions">
                  <button
                    className="primary-button"
                    onClick={copyEmail}
                  >
                    {copied ? "Email copied ✓" : "Copy my email"}
                  </button>

                  <a
                    className="secondary-button"
                    href="mailto:zahed.h.shaik@gmail.com"
                  >
                    Send an email ↗
                  </a>
                </div>
              </div>

              <div className="contact-links">
                <a
                  href="https://github.com/zahed-shaik-dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>GitHub</span>
                  <b>↗</b>
                </a>

                <a
                  href="https://linkedin.com/in/zahed-h-shaik"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>LinkedIn</span>
                  <b>↗</b>
                </a>

                <a href="mailto:zahed.h.shaik@gmail.com">
                  <span>Email</span>
                  <b>↗</b>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>Z<span>.</span>DEVOPS</strong>
            <small>ENGINEERING • AUTOMATION • CLOUD</small>
          </div>

          <p>Designed & built by Zahed Hussain Shaik</p>

          <button onClick={() => scrollTo("home")}>
            Back to top ↑
          </button>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>

            <div className={`modal-accent ${selectedProject.color}`} />

            <span className="section-kicker">
              PROJECT {selectedProject.number}
            </span>

            <span className="project-category">
              {selectedProject.category}
            </span>

            <h2>{selectedProject.title}</h2>

            <p className="modal-description">
              {selectedProject.description}
            </p>

            <div className="modal-metrics">
              {selectedProject.metrics.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="modal-tech">
              {selectedProject.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>

            <div className="modal-actions">
              <a
                href={selectedProject.repo}
                target="_blank"
                rel="noreferrer"
                className="primary-button"
              >
                View repository ↗
              </a>

              <button
                className="secondary-button"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);