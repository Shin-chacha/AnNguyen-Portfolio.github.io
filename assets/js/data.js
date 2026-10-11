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
    {
      id: "fpt-equity",
      type: "project",
      featured: true,
      title: "FPT Equity Research: Forecast, DDM Valuation & Risk-Return",
      short: "FPT Equity Research",
      subtitle: "Equity valuation",
      year: "2026",
      categories: ["finance"],
      summary: "Segment-based FY2026F–FY2030F forecast, two-stage DDM and risk-return analysis behind a Selective BUY/Accumulate call on FPT.",
      problem: "Is FPT worth buying at its current price, and on what terms? Value the shares and set an entry, target and stop-loss a disciplined investor could act on.",
      data: "FPT annual reports (FY2021–FY2025), SSI Research, VietstockFinance and VN-Index price history, with market data such as the 10-year Vietnamese government bond yield. Modelled in an Excel working sheet.",
      method: [
        "Rebuilt the revenue base after FOX was deconsolidated (VND70,113B down to a comparable VND50,606B), then forecast Technology and Education separately because their margins differ sharply.",
        "Estimated the cost of equity with CAPM (risk-free rate 4.37%, Re 9.77%) and a WACC of 9.02% from market-value weights.",
        "Showed that a single-stage Gordon model fails (implied g of 17.64% exceeds Re) and used a two-stage DDM with a 5% terminal growth rate.",
        "Compared FPT with the VN-Index on CAGR, volatility, Sharpe, Treynor and beta, and added a technical entry plan and an ESG review."
      ],
      result: [
        "Forecast revenue rises from VND58.6 trillion (FY2026F) to VND104.6 trillion (FY2030F).",
        "Base-case DDM value is VND60,475 per share; raising terminal growth to 7% lifts it to about VND98,456.",
        "FPT returned 24.49% a year against 6.18% for the VN-Index, with a Sharpe ratio of 0.74 against 0.08 and a beta of 0.93.",
        "Recommended Selective BUY/Accumulate with a VND88,000–98,000 target band and a stop-loss at VND64,000, a reward-to-risk of 3.0–4.7×."
      ],
      contribution: [
        "Individual assignment.",
        "Used ChatGPT-4o for a first draft of the ESG discussion; the final wording was rewritten by hand with further research."
      ],
      limitations: [
        "The base-case DDM value sits below the market price, so the upside depends on sustained growth and a re-rating rather than on dividends alone.",
        "A DDM is conservative for a high-growth company that retains most of its earnings, so it serves as a floor and a cross-check."
      ],
      learned: [],
      links: [
        { label: "Report and working sheet", url: "https://drive.google.com/drive/folders/1SRjhDaoknyNc27-bKVdfF1l_uicVi6ol?usp=drive_link" }
      ],
      skills: ["xl", "fa", "fs", "fc", "scen", "val", "ddm", "inv", "risk"]
    },
    {
      id: "vn30-portfolio",
      type: "project",
      featured: true,
      title: "Equity Portfolio Management: Passive and Two Active VN30 Portfolios",
      short: "VN30 Portfolio Management",
      subtitle: "Portfolio construction",
      year: "2026",
      categories: ["finance"],
      summary: "A nine-stage process that built and evaluated three VND100 billion Vietnamese equity portfolios against the MRP-20 benchmark.",
      problem: "Build one passive and two active portfolios of Vietnamese listed shares, each with VND100 billion, and find out whether the active process beats the benchmark within its security, sector, liquidity and concentration limits.",
      data: "The dated VN30 universe (3 August 2026), company financials, macro data and broker valuation comparisons, evaluated with LSEG portfolio-analytics workbooks.",
      method: [
        "Wrote an investment policy statement, then ran a funnel: eligibility and liquidity screens, a macro transmission gate, an industry attractiveness score and a four-pillar fundamental score.",
        "Narrowed 30 VN30 shares to 19 candidates, of which 12 passed the fundamental gate (8 robustly, 4 on the boundary).",
        "Added a technical entry overlay (moving averages, trend, volume and ATR), then sized positions within the mandate's limits.",
        "Measured return, tracking error, ex-ante risk and sector-allocation versus selection attribution against the MRP-20."
      ],
      result: [
        "The passive portfolio matched the MRP-20 exactly (−2.60%).",
        "Active Portfolio 1 returned +1.50% but trailed the benchmark by 0.74 percentage points.",
        "Active Portfolio 2 lost 1.25% but beat the benchmark by 1.15 percentage points, with +0.96 points from sector allocation and +0.19 points from selection.",
        "Found that the binding constraint was the concentration rule: seven of the twelve eligible shares were banks, but only three could be held."
      ],
      contribution: [
        "Group project with four members."
      ],
      limitations: [
        "Each active portfolio has only ten daily return observations, so the results cannot show lasting investment skill.",
        "Both active portfolios missed the 90% invested floor, and an order in Active Portfolio 2 was executed at the wrong target weight.",
        "Missing evidence kept Industrials and Real Estate (about 30% of the benchmark) out of the portfolios."
      ],
      learned: [],
      links: [
        { label: "Portfolio report", url: "https://drive.google.com/drive/folders/1YrFwnOL0CixLHb8CvCR-3Og7uxgGdqjt?usp=drive_link" }
      ],
      skills: ["xl", "inv", "port", "risk", "fa", "val", "ps"]
    },
    {
      id: "flfp-regression",
      type: "project",
      featured: true,
      title: "What Drives Female Labour-Force Participation? A Cross-Country Regression",
      short: "Female Labour-Force Regression",
      subtitle: "Econometrics",
      year: "2025",
      categories: ["analytics"],
      summary: "A multiple-regression study of female labour-force participation across 59 lower-income countries, tested for misspecification and heteroskedasticity.",
      problem: "Which social and economic factors explain differences in female labour-force participation between countries, and does the effect of urbanisation depend on women's education?",
      data: "World Bank World Development Indicators for 2022, covering countries below upper-middle income: 66 complete observations, 59 after removing influential points.",
      method: [
        "Handled missing values with complete-case analysis and removed influential points using Cook's distance.",
        "Regressed participation on fertility, urbanisation, education, GDP per capita, legal protection against discrimination and the female wage share, with a squared wage term and an urbanisation × education interaction.",
        "Checked multicollinearity (VIF, with mean-centring), functional form (RESET) and heteroskedasticity (Breusch-Pagan and White) in RStudio.",
        "Ran robustness checks: an alternative interaction, a model without education and a log-fertility specification."
      ],
      result: [
        "Each extra point of fertility rate is linked to about 8.4 points lower participation (significant at 1%).",
        "Countries with laws against gender discrimination show about 13.9 points higher participation (significant at 1%).",
        "The wage share has a U-shaped effect with a turning point near 34.8%; the final model explains 57% of the variation (adjusted R² 0.51) and passes the RESET, Breusch-Pagan and White tests.",
        "Recommended wider access to reproductive health and family planning, and stronger enforcement of anti-discrimination and wage laws."
      ],
      contribution: [],
      limitations: [
        "Education and its interaction term still have high VIFs (above 10).",
        "Urbanisation may be endogenous, and this is discussed but not formally tested.",
        "Dropping education doubles the sample to 118 but cuts the adjusted R² to 0.21, so the results are sensitive to the sample."
      ],
      learned: [],
      links: [
        { label: "Research report", url: "https://docs.google.com/document/d/1IO6zMxTMOcMHNuawFrL7iklzQyXuJW5W/edit?usp=sharing" }
      ],
      skills: ["stat", "econ", "rlang", "da"]
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
    { id: "course-eco", type: "course", title: "Basic Econometrics", subtitle: "RMIT", year: "", skills: ["stat", "econ"] },
    { id: "course-bdm", type: "course", title: "Business Decision Making", subtitle: "RMIT", year: "", skills: ["ps"] },
    { id: "course-cf", type: "course", title: "Corporate Finance", subtitle: "RMIT", year: "", skills: ["fa", "val"] },
    { id: "course-eq", type: "course", title: "Equity Investment & Portfolio Management", subtitle: "RMIT", year: "", skills: ["inv", "port"] },
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
          description: "Distributions, calibration and inference behind the models and forecasts.",
          skills: [
            { id: "econ", name: "Econometrics", icon: "fit", description: "Multiple regression with diagnostics: VIF, RESET, Breusch-Pagan and White tests, Cook's distance." },
            { id: "rlang", name: "R / RStudio", icon: "rlang", description: "Estimating and testing regression models in R." }
          ] },
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
            { id: "fcfe", name: "FCFE", icon: "cashflow", description: "Free cash flow to equity valuation." },
            { id: "ddm", name: "DDM & WACC", icon: "coins", description: "Two-stage dividend discount model, CAPM cost of equity and WACC." }
          ] },
        { id: "inv", name: "Investment Analysis", icon: "candle",
          description: "Building an investment thesis, constructing portfolios and judging the result against a benchmark.",
          skills: [
            { id: "port", name: "Portfolio Construction", icon: "layers", description: "Screening a universe, scoring candidates and sizing positions within mandate limits." },
            { id: "risk", name: "Risk & Performance", icon: "shield", description: "Beta, Sharpe and Treynor ratios, tracking error and performance attribution." }
          ] }
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
