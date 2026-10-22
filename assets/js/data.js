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
    supporting: "Applying analytical thinking across financial performance, consumer behaviour and commercial strategy.",
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
    { id: "business", name: "Business" },
    { id: "commercial", name: "Commercial Strategy" }
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
      summary: "A probability-of-default model that cuts expected credit losses by 77.7% while still approving 70% of applicants.",
      problem: "A UK consumer lender (a coursework case) saw defaults climb from 7% to over 10%. Replace its old rules-based scorecard with a model that ranks applicants by probability of default and reduces expected loss by at least 25% at a 70% approval rate.",
      data: "Four uncleaned tables at a 20 June 2026 snapshot: customers, credit bureau, loans and 18 months of transactions (479,860 rows). 9,999 loan applications with a 10% default rate, split 80/20 into training and validation sets.",
      method: [
        "Documented each data-quality issue and treated it by cause: for example, a missing months-since-delinquency means \"never delinquent\", so it got a sentinel value rather than an imputed one.",
        "Aggregated transactions to one row per customer, joined the four tables and excluded loss-given-default from the inputs to avoid target leakage.",
        "Built Weight-of-Evidence and Information Value encodings plus ratio features such as loan-to-monthly-income.",
        "Tuned an L1 logistic regression and a Random Forest with 5-fold cross-validation, then checked calibration, explained individual decisions with SHAP and ran a regional fairness check."
      ],
      result: [
        "Chose the L1 logistic regression: validation Gini 0.664 (AUC 0.832) against 0.657 for the Random Forest, with a KS of 0.52 and a Brier score of 0.074.",
        "At a 70% approval rate, expected loss falls from £2.38M (approve everyone) to £0.53M, a 77.7% reduction against the 25% target.",
        "A loss breakdown found unemployed applicants are 9.8% of the book but 28.5% of losses, and under-35s cause 51.8% of losses.",
        "Proposed drift monitoring with Population Stability Index alerts (investigate above 0.10, urgent above 0.25) and vintage-based checks for target drift."
      ],
      contribution: [],
      limitations: [
        "Interest rate is a strong predictor, but it partly reflects the lender's previous pricing, so it may carry the old model's view of risk.",
        "Defaulters and non-defaulters still overlap at low scores, so the model ranks risk well but cannot identify every default.",
        "Region carries little weight (IV 0.01), but approval rates by region should still be monitored for proxy discrimination."
      ],
      learned: [],
      links: [
        { label: "Notebook and analysis files", url: "https://drive.google.com/drive/folders/1TZCRWXPbtYixXc6h3eLPwQMTbYHOJb5o?usp=sharing" }
      ],
      role: "",
      star: {
        "situation": "A UK consumer lender (coursework case) saw defaults rise from 7% to over 10%, about £4.2M of unexpected losses, while still using a five-year-old rules-based scorecard.",
        "task": "Build a probability-of-default model that cuts expected loss by at least 25% at a 70% approval rate, and explain it to a non-technical risk committee.",
        "action": "Cleaned and joined four tables, engineered WoE and ratio features without leakage, compared L1 logistic regression with a Random Forest, then checked calibration, SHAP explanations and regional fairness.",
        "result": "Recommended the logistic model (Gini 0.664, Brier 0.074). On validation data, a 70% approval policy cuts modelled expected loss by 77.7%, from £2.38M to £0.53M."
      },
      highlights: [
        {
          "value": "77.7%",
          "label": "modelled cut in expected loss at 70% approval"
        },
        {
          "value": "0.664",
          "label": "validation Gini (AUC 0.832)"
        },
        {
          "value": "9,999",
          "label": "loan applications modelled"
        }
      ],
      figures: [
        {
          "src": "assets/projects/credit-risk/roc-gini.webp",
          "w": 790,
          "h": 590,
          "alt": "ROC curves on the validation set: logistic regression Gini 0.664 and Random Forest Gini 0.657, both well above the random baseline.",
          "caption": "The simpler, explainable logistic model edges the Random Forest on ranking power, so it was the one recommended."
        },
        {
          "src": "assets/projects/credit-risk/calibration.webp",
          "w": 790,
          "h": 590,
          "alt": "Calibration plot: predicted default probabilities track observed default rates closely, with a Brier score of 0.0737.",
          "caption": "Predicted probabilities line up with observed default rates, so the scores can support pricing and limits, not just ranking."
        },
        {
          "src": "assets/projects/credit-risk/top-features.webp",
          "w": 990,
          "h": 790,
          "alt": "Bar chart of the 20 largest absolute coefficients, led by employment status, loan amount, credit utilisation, interest rate and credit score.",
          "caption": "Employment status, loan size, utilisation and credit score drive the score: drivers a credit committee can sanity-check."
        }
      ],
      skills: ["da", "py", "pd", "sk", "stat", "ml", "cls", "eval", "xai", "shap"]
    },
    {
      id: "ecommerce",
      type: "project",
      featured: true,
      title: "E-commerce Platform Performance: Power BI, Delivery-Time Model & Seller Segmentation",
      short: "E-commerce Analytics (Power BI)",
      subtitle: "Power BI + operations modelling",
      year: "2026",
      categories: ["analytics", "ml"],
      summary: "A Power BI performance review of an e-commerce marketplace, a leakage-aware delivery-time model and a seller segmentation, turned into a prioritised logistics plan.",
      problem: "Order growth had plateaued. Find what is holding the platform back across business, logistics and marketing, and decide where to act first.",
      data: "Marketplace tables for orders, payments, reviews, products, seller leads (MQLs) and closed deals. Columns more than 50% empty were dropped, small gaps were filled with the mode or mean, and missing delivery dates were kept because they reflect order status.",
      method: [
        "Built a Power BI report on order growth, average order value, freight cost share, cancellations by lifecycle stage and delivery times.",
        "Predicted delivery time at the moment of purchase with a linear regression on log distance and buyer and seller state, excluding post-purchase fields to avoid leakage.",
        "Segmented sellers with K-Means, cross-checked with a Gaussian Mixture Model and PCA, on scale, logistics friction, reliability and growth.",
        "Ranked three logistics initiatives with a weighted decision matrix: impact, feasibility, time to value and complexity."
      ],
      result: [
        "Showed growth was capped by last-mile delivery, not sellers: seller handover lateness fell to zero within a month of launch while last-mile times stayed high.",
        "Delivery-time predictions with a mean absolute error of about 7.56 days, against a median delivery of about 10 days, using only information known at purchase.",
        "Predictive delivery estimates ranked first in the decision matrix (49 points against 33 and 30).",
        "Only 10.5% of seller leads converted; 484 strategic sellers formed the core revenue engine, while 488 underperforming sellers carried the most delivery risk."
      ],
      contribution: [
        "Team project with three members."
      ],
      limitations: [
        "An error of about a week is a deliberate trade-off: the model uses only features known at purchase, so it avoids leakage but cannot see later delays."
      ],
      learned: [],
      links: [
        { label: "Slide deck (PDF, 20 slides)", url: "https://drive.google.com/file/d/1bxbpknF946R55amaD_bG9Gt5sk6G1hMR/view" },
        { label: "Power BI report folder", url: "https://drive.google.com/drive/folders/1D21GyHvmCJ1FEB68dsPvljFtZD31VJuu?usp=sharing" },
        { label: "Delivery-model files", url: "https://drive.google.com/drive/folders/1Csgp3QMVk0j8Kxi9D9zvR98xEciw2HL-?usp=sharing" }
      ],
      role: "Team of 3",
      star: {
        "situation": "A marketplace's order growth had plateaued after early expansion, with flat order values, high freight costs and persistent delivery delays.",
        "task": "Find what was holding growth back across business, logistics and marketing, and decide where to act first.",
        "action": "Built a Power BI performance report, a leakage-free delivery-time model in Python and a seller segmentation, then ranked three logistics fixes with a weighted decision matrix.",
        "result": "Showed last-mile delivery, not sellers, was the bottleneck. The delivery-time model's error is about 7.56 days, and predictive delivery estimates ranked first (49 against 33 and 30)."
      },
      highlights: [
        {
          "value": "7.56 days",
          "label": "delivery-time error (MAE), known-at-purchase data only"
        },
        {
          "value": "49 vs 33 / 30",
          "label": "decision-matrix score for the ETA fix"
        },
        {
          "value": "10.5%",
          "label": "of seller leads converted"
        }
      ],
      figures: [
        {
          "src": "assets/projects/ecommerce/last-mile-delivery.webp",
          "w": 1600,
          "h": 620,
          "alt": "Two Power BI charts: average seller handling time falls from 771 hours at launch to about 50–90 hours, while last-mile delivery time stays at roughly 6–13 days.",
          "caption": "Seller handover delays vanished within a month of launch, but last-mile delivery stayed slow, so the fix belongs in logistics."
        },
        {
          "src": "assets/projects/ecommerce/eta-predictions.webp",
          "w": 1020,
          "h": 702,
          "alt": "Line chart of actual against predicted delivery days on the test set, with a 95% prediction interval.",
          "caption": "Predictions use only what is known at purchase, so the roughly one-week error is a realistic, deployable baseline."
        },
        {
          "src": "assets/projects/ecommerce/decision-matrix.webp",
          "w": 1400,
          "h": 555,
          "alt": "Weighted decision matrix scoring three logistics initiatives on impact, feasibility, time to value and complexity: Rec A 49, Rec B 33, Rec C 30.",
          "caption": "Predictive delivery estimates (Rec A) win on impact, feasibility and speed to value, so they come first."
        }
      ],
      skills: ["da", "bi", "pbi", "dash", "kpi", "py", "pd", "sk", "ml", "reg", "eval", "ps"]
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
        "Set service-margin thresholds (above 24% / below 21%) that would change the recommendation.",
        "Rated HOLD with a VND 17,900 target price (+2.6%), with very low confidence because most value sits beyond FY2030."
      ],
      contribution: [],
      limitations: [],
      learned: [],
      links: [
        { label: "Fundamental analysis report (PDF, 27 pages)", url: "https://drive.google.com/file/d/1QK6RoujLzNLbmB-PcGvT9Li62DlKkRKx/view?usp=sharing" },
        { label: "Project folder", url: "https://drive.google.com/drive/folders/1tahxT1oXS56IBmr47B9q4Ls8KwOElNh8?usp=drive_link" }
      ],
      role: "",
      star: {
        "situation": "SVC, a Vietnamese car dealer, had underperformed the VN-Index by 61 points over five years, and its FY2025 profit rested on a one-off disposal gain.",
        "task": "Value the equity on recurring economics and find which operating assumptions decide the rating.",
        "action": "Built driver-based FY2026E–FY2030E forecasts and a two-stage FCFE model, reforecast after Q1 2026 actuals, and tested one input at a time.",
        "result": "Rated HOLD at VND 17,855 per share (target 17,900), down from 22,918 before the Q1 update. A ±100bp move in service margin is worth about ±VND 9,000 per share."
      },
      highlights: [
        {
          "value": "37.2%",
          "label": "of gross profit from 10.1% of revenue"
        },
        {
          "value": "VND 17,855",
          "label": "value per share · HOLD"
        },
        {
          "value": "±9,000",
          "label": "VND per share for ±100bp service margin"
        }
      ],
      figures: [
        {
          "src": "assets/projects/svc-valuation/services-gross-profit.webp",
          "w": 1078,
          "h": 482,
          "alt": "Bar charts: services are 10% of FY2025 revenue but 37% of gross profit; service gross margin is 25.1% against 4.4% on vehicles.",
          "caption": "Services earn 5.8× the margin of vehicle sales, so a tenth of revenue delivers over a third of gross profit."
        },
        {
          "src": "assets/projects/svc-valuation/value-sensitivity.webp",
          "w": 1094,
          "h": 598,
          "alt": "Tornado chart of FCFE value per share when one input changes: service growth +200bp gives VND 30,520, the central case 17,860, and a 7.01% borrowing rate takes value below zero.",
          "caption": "Changing one input at a time moves value from below zero to about VND 30,500 per share, so the rating carries very low confidence."
        },
        {
          "src": "assets/projects/svc-valuation/value-bridge.webp",
          "w": 918,
          "h": 769,
          "alt": "Waterfall from the original forecast of VND 22,918 to the analyst base case of VND 17,855 per share, via Q1 2026 revenue, margin and receivable updates.",
          "caption": "Updating for Q1 2026 actuals moved the estimate from VND 22,918 to 17,855 and removed most of the apparent mispricing."
        }
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
        { label: "Equity research report (PDF, 59 pages)", url: "https://drive.google.com/file/d/1H9ntvzQ1Mq6-x_40WGKn-MDBw2g_oM8F/view" },
        { label: "Report and Excel working sheet", url: "https://drive.google.com/drive/folders/1SRjhDaoknyNc27-bKVdfF1l_uicVi6ol?usp=drive_link" }
      ],
      role: "Individual assignment",
      star: {
        "situation": "FPT had compounded revenue at 18.4% a year, yet by late 2025 its share price sat about 28% below its peak, leaving the investment case unclear.",
        "task": "Forecast FPT's earnings, value the shares and decide whether, and at what price, to buy.",
        "action": "Forecast Technology and Education revenue separately after FOX left the group, estimated a 9.77% cost of equity with CAPM, ran a two-stage DDM with sensitivity tests and compared risk-adjusted returns with the VN-Index.",
        "result": "Base-case value of VND 60,475 per share. Recommended Selective BUY/Accumulate with a VND 88,000–98,000 target band and a VND 64,000 stop-loss (3.0–4.7× reward-to-risk)."
      },
      highlights: [
        {
          "value": "24.5%",
          "label": "a year for FPT vs 6.2% for the VN-Index (2018–2025)"
        },
        {
          "value": "VND 60,475",
          "label": "base-case DDM value per share"
        },
        {
          "value": "88–98k",
          "label": "VND target band · stop 64k"
        }
      ],
      figures: [
        {
          "src": "assets/projects/fpt-equity/sensitivity-grid.webp",
          "w": 1400,
          "h": 253,
          "alt": "Sensitivity table of implied share price by cost of equity (9.77% to 15%) and terminal growth (4% to 8%); the base case of VND 60,475 is highlighted.",
          "caption": "At a 9.77% cost of equity, moving terminal growth from 5% to 7% lifts the value from VND 60,475 to 98,456, which is where the target band comes from."
        },
        {
          "src": "assets/projects/fpt-equity/fpt-vs-vnindex.webp",
          "w": 1400,
          "h": 718,
          "alt": "Cumulative price index from January 2018: FPT rises to about 5.6 times its starting level against 1.6 times for the VN-Index.",
          "caption": "FPT compounded far ahead of the market (24.5% against 6.2% a year) with only moderately higher volatility."
        },
        {
          "src": "assets/projects/fpt-equity/technical-entry.webp",
          "w": 1400,
          "h": 895,
          "alt": "TradingView weekly chart of FPT marking a support zone around VND 65,000–70,000 with an entry, stop and profit target.",
          "caption": "The chart sets entry timing only; the report's plan is a stop at VND 64,000 and a target band of 88,000–98,000."
        }
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
        "Solo project."
      ],
      limitations: [
        "Each active portfolio has only ten daily return observations, so the results cannot show lasting investment skill.",
        "Both active portfolios missed the 90% invested floor, and an order in Active Portfolio 2 was executed at the wrong target weight.",
        "Missing evidence kept Industrials and Real Estate (about 30% of the benchmark) out of the portfolios."
      ],
      learned: [],
      links: [
        { label: "Portfolio report (PDF, 95 pages)", url: "https://drive.google.com/file/d/1z2q5bVpsY57GfU6kj_MJXiHgM8ZsmCFu/view" },
        { label: "Project folder", url: "https://drive.google.com/drive/folders/1YrFwnOL0CixLHb8CvCR-3Og7uxgGdqjt?usp=drive_link" }
      ],
      role: "Solo project",
      star: {
        "situation": "The mandate: three Vietnamese equity portfolios of VND 100 billion each, one passive and two active, judged against the MRP-20 benchmark within strict sector, liquidity and concentration limits.",
        "task": "Design a repeatable selection process and test whether the active portfolios beat the benchmark.",
        "action": "Ran a nine-stage funnel (eligibility, macro gate, industry and company scoring, technical entry, mandate sizing) from 30 VN30 stocks to 8–9 holdings, then measured return, risk and attribution in LSEG.",
        "result": "Active Portfolio 2 beat the benchmark by 1.15 percentage points (−1.25% against −2.40%), mostly through sector allocation. Active Portfolio 1 trailed by 0.74 points, and both missed the 90% invested floor."
      },
      highlights: [
        {
          "value": "+1.15 pp",
          "label": "Active Portfolio 2 against the MRP-20"
        },
        {
          "value": "12 of 19",
          "label": "candidates passed the fundamental gate"
        },
        {
          "value": "3 × VND 100bn",
          "label": "portfolios built and evaluated"
        }
      ],
      figures: [
        {
          "src": "assets/projects/vn30-portfolio/ap2-vs-benchmark.webp",
          "w": 1099,
          "h": 418,
          "alt": "Line chart of cumulative return from 25 August to 11 September 2026: Active Portfolio 2 ends at −1.26% against −2.40% for the MRP-20 reference.",
          "caption": "Active Portfolio 2 lost less than the market over its window: a +1.15-point active return."
        },
        {
          "src": "assets/projects/vn30-portfolio/nine-stage-process.webp",
          "w": 1211,
          "h": 628,
          "alt": "Flow of the nine-stage process: eligibility (27 securities), economy gate (27), industry ranking (19), company selection, then implementation (8–10 holdings).",
          "caption": "Each stage hands a smaller, documented pool to the next, and no later stage can readmit a stock."
        },
        {
          "src": "assets/projects/vn30-portfolio/candidate-scores.webp",
          "w": 977,
          "h": 601,
          "alt": "Dot chart of fundamental composite scores for 19 candidates against a 3.00 gate; HPG is highest at 3.92 and STB lowest at 1.27.",
          "caption": "Twelve of nineteen candidates cleared the 3.00 gate, but the three-bank limit, not the scores, decided the final holdings."
        }
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
      role: "",
      star: {
        "situation": "Female labour-force participation varies widely across lower-income countries, and policymakers need to know which levers actually matter.",
        "task": "Identify the social and economic drivers of participation and test whether urbanisation's effect depends on education.",
        "action": "Built a multiple regression on 2022 World Bank data for 59 countries in RStudio, with a squared wage term and an interaction, and ran VIF, RESET, Breusch-Pagan, White and robustness checks.",
        "result": "Fertility (−8.4 points per extra birth) and anti-discrimination laws (+13.9 points) were the strongest significant drivers; the model explains 57% of the variation (adjusted R² 0.51)."
      },
      highlights: [
        {
          "value": "−8.4 pts",
          "label": "participation per extra point of fertility"
        },
        {
          "value": "+13.9 pts",
          "label": "with anti-discrimination laws"
        },
        {
          "value": "R² 0.57",
          "label": "59 countries, passes RESET and BP tests"
        }
      ],
      figures: [],
      skills: ["stat", "econ", "rlang", "da"]
    },

    {
      id: "fba-hdbank",
      type: "project",
      featured: true,
      title: "HDBank Agricultural Value-Chain Financing (Future Business Analyst 2026, Top 15)",
      short: "FBA 2026 · HDBank (Top 15)",
      subtitle: "Business analysis case · Top 15",
      year: "2026",
      categories: ["business", "finance"],
      summary: "A Top 15 entry in Future Business Analyst 2026: a value-chain lending model that gives HDBank visibility over farmers' seasonal cash flows, so it can catch bad loans earlier.",
      problem: "HDBank's NPL ratio rose from 1.65% (Q1 2022) to 2.79% (Q2 2026) while loan-loss coverage fell to 50.01%. As it grows rural and agricultural lending, how can it see and control borrowers' seasonal cash flows early enough to stabilise bad loans without slowing credit growth?",
      data: "Public secondary data only, with no borrower-level personal data: HDBank reports, Vietcap, FiinRatings, the National Statistics Office, VCCI surveys and World Bank research, aligned by period and unit and checked against the original publications.",
      method: [
        "Diagnosed the problem top-down: the macroeconomy, the banking industry, then a CAMEL review of HDBank (capital, asset quality, management, earnings and liquidity).",
        "Turned seven lending challenges and seven case studies into four alternative designs, scored them on seven weighted criteria such as cash-flow visibility and use-of-funds control, and checked that the ranking held under other scores and weights.",
        "Mapped the end-to-end lending process in BPMN, from intake and credit decision to staged disbursement, monitoring, repayment and shortfall handling.",
        "Assessed feasibility and risks (likelihood × impact) and designed a pilot with process and credit-quality KPIs."
      ],
      result: [
        "Recommended a multi-buyer, semi-closed value-chain model, which scored 94 of 100 against 75, 70 and 65 for the alternatives.",
        "Four controls: risk-based assessment on verified partner data, staged payments straight to approved suppliers, production monitoring, and repayment deducted from sales proceeds paid into HDBank accounts.",
        "Proposed a pilot covering one region, one value chain and one crop cycle, with targets such as an early-detection rate of at least 70%, on-time repayment of at least 95% and a pilot NPL ratio of at most 2.2%.",
        "Placed in the Top 15 of Future Business Analyst 2026."
      ],
      contribution: [
        "Team entry."
      ],
      limitations: [
        "The scorecard is illustrative: wider roll-out should depend on pilot results, not on the scores.",
        "Feasibility was the model's weakest criterion (3 of 5), which is why it starts as a pilot.",
        "Collusion on delivery receipts, sales to spot traders outside the repayment channel and climate shocks remain risks that the mitigations must handle in practice."
      ],
      learned: [],
      links: [
        { label: "Competition report (PDF, 60 pages)", url: "https://drive.google.com/file/d/1VaRDL53-McpP1WANvd3WIAGDPMTUdomt/view" },
        { label: "Project folder", url: "https://drive.google.com/drive/folders/1CKDd-J5icESeanT24GDzZuC9XvDQA3iA?usp=sharing" }
      ],
      role: "Team entry",
      star: {
        "situation": "HDBank's bad-loan ratio rose from 1.65% to 2.79% (Q1 2022–Q2 2026) while loan-loss coverage fell to 50%, as it grew agricultural lending with little view of farmers' cash flows.",
        "task": "Design a lending model that lets HDBank see and control seasonal cash flows early, without slowing credit growth.",
        "action": "Diagnosed the bank with a CAMEL review, scored four alternative designs on seven weighted criteria, mapped the chosen process in BPMN, and set pilot KPIs and risk mitigations.",
        "result": "Recommended a multi-buyer, semi-closed value-chain model (94 against 75, 70 and 65), to start as a one-region pilot. Placed Top 15 in Future Business Analyst 2026."
      },
      highlights: [
        {
          "value": "Top 15",
          "label": "Future Business Analyst 2026"
        },
        {
          "value": "94 / 100",
          "label": "weighted score of the recommended model"
        },
        {
          "value": "2.79%",
          "label": "HDBank NPL ratio, Q2 2026"
        }
      ],
      figures: [
        {
          "src": "assets/projects/fba-hdbank/scorecard.webp",
          "w": 1400,
          "h": 724,
          "alt": "Scoring table of four options on seven weighted criteria; the multi-buyer semi-closed model scores 94, ahead of 75, 70 and 65.",
          "caption": "The recommended model wins because it controls both the loan money going out and the sales proceeds coming back."
        },
        {
          "src": "assets/projects/fba-hdbank/bpmn-overview.webp",
          "w": 1400,
          "h": 2181,
          "alt": "BPMN swimlane diagram of the end-to-end process across the farmer, HDBank, input supplier, B2B buyer and cooperative, from request to repayment.",
          "caption": "Money and goods move on separate, verifiable paths: suppliers are paid directly, and buyers pay into the farmer's HDBank account."
        },
        {
          "src": "assets/projects/fba-hdbank/npl-coverage.webp",
          "w": 1600,
          "h": 592,
          "alt": "Bar and line chart of HDBank's NPL ratio rising from 1.65% in Q1 2022 to 2.79% in Q2 2026, with loan-loss reserves to NPLs.",
          "caption": "The problem in one chart: bad loans have risen for four years while the buffer against them thinned."
        }
      ],
      skills: ["ps", "bpmn", "fa", "scen", "kpi"]
    },

    {
      "id": "vinamilk-green-farm",
      "type": "project",
      "featured": true,
      "layout": "strategy",
      "title": "Vinamilk Green Farm: Segmentation, Positioning & Commercial Strategy",
      "short": "Vinamilk Green Farm",
      "subtitle": "Consumer insights · Positioning · Strategy",
      "year": "2026",
      "categories": [
        "commercial",
        "business"
      ],
      "role": "Individual project",
      "roleDetail": "Sole author: research, segmentation, positioning map, recommendations and roadmap. MKTG1205 Marketing Principles, RMIT.",
      "summary": "Benefit-based segmentation and a price–benefit–proof positioning map that show Green Farm's real gap is proof visibility, with a stage-gated plan to fix it.",
      "finding": {
        "title": "From product differentiation to visible proof",
        "text": "Green Farm is operationally differentiated but only partly segment-differentiated: the binding constraint is translation, not capability. Communicate different benefits to family and wellness buyers, and make the evidence visible at the point of purchase."
      },
      "highlights": [
        {
          "value": "2 segments",
          "label": "family reassurance and functional wellness"
        },
        {
          "value": "121–162",
          "label": "premium price index vs mainstream milk (= 100)"
        },
        {
          "value": "VND 10–14bn",
          "label": "proposed, released stage by stage over 12–18 months"
        }
      ],
      "star": {
        "situation": "Vietnam's premium milk market is crowded with converging functional claims (A2, high protein, fortification), and consumers increasingly want proof before paying a premium.",
        "task": "Identify which customers Green Farm should target, test how differentiated it really is, and recommend a clearer strategy without adding SKUs.",
        "action": "Built a benefit-based segmentation, a competitor claim-parity matrix and a price–benefit–proof positioning map, then designed Benefit Pathways, a QR Proof Passport and a stage-gated rollout.",
        "result": "Showed the gap is proof visibility, not product specificity. Proposed two Benefit Pathways, a Proof Passport journey and a 12–18-month plan with budget released only as each gate is passed."
      },
      "approach": [
        "Behavioural segmentation by benefits sought, checked against Kotler and Armstrong's effective-segmentation tests",
        "Competitor claim-parity matrix across leading premium and functional fresh-milk SKUs",
        "Positioning map of normalised shelf price, benefit specificity and proof visibility",
        "Google Trends benefit-salience index for Vietnam (January 2024 to August 2026)",
        "Evidence classification: observed outcome, commercial proxy or managerial inference"
      ],
      "recommendations": [
        "Benefit Pathways: regroup the existing range into Verified Everyday Reassurance for families and Functional Precision for wellness adults, with no new SKUs.",
        "Proof Passport: a QR-linked mobile-web journey from consumer outcome to product proof, process and origin proof, then SKU comparison.",
        "Stage-gated rollout: a Hanoi and HCMC pilot first; national scale only if the gates are met."
      ],
      "measures": [
        "Benefit recall and correct segment-to-SKU matching",
        "Trial conversion and repeat purchase, net of cannibalisation",
        "Proof Passport scan rate, journey completion and comprehension",
        "Zero material certification, health-claim or privacy failures"
      ],
      "rigor": [
        [
          "Green Farm household penetration rose 2 points in a year, and 96% of its buyers were classified loyal",
          "Measured at brand level, not split by product variant"
        ],
        [
          "Green Farm revenue grew 109% in 2024, and the new line 225% year on year in 10M 2025",
          "Growth cannot be allocated exactly to either benefit pathway"
        ],
        [
          "Premium SKUs carry shelf-price indices of 121–162 against mainstream milk",
          "A price premium is not a contribution margin; A2 input costs may absorb it"
        ],
        [
          "Functional-benefit searches rose 154% while reassurance searches fell 10% (2024–2026)",
          "Search users are not a representative sample, so this shows salience, not awareness"
        ],
        [
          "A stage-gated pilot can be designed and measured",
          "No commercial improvement from the proposal has been observed yet"
        ]
      ],
      "contribution": [
        "Built the Google Trends salience index and the evidence-classification appendix.",
        "A Proof Passport prototype was built for the report; it is not published here."
      ],
      "limitations": [
        "Segment market share and profitability cannot be calculated from public data, so the report claims premiumisation potential rather than superior profitability.",
        "Budgets are indicative author estimates, not company figures."
      ],
      "links": [],
      "figures": [
        {
          "src": "assets/projects/vinamilk-green-farm/positioning-map.webp",
          "w": 1000,
          "h": 648,
          "alt": "Positioning map of price premium (index 100–180) against benefit specificity, with proof visibility shown by marker fill. Green Farm A2 and TH true MILK A2 overlap; Green Farm High-Protein sits alone at the top.",
          "caption": "Green Farm A2 and TH A2 converge on both specificity and proof; only High Protein holds an uncontested position.",
          "insight": "The map compares normalised price, benefit specificity and proof visibility for each SKU. It shows the problem is not too little product specificity but too little visible proof at contested premium positions."
        },
        {
          "src": "assets/projects/vinamilk-green-farm/proof-passport.webp",
          "w": 1382,
          "h": 631,
          "alt": "Five mobile screens of the proposed Proof Passport: scan the carton, see the benefit, verify product information, trace farm to pack, then compare and choose.",
          "caption": "A five-step mobile-web journey turns the proof gap into something a shopper can check in the aisle.",
          "insight": "The journey runs from consumer outcome to product proof, then process and origin proof, then SKU comparison. Mobile web avoids the friction of an app, and success is measured by scan rate, completion, comprehension and repeat purchase."
        },
        {
          "src": "assets/projects/vinamilk-green-farm/stage-gate-roadmap.webp",
          "w": 1510,
          "h": 707,
          "alt": "Five-stage roadmap from July 2026 to December 2027: evidence validation, architecture and MVP, controlled pilot, optimisation and conditional scale, each with a decision gate and a budget release of VND 1–7.5bn.",
          "caption": "Budget is released stage by stage, and each stage must pass its gate before the next is funded.",
          "insight": "Staging caps the downside if consumer response is weak. National scale stays conditional on better benefit recall and proof comprehension, positive incremental contribution after cannibalisation, and zero compliance failures."
        }
      ],
      "skillNotes": {
        "cs": "Diagnosed the proof-visibility gap and turned it into two measurable recommendations.",
        "mi": "Benchmarked competitor claims, pricing and category trends across premium fresh milk.",
        "seg": "Separated family reassurance from functional-wellness demand using behavioural segmentation and effectiveness evidence.",
        "pos": "Built a price–benefit–proof positioning map and tested whether the value proposition is believable.",
        "cplan": "Designed a 12–18-month stage-gated rollout with staged budget release and success measures.",
        "kpi": "Defined pilot measures: benefit recall, segment–SKU matching, trial conversion and scan completion."
      },
      "skills": [
        "cs",
        "mi",
        "seg",
        "pos",
        "cplan",
        "kpi",
        "da",
        "ps"
      ]
    },
    {
      "id": "loccitane-imc",
      "type": "project",
      "featured": true,
      "layout": "strategy",
      "title": "L'OCCITANE en Provence: Market Intelligence, Segmentation & IMC Investment Plan",
      "short": "L'OCCITANE Marketing Plan",
      "subtitle": "Team marketing plan · premium hand care",
      "year": "2026",
      "categories": [
        "commercial",
        "business"
      ],
      "role": "Team project · Research & commercial planning",
      "roleDetail": "My responsibilities: micro-environment analysis · consumer segmentation · budget, timeline and KPI planning. Academic team project of six (MKTG1205); campaign concepts, product recommendations and positioning belong to the wider team.",
      "summary": "A six-person marketing plan for L'OCCITANE hand cream in Vietnam; I led the market intelligence, the customer segments and the budget, timeline and decision gates.",
      "finding": {
        "title": "Premium demand exists; trust and trial limit conversion",
        "text": "Cheaper substitutes and limited physical trial constrain conversion. L'OCCITANE's strongest advantage combines authenticated provenance with a premium experience, delivered through controlled digital channels."
      },
      "highlights": [
        {
          "value": "3 segments",
          "label": "prioritised from four scored; Practical Repair excluded"
        },
        {
          "value": "VND 293m",
          "label": "proposed capability investment (planned, not spent)"
        },
        {
          "value": "VND 223m",
          "label": "net incremental seasonal request (planned)"
        }
      ],
      "star": {
        "situation": "In Vietnam's premium hand-care market, L'OCCITANE costs roughly 3–4× accessible French alternatives, faces authenticity concerns and has few places for shoppers to try the product.",
        "task": "Within a six-person team, analyse the market actors, build the customer segments and turn the team's strategy into a budget, timeline and KPIs.",
        "action": "Mapped customers, intermediaries, competitors, suppliers and publics; scored four segments and profiled three; then built the seasonal budget and a decision-gated timeline.",
        "result": "Delivered the evidence base and commercial plan for the team's proposal: three prioritised segments, a VND 223m net seasonal request on VND 293m of capability investment, and test–replicate–scale gates."
      },
      "approach": [
        "Micro-environment analysis of customers, intermediaries, competitors, suppliers and publics",
        "Price benchmarking per 10 ml against accessible French and fragrance brands",
        "Segment scoring and profiles with customer journeys and pain points",
        "Seasonal budget with reallocation of existing lines and per-unit variable economics",
        "Decision-gated timeline based on Cooper's stage-gate model"
      ],
      "recommendations": [
        "Target Premium Experience Seekers first, with Performance Assurance Seekers and Accessible Indulgence Explorers next; exclude Practical Repair Seekers, who would need lower prices and mass distribution.",
        "Fund capability first: provenance verification is the largest fixed investment, while Hand-Spa and Magic Key stay boutique-level pilots.",
        "Test one boutique, replicate in a second, then scale, revise or stop each element before any 2027 commitment."
      ],
      "measures": [
        "Gate 1 (15 Nov): provenance QA passed, first boutique proven, Magic Key tested",
        "Gate 2 (29 Nov): Hand-Spa operating procedure fixed before peak demand",
        "Gate 3 (27 Dec): second boutique and Christmas commercial validation complete",
        "Gate 4 (28 Dec onward): scale, revise or stop each element"
      ],
      "rigor": [],
      "contribution": [
        "Micro-environment analysis: customers, intermediaries, competitors, suppliers and publics.",
        "Consumer segmentation: four segments scored, three profiled with journeys.",
        "Budget, timeline and KPIs: seasonal budget, capability investment and decision gates."
      ],
      "limitations": [
        "All budget figures are planned, modelled amounts, not approved or incurred spend.",
        "The plan was not executed, so no sales results are claimed."
      ],
      "links": [],
      "figures": [
        {
          "src": "assets/projects/loccitane/micro-environment.webp",
          "w": 1600,
          "h": 856,
          "alt": "Micro-environment slide covering customers, marketing intermediaries, competitors, company, suppliers and publics, ending in one implication.",
          "caption": "Pricing, counterfeit worries, limited trial and provenance combine into one strategic implication.",
          "insight": "Customer segments want different things, physical trial is scarce outside HCMC and Hanoi, and the product costs 3–4× accessible alternatives. The brand's defensible proof is traceable sourcing, so the plan leads with provenance rather than price promotion."
        },
        {
          "src": "assets/projects/loccitane/segmentation.webp",
          "w": 1600,
          "h": 856,
          "alt": "Segment scoring table and profiles for Premium Experience Seekers, Performance Assurance Seekers and Accessible Indulgence Explorers, with demographic, geographic, psychographic and behavioural detail.",
          "caption": "Four segments scored on five criteria; three profiled, and Practical Repair Seekers excluded.",
          "insight": "Each segment has a different purchase goal, from small daily luxury to proof that the premium is worth it, so one generic premium message would not convert all three."
        },
        {
          "src": "assets/projects/loccitane/budget-allocation.webp",
          "w": 1600,
          "h": 856,
          "alt": "Budget slide: VND 293m builds capability and VND 223m is the incremental seasonal request, with a variable-economics table, allocation pie charts and an infrastructure-versus-IMC bar chart.",
          "caption": "Capability is funded first; seasonal spend is a smaller, reallocated request.",
          "insight": "A VND 250m seasonal envelope is offset by VND 27m reallocated from existing lines, giving a VND 223m net request. Hand-Spa and Magic Key stay boutique pilots rather than national commitments."
        }
      ],
      "skillNotes": {
        "cs": "Turned market evidence into prioritised segments and a staged investment plan.",
        "mi": "Analysed customers, intermediaries, competitors, suppliers and publics for premium hand care.",
        "seg": "Developed segment profiles and examined trial, authenticity and premium-experience barriers.",
        "cplan": "Built the seasonal budget, capability investment and test–replicate–scale decision gates.",
        "kpi": "Set the decision gates that decide whether each element scales, is revised or stops."
      },
      "skills": [
        "cs",
        "mi",
        "seg",
        "cplan",
        "kpi"
      ]
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
            { id: "pbi", name: "Power BI", icon: "bars_v", description: "Marketplace performance report: growth, order value, freight costs, cancellations and delivery times." },
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
        { id: "cs", name: "Commercial Strategy", icon: "radar",
          description: "Turning market and customer evidence into measurable commercial recommendations.",
          emerging: [{ name: "Digital Customer Experience Strategy", note: "Concept and prototype evidence: the Vinamilk QR Proof Passport journey." }],
          skills: [
            { id: "mi", name: "Market & Competitive Intelligence", icon: "magnify", description: "Investigating category structure, competitive alternatives, pricing and market constraints." },
            { id: "seg", name: "Consumer Segmentation & Targeting", icon: "users", description: "Defining consumer groups by the benefits they seek, assessing their attractiveness and turning the differences into targeting choices." },
            { id: "pos", name: "Brand Positioning & Value Proposition", icon: "crosshair", description: "Mapping competitive positions and testing whether a value proposition is both differentiated and believable." },
            { id: "cplan", name: "Commercial Planning & KPI Design", icon: "calendar", description: "Turning strategy into budgets, staged rollouts, decision gates and success measures." }
          ] },
        { id: "ps", name: "Problem Structuring", icon: "hierarchy", proven: true,
          description: "Breaking open-ended business questions into analysable parts.", skills: [] },
        { id: "comm", name: "Stakeholder Communication", icon: "bubbles", proven: true,
          description: "Working with partners, mentors and learners to keep everyone aligned.", skills: [] },
        { id: "coord", name: "Project Coordination", icon: "check", proven: true,
          description: "Planning, tracking and delivering multi-person projects.", skills: [] },
        { id: "bpmn", name: "Process Design (BPMN)", icon: "flow",
          description: "Mapping end-to-end business processes, hand-offs and controls in BPMN.", skills: [] },
        { id: "pres", name: "Presentation", icon: "present",
          description: "Presenting analysis and recommendations to an audience.", skills: [] }
      ]
    }
  ],

  /* --------------------------------------------- recruiter views (Projects page)
     Each view lists the projects to show first for that kind of role. */
  views: [
    { id: "finance-data", name: "Finance / Data Analyst", why: "Business evaluation, analytical rigour and turning findings into decisions", projects: ["svc-valuation", "vinamilk-green-farm", "credit-risk", "fpt-equity"] },
    { id: "commercial-ba", name: "Commercial / Business Analyst", why: "Segmentation, competitive intelligence and business recommendations", projects: ["vinamilk-green-farm", "loccitane-imc", "fba-hdbank", "ecommerce"] },
    { id: "fpa", name: "FP&A / Commercial Finance", why: "Budgeting, scenario thinking, financial planning and performance measures", projects: ["loccitane-imc", "svc-valuation", "fpt-equity", "vn30-portfolio"] },
    { id: "marketing", name: "Marketing Strategy / Planning", why: "Consumer insights, positioning, journey analysis and IMC planning", projects: ["loccitane-imc", "vinamilk-green-farm"] },
    { id: "product", name: "Product / Growth Analyst", why: "Customer-benefit mapping, digital concept design and a measurement framework", projects: ["vinamilk-green-farm", "ecommerce"] }
  ],

  /* ----------------------------------------------------------- milestones
     kind: "featured" (one only) | "standard" | "upcoming"                   */
  milestones: [
    { year: "2023", title: "National Champion", subtitle: "AI Competition (AIC) · Deakin & FPT", kind: "featured", icon: "trophy" },
    { year: "2024 – 2025", title: "Case Team Leader", subtitle: "RMIT Business Analytics Champion", kind: "standard", icon: "flag" },
    { year: "2025", title: "Top 12 of 200 teams", subtitle: "Tomorrow Marketers case competition", kind: "standard", icon: "star" },
    { year: "2026", title: "Top 15", subtitle: "Future Business Analyst 2026 · HDBank case", kind: "standard", icon: "star" },
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
