/* =====================================================================
   PORTFOLIO CONTENT — edit this file to update the website.
   ---------------------------------------------------------------------
   Everything on the site (skill map, counts, projects, milestones)
   is generated from the data below. You never need to touch HTML/CSS
   to add a project, a certificate or a skill.

   How it fits together
   • evidence[] : projects, roles, competitions, awards, certifications
                  and courses. Each item lists the skill ids it proves
                  in `skills: [...]`.
   • tree[]     : the skill map. Category → capability → skill
                  (three levels maximum).
   • A skill's status is calculated automatically:
       Learning — no project / role / competition evidence yet
       Applied  — at least one project, role or competition
       Proven   — at least two of those AND `proven: true` on the skill
                  (set it once you can rebuild the work without help)
   ===================================================================== */

window.PORTFOLIO = {

  /* ------------------------------------------------------------- profile */
  profile: {
    name: "Nguyen Quoc An",
    shortName: "An Nguyen",
    initials: "AN",
    tagline: "Finance × Data",
    intro: "I use analytics to understand business performance, risk and financial decisions.",
    location: "Ho Chi Minh City, Vietnam",
    email: "antthkdhg@gmail.com",
    linkedin: "https://www.linkedin.com/in/ann-nguyen-a4802a245",
    // Put your CV PDF in assets/cv/ and write its path here, e.g. "assets/cv/An_Nguyen_CV.pdf".
    // Leave empty ("") to hide the "Download CV" buttons.
    cvUrl: "",
    currently: {
      school: "RMIT University Vietnam",
      program: "Bachelor of Business · Finance; Business & Technology",
      detail: "Graduating January 2027"
    },
    seeking: {
      roles: "Finance Analytics · Data Analytics",
      detail: "Internships · Ho Chi Minh City"
    },
    languages: "Vietnamese (native) · English (professional) · German (basic)"
  },

  /* ------------------------------------------------- project categories */
  categories: [
    { id: "finance", name: "Finance" },
    { id: "analytics", name: "Data Analytics" },
    { id: "ml", name: "Machine Learning" },
    { id: "business", name: "Business" }
  ],

  /* ------------------------------------------------------------ evidence
     type: "project" | "role" | "competition" | "award" | "certification" | "course"
     Projects also carry their case-study content (shown on project.html?id=...).
     Optional project fields: contribution[], limitations[], learned[]
     (each section is hidden when empty).
     featured: true  → shown in "Featured" on the Projects page
     featured: false → shown in "Archive & experiments"                      */
  evidence: [
    {
      id: "credit-risk",
      type: "project",
      featured: true,
      title: "Consumer Credit Risk & Lending Policy Analytics",
      short: "Consumer Credit Risk",
      subtitle: "Credit scoring",
      year: "2026",
      categories: ["ml", "finance"],
      summary: "Credit-scoring models that turn probability-of-default rankings into a lending approval policy.",
      problem: "Rank loan applicants by their probability of default and translate that ranking into a lending policy a credit team could use.",
      data: "Four integrated datasets: customer, credit-bureau, loan and transaction data, covering 9,999 applications and 479,860 transactions.",
      method: [
        "Engineered affordability, credit-behaviour and transaction-stress features.",
        "Compared an interpretable WoE-based L1 logistic regression with a nonlinear Random Forest.",
        "Checked probability calibration, explained predictions with SHAP and ran a fairness assessment."
      ],
      result: [
        "Translated probability-of-default rankings into a 70% approval policy.",
        "Recommended production drift monitoring for the deployed model."
      ],
      contribution: [],   // e.g. "Built the feature definitions", "Used AI assistance for debugging"
      limitations: [],
      learned: [],
      links: [
        { label: "Project files", url: "https://drive.google.com/drive/folders/1TZCRWXPbtYixXc6h3eLPwQMTbYHOJb5o?usp=drive_link" }
      ],
      skills: ["da", "py", "pd", "sk", "stat", "ml", "cls", "eval", "xai", "shap"]
    },
    {
      id: "ecommerce",
      type: "project",
      featured: true,
      title: "E-commerce Sales & Operations Analytics",
      short: "E-commerce Analytics",
      subtitle: "Operations modelling",
      year: "2026",
      categories: ["analytics", "ml"],
      summary: "A sales-and-profit dashboard plus a leakage-aware model that predicts delivery time at the moment an order is placed.",
      problem: "Give the business a clear view of sales and profit, and estimate how long an order will take to arrive using only what is known when it is placed.",
      data: "",
      method: [
        "Built a sales-and-profit dashboard.",
        "Trained a delivery-time model using only order-placement features.",
        "Excluded post-purchase outcomes so the model could not learn from information it would not have in practice (leakage)."
      ],
      result: [
        "Delivery-time predictions with a mean absolute error of about 7.56 days."
      ],
      contribution: [],
      limitations: [],
      learned: [],
      links: [
        { label: "Project files", url: "https://drive.google.com/drive/folders/1Csgp3QMVk0j8Kxi9D9zvR98xEciw2HL-?usp=sharing" }
      ],
      skills: ["da", "bi", "dash", "kpi", "py", "pd", "ml", "reg", "eval"]
    },
    {
      id: "svc-valuation",
      type: "project",
      featured: true,
      title: "SVC Operating Forecast & FCFE Valuation",
      short: "SVC Forecast & Valuation",
      subtitle: "Forecasting & valuation",
      year: "2026",
      categories: ["finance"],
      summary: "Driver-based FY2026E–FY2030E operating forecast and FCFE valuation, reforecast after Q1 actuals.",
      problem: "Forecast SVC's operations, value the equity, and find which parts of the business actually drive profit.",
      data: "Company financial statements and operating data, analysed in Excel and LSEG Workspace.",
      method: [
        "Built driver-based FY2026E–FY2030E forecasts of revenue, margins, SG&A, working capital and capex.",
        "Valued the equity using free cash flow to equity (FCFE).",
        "Reforecast FY2026 after Q1 actuals and bridged the value change into SG&A and margin-assumption effects."
      ],
      result: [
        "Services generate 37.2% of gross profit from 10.1% of revenue, pointing to after-sales productivity over showroom growth.",
        "Value per share moved from VND 22,918 to VND 17,855 after the Q1 reforecast.",
        "Set service-margin thresholds (above 24% / below 21%) that would change the recommendation."
      ],
      contribution: [],
      limitations: [],
      learned: [],
      links: [
        { label: "Valuation analysis", url: "https://drive.google.com/drive/folders/1tahxT1oXS56IBmr47B9q4Ls8KwOElNh8?usp=drive_link" },
        { label: "Business analysis report", url: "https://drive.google.com/file/d/1QK6RoujLzNLbmB-PcGvT9Li62DlKkRKx/view?usp=sharing" }
      ],
      skills: ["xl", "fa", "fs", "wc", "fc", "scen", "val", "fcfe"]
    },

    /* roles / experience */
    {
      id: "rbac", type: "role",
      title: "Case Team Leader · RMIT Business Analytics Champion",
      short: "RMIT BA Champion",
      subtitle: "RMIT Analytics Club", year: "2024–2025",
      details: [
        "Led a four-member team that designed three analytics competition rounds for 300 teams and 1,000+ participants.",
        "Delivered six case studies with Colgate-Palmolive, Base.vn and WiDS and coordinated 20 academic and industry mentors.",
        "Organised a panel for 100 attendees with a Shopee senior manager."
      ],
      skills: ["ps", "comm", "coord", "pres"]
    },
    {
      id: "ielts", type: "role",
      title: "Private IELTS Tutor", short: "IELTS tutoring",
      subtitle: "Self-employed", year: "2024–now",
      details: ["Individual study plans and progress tracking; learners achieved verified IELTS scores of up to 7.0."],
      skills: ["comm", "coord"]
    },

    /* competitions & awards */
    {
      id: "tomorrow-marketers", type: "competition",
      title: "Top 12 of 200 teams · Tomorrow Marketers Case Competition",
      short: "Tomorrow Marketers",
      subtitle: "Business Analytics & Consulting", year: "2025",
      skills: ["da", "kpi", "ps", "pres"]
    },
    {
      id: "aic", type: "award",
      title: "National Champion · AI Competition (AIC)",
      short: "AIC National Champion",
      subtitle: "Deakin University & FPT University", year: "2023",
      skills: []   // add the skills this competition used, e.g. ["ml"]
    },

    /* certifications */
    { id: "cert-python", type: "certification", title: "Intermediate Python", subtitle: "DataCamp", year: "2025", skills: ["py"] },
    { id: "cert-swe", type: "certification", title: "Foundations of Software Engineering", subtitle: "FullStackDataScience", year: "2025", skills: ["py"] },
    { id: "cert-sql", type: "certification", title: "Intermediate SQL", subtitle: "XomData", year: "2026", skills: ["sql"] },
    { id: "cert-fsa", type: "certification", title: "Corporate Financial Statement Analysis", subtitle: "LinkedIn Learning", year: "2024", skills: ["fa", "fs"] },

    /* coursework (RMIT) */
    { id: "course-ba", type: "course", title: "Introduction to Business Analytics", subtitle: "RMIT", year: "", skills: ["da", "kpi"] },
    { id: "course-fqa", type: "course", title: "Forecasting & Quantitative Analysis", subtitle: "RMIT", year: "", skills: ["stat", "fc"] },
    { id: "course-eco", type: "course", title: "Basic Econometrics", subtitle: "RMIT", year: "", skills: ["stat", "reg"] },
    { id: "course-bdm", type: "course", title: "Business Decision Making", subtitle: "RMIT", year: "", skills: ["ps"] },
    { id: "course-cf", type: "course", title: "Corporate Finance", subtitle: "RMIT", year: "", skills: ["fa", "val"] },
    { id: "course-eq", type: "course", title: "Equity Investment & Portfolio Management", subtitle: "RMIT", year: "", skills: ["inv"] },
    { id: "course-mdm", type: "course", title: "Money & Debt Markets", subtitle: "RMIT", year: "", skills: ["inv"] }
  ],

  /* ------------------------------------------------------------ skill map
     icon names are defined in assets/js/common.js (ICONS).
     proven: true  → can become "Proven" (needs ≥ 2 projects/roles/competitions). */
  tree: [
    {
      id: "analytics", name: "Analytics", icon: "cat_analytics",
      capabilities: [
        { id: "da", name: "Data Analysis", icon: "magnify",
          description: "Turning raw business data into answers: cleaning, joining, aggregating and explaining what changed.",
          skills: [
            { id: "sql", name: "SQL", icon: "db", description: "Currently strengthening: joins, CTEs and window functions on business data." },
            { id: "xl", name: "Excel", icon: "sheet", description: "Linked forecasting models with sensitivity and scenario tables." }
          ] },
        { id: "bi", name: "BI & Reporting", icon: "pie",
          description: "Reports and dashboards that make performance easy to read and act on.",
          skills: [
            { id: "pbi", name: "Power BI", icon: "bars_v", description: "Learning. Add a project here once a dashboard is built in Power BI." },
            { id: "dash", name: "Dashboarding", icon: "dashboard", description: "Designing dashboards around the decisions they support." },
            { id: "kpi", name: "KPI Analysis", icon: "target", description: "Choosing, defining and tracking the metrics that matter to a business." }
          ] }
      ]
    },
    {
      id: "data", name: "Data / ML", icon: "cat_data",
      capabilities: [
        { id: "py", name: "Python", icon: "code",
          description: "Used for data preparation, analysis and modelling.",
          skills: [
            { id: "pd", name: "pandas", icon: "table", description: "Cleaning, merging and reshaping tabular data." },
            { id: "sk", name: "scikit-learn", icon: "package", description: "Training and comparing machine-learning models." }
          ] },
        { id: "stat", name: "Statistics", icon: "dist",
          description: "Distributions, calibration and inference behind the models and forecasts.", skills: [] },
        { id: "ml", name: "Machine Learning", icon: "network",
          description: "Supervised models for credit risk and delivery-time prediction.",
          skills: [
            { id: "cls", name: "Classification", icon: "classes", description: "Predicting categories such as default / no default." },
            { id: "reg", name: "Regression", icon: "fit", description: "Predicting continuous values such as delivery time." },
            { id: "eval", name: "Model Evaluation", icon: "gauge", description: "Calibration, error metrics, leakage checks and fairness." }
          ] },
        { id: "xai", name: "Explainability", icon: "eye",
          description: "Making model decisions understandable to non-technical stakeholders.",
          skills: [
            { id: "shap", name: "SHAP", icon: "bars_h", description: "Feature-level explanations of individual predictions." }
          ] }
      ]
    },
    {
      id: "finance", name: "Finance", icon: "cat_finance",
      capabilities: [
        { id: "fa", name: "Financial Analysis", icon: "report",
          description: "Reading and reconciling financial statements to understand performance.",
          skills: [
            { id: "fs", name: "Financial Statements", icon: "doc", description: "Income statement, balance sheet and cash-flow analysis." },
            { id: "wc", name: "Working Capital", icon: "cycle", description: "Receivables, inventory and payables in the cash cycle." }
          ] },
        { id: "fc", name: "Forecasting", icon: "trend",
          description: "Driver-based forecasts of revenue, margins, SG&A, working capital and capex.",
          skills: [
            { id: "scen", name: "Scenario Analysis", icon: "branch", description: "Thresholds and scenarios that would change a recommendation." }
          ] },
        { id: "val", name: "Valuation", icon: "tag",
          description: "Turning forecasts into a value per share.",
          skills: [
            { id: "fcfe", name: "FCFE", icon: "cashflow", description: "Free cash flow to equity valuation." }
          ] },
        { id: "inv", name: "Investment Analysis", icon: "candle",
          description: "Learning: building an investment thesis from annual reports.", skills: [] }
      ]
    },
    {
      id: "business", name: "Business", icon: "cat_business",
      capabilities: [
        { id: "ps", name: "Problem Structuring", icon: "hierarchy", proven: true,
          description: "Breaking open-ended business questions into analysable parts.", skills: [] },
        { id: "comm", name: "Stakeholder Communication", icon: "bubbles", proven: true,
          description: "Working with partners, mentors and learners to keep everyone aligned.", skills: [] },
        { id: "coord", name: "Project Coordination", icon: "check", proven: true,
          description: "Planning, tracking and delivering multi-person projects.", skills: [] },
        { id: "pres", name: "Presentation", icon: "present",
          description: "Presenting analysis and recommendations to an audience.", skills: [] }
      ]
    }
  ],

  /* ----------------------------------------------------------- milestones
     kind: "featured" (one only) | "standard" | "upcoming"                   */
  milestones: [
    { year: "2023", title: "National Champion", subtitle: "AI Competition (AIC) · Deakin & FPT", kind: "featured", icon: "trophy" },
    { year: "2024 – 2025", title: "Case Team Leader", subtitle: "RMIT Business Analytics Champion", kind: "standard", icon: "flag" },
    { year: "2025", title: "Top 12 of 200 teams", subtitle: "Tomorrow Marketers case competition", kind: "standard", icon: "star" },
    { year: "Jan 2027", title: "Graduation", subtitle: "RMIT · Finance; Business & Technology", kind: "upcoming", icon: "cap" }
  ],

  /* ------------------------------------------------------ recommendations */
  recommendations: [
    { name: "Dr Huy Pham", role: "Associate Professor of Finance, RMIT University Vietnam · Corporate Finance lecturer",
      url: "https://drive.google.com/file/d/1NyH1JkcsLc3xe0ZUlW-55_nETcYJJQBj/view?usp=sharing" },
    { name: "Dr Chung Phan", role: "Lecturer in Economics and Finance, RMIT University Vietnam · RBAC academic mentor",
      url: "https://drive.google.com/file/d/10icxC45NZ1jSOsfW47gUyked7GQoBn7Q/view?usp=sharing" }
  ]
};
