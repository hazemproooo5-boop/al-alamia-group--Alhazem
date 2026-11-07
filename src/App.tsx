import { ReactNode, useState } from 'react';
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import { academyItems, auditLog, brands, competitions, news, offers, products, siteSettings, suppliers, tips } from './data/seed';
import { NeedProfile, Product } from './types';
import { advisorService } from './services/advisorService';
import { priceService } from './services/priceService';
import { verificationService } from './services/verificationService';
import { searchService } from './services/searchService';

const categoryList = [
  { id: 'ac', label: 'AC' },
  { id: 'appliances', label: 'Appliances' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'household', label: 'Household' },
  { id: 'lighting', label: 'Lighting' },
];

function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link to="/" className="brand-box">
            <div className="brand-mark">A</div>
            <div>
              <div className="brand-name">{siteSettings.brandName}</div>
              <small>{siteSettings.slogan}</small>
            </div>
          </Link>

          <button className="menu-button" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Toggle menu">
            ☰
          </button>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <NavLink to="/">الرئيسية</NavLink>
            <NavLink to="/need-assessment">تقييم الاحتياج</NavLink>
            <NavLink to="/smart-search">البحث الذكي</NavLink>
            <NavLink to="/compare">المقارنة</NavLink>
            <NavLink to="/brands">مركز الماركات</NavLink>
            <NavLink to="/catalog-center">كتالوج المنتجات</NavLink>
            <NavLink to="/ac">التكييف</NavLink>
            <NavLink to="/smart-advisor">المستشار الذكي</NavLink>
            <NavLink to="/offers">العروض</NavLink>
            <NavLink to="/academy">أكاديمية الحازم</NavLink>
            <NavLink to="/transparency">مركز الشفافية</NavLink>
            <NavLink to="/support">خدمة العملاء</NavLink>
            <NavLink to="/suppliers">الموردون</NavLink>
            <NavLink to="/admin">الإدارة</NavLink>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h4>{siteSettings.businessName}</h4>
            <p>{siteSettings.slogan}</p>
            <p>{siteSettings.address}</p>
          </div>
          <div>
            <h4>تواصل مباشر</h4>
            <p>الهاتف: {siteSettings.phonePrimary}</p>
            <p>واتساب: {siteSettings.phoneWhatsApp}</p>
          </div>
          <div>
            <h4>روابط سريعة</h4>
            <Link to="/academy">أكاديمية الحازم</Link>
            <Link to="/transparency">مركز الشفافية</Link>
            <Link to="/support">خدمة العملاء</Link>
            <Link to="/suppliers">الموردون</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const latestPrice = priceService.getCurrent(product.id);

  return (
    <article className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-body">
        <span className="badge">{product.verificationStatus}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="meta-row">
          <strong>السعر المرجعي:</strong>
          <span>{latestPrice ? `${latestPrice.price.toLocaleString()} جنيه — مسجل بتاريخ ${latestPrice.priceDate}` : 'غير متوفر في المصدر الموثق'}</span>
        </div>
        <div className="meta-row">
          <strong>المصدر:</strong>
          <span>{product.sourceType}</span>
        </div>
        <div className="card-actions">
          <Link to={`/product/${product.slug}`} className="primary-button small">التفاصيل</Link>
          <Link to="/compare" className="secondary-button small">قارن</Link>
        </div>
      </div>
    </article>
  );
}

function HomePage() {
  return (
    <div className="container page-block">
      <section className="hero-card">
        <div>
          <span className="eyebrow">AL HAZEM SMART</span>
          <h1>قبل ما تشتري… اسأل الحازم</h1>
          <p>المنصة العربية المتكاملة للبحث عن الأجهزة المنزلية، التكييف، المطبخ، الإضاءة، والمقارنة بين المنتجات بناءً على مصدر موثق.</p>
          <div className="actions">
            <Link to="/smart-search" className="primary-button">ابحث الآن</Link>
            <Link to="/need-assessment" className="secondary-button">تقييم الاحتياج</Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="mini-stat">
            <strong>{brands.length}</strong>
            <span>ماركات مدرجة</span>
          </div>
          <div className="mini-stat">
            <strong>{products.filter((product) => product.published).length}</strong>
            <span>منتجات منشورة</span>
          </div>
          <div className="mini-stat">
            <strong>قبل الشراء</strong>
            <span>استشارة تساعدك على القرار</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h2>البحث الذكي</h2>
        <div className="search-box">
          <input placeholder="ابحث عن مكيف، غسالة، ثلاجة، مطبخ..." />
          <Link to="/smart-search" className="primary-button">بحث</Link>
        </div>
      </section>

      <section className="section-block">
        <h2>تقييم الاحتياج</h2>
        <div className="feature-grid">
          <div className="feature-card"><strong>تقييم سريع</strong><p>يتم تحديد احتياج المنزل أو المكتب.</p></div>
          <div className="feature-card"><strong>مقارنة موثقة</strong><p>المنتجات تُقارن بالأسعار والتكنولوجيا والضمان.</p></div>
          <div className="feature-card"><strong>توصية ذكية</strong><p>مستندة إلى بيانات products + sources + verification.</p></div>
        </div>
      </section>

      <section className="section-block">
        <h2>مركز الماركات</h2>
        <div className="brand-grid">
          {brands.map((brand) => (
            <Link key={brand.id} to={`/brand/${brand.slug}`} className="brand-card">
              <img src={brand.logo} alt={brand.name} />
              <strong>{brand.name}</strong>
              <small>{brand.country}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>الأجهزة المنزلية</h2>
        <div className="cards-grid">
          {products.slice(0, 2).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>التكييف</h2>
        <div className="cards-grid">
          {products.filter((p) => p.categoryId === 'ac').map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>العروض</h2>
        <p>العروض المسجلة أدناه بيانات أولية؛ يرجى التأكد من سريان العرض وتفاصيله مع خدمة العملاء قبل الاعتماد عليه.</p>
        <div className="cards-grid">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <small>الحالة المسجلة: {offer.status} — السريان غير مؤكد</small>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>الأخبار</h2>
        <div className="cards-grid">
          {news.map((item) => (
            <article key={item.id} className="news-card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <small>{item.source}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>نصائح الحازم</h2>
        <div className="cards-grid">
          {tips.map((tip) => (
            <article key={tip.id} className="news-card">
              <h3>{tip.title}</h3>
              <p>{tip.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h2>المسابقات</h2>
        <div className="cards-grid">
          {competitions.map((entry) => {
            const deadlinePassed = new Date(`${entry.deadline}T23:59:59`).getTime() < Date.now();
            return (
              <div key={entry.id} className="feature-card">
                <strong>{entry.title}</strong>
                <p>{entry.conditions}</p>
                <small>{entry.prize}</small>
                <p>{deadlinePassed ? `انتهت المسابقة بتاريخ ${entry.deadline}` : `آخر موعد للمشاركة: ${entry.deadline}`}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-block">
        <h2>أكاديمية الحازم</h2>
        <div className="cards-grid">
          {academyItems.map((item) => (
            <div key={item.id} className="feature-card">
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function NeedAssessmentPage() {
  const [state, setState] = useState({ room: 'غرفة نوم', people: 3, need: 'تبريد', budget: 20000 });

  return (
    <div className="container page-block">
      <h1>تقييم الاحتياج</h1>
      <form className="panel-form">
        <label>
          نوع الغرفة
          <input value={state.room} onChange={(e) => setState({ ...state, room: e.target.value })} />
        </label>
        <label>
          عدد السكان
          <input type="number" value={state.people} onChange={(e) => setState({ ...state, people: Number(e.target.value) })} />
        </label>
        <label>
          الاحتياج
          <input value={state.need} onChange={(e) => setState({ ...state, need: e.target.value })} />
        </label>
        <label>
          الميزانية (جنيه)
          <input type="number" value={state.budget} onChange={(e) => setState({ ...state, budget: Number(e.target.value) })} />
        </label>
      </form>

      <div className="result-box">
        <h3>Need Fingerprint</h3>
        <p>{state.room} • {state.people} أشخاص • {state.need} • {state.budget} جنيه</p>
      </div>
    </div>
  );
}

function SmartSearchPage() {
  const [term, setTerm] = useState('');
  const results = searchService.search({ term });

  return (
    <div className="container page-block">
      <h1>Smart Search</h1>
      <div className="search-box search-large">
        <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="ابحث عن منتج أو ماركة أو موديل" />
      </div>

      <div className="cards-grid">
        {results.length ? results.map((product) => <ProductCard key={product.id} product={product} />) : <div className="feature-card">لا توجد نتائج في المصدر الموثق</div>}
      </div>
    </div>
  );
}

function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <NotFoundPage />;
  const latestPrice = priceService.getCurrent(product.id);

  return (
    <div className="container page-block product-detail">
      <img src={product.imageUrl} alt={product.name} className="detail-image" />
      <div>
        <span className="badge">{product.verificationStatus}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <ul className="detail-list">
          <li>الموديل: {product.model}</li>
          <li>السعر: {latestPrice ? `${latestPrice.price.toLocaleString()} جنيه` : 'غير متوفر في المصدر الموثق'}</li>
          <li>الضمان: {product.warranty ?? 'غير متوفر في المصدر الموثق'}</li>
          <li>المصدر: {product.sourceUrl}</li>
        </ul>
      </div>
    </div>
  );
}

function ComparePage() {
  const [left, setLeft] = useState(products[0]?.id ?? '');
  const [right, setRight] = useState(products[1]?.id ?? '');

  const productA = products.find((item) => item.id === left) ?? products[0];
  const productB = products.find((item) => item.id === right) ?? products[1];

  return (
    <div className="container page-block">
      <h1>مقارنة المنتجات</h1>
      <div className="compare-controls">
        <select value={left} onChange={(e) => setLeft(e.target.value)}>
          {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
        </select>
        <select value={right} onChange={(e) => setRight(e.target.value)}>
          {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
        </select>
      </div>

      <table className="compare-table">
        <thead>
          <tr>
            <th>المعيار</th>
            <th>{productA?.name}</th>
            <th>{productB?.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>السعر الحديث المسجل</td>
            <td>{productA ? (priceService.getCurrent(productA.id)?.price ? `${priceService.getCurrent(productA.id)!.price.toLocaleString()} جنيه` : 'غير متوفر') : 'غير متوفر'}</td>
            <td>{productB ? (priceService.getCurrent(productB.id)?.price ? `${priceService.getCurrent(productB.id)!.price.toLocaleString()} جنيه` : 'غير متوفر') : 'غير متوفر'}</td>
          </tr>
          <tr>
            <td>استهلاك الطاقة</td>
            <td>{productA?.energyInformation ?? 'غير متوفر في المصدر الموثق'}</td>
            <td>{productB?.energyInformation ?? 'غير متوفر في المصدر الموثق'}</td>
          </tr>
          <tr>
            <td>الضمان</td>
            <td>{productA?.warranty ?? 'غير متوفر في المصدر الموثق'}</td>
            <td>{productB?.warranty ?? 'غير متوفر في المصدر الموثق'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function SmartAdvisorPage() {
  const [profile, setProfile] = useState<NeedProfile>({ category: 'ac', budget: 22000, occupants: 4 });
  const { products: recommendations, explanations } = advisorService.recommend(profile);

  return (
    <div className="container page-block">
      <h1>المستشار الذكي</h1>
      <div className="panel-form">
        <label>
          الفئة
          <select value={profile.category} onChange={(e) => setProfile({ ...profile, category: e.target.value })}>
            <option value="all">الكل</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>{category.label}</option>
            ))}
          </select>
        </label>
        <label>
          الميزانية
          <input type="number" value={profile.budget ?? 0} onChange={(e) => setProfile({ ...profile, budget: Number(e.target.value) })} />
        </label>
      </div>

      <div className="result-box">
        <h3>سبب التوصية</h3>
        <ul>
          {explanations.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>

      {recommendations.length === 0 ? (
        <div className="result-box" role="status">
          <strong>لا توجد مطابقة بسعر حديث موثق ضمن هذه الميزانية حالياً.</strong>
          <p>هذا لا يعني عدم توفر المنتج في المعرض؛ تواصل مع خدمة العملاء للحصول على سعر محدث قبل اتخاذ قرار الشراء.</p>
          <Link to="/support" className="primary-button small">تواصل مع الحازم</Link>
        </div>
      ) : (
        <div className="cards-grid">
          {recommendations.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}

function BrandsPage() {
  return (
    <div className="container page-block">
      <h1>مركز الماركات</h1>
      <div className="brand-grid">
        {brands.map((brand) => (
          <Link to={`/brand/${brand.slug}`} key={brand.id} className="brand-card">
            <img src={brand.logo} alt={brand.name} />
            <strong>{brand.name}</strong>
            <small>{brand.country}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BrandDetailPage() {
  const { slug } = useParams();
  const brand = brands.find((item) => item.slug === slug);
  if (!brand) return <NotFoundPage />;

  return (
    <div className="container page-block">
      <h1>{brand.name}</h1>
      <p>{brand.description}</p>
      <p>بلد المنشأ: {brand.country}</p>
      <p>التكنولوجيا: {brand.technology}</p>
      <div className="cards-grid">
        {products.filter((product) => product.brandId === brand.id).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function CatalogCenterPage() {
  return (
    <div className="container page-block">
      <h1>كتالوج المنتجات</h1>
      <div className="cards-grid">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}

function ACPage() {
  return (
    <div className="container page-block">
      <h1>التكييف</h1>
      <div className="cards-grid">
        {products.filter((product) => product.categoryId === 'ac').map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}

function AdminPage() {
  const summary = verificationService.getDataQualitySummary().summary;

  return (
    <div className="container page-block">
      <h1>لوحة الإدارة</h1>
      <div className="cards-grid">
        <div className="feature-card"><strong>Missing Images</strong><p>{summary.missingImages}</p></div>
        <div className="feature-card"><strong>Missing Sources</strong><p>{summary.missingSources}</p></div>
        <div className="feature-card"><strong>Missing Specs</strong><p>{summary.missingSpecs}</p></div>
        <div className="feature-card"><strong>Stale Prices</strong><p>{summary.stalePrices}</p></div>
      </div>
    </div>
  );
}

function OffersPage() {
  return (
    <div className="container page-block">
      <h1>العروض</h1>
      <p>هذه عروض مسجلة في بيانات المنصة الأولية وليست تأكيداً على استمرارها أو توفرها حالياً. يرجى التحقق من خدمة العملاء.</p>
      <div className="cards-grid">
        {offers.map((offer) => (
          <article key={offer.id} className="offer-card">
            <h2>{offer.title}</h2>
            <p>{offer.description}</p>
            <small>الحالة المسجلة: {offer.status} — السريان غير مؤكد</small>
          </article>
        ))}
      </div>
    </div>
  );
}

function AcademyPage() {
  return (
    <div className="container page-block">
      <h1>أكاديمية الحازم</h1>
      <p>محتوى إرشادي أولي لمساعدتك على فهم احتياجك قبل الشراء.</p>
      <div className="cards-grid">
        {academyItems.map((item) => (
          <article key={item.id} className="feature-card">
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function TransparencyPage() {
  return (
    <div className="container page-block">
      <h1>مركز الشفافية</h1>
      <p>نعرض حالة التوثيق ومصادر البيانات المتاحة، ولا نعتبر بيانات العرض المحلية بديلاً عن التحقق المستقل.</p>
      <div className="cards-grid">
        <article className="feature-card">
          <strong>مصادر المنتجات</strong>
          <p>تظهر صفحة كل منتج المصدر وحالة التحقق المسجلة له.</p>
        </article>
        <article className="feature-card">
          <strong>الأسعار</strong>
          <p>الأسعار الحالية المعروضة بيانات تجريبية محلية مؤرخة، ويجب مراجعة المصدر قبل اتخاذ قرار الشراء.</p>
        </article>
        <article className="feature-card">
          <strong>سجل الأحداث</strong>
          <p>السجل التالي بيانات أولية محلية وليس سجل تدقيق إنتاجياً متصلاً بقاعدة بيانات.</p>
        </article>
      </div>
      <div className="section-block">
        <h2>سجل الأحداث المحلي</h2>
        <div className="cards-grid">
          {auditLog.map((entry) => (
            <article key={entry.id} className="news-card">
              <strong>{entry.event}</strong>
              <p>{entry.action} — {entry.user}</p>
              <small>{entry.timestamp}</small>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupportPage() {
  return (
    <div className="container page-block">
      <h1>خدمة العملاء</h1>
      <p>للاستفسار عن المنتجات أو طلب المساعدة قبل الشراء، تواصل مباشرة مع الحازم جروب.</p>
      <div className="feature-grid">
        <article className="feature-card">
          <strong>الهاتف</strong>
          <p dir="ltr">{siteSettings.phonePrimary}</p>
          <a className="primary-button small" href={`tel:${siteSettings.phonePrimary}`}>اتصل الآن</a>
        </article>
        <article className="feature-card">
          <strong>واتساب</strong>
          <p dir="ltr">{siteSettings.phoneWhatsApp}</p>
          <a className="primary-button small" href={siteSettings.socialLinks.whatsapp} target="_blank" rel="noreferrer">تواصل عبر واتساب</a>
        </article>
        <article className="feature-card">
          <strong>العنوان</strong>
          <p>{siteSettings.address}</p>
        </article>
      </div>
    </div>
  );
}

function SuppliersPage() {
  return (
    <div className="container page-block">
      <h1>الموردون</h1>
      <p>بيانات الموردين المعروضة هنا أولية ومحلية، ولا تعني اعتماد المورد أو إتاحة التعامل معه قبل مراجعة الإدارة.</p>
      <div className="cards-grid">
        {suppliers.map((supplier) => (
          <article key={supplier.id} className="feature-card">
            <h2>{supplier.name}</h2>
            <p>الفئة: {supplier.category}</p>
            <p>الحالة المسجلة: {supplier.status}</p>
            <small>{supplier.verified ? 'يتضمن السجل علامة تحقق أولية' : 'لم يتم توثيقه'}</small>
          </article>
        ))}
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="container page-block">
      <h1>404 — صفحة غير موجودة</h1>
      <Link to="/" className="primary-button">العودة للصفحة الرئيسية</Link>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/need-assessment" element={<NeedAssessmentPage />} />
        <Route path="/smart-search" element={<SmartSearchPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/smart-advisor" element={<SmartAdvisorPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/brand/:slug" element={<BrandDetailPage />} />
        <Route path="/catalog-center" element={<CatalogCenterPage />} />
        <Route path="/ac" element={<ACPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/academy" element={<AcademyPage />} />
        <Route path="/transparency" element={<TransparencyPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
