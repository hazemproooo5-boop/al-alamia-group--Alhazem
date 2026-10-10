:root {
  --navy: #091329;
  --gold: #c79529;
  --warm: #f5f4f0;
  --text: #1d2433;
  --muted: #576175;
  --card: #ffffff;
  --border: #e7e0d5;
  --shadow: rgba(9, 19, 41, 0.09);
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  font-family: "Tahoma", "Segoe UI", sans-serif;
  background: var(--warm);
  color: var(--text);
}

body {
  direction: rtl;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.app-shell {
  min-height: 100vh;
}

.topbar {
  position: sticky;
  top: 0;
  background: rgba(9, 19, 41, 0.96);
  color: white;
  z-index: 10;
  border-bottom: 1px solid rgba(199, 149, 41, 0.5);
}

.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  gap: 20px;
}

.brand-box {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--gold);
  font-weight: 800;
  color: var(--navy);
}

.brand-name {
  font-weight: 800;
}

.nav {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.nav a {
  color: #eff4ff;
  font-size: 0.9rem;
  opacity: 0.82;
}

.nav a.active {
  color: var(--gold);
  opacity: 1;
}

.menu-button {
  display: none;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  border-radius: 8px;
  padding: 8px 10px;
}

.page-block {
  padding: 48px 0 72px;
}

.hero-card {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 24px;
  background: linear-gradient(135deg, var(--navy), #162a4c);
  color: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 18px 35px var(--shadow);
}

.eyebrow {
  display: inline-block;
  margin-bottom: 14px;
  color: var(--gold);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-card h1 {
  margin: 0 0 12px;
  font-size: clamp(2.1rem, 4vw, 4rem);
}

.hero-card p {
  max-width: 620px;
  color: rgba(255,255,255,0.8);
  line-height: 1.9;
}

.actions {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.primary-button, .secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
}

.primary-button {
  background: var(--gold);
  color: var(--navy);
}

.secondary-button {
  background: #fff;
  color: var(--navy);
}

.small {
  padding: 8px 12px;
  font-size: 0.8rem;
}

.hero-panel {
  display: grid;
  gap: 16px;
}

.mini-stat {
  padding: 18px;
  border-radius: 16px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mini-stat strong {
  font-size: 2rem;
  color: var(--gold);
}

.section-block {
  margin-top: 52px;
}

.section-block h2 {
  margin-bottom: 20px;
  font-size: clamp(1.4rem, 2vw, 2.3rem);
}

.search-box {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 12px 28px var(--shadow);
}

.search-box input,
.panel-form input,
.panel-form select,
.compare-controls select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
  font: inherit;
  outline: none;
}

.search-large {
  margin-bottom: 20px;
}

.feature-grid,
.cards-grid,
.brand-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.feature-card, .product-card, .brand-card, .news-card, .offer-card {
  background: white;
  border-radius: 18px;
  padding: 18px;
  border: 1px solid var(--border);
  box-shadow: 0 12px 25px var(--shadow);
}

.product-card {
  overflow: hidden;
  padding: 0;
}

.product-card img {
  height: 200px;
  object-fit: cover;
  width: 100%;
}

.product-body {
  padding: 18px;
}

.badge {
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 99px;
  background: rgba(199, 149, 41, 0.12);
  color: var(--navy);
  font-weight: 700;
  margin-bottom: 8px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 18px;
}

.callout {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 12px 25px var(--shadow);
}

.brand-card {
  display: grid;
  gap: 12px;
  justify-items: center;
  text-align: center;
}

.brand-card img {
  width: 120px;
  height: 70px;
  object-fit: contain;
}

.site-footer {
  background: var(--navy);
  color: white;
  padding: 36px 0;
  margin-top: 30px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.panel-form {
  display: grid;
  gap: 18px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 12px 25px var(--shadow);
}

.result-box {
  margin-top: 20px;
  background: rgba(9, 19, 41, 0.04);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 18px;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

.detail-image {
  width: 100%;
  max-height: 480px;
  object-fit: cover;
  border-radius: 18px;
}

.compare-controls {
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 18px;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  overflow: hidden;
  border-radius: 18px;
  box-shadow: 0 12px 25px var(--shadow);
}

.compare-table th,
.compare-table td {
  border: 1px solid var(--border);
  padding: 12px;
  text-align: right;
}

@media (max-width: 760px) {
  .menu-button {
    display: block;
  }

  .nav {
    display: none;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 0 18px;
  }

  .nav.open {
    display: flex;
  }

  .topbar-inner {
    flex-wrap: wrap;
    padding: 10px 0;
  }

  .hero-card, .product-detail {
    grid-template-columns: 1fr;
  }

  .search-box {
    flex-direction: column;
  }
}
