import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowRight, Check, ChevronDown, ChevronRight, Cloud, Code2,
  Container, Cpu, ExternalLink, FileCode2, Github, GitBranch, Globe2,
  Layers3, Linkedin, Menu, Moon, Play, RefreshCcw, Server, ShieldCheck,
  Sun, Terminal, Zap, X, CircleDot, Database, Gauge
} from "lucide-react";
import "./styles.css";

const projects = [
  {
    id: "devopslab",
    name: "DevOpsLab Node",
    provider: "AWS",
    tools: ["Docker", "GitHub", "CI/CD"],
    status: "RUNNING",
    url: "https://github.com/zahed-shaik-dev/DevopsLab-node.git",
    description: "Containerized Node.js/Express application with a practical DevOps workflow.",
    architecture: ["Developer → GitHub", "GitHub Actions → Build / Test", "Docker Image → Registry", "Deploy → Runtime"],
    specs: ["Node.js / Express", "Docker", "Git & GitHub", "CI/CD pipeline"]
  },
  {
    id: "petclinic",
    name: "Spring Petclinic",
    provider: "AWS",
    tools: ["Maven", "Docker", "Jenkins"],
    status: "STABLE",
    url: "https://github.com/zahed-shaik-dev/spring-petclinic.git",
    description: "Java application build and containerization practice focused on repeatable delivery.",
    architecture: ["Source → Maven Build", "Jenkins → Pipeline", "JAR Artifact → Docker Image", "Container → Application"],
    specs: ["Java / Spring Boot", "Maven", "Docker", "Jenkins"]
  },
  {
    id: "linux-monitor",
    name: "Linux Monitor Project",
    provider: "Linux",
    tools: ["Linux", "Shell", "Observability"],
    status: "MONITORED",
    url: "https://github.com/zahed-shaik-dev/linux-monitor-project.git",
    description: "Linux monitoring project for system health, resource visibility and operational practice.",
    architecture: ["Linux Host → Metrics", "Shell → Health Checks", "Logs → Alerts / Review", "Operator → Remediation"],
    specs: ["Linux", "Shell scripting", "Monitoring", "Operational troubleshooting"]
  },
  {
    id: "multi-service",
    name: "Multi-Service Application",
    provider: "AWS",
    tools: ["Docker", "Docker Compose", "GitHub"],
    status: "RUNNING",
    url: "https://github.com/zahed-shaik-dev/Multi-Service-Application.git",
    description: "Multi-service application demonstrating containerized service boundaries and orchestration concepts.",
    architecture: ["Client → Service A", "Service A → Service B", "Services → Data Layer", "Compose → Local orchestration"],
    specs: ["Docker", "Docker Compose", "Networking", "Service architecture"]
  },
  {
    id: "vyron",
    name: "VYRON Fashion",
    provider: "Azure",
    tools: ["React", "Docker", "CI/CD"],
    status: "BUILDING",
    url: "https://github.com/zahed-shaik-dev/VYRON-Fashion.git",
    description: "Modern e-commerce project with a frontend-first product experience and container deployment workflow.",
    architecture: ["React UI → API", "API → Services / Data", "Docker → App Containers", "CI/CD → Deployment"],
    specs: ["React", "Node.js", "Docker", "Responsive UI"]
  }
];

const layers = [
  {
    title: "Source & Automation",
    tag: "01",
    icon: GitBranch,
    skills: ["Linux", "Git", "GitHub", "GitHub Actions", "Shell"],
    accent: "green"
  },
  {
    title: "Containers & Orchestration",
    tag: "02",
    icon: Container,
    skills: ["Docker", "Docker Compose", "Kubernetes"],
    accent: "blue"
  },
  {
    title: "Cloud Infrastructure",
    tag: "03",
    icon: Cloud,
    skills: ["AWS", "Azure", "GCP"],
    accent: "amber"
  },
  {
    title: "IaC & Observability",
    tag: "04",
    icon: Activity,
    skills: ["Terraform", "Observability", "Monitoring", "Logs"],
    accent: "slate"
  }
];

const pipelineStages = [
  {
    key: "source", label: "SOURCE", sub: "Git / GitHub", icon: GitBranch,
    log: ["[INFO] Source event received", "[OK] Git repository connected", "[OK] Commit history available", "[INFO] Handoff → BUILD"]
  },
  {
    key: "build", label: "BUILD", sub: "Docker / Maven", icon: Container,
    log: ["[INFO] Build runner initialized", "[OK] Dependencies resolved", "[OK] Artifact generated", "[INFO] Container image ready"]
  },
  {
    key: "test", label: "TEST", sub: "Checks / Health", icon: ShieldCheck,
    log: ["[INFO] Automated checks started", "[OK] Application health check", "[OK] Container health verified", "[INFO] Quality gate passed"]
  },
  {
    key: "deploy", label: "DEPLOY", sub: "Cloud / Runtime", icon: Cloud,
    log: ["[INFO] Deployment target selected", "[OK] Runtime configuration applied", "[OK] Service responding", "[SUCCESS] Delivery complete"]
  }
];

function App() {
  const [dark, setDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stage, setStage] = useState("source");
  const [health, setHealth] = useState({});
  const [filterProvider, setFilterProvider] = useState("ALL");
  const [filterTool, setFilterTool] = useState("ALL");
  const [expanded, setExpanded] = useState("devopslab");
  const [chaos, setChaos] = useState(false);
  const [healing, setHealing] = useState(false);
  const [scale, setScale] = useState("Medium");
  const [cloud, setCloud] = useState("AWS");
  const [compliance, setCompliance] = useState("Standard");

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  const activeStage = pipelineStages.find(s => s.key === stage);
  const filtered = useMemo(() => projects.filter(p =>
    (filterProvider === "ALL" || p.provider === filterProvider) &&
    (filterTool === "ALL" || p.tools.includes(filterTool))
  ), [filterProvider, filterTool]);

  const checkHealth = (name) => {
    setHealth(h => ({...h, [name]: "CHECKING"}));
    setTimeout(() => setHealth(h => ({...h, [name]: "HEALTHY"})), 850);
  };

  const triggerChaos = () => {
    setChaos(true);
    setHealing(false);
    setTimeout(() => setHealing(true), 1450);
    setTimeout(() => { setChaos(false); setHealing(false); }, 3300);
  };

  const spec = `target:
  cloud: ${cloud}
  scale: ${scale}
  compliance: ${compliance}
  availability: ${scale === "Enterprise" ? "multi-zone" : "standard"}
  delivery: CI/CD
  containers: Docker
  observability: enabled`;

  return (
    <div className="min-h-screen">
      <header className="nav-shell">
       <a href="#home" className="brand">
  <span className="brand-mark">ZH</span>
  <div>
  <strong>Zahed<span className="brand-dot">.</span></strong>
  <span>DevOps</span>
</div>
</a>
        <nav className={mobileOpen ? "nav-links open" : "nav-links"}>
          {["stack","projects","estimator","contact"].map(x =>
            <a key={x} href={`#${x}`} onClick={() => setMobileOpen(false)}>{x}</a>
          )}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={() => setDark(v => !v)} title="Toggle theme">
            {dark ? <Sun size={17}/> : <Moon size={17}/>}
          </button>
          <a className="top-github" href="https://github.com/zahed-shaik-dev" target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a>
          <button className="icon-btn mobile-only" onClick={() => setMobileOpen(v => !v)}>{mobileOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot"/> AVAILABLE FOR DEVOPS OPPORTUNITIES</div>
            <h1>Infrastructure<br/><span>with intent.</span></h1>
            <p className="hero-lead">Aspiring DevOps Engineer focused on Linux, containers, CI/CD and cloud infrastructure — building reliable systems one deployment at a time.</p>
            <div className="hero-meta">
              <span><MapPin/> Hyderabad, India</span>
              <span><CircleDot/> Open to opportunities</span>
            </div>
            <div className="hero-buttons">
              <a href="#projects" className="btn primary">Inspect Projects <ArrowRight size={17}/></a>
              <a href="mailto:zahed.h.shaik@gmail.com" className="btn secondary">Contact Me</a>
            </div>
          </div>

          <div className="pipeline-panel">
            <div className="panel-head">
              <div><span className="kicker">LIVE SIMULATION</span><h2>CI/CD PIPELINE</h2></div>
              <span className="status-pill success"><span/> ONLINE</span>
            </div>
            <div className="pipeline">
              {pipelineStages.map((s, i) => {
                const Icon = s.icon;
                return <React.Fragment key={s.key}>
                  <button className={`stage ${stage === s.key ? "active" : ""}`} onClick={() => setStage(s.key)}>
                    <div className="stage-num">0{i+1}</div>
                    <Icon size={21}/>
                    <strong>{s.label}</strong>
                    <small>{s.sub}</small>
                  </button>
                  {i < pipelineStages.length - 1 && <div className="pipe-line"><span/></div>}
                </React.Fragment>
              })}
            </div>
            <div className={`terminal ${chaos ? "terminal-chaos" : ""}`}>
              <div className="terminal-bar"><span/><span/><span/><b>deploy@zahed:~/{stage}</b></div>
              <div className="terminal-body">
                <div className="terminal-command">$ ./inspect --stage {stage} --mode portfolio</div>
                {chaos ? (
                  <div className="log-stack"><div className="critical">[CRITICAL] chaos-monkey injected transient UI fault</div><div className="critical">[CRITICAL] non-critical component unavailable</div>{healing && <div className="success-log">[SELF-HEAL] rollback + health check + restore → OK</div>}</div>
                ) : (
                  <div className="log-stack">{activeStage.log.map((x, i) => <div key={i} className={x.includes("[OK]") || x.includes("[SUCCESS]") ? "success-log" : ""}>{x}</div>)}</div>
                )}
                <div className="cursor-line"><span>_</span></div>
              </div>
            </div>
            <div className="stage-detail">
              <div className="detail-label">STAGE CONTEXT</div>
              <p>{stage === "source" && "Version control is the system of record. Git and GitHub are the starting point for repeatable delivery."}
                 {stage === "build" && "Build automation turns source into reproducible artifacts and container images."}
                 {stage === "test" && "Health checks and automated validation protect the path to production."}
                 {stage === "deploy" && "Cloud and container runtime concepts connect engineering work to usable services."}</p>
            </div>
          </div>
        </section>

        <section className="ticker">
          <div>DEVOPS ENGINEERING</div><div>LINUX</div><div>CONTAINERS</div><div>CI/CD</div><div>CLOUD</div><div>INFRASTRUCTURE AS CODE</div><div>OBSERVABILITY</div>
        </section>

        <section id="stack" className="section">
          <div className="section-heading">
            <div><span className="kicker">SYSTEM MAP / 01</span><h2>Infrastructure Stack</h2></div>
            <p>Hover or tap a tool to run a simulated health check.</p>
          </div>
          <div className="layers-grid">
            {layers.map(layer => {
              const Icon = layer.icon;
              return <article className={`layer-card ${layer.accent}`} key={layer.title}>
                <div className="layer-top"><span>{layer.tag}</span><Icon size={19}/></div>
                <h3>{layer.title}</h3>
                <div className="skill-list">
                  {layer.skills.map(skill => {
                    const state = health[skill];
                    return <button key={skill} className="skill-chip" onMouseEnter={() => checkHealth(skill)} onClick={() => checkHealth(skill)}>
                      <span className="health-dot"/><span>{skill}</span><em>{state === "CHECKING" ? "[CHECKING]" : state === "HEALTHY" ? "[HEALTHY]" : "[PENDING]"}</em>
                    </button>
                  })}
                </div>
              </article>
            })}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-heading">
            <div><span className="kicker">OPERATIONS / 02</span><h2>Project Log Matrix</h2></div>
            <p>Filter the lab by provider or tool, then inspect the architecture trace.</p>
          </div>
          <div className="console">
            <div className="console-toolbar">
              <div className="filter"><span>PROVIDER</span><select value={filterProvider} onChange={e=>setFilterProvider(e.target.value)}><option>ALL</option><option>AWS</option><option>Azure</option><option>Linux</option></select></div>
              <div className="filter"><span>TOOL</span><select value={filterTool} onChange={e=>setFilterTool(e.target.value)}><option>ALL</option><option>Docker</option><option>GitHub</option><option>CI/CD</option><option>Jenkins</option><option>Shell</option><option>React</option></select></div>
              <div className="console-count"><span className="live-dot"/> {filtered.length} RECORDS</div>
            </div>
            <div className="project-table">
              <div className="table-head"><span>PROJECT</span><span>PROVIDER</span><span>TOOLCHAIN</span><span>STATUS</span><span></span></div>
              {filtered.map(p => <div className="project-row-wrap" key={p.id}>
                <button className="project-row" onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                  <span className="project-name"><span className="row-index">#{String(projects.indexOf(p)+1).padStart(2,"0")}</span><b>{p.name}</b></span>
                  <span>{p.provider}</span>
                  <span className="tool-tags">{p.tools.map(t=><i key={t}>{t}</i>)}</span>
                  <span className={`status-text ${p.status === "BUILDING" ? "amber" : "green"}`}><span/> {p.status}</span>
                  <ChevronDown className={expanded === p.id ? "rotate" : ""} size={17}/>
                </button>
                {expanded === p.id && <div className="project-expand">
                  <div className="expand-copy"><span className="kicker">ARCHITECTURE TRACE</span><p>{p.description}</p><a href={p.url} target="_blank" rel="noreferrer">Open repository <ExternalLink size={14}/></a><div className="spec-tags">{p.specs.map(s=><span key={s}>{s}</span>)}</div></div>
                  <pre>{p.architecture.join("\n  ↓\n")}</pre>
                </div>}
              </div>)}
            </div>
          </div>
        </section>

        <section id="estimator" className="section">
          <div className="section-heading">
            <div><span className="kicker">ARCHITECTURE / 03</span><h2>Cost & Architecture Estimator</h2></div>
            <p>Generate a lightweight infrastructure brief from a hiring-manager scenario.</p>
          </div>
          <div className="estimator">
            <div className="config">
              <div className="config-head"><Gauge size={19}/><span>CONFIGURE TARGET</span></div>
              <label>Cloud Provider<select value={cloud} onChange={e=>setCloud(e.target.value)}><option>AWS</option><option>Azure</option></select></label>
              <label>Architecture Scale<select value={scale} onChange={e=>setScale(e.target.value)}><option>Small</option><option>Medium</option><option>Enterprise</option></select></label>
              <label>Compliance<select value={compliance} onChange={e=>setCompliance(e.target.value)}><option>Standard</option><option>Security-focused</option><option>Regulated</option></select></label>
              <div className="est-note"><ShieldCheck size={16}/> Spec is an illustrative planning output, not a cloud price quote.</div>
            </div>
            <div className="yaml">
              <div className="yaml-head"><FileCode2 size={17}/> generated-spec.yaml <span>LIVE</span></div>
              <pre>{spec}</pre>
              <div className="yaml-footer"><Check size={15}/> Configuration validated</div>
            </div>
          </div>
        </section>

        <section className="chaos-section">
          <div>
            <span className="kicker">FAULT INJECTION LAB</span>
            <h2>Trust the system. Then break it.</h2>
            <p>Trigger a controlled UI failure to see the portfolio's self-healing simulation.</p>
          </div>
          <button className="chaos-btn" onClick={triggerChaos} disabled={chaos}><Zap size={16}/> {chaos ? "RECOVERY IN PROGRESS" : "TRIGGER CHAOS MONKEY"}</button>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-main">
            <div><span className="kicker">CONTACT / 04</span><h2>Build something<br/><span>reliable.</span></h2><p>I'm looking for opportunities where I can keep learning, automate repeatable work, and contribute to dependable infrastructure.</p></div>
            <div className="contact-grid">
              <a href="mailto:zahed.h.shaik@gmail.com"><span>EMAIL</span><b>zahed.h.shaik@gmail.com</b></a>
              <a href="tel:+917000000001"><span>CONTACT</span><b>+91 7********1</b></a>
              <a href="https://www.linkedin.com/in/zahed-h-shaik" target="_blank" rel="noreferrer"><span>LINKEDIN</span><b>zahed-h-shaik <ExternalLink size={14}/></b></a>
              <a href="https://github.com/zahed-shaik-dev" target="_blank" rel="noreferrer"><span>GITHUB</span><b>zahed-shaik-dev <ExternalLink size={14}/></b></a>
            </div>
          </div>
          <footer>
            <span>© 2026 Zahed Hussain Shaik</span>
            <span className="mono">status: <b>operational</b> · build: 1.0.0</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

function MapPin() { return <Globe2 size={14}/>; }
createRoot(document.getElementById("root")).render(<App />);
