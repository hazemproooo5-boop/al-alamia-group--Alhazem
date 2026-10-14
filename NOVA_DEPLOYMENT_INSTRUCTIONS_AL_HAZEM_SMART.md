الجزء الثاني — أمر الإنشاء الكامل الموجه إلى Nova
انسخ النص التالي كاملاً إلى Nova، وأرفق المشروع الحالي أو اربط مستودعه إن كانت الأداة تدعم ذلك. المطلوب تنفيذ المشروع الحالي، لا إنشاء نموذج منفصل بلا داعٍ.

أنت قائد تنفيذ ومهندس برمجيات مسؤول عن بناء AL HAZEM SMART / الحازم سمارت وفق وثيقة المتطلبات المرفقة كاملة.

المطلوب تنفيذ المنصة فعلياً، وليس تقديم خطة أو
 واجهة شكلية فقط.

قواعد إلزامية:
1. اقرأ الوثيقة كاملة قبل تعديل الملفات.
2. حافظ على جميع الصفحات والوظائف الحالية؛ لا تحذف أو تؤجل أي متطلب.
3. Lightweight تعني كوداً واضحاً ومقروءاً وقابلاً للصيانة وسريعاً، ولا تعني تقليل الميزات.
تتوقف عند التدقيق والخطة؛ نفّذ ثم اختبر ثم أصلح. تجنب Endless Audit Loop.4. افحص المشروع الحالي ونفّذ عليه؛ لا تعِد بناءه من الصفر إذا كان صالحاً.
5. لا تعرض Demo Data على أنها حقيقية، ولا تختلق منتجات أو أسعاراً أو مواصفات أو ضمانات أو مصادر.
6. لا تدّعِ نجاح اختبار أو اكتمال وظيفة لم تُنفذ وتُختبر.
7. لا
 
8. لا تغيّر قواعد العمل القائمة بصمت؛ اعزل أي تغيير مؤثر ووثّقه.
9. لا تضع الأسرار أو مفاتيح API في الواجهة أو مستودع الكود.

الهوية:
- الحازم سمارت — AL HAZEM SMART؛ الحازم جروب.
- الشعار: «قبل ما تشتري… اسأل الحازم».
- الشركة: العالمية للأجهزة الكهربائية وخدمات التكييف والأدوات المنزلية والنجف والتحف.
- Arabic RTL، Mobile First، Arimo، Navy #091329، Gold #C79529، Warm White #F5F4F0.
cademy, Competitions, Al Hazem Club, Transparency, Suppliers, Decision Board, Support, Profile, AUX, Auth, Admin Dashboard, Real 40- الهاتف 01050509779، واتساب 01044111143، الموقع سيدي غازي، كفر الشيخ، أمام موقف الميكروباص. اجعلها قابلة للتعديل من Site Settings.

الصفحات المطلوبة كاملة:
Home, Need Assessment, Smart Search, Results, Product Detail, Compare, Smart Advisor, Brands, Brand Detail, Catalog Center, Appliances, AC, AC Calculator, Household, Smart Kitchen, Lighting/Chandeliers/Antiques, Offers, News, Tips, 
A4.
لا تحذف أي صفحة موجودة. حسّنها واربطها بقاعدة البيانات.

ترتيب Home:
Header → Hero → Smart Search → Need Assessment → Consultation → Brands → Appliances → AC → Household → Smart Kitchen → Lighting/Chandeliers/Antiques → Offers → News → Tips → Competitions → AUX → Academy → Transparency → Footer.
يجب أن يكون AUX مباشرة قبل Footer.

Brands:
Samsung, LG, Beko, Bosch, Toshiba, Sharp, Fresh, Zanussi, Unionaire, Kiriazi, Midea, Haier, Tornado, Carrier/Miraco، مع إمكانية إضافة غيرها من Admin.
كل شعار يفتح صفحة داخل المنصة لا خروجاً مباشراً لموقع الشركة. صفحة الماركة تعرض النبذة وبلد المنشأ والتكنولوجيا والفئات والمنتجات والمواصفات والكتالوجات الرسمية والفيديوهات المتاحة والضمان ومراكز الخدمة والتجارب الموثقة والمنتجات الشائعة وطلب أفضل سعر وواتساب والاستشارة.

Product Data:
name, slug, brand_id, manufacturer_id, category_id, model, SKU, GTIN if available, description, specifications, dimensions, capacity, energy_information, warranty, availability, official_product_url, source_url, source_type, verification_status, verified_date, published, created_at, updated_at.
صور المنتج تخزن مع image_url وsource_url وحالة التحقق والترتيب. لا تعرض صورة غير حقيقية على أنها صورة المنتج.

Price:
product_id, price, currency, price_type, source, source_url, price_date, verification_status.
الأنواع: Official Price, Al Hazem Price, Trusted Market Price, Unverified Market Price.
لا تستخدم اسم Al Hazem Price إلا للسعر الصادر فعلياً عن الحازم. احتفظ بتاريخ الأسعار وعلّم السعر القديم.

Smart Search:
Intent Extraction → Need Extraction
 → Database Search → Verified Candidates → Ranking → Results → Explanation.
Search وAdvisor وCompare يجب أن يستخدموا قاعدة البيانات الحقيقية. لا تستخدم مصفوفات ثابتة كقاعدة بيانات. عند نقص المعلومات قل إنها غير متوفرة في المصدر الموثق.

Advisor:
يسأل عن النواقص، يبحث في المنتجات الموجودة والموثقة، يقارن ويشرح سبب التوصية والبدائل، ويحول للمبيعات عند الحاجة. لا يختلق أي بيانات.

Compare:
Price, Energy Consumption, Technology, Specifications, Warranty, Materials, Maintenance, Spare Parts, Availability, Value. المعلومة الناقصة تظهر «غير متوفرة في المصدر الموثق».

AC:
Residential, Commercial, Central, AUX, all available brands. Calculator inputs: length, width, height if needed, people, direction, windows, heat sources, usage. النتيجة تقديرية، مع إحالة لمعاينة فنية عند الحاجة. لا تدّعِ اعتماد AUX دون مستند اعتماد موثق.

Smart Kitchen:
مقاسات الغرفة والأبواب والنوافذ ونقاط الخدمات، ثم اقتراح الثلاجة والبوتاجاز والميكروويف والشفاط وغسالة الأطباق والتوزيع. جهّز البنية لتوسع 3D/AR دون إثقال النسخة الحالية.

Household:
Cookware, Pots, Cooking Tools, Small Kitchen Appliances, Plastic, Glassware, Organization, Cleaning.
Lighting:
Modern/Classic Chandeliers, Lighting Units, Antiques, Decor Ideas. الأثاث والستائر والسجاد توسع مستقبلي لا تخصص حالي.

Academy/News/Tips:
Buying Guides, Articles, Videos, AC Lessons, Electricity Saving, Brand Comparisons, User Guides, FAQ. الأخبار والنصائح والتحديثات تتضمن المصدر والتاريخ وحالة التحقق.

Transparency/Experience:
اعرض المصدر وحالة التحقق وتاريخه. «أنصح غيرك» لا تعرض مشكلة كمؤشر متكرر إلا عند خمس حالات متتالية أو أكثر؛ الأقل ليس حكماً نهائياً.

Club/Competitions:
تسويق وتذكيرات بموافقة صريحة قابلة
 للإلغاء. Anniversary feature اختيارية وتشمل أسماء الزوجين والتاريخ وموافقة التذكير. المسابقات تعرض الشروط والأهلية والمواعيد والجوائز والفائزين.

Support/Suppliers/Decision Board:
احفظ طلبات الاتصال والاستشارة والمعاينة وعروض السعر والشكاوى والمقترحات في قاعدة البيانات. الموردون لهم بيانات ومستندات وحالة تحقق. Decision Board تحفظ Need Fingerprint والميزانية والمنتجات والمقارنة والأسباب والمصادر ومستوى الثقة وقرار العميل.

Database:
users, roles, brands, manufacturers, categories, products, product_images, prices, price_history, catalogs, offers, news, tips, academy, faq, consultations, support_requests, need_profiles, need_fingerprints, comparisons, decision_boards, competitions, competition_entries, club_members, suppliers, site_settings, audit_log, data_quality, verification_records.
قاعدة البيانات هي Source of Truth.

Security:
Roles USER, VIEWER, EDITOR, ADMIN. Authentication منفصل عن Authorization. طبّق Server-side Authorization وRLS. لا تحمِ Admin بمجرد إخفاء الرابط. تحقق من المدخلات، واحمِ من XSS، واستخدم Password Hashing آمناً، وRate Limiting عند الحاجة، وSecrets/Vault. لا API Keys في Frontend أو Database.
Audit Log يسجل Create, Update, Delete, Publish, Unpublish, Verify, Price Change, Permission Change. لا يستطيع المستخدم العادي تعديل السجل.

Data Quality:
اكتشف المنتجات بلا صور/مصادر/مواصفات/ضمان/سعر، الأسعار القديمة، المصادر غير الموثقة، البيانات الناقصة، التكرارات والسجلات غير المنشورة. لا Trust Badge لبيانات ناقصة أو غير موثقة.

Admin:
إدارة Brands, Manufacturers, Categories, Products, Images, Prices, Catalogs, Offers, News, Tips, Academy, FAQ, Consultations, Customers, Settings, Data Quality, Audit Log, Users, Roles, Suppl
iers.
الإجراءات الحساسة تسجل في Audit Log.

Code Architecture:
UI → Hooks/Controllers → Services → Repositories → Database.
خدمات منفصلة مثل productService, priceService, searchService, verificationService. ومستودعات مثل productRepository, brandRepository, priceRepository. ملفات واضحة صغيرة ومسؤولية واحدة. لا Microservices ولا مكتبات أو تجريدات غير ضرورية.
استخدم Pagination وLazy Loading وBatch Queries وفهارس تخدم الاستعلامات الفعلية. امنع N+1، ولا تحمل كل المنتجات دفعة واحدة، ولا تستدع AI لكل بطاقة.

SEO/Mobile:
Metadata, Canonical, OpenGraph, clean slugs, Arabic SEO, Real 404, legacy redirects عند الحاجة. اختبر RTL والجوال عند 430px والتابلت وسطح المكتب.

مصادر البيانات:
ابدأ بالمصادر الرسمية الموثوقة. الأولوية: Samsung, LG, Beko, Bosch, Toshiba؛ ثم Sharp, Fresh, Zanussi, Unionaire, Kiriazi؛ ثم Midea, Haier, Tornado, Carrier/Miraco. أدخل عدداً محدوداً من المنتجات الموثقة ثم وسّع تدريجياً. لا Fake Products ولا Fake Prices.

Execution:
1. افحص المشروع الحالي والصفحات والخدمات وقاعدة البيانات والصلاحيات.
2. اكتب قائمة فروق قصيرة عن الوثيقة.
3. نفّذ التعديلات الفعلية مع الحفاظ على الموجود.
4. اربط الواجهة بقاعدة البيانات عبر Services وRepositories.
5. أكمل Authentication وAuthorization وRLS وAdmin.
6. اربط Search وAdvisor وCompare بالبيانات الموثوقة.
7. أكمل Data Quality وAudit Log وSite Settings.
8. راجع الأداء وSEO والجوال.
9. شغّل Build وTypecheck وLint والاختبارات المتاحة، وأصلح الأخطاء.
10. اختبر كل الصفحات المذكورة وأدوار Guest/User/Viewer/Editor/Admin.
11. سلّم تقريراً صادقاً يوضح الوظائف المنفذة والملفات المعدلة وتغييرات DB ونتائج الاختبارات والمتبقي وسببه.

Acceptance Criteria:
Database هي Source of Truth؛ لا Demo Data على أنها حقيقية؛ كل Product له Source؛ كل Price له Source + Date؛ AI لا يختلق؛ RLS والصلاحيات وAdmin تعمل؛ Search/Advisor/Compare تستخدم Database؛ صفحات الماركات داخلية؛ 404 حقيقية؛ Mobile وSEO يعملان؛ Data Quality وAudit 
Log يعملان؛ Build/Typecheck/Lint والاختبارات تمر؛ ولا تتعطل أي وظيفة قائمة.

ابدأ التنفيذ الآن، ولا تكتفِ بخطة أو نموذج واجهة. لا تدّعِ اكتمال شيء قبل تنفيذه واختباره.