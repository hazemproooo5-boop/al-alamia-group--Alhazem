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
 const [menuOpen,setMenuOpen]=useState(false);
 const closeMenu=()=>setMenuOpen(false);
 return <div className="app-shell">
  <header className="topbar"><div className="container topbar-inner">
   <Link to="/" className="brand-box" onClick={closeMenu}><div className="brand-mark">ح</div><div><div className="brand-name">{siteSettings.brandName}</div><small>{siteSettings.slogan}</small></div></Link>
   <button className="menu-button" onClick={()=>setMenuOpen(p=>!p)} aria-label="فتح أو إغلاق القائمة" aria-expanded={menuOpen}>☰</button>
   <nav className={menuOpen?"nav open":"nav"} aria-label="القائمة الرئيسية">
    <NavLink to="/" onClick={closeMenu}>الرئيسية</NavLink><NavLink to="/catalog-center" onClick={closeMenu}>الأجهزة</NavLink><NavLink to="/ac" onClick={closeMenu}>التكييف</NavLink><NavLink to="/brands" onClick={closeMenu}>الماركات</NavLink><NavLink to="/compare" onClick={closeMenu}>المقارنة</NavLink><NavLink to="/smart-advisor" onClick={closeMenu}>المستشار الذكي</NavLink><NavLink to="/academy" onClick={closeMenu}>الأكاديمية</NavLink><NavLink to="/offers" onClick={closeMenu}>العروض</NavLink>
   </nav></div></header>
  <main>{children}</main>
  <footer className="site-footer"><div className="container footer-grid">
   <div><h4>{siteSettings.businessName}</h4><p>{siteSettings.slogan}</p><p>{siteSettings.address}</p><small>منصة تساعدك على الاختيار بثقة — وليست متجرًا إلكترونيًا تقليديًا.</small></div>
   <div><h4>استكشف الحازم</h4><Link to="/catalog-center">كتالوج الأجهزة</Link><Link to="/brands">مركز الماركات</Link><Link to="/compare">مركز المقارنة</Link><Link to="/smart-advisor">المستشار الذكي</Link></div>
   <div><h4>المعرفة والشفافية</h4><Link to="/academy">أكاديمية الحازم</Link><Link to="/transparency">منهجية التحقق</Link><Link to="/support">خدمة العملاء</Link><Link to="/suppliers">معلومات الموردين</Link></div>
  </div></footer>
 </div>;
}

function ProductCard({ product }: { product: Product }) {
  const latestPrice = priceService.getLatest(product.id);

  return (
    <article className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-body">
        <span className="badge">{product.verificationStatus}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="meta-row">
          <strong>السعر:</strong>
          <span>{latestPrice ? `${latestPrice.price.toLocaleString()} جنيه` : 'غير متوفر في المصدر الموثق'}</span>
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
 const verifiedProducts=products.filter(p=>p.verificationStatus==="Verified"&&p.published);
 const verifiedBrands=brands.filter(b=>b.sourceStatus==="Verified");
 return <div className="container page-block home-page">
  <section className="hero-card"><div className="hero-copy"><span className="eyebrow">AL HAZEM SMART · الحازم جروب</span><h1>قبل ما تشتري… <span>اسأل الحازم</span></h1><p>مش مجرد مكان لعرض المنتجات؛ دي مساحة تساعدك تفهم احتياجك، تعرف الفرق بين الاختيارات، وتقارن على أساس معلومات واضحة قبل ما تاخد قرار الشراء.</p><div className="actions"><Link to="/smart-advisor" className="primary-button">ابدأ استشارة ذكية</Link><Link to="/compare" className="secondary-button">قارن بين المنتجات</Link></div><div className="hero-note">الثقة أولًا · المعرفة قبل الشراء · لا أسعار أو ادعاءات بلا تحقق</div></div>
   <div className="hero-panel hero-promise"><div className="promise-mark">ح</div><strong>قرارك يستحق معلومة موثوقة</strong><p>نوضح مصدر المعلومة وحالة التحقق، ونقول «غير متاح» بدل ما نخمن.</p><div className="promise-line"><span>01</span> افهم احتياجك</div><div className="promise-line"><span>02</span> اعرف اختياراتك</div><div className="promise-line"><span>03</span> قارن بثقة</div></div></section>
  <section className="section-block"><div className="section-heading"><div><span className="section-kicker">ابدأ من سؤالك</span><h2>بتدور على إيه؟</h2></div><Link to="/smart-search" className="text-link">البحث المتقدم ←</Link></div><div className="search-box"><Link to="/smart-search" className="search-entry">ابحث عن جهاز أو ماركة أو موديل...</Link><Link to="/smart-search" className="primary-button">ابدأ البحث</Link></div></section>
  <section className="section-block"><div className="section-heading"><div><span className="section-kicker">تخصصات الحازم</span><h2>كل قسم له احتياجه</h2></div></div><div className="category-showcase">
   <Link to="/catalog-center" className="category-tile category-active"><span>🏠</span><strong>الأجهزة الكهربائية</strong><small>استكشف الكتالوج المتاح</small></Link><Link to="/ac" className="category-tile category-active"><span>❄️</span><strong>التكييفات</strong><small>معلومات ومقارنة الأجهزة</small></Link><Link to="/catalog-center" className="category-tile category-active"><span>🍳</span><strong>أجهزة المطبخ</strong><small>ضمن الكتالوج الحالي</small></Link><div className="category-tile category-pending"><span>🍽️</span><strong>الأدوات المنزلية</strong><small>المحتوى قيد التجهيز والتحقق</small></div><div className="category-tile category-pending"><span>💡</span><strong>النجف والإضاءة</strong><small>المحتوى قيد التجهيز والتحقق</small></div><div className="category-tile category-pending"><span>🏺</span><strong>التحف</strong><small>المحتوى قيد التجهيز والتحقق</small></div>
  </div></section>
  <section className="section-block"><div className="section-heading"><div><span className="section-kicker">منهج الحازم</span><h2>معلومة واضحة قبل أي ترشيح</h2></div><Link to="/transparency" className="text-link">اعرف منهجية التحقق ←</Link></div><div className="feature-grid"><article className="feature-card"><span className="feature-symbol">✓</span><strong>مصدر المعلومة</strong><p>نعرض المصدر وحالة التحقق، ولا نخلط بيانات التجربة بالمعلومات المعتمدة.</p></article><article className="feature-card"><span className="feature-symbol">⚖</span><strong>مقارنة موضوعية</strong><p>نقارن المواصفات المتاحة، ونوضح العناصر الناقصة بدل استكمالها بالتخمين.</p></article><article className="feature-card"><span className="feature-symbol">♧</span><strong>اختيار يناسبك</strong><p>نبدأ من احتياجك وميزانيتك وظروف الاستخدام، لا من دفع منتج بعينه.</p></article></div></section>
  <section className="section-block"><div className="section-heading"><div><span className="section-kicker">اختياراتك</span><h2>منتجات في الكتالوج</h2></div><Link to="/catalog-center" className="text-link">عرض الكتالوج ←</Link></div><div className="cards-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>{!verifiedProducts.length&&<p className="data-notice">تنبيه: لا توجد حاليًا منتجات اجتازت حالة التحقق؛ البيانات الظاهرة للتعريف ببنية الكتالوج فقط وليست توصية شراء موثقة.</p>}</section>
  <section className="section-block"><div className="section-heading"><div><span className="section-kicker">الماركات</span><h2>تعرّف على الشركات</h2></div><Link to="/brands" className="text-link">كل الماركات ←</Link></div><div className="brand-grid">{brands.map(b=><Link key={b.id} to={"/brand/"+b.slug} className="brand-card"><img src={b.logo} alt={b.name}/><strong>{b.name}</strong><small>{b.country}</small><span className="brand-status">{b.sourceStatus==="Verified"?"بيانات تعريفية متحققة":"تحتاج مراجعة إضافية"}</span></Link>)}</div>{!verifiedBrands.length&&<p className="data-notice">لا توجد ماركات بحالة تحقق معتمدة حاليًا.</p>}</section>
  <section className="section-block advisor-banner"><div><span className="section-kicker">محتاج مساعدة؟</span><h2>خلّي احتياجك هو اللي يحدد الاختيار</h2><p>استخدم المستشار الذكي لتكوين بصمة احتياج أولية، ثم راجع البيانات المتاحة قبل اتخاذ القرار.</p></div><Link to="/smart-advisor" className="primary-button">افتح المستشار الذكي</Link></section>
  <section className="section-block"><div className="section-heading"><div><span className="section-kicker">المعرفة قبل الشراء</span><h2>أكاديمية الحازم</h2></div><Link to="/academy" className="text-link">زيارة الأكاديمية ←</Link></div><div className="feature-grid">{academyItems.map(item=><article key={item.id} className="feature-card"><span className="unverified-label">محتوى يحتاج مراجعة</span><strong>{item.title}</strong><p>{item.summary}</p></article>)}</div></section>
  <section className="section-block future-strip"><span>قريبًا ضمن خارطة التطوير</span><p>مطبخ ذكي · واقع معزز · مجتمع الحازم · مركز المناسبات · تطبيق الهاتف</p><small>هذه أفكار مستقبلية وليست خدمات متاحة حاليًا.</small></section>
 </div>;
}

function AcademyPage() { return <div className="container page-block"><span className="section-kicker">المعرفة قبل الشراء</span><h1>أكاديمية الحازم</h1><p className="page-intro">محتوى يساعدك تفهم مواصفات الأجهزة وطرق الاختيار وترشيد الاستهلاك.</p><div className="cards-grid">{academyItems.map(item=><article key={item.id} className="feature-card"><span className="unverified-label">مسودة — تحتاج مراجعة المصدر قبل النشر</span><h3>{item.title}</h3><p>{item.summary}</p></article>)}</div><p className="data-notice">لن يُنشر محتوى تعليمي باعتباره معلومة موثقة قبل مراجعة مصدره وتاريخ صلاحيته.</p></div>; }
function OffersPage() { return <div className="container page-block"><span className="section-kicker">عروض بشفافية</span><h1>عروض الحازم</h1><div className="empty-state"><strong>لا توجد عروض مؤكدة منشورة حاليًا.</strong><p>لن نعرض خصمًا أو موعدًا أو سعرًا ترويجيًا إلا بعد تأكيد تفاصيله وصلاحيته ومصدره.</p></div></div>; }
function TransparencyPage() { return <div className="container page-block"><span className="section-kicker">الثقة أولًا</span><h1>منهجية التحقق والشفافية</h1><div className="feature-grid"><article className="feature-card"><strong>الأسعار</strong><p>لا يظهر السعر كقيمة معتمدة إلا إذا كان موثق المصدر وحديثًا وصالحًا للعرض.</p></article><article className="feature-card"><strong>المواصفات</strong><p>نميز بين بيانات الشركة المصنعة والبيانات السوقية والتجريبية.</p></article><article className="feature-card"><strong>الماركات والموردون</strong><p>لا نستخدم وصف «معتمد» أو «شريك رسمي» دون مستند صالح للتحقق.</p></article></div><p className="data-notice">قد تظهر بعض السجلات في الكتالوج بحالة «غير متحقق» لأغراض المراجعة، ولا تعني اعتمادها كتوصية شراء.</p></div>; }
function SupportPage() { return <div className="container page-block"><span className="section-kicker">نحن هنا للمساعدة</span><h1>خدمة عملاء الحازم</h1><div className="empty-state"><strong>اطلب استشارة قبل الشراء</strong><p>جهّز نوع الجهاز واحتياجك والميزانية التقريبية، وابدأ بتحديد احتياجك قبل التواصل.</p><Link to="/smart-advisor" className="primary-button">ابدأ بتحديد احتياجك</Link></div></div>; }
function SuppliersPage() { return <div className="container page-block"><span className="section-kicker">شراكات موثوقة</span><h1>معلومات الموردين</h1><div className="empty-state"><strong>لا توجد بيانات موردين معتمدة للنشر حاليًا.</strong><p>لن ننشر بيانات اتصال أو صفة اعتماد لمورد قبل التحقق من هويته وموافقته وصحة بياناته.</p></div></div>; }

function NeedAssessmentPage() {
  const [state, setState] = useState({ room: 'غرفة نوم', people: 3, need: 'تبريد', budget: 20000 });

  return (
    <div className="container page-block">
      <h1>Need Assessment</h1>
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
  const product = products.find((item) => item.slug === slug) ?? products[0];
  const latestPrice = priceService.getLatest(product.id);

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
      <h1>Compare</h1>
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
            <td>Price</td>
            <td>{productA ? (priceService.getLatest(productA.id)?.price ? `${priceService.getLatest(productA.id)!.price.toLocaleString()} جنيه` : 'غير متوفر') : 'غير متوفر'}</td>
            <td>{productB ? (priceService.getLatest(productB.id)?.price ? `${priceService.getLatest(productB.id)!.price.toLocaleString()} جنيه` : 'غير متوفر') : 'غير متوفر'}</td>
          </tr>
          <tr>
            <td>Energy Consumption</td>
            <td>{productA?.energyInformation ?? 'غير متوفر في المصدر الموثق'}</td>
            <td>{productB?.energyInformation ?? 'غير متوفر في المصدر الموثق'}</td>
          </tr>
          <tr>
            <td>Warranty</td>
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
      <h1>Smart Advisor</h1>
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

      <div className="cards-grid">
        {recommendations.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}

function BrandsPage() {
  return (
    <div className="container page-block">
      <h1>Brands</h1>
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
  const brand = brands.find((item) => item.slug === slug) ?? brands[0];

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
      <h1>Catalog Center</h1>
      <div className="cards-grid">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}

function ACPage() {
  return (
    <div className="container page-block">
      <h1>AC</h1>
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
      <h1>Admin Dashboard</h1>
      <div className="cards-grid">
        <div className="feature-card"><strong>Missing Images</strong><p>{summary.missingImages}</p></div>
        <div className="feature-card"><strong>Missing Sources</strong><p>{summary.missingSources}</p></div>
        <div className="feature-card"><strong>Missing Specs</strong><p>{summary.missingSpecs}</p></div>
        <div className="feature-card"><strong>Stale Prices</strong><p>{summary.stalePrices}</p></div>
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
        <Route path="/academy" element={<AcademyPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/transparency" element={<TransparencyPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
