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
        <span className="badge">{product.verificationStatus === "Verified" ? "تم التحقق" : "غير متحقق"}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="meta-row">
          <strong>السعر:</strong>
          <span>{latestPrice ? `${latestPrice.price.toLocaleString()} جنيه` : 'غير متوفر في المصدر الموثق'}</span>
        </div>
        <div className="meta-row">
          <strong>المصدر:</strong>
          <span>{product.sourceType === "Official" ? "مصدر رسمي مسجل" : product.sourceType === "Trusted Market" ? "مصدر سوقي موثق" : "مصدر سوقي غير متحقق"}</span>
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
  const [state, setState] = useState({ room: 'غرفة نوم', people: '3', need: 'تبريد', budget: '20000' });
  const people = Number(state.people);
  const budget = Number(state.budget);
  const validPeople = Number.isInteger(people) && people >= 1 && people <= 30;
  const validBudget = Number.isFinite(budget) && budget >= 0 && budget <= 10000000;
  const validRoom = state.room.trim().length > 0;
  const valid = validPeople && validBudget && validRoom;

  return (
    <div className="container page-block">
      <span className="section-kicker">ابدأ من احتياجك</span>
      <h1>تحديد احتياجك</h1>
      <p className="page-intro">سجل معلومات أولية تساعدك في تنظيم الاختيار. هذه الخطوة لا تنتج حسابًا فنيًا أو ترشيحًا نهائيًا.</p>
      <form className="panel-form" onSubmit={(event) => event.preventDefault()}>
        <label>نوع الغرفة<input value={state.room} onChange={(e) => setState({ ...state, room: e.target.value })} maxLength={80} /></label>
        <label>عدد الأشخاص<input type="number" min="1" max="30" step="1" value={state.people} onChange={(e) => setState({ ...state, people: e.target.value })} /></label>
        <label>الاحتياج<select value={state.need} onChange={(e) => setState({ ...state, need: e.target.value })}><option>تبريد</option><option>تدفئة</option><option>تبريد وتدفئة</option><option>تجهيز منزلي</option></select></label>
        <label>الميزانية التقريبية (جنيه)<input type="number" min="0" max="10000000" step="100" value={state.budget} onChange={(e) => setState({ ...state, budget: e.target.value })} /></label>
      </form>
      {!valid && <p className="data-notice" role="alert">راجع المدخلات: عدد الأشخاص من 1 إلى 30، والميزانية رقم غير سالب، ونوع الغرفة مطلوب.</p>}
      <div className="result-box" aria-live="polite">
        <h3>ملخص احتياجك الأولي</h3>
        {valid ? <p>{state.room.trim()} • {people} أشخاص • {state.need} • {budget.toLocaleString('ar-EG')} جنيه</p> : <p>أكمل البيانات الصحيحة لعرض الملخص.</p>}
        <small>البيانات تظل داخل هذه الصفحة ولا يتم إرسالها أو حفظها في حساب.</small>
      </div>
      <div className="actions"><Link to="/smart-advisor" className="primary-button">انتقل للمستشار الذكي</Link><Link to="/ac" className="secondary-button">استكشف التكييفات</Link></div>
    </div>
  );
}

function SmartSearchPage() {
  const [term, setTerm] = useState('');
  const results = searchService.search({ term: term.trim() });

  return (
    <div className="container page-block">
      <span className="section-kicker">ابحث داخل الكتالوج</span><h1>البحث عن المنتجات</h1>
      <div className="search-box search-large"><input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="اسم المنتج أو الماركة أو الموديل" aria-label="عبارة البحث" /></div>
      <p className="data-notice">نتائج البحث من بيانات الكتالوج الحالية، ولا يعني ظهور المنتج أن سعره أو توافره مؤكد.</p>
      <div className="cards-grid">{results.length ? results.map((product) => <ProductCard key={product.id} product={product} />) : <div className="empty-state">{term.trim() ? 'لا توجد نتائج مطابقة في الكتالوج الحالي.' : 'ابدأ بكتابة اسم جهاز أو ماركة أو موديل.'}</div>}</div>
    </div>
  );
}

function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <NotFoundPage />;
  const latestPrice = priceService.getLatest(product.id);
  const isVerified = product.verificationStatus === 'Verified';

  return (
    <div className="container page-block product-detail">
      <img src={product.imageUrl} alt={product.name} className="detail-image" />
      <div>
        <span className="badge">{isVerified ? 'تم التحقق من البيانات' : 'بيانات غير متحققة بالكامل'}</span>
        <h1>{product.name}</h1><p>{product.description}</p>
        {!isVerified && <p className="data-notice">هذه بطاقة تعريفية للمراجعة والاستكشاف، وليست اعتمادًا للمواصفات أو توصية شراء.</p>}
        <ul className="detail-list">
          <li>الماركة: {brands.find((brand) => brand.id === product.brandId)?.name ?? 'غير محدد'}</li>
          <li>الموديل: {product.model || 'غير متوفر في المصدر الموثق'}</li>
          <li>السعر: {latestPrice ? latestPrice.price.toLocaleString('ar-EG') + ' جنيه' : 'لا يوجد سعر حديث متحقق'}</li>
          <li>الضمان: {isVerified ? product.warranty ?? 'غير متوفر في المصدر الموثق' : 'يحتاج إلى تحقق مستقل'}</li>
          <li>المواصفات: {Object.keys(product.specifications).length ? Object.entries(product.specifications).map(([key,value]) => key + ': ' + value).join(' • ') : 'غير متوفرة في المصدر الموثق'}</li>
        </ul>
        <div className="actions"><Link to="/compare" className="secondary-button">قارن المنتج</Link><Link to="/smart-advisor" className="primary-button">اطلب مساعدة في الاختيار</Link></div>
      </div>
    </div>
  );
}

function ComparePage() {
  const [left, setLeft] = useState(products[0]?.id ?? '');
  const [right, setRight] = useState(products[1]?.id ?? '');
  const productA = products.find((item) => item.id === left);
  const productB = products.find((item) => item.id === right);
  const priceA = productA ? priceService.getLatest(productA.id) : undefined;
  const priceB = productB ? priceService.getLatest(productB.id) : undefined;

  return (
    <div className="container page-block">
      <span className="section-kicker">اختيار على أساس واضح</span><h1>مركز المقارنة</h1>
      <p className="page-intro">قارن البيانات المتاحة فقط. الخانة الناقصة لا تعني أن المنتج أقل جودة، بل أن المعلومة لم تتوفر بمصدر موثق.</p>
      {products.length < 2 ? <div className="empty-state">نحتاج إلى منتجين على الأقل لإجراء المقارنة.</div> : <>
        <div className="compare-controls">
          <label>المنتج الأول<select value={left} onChange={(e) => setLeft(e.target.value)}>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label>
          <label>المنتج الثاني<select value={right} onChange={(e) => setRight(e.target.value)}>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label>
        </div>
        {left === right && <p className="data-notice" role="status">اختر منتجين مختلفين للحصول على مقارنة مفيدة.</p>}
        <div className="table-scroll"><table className="compare-table"><thead><tr><th>المعيار</th><th>{productA?.name ?? '—'}</th><th>{productB?.name ?? '—'}</th></tr></thead>
          <tbody>
            <tr><td>حالة التحقق</td><td>{productA?.verificationStatus === 'Verified' ? 'تم التحقق' : 'غير متحقق'}</td><td>{productB?.verificationStatus === 'Verified' ? 'تم التحقق' : 'غير متحقق'}</td></tr>
            <tr><td>السعر الحديث المتحقق</td><td>{priceA ? priceA.price.toLocaleString('ar-EG') + ' جنيه' : 'غير متوفر'}</td><td>{priceB ? priceB.price.toLocaleString('ar-EG') + ' جنيه' : 'غير متوفر'}</td></tr>
            <tr><td>الموديل</td><td>{productA?.model || 'غير متوفر'}</td><td>{productB?.model || 'غير متوفر'}</td></tr>
            <tr><td>السعة / القدرة</td><td>{productA?.capacity || 'غير متوفر'}</td><td>{productB?.capacity || 'غير متوفر'}</td></tr>
            <tr><td>استهلاك الطاقة</td><td>{productA?.energyInformation || 'غير متوفر'}</td><td>{productB?.energyInformation || 'غير متوفر'}</td></tr>
            <tr><td>الضمان المسجل</td><td>{productA?.verificationStatus === 'Verified' ? productA.warranty || 'غير متوفر' : 'يحتاج إلى تحقق'}</td><td>{productB?.verificationStatus === 'Verified' ? productB.warranty || 'غير متوفر' : 'يحتاج إلى تحقق'}</td></tr>
            <tr><td>المواصفات المسجلة</td><td>{productA ? Object.entries(productA.specifications).map(([k,v])=>k+': '+v).join(' • ') || 'غير متوفر' : '—'}</td><td>{productB ? Object.entries(productB.specifications).map(([k,v])=>k+': '+v).join(' • ') || 'غير متوفر' : '—'}</td></tr>
          </tbody>
        </table></div>
        <p className="data-notice">لا يصدر المركز فائزًا تلقائيًا ولا يحسب «القيمة مقابل السعر» عند نقص الأسعار أو المواصفات الموثقة.</p>
      </>}
    </div>
  );
}

function SmartAdvisorPage() {
  const [category, setCategory] = useState('ac');
  const [budget, setBudget] = useState('22000');
  const [occupants, setOccupants] = useState('4');
  const numericBudget = Number(budget);
  const numericOccupants = Number(occupants);
  const valid = Number.isFinite(numericBudget) && numericBudget >= 0 && numericBudget <= 10000000
    && Number.isInteger(numericOccupants) && numericOccupants >= 1 && numericOccupants <= 30;
  const profile: NeedProfile = { category, budget: valid ? numericBudget : undefined, occupants: valid ? numericOccupants : undefined };
  const { products: recommendations, explanations } = valid ? advisorService.recommend(profile) : { products: [], explanations: [] };

  return (
    <div className="container page-block">
      <span className="section-kicker">مساعدك في الاختيار</span><h1>المستشار الذكي</h1>
      <p className="page-intro">نستخدم بيانات الكتالوج المتاحة لتكوين قائمة استكشافية. لا نعتبر النتيجة توصية نهائية عندما تكون بيانات المنتج غير متحققة.</p>
      <div className="panel-form">
        <label>الفئة<select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">كل الفئات</option><option value="ac">التكييفات</option><option value="appliances">الأجهزة الكهربائية</option><option value="kitchen">أجهزة المطبخ</option><option value="household">الأدوات المنزلية</option><option value="lighting">الإضاءة</option></select></label>
        <label>الميزانية (جنيه)<input type="number" min="0" max="10000000" value={budget} onChange={(e) => setBudget(e.target.value)} /></label>
        <label>عدد أفراد المنزل<input type="number" min="1" max="30" step="1" value={occupants} onChange={(e) => setOccupants(e.target.value)} /></label>
      </div>
      {!valid ? <p className="data-notice" role="alert">أدخل ميزانية من صفر إلى 10 ملايين جنيه وعدد أفراد من 1 إلى 30.</p> : <>
        <div className="result-box"><h3>كيف تكوّنت النتيجة؟</h3><ul>{explanations.map((item) => <li key={item}>{item}</li>)}</ul><small>عدد أفراد المنزل معلومة سياقية حاليًا، ولا تُستخدم كحساب فني لاختيار سعة التكييف.</small></div>
        {recommendations.length ? <><div className="cards-grid">{recommendations.map((product) => <ProductCard key={product.id} product={product} />)}</div><p className="data-notice">راجع حالة التحقق ومصدر كل منتج. لا توجد أسعار مؤكدة للمنتجات غير المتحققة.</p></> : <div className="empty-state">لا توجد منتجات مطابقة للمدخلات في الكتالوج الحالي. جرّب فئة أخرى أو راجع الكتالوج لاحقًا.</div>}
      </>}
    </div>
  );
}

function BrandsPage() {
  return <div className="container page-block"><span className="section-kicker">دليل الماركات</span><h1>مركز الماركات</h1><p className="page-intro">صفحات تعريفية للماركات المسجلة حاليًا. الظهور في الدليل لا يعني وجود اعتماد تجاري أو شراكة رسمية.</p>
    <div className="brand-grid">{brands.map((brand) => <Link to={"/brand/"+brand.slug} key={brand.id} className="brand-card"><img src={brand.logo} alt={"شعار "+brand.name}/><strong>{brand.name}</strong><small>بلد المنشأ المسجل: {brand.country} — يحتاج إلى مراجعة المصدر</small><span className="brand-status">مصدر التعريف: الموقع الرسمي للماركة — راجع التفاصيل</span></Link>)}</div>
    <p className="data-notice">هذا الدليل لا يدّعي حصر جميع الماركات العاملة في مصر. تتم إضافة الماركات تدريجيًا بعد مراجعة مصادرها.</p>
  </div>;
}

function BrandDetailPage() {
  const { slug } = useParams();
  const brand = brands.find((item) => item.slug === slug);
  if (!brand) return <NotFoundPage />;
  const brandProducts = products.filter((product) => product.brandId === brand.id);
  return <div className="container page-block"><span className="section-kicker">ملف الماركة</span><h1>{brand.name}</h1><p>{brand.description}</p>
    <div className="feature-grid"><article className="feature-card"><strong>بلد المنشأ المسجل</strong><p>{brand.country}</p></article><article className="feature-card"><strong>التقنية المذكورة في السجل</strong><p>{brand.technology || 'غير متوفر'}</p></article><article className="feature-card"><strong>الموقع الرسمي</strong><p>{brand.officialUrl || "غير متوفر"}</p></article></div>
    <h2>منتجات مرتبطة في الكتالوج</h2>{brandProducts.length ? <div className="cards-grid">{brandProducts.map((product)=><ProductCard key={product.id} product={product}/>)}</div> : <div className="empty-state">لا توجد منتجات مرتبطة بهذه الماركة في الكتالوج الحالي.</div>}
    <p className="data-notice">هذه صفحة معلومات مستقلة وليست إثباتًا لاعتماد الحازم كموزع أو وكيل رسمي.</p>
  </div>;
}

function CatalogCenterPage() {
  return <div className="container page-block"><span className="section-kicker">الكتالوج</span><h1>كتالوج الأجهزة</h1><p className="page-intro">استعرض السجلات المتاحة، وتحقق من حالة كل منتج قبل الاعتماد على تفاصيله.</p>
    <div className="cards-grid">{products.map((product)=><ProductCard key={product.id} product={product}/>)}</div>
    <p className="data-notice">المنتجات المعروضة تشمل سجلات غير متحققة لأغراض التعريف والمراجعة. لا تعتبر الأسعار أو التوافر مؤكدين ما لم يظهر مصدر حديث متحقق.</p>
  </div>;
}

function ACPage() {
  const airConditioners = products.filter((product) => product.categoryId === 'ac');
  return <div className="container page-block"><span className="section-kicker">حلول التكييف</span><h1>مركز التكييفات</h1><p className="page-intro">ابدأ بتحديد ظروف الغرفة والاحتياج، ولا تعتمد على القدرة الاسمية وحدها لاختيار جهاز مناسب.</p>
    <div className="actions"><Link to="/need-assessment" className="primary-button">حدد احتياجك</Link><Link to="/smart-advisor" className="secondary-button">استشر المساعد</Link></div>
    <div className="cards-grid">{airConditioners.length ? airConditioners.map((product)=><ProductCard key={product.id} product={product}/>) : <div className="empty-state">لا توجد سجلات تكييف في الكتالوج حاليًا.</div>}</div>
  </div>;
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
