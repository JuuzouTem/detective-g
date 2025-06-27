import React, { useState, useEffect } from 'react';
import { FileText, Users, Map, Lock, BrainCircuit, Hourglass, HelpCircle, Film, VenetianMask, Newspaper, Microscope, Scroll, Archive, ToyBrick, Drama, X, RefreshCw, FolderKanban, Lightbulb } from 'lucide-react';

// --- BİLEŞENLER ---

const Icon = ({ name, type, ...rest }) => {
    // Belge türüne göre ikon seçimi
    if (type === 'doc') {
        const docIconMap = { 'Sorgu Raporu': Users, 'Gazete Küpürü': Newspaper, 'Otopsi Raporu': Microscope, 'Kişisel Not': Scroll, 'Olay Yeri Raporu': Map, 'Harita': Map };
        const DocIcon = docIconMap[name] || FileText;
        return <DocIcon {...rest} />;
    }
    // Form için ikon seçimi
    const formIconMap = { 'Hikaye Temelleri': Drama, 'Oyun Mekanikleri': ToyBrick };
    const FormIcon = formIconMap[name] || HelpCircle;
    return <FormIcon {...rest} />;
};

// Sağlanan listeden alınan fikirler
const localIdeas = {
  theme: ["Kara Film (Film Noir)", "Altın Çağ Polisiyesi (Agatha Christie Tarzı)", "Viktorya Dönemi Gizemi", "Soğuk Savaş Casusluğu", "Yasak Alkol Dönemi (1920'ler)", "Akademik Çekişme", "Sanat Dünyası Sahtekarlığı", "Hollywood Skandalı (1950'ler)", "Siyasi Gerilim", "Kurumsal Casusluk", "Vahşi Batı Kanunsuzluğu", "Soylu Aile Mirası Kavgası", "Sirk Çadırı Altında Cinayet", "Lüks Yat Partisi Gizemi", "Manastır Sırları", "Teknoloji Start-up'ı Sabotajı", "Gurme Dünyası Rekabeti", "Moda Endüstrisi Komplosu", "Yeraltı Dövüş Kulübü", "Hazine Avcıları Rekabeti", "Terk Edilmiş Akıl Hastanesi Gizemi", "Antarktika Araştırma Üssü İzolasyonu", "Arkeolojik Kazı Rekabeti", "Mason Locası Sırları", "Gizli Cemiyet İhaneti", "Lüks Kayak Merkezi Cinayeti", "Formula 1 Sabotajı", "Opera Binası Trajedisi", "Satranç Turnuvası Hilesi", "Kütüphane Sessizliği", "Botanik Bahçesi Zehirlenmesi", "Devrim Öncesi Fransa'sı", "Orta Çağ Şövalye Turnuvası", "Antik Roma Komplosu", "Antik Yunan Felsefe Okulu", "İpek Yolu Ticareti", "Okyanus Derinlikleri Keşfi", "Amazon Kabile Sırları", "Avustralya taşrası (Outback) Gizemi", "Trans-Sibirya Ekspresi", "Müzik Festivali Sabotajı", "Nükleer Sığınak Paranoyası", "Ekolojik Terörizm", "Banka Soygunu İçeriden Bilgi", "Kumarhane Vurgunu", "Televizyon Yarışma Programı Hilesi", "Geleneksel Köy Töreleri", "Tarihi Eser Kaçakçılığı", "İsviçre Bankası Sırları", "Sualtı Laboratuvarı Kazası", "Havaalanı Güvenlik İhlali", "Diplomatik Kriz", "Borsa Manipülasyonu", "Rock Grubu İçi Çekişme", "Ünlü Ressamın Son Eseri", "Şarap Mahzeni Gizemi", "Aşçılık Okulu Rekabeti", "Yoga Merkezi Cinayeti", "Tiyatro Oyunu Prömiyeri", "Kukla Ustası ve Sırları", "Antika Dükkanı Gizemi", "Deniz Feneri Bekçisinin Kayboluşu", "İllüzyonist Gösterisi", "Hipnoz Terapisi Skandalı", "İklim Değişikliği Komplosu", "Milli Park Korucusu Cinayeti", "Eski Bir Maden Kasabası Sırrı", "Savaş Muhabirinin Notları", "Hacker Kolektifi İhaneti", "Nadir Kitap Koleksiyonerleri", "Parfümörün Ölümcül Formülü", "Oyuncak Tren Koleksiyonu", "Astronomi Gözlemevi Keşfi", "Kayıp Film Makarası", "Radyo Tiyatrosu Cinayeti", "Şiir Cemiyeti İntiharı", "Veri Merkezi Hırsızlığı", "Sınır Kasabası Gerilimi", "Manş Denizi Kaçakçılığı", "İskoç Kalesi Sırları", "İrlanda Kırsalı Anlaşmazlığı", "Venedik Karnavalı", "Çin İmparatorluk Sarayı Entrikası", "Japon Samuray Onuru", "İnka Altınları Hırsızlığı", "Osmanlı Haremi Cinayeti", "Çarlık Rusyası Balosu", "Caz Kulübü Cinayeti", "Sessiz Sinema Dönemi", "Kaçış Odası Oyunu", "Kripto Para Vurgunu", "Yeraltı Sanat Galerisi", "İnsan Avı Partisi", "Tarihi Canlandırma Etkinliği", "Minyatür Suç mahalli Sanatçısı", "Siyasi Sığınmacı Krizi", "Petrol Platformu Sabotajı", "Elmas Madeni Çekişmesi", "Lüks Saat Üreticileri Rekabeti", "Klasik Müzik Orkestrası Rekabeti", "Balıkçı Kasabası Sırları", "Kereste Fabrikası Kazası", "Sınır Devriyesi Komplosu", "Büyükelçilik Skandalı", "Dağcılık Ekibi Trajedisi", "Gemi Enkazı Hazine Avı", "Kayak Pistinde Kaza Süslü Cinayet", "Üniversite Mezunları Buluşması", "Ünlü Bir Avukatın Öldürülmesi", "Adli Tıp Laboratuvarı Skandalı", "Gizli Bir Askeri Deney", "Bir Gazetecinin Susturulması", "Miras Kavgası", "Bir Tarikatın İç Yüzü", "Şantaj ve İntikam Döngüsü"],
  eventType: ["Ünlü bir aktrisin gizemli ölümü", "Devrim niteliğindeki bir icadın çalınması", "Bir milyarderin kilitli odasında ölü bulunması", "Ödüllü bir yazarın ortadan kaybolması", "Uluslararası bir barış anlaşmasının sabote edilmesi", "Nadir bir elmasın sergiden çalınması", "Bir politikacıya yapılan şantaj", "Ünlü bir şefin kendi restoranında zehirlenmesi", "Bir arkeolojik keşfin ardından başlayan ölümler", "Bir casusun kimliğinin ifşa olması", "Bir trenin dağ geçidinde mahsur kalması ve bir cinayet", "Kaza süsü verilmiş bir cinayet", "Bir banka soygunu sırasında beklenmedik bir ölüm", "Kayıp bir mirasçının yıllar sonra ortaya çıkması", "Bir tarikat liderinin intihar süsü verilmiş cinayeti", "Bir bilim insanının tehlikeli bir virüsü sızdırma tehdidi", "Bir sanat eserinin sahtesiyle değiştirilmesi", "Bir kralın veya devlet başkanının suikasta kurban gitmesi", "Bir şirket CEO'sunun kendi ofisinde infaz edilmesi", "Bir nükleer denizaltıda isyan çıkması", "Önemli bir tanığın mahkemeden önce öldürülmesi", "Bir çocuğun zengin ailesinden kaçırılması", "Tarihi bir belgenin sahte olduğunun anlaşılması", "Şehrin önemli noktalarında beliren gizemli semboller", "Bir opera sanatçısının performans sırasında ölmesi", "Bir arkeoloğun keşfettiği eserle birlikte ortadan kaybolması", "Bir dağcının zirvede donmuş cesedinin bulunması", "Bir kütüphanedeki gizli bir geçidin keşfedilmesi", "Bir hacker'ın devlet sırlarını sızdırması", "Bir hayvanat bahçesindeki nadir bir hayvanın öldürülmesi", "Bir şarap mahzenindeki en değerli şarabın zehirlenmesi", "Bir manastırdaki kutsal bir emanetin çalınması", "Bir sihirbazın kendi numarasında gerçekten kaybolması", "Bir yarış atının yarıştan önce sakatlanması", "Bir film setinde gerçek mermi kullanılması", "Bir hayır balosunda işlenen cinayet", "Bir yargıcın evinde adalet terazisiyle öldürülmesi", "Bir fabrika sahibinin kendi üretim bandında bulunması", "Bir ressamın son tablosunun şifreli bir mesaj içermesi", "Bir adli tabibin otopsi sırasında şüpheli bir şey bulması", "Bir adanın tek iletişim kaynağının kesilmesi", "Bir nehirde kimliği belirsiz bir ceset bulunması", "Bir patlamanın kaza değil, sabotaj olduğunun anlaşılması", "Bir mezarlıkta yeni kazılmış boş bir mezar", "Bir pilotun uçuştan önce tehdit edilmesi", "Bir oyuncak üreticisinin korkunç bir oyuncakla öldürülmesi", "Bir sirk palyaçosunun gösteri sırasında ölmesi", "Bir profesörün kendi teorisini ispatlarken ölmesi", "Bir çevre aktivistinin ortadan kaybolması", "Bir gazete muhabirinin büyük bir haberin peşindeyken öldürülmesi", "Bir adayın seçimden bir gün önce skandalının patlaması", "Bir yazılım şirketindeki prototipin çalınması", "Bir moda tasarımcısının kendi defilesinde öldürülmesi", "Bir botanikçinin nadir bir bitkiyle zehirlenmesi", "Bir tarihi canlandırmada gerçek bir ölüm yaşanması", "Bir satranç büyük ustasının oyun sırasında kalp krizi geçirmesi", "Bir barajın patlatılma girişimi", "Bir orkestra şefinin sahnede vurulması", "Bir sualtı araştırmacısının oksijen tüpünün sabote edilmesi", "Bir mafya babasının ailesi tarafından ihanete uğraması", "Bir gizli ajanın çifte ajan olduğundan şüphelenilmesi", "Bir hapishane isyanı sırasında müdürün öldürülmesi", "Bir Vahşi Batı kasabasında şerifin öldürülmesi", "Bir caz şarkıcısının sahne arkasında boğulması", "Bir heykeltıraşın kendi heykeliyle ezilmesi", "Bir özel dedektifin kendi ofisinde pusuya düşürülmesi", "Bir yeraltı bilgi ağının çökertilmesi", "Bir ulusal parkta bulunan parçalanmış bir ceset", "Bir kripto para cüzdanının boşaltılması", "Bir kaçış odasındaki birinin gerçekten kilitli kalıp ölmesi", "Bir diplomatik elçinin rehin alınması", "Bir lüks yolcu gemisinde salgın hastalık çıkması", "Bir saat ustasının paha biçilmez bir saatinin çalınması", "Şehrin su kaynağının zehirlenmesi tehdidi", "Kayıp bir film makarasının yeniden ortaya çıkması", "Bir şairin son şiirinde intiharını ima etmesi ama cinayet olması", "Bir borsa çöküşünü önceden bilen birinin ölümü", "Bir TV şovunun sunucusunun canlı yayında öldürülmesi", "Bir mankenin podyumda düşüp ölmesi", "Bir kargo uçağının değerli bir yükle düşmesi", "Bir atom bilimcinin kaçırılması", "Bir fırtına sırasında deniz fenerinin sönmesi", "Bir hacker grubunun kendi içinde ihanete uğraması", "Bir \"insan avı\" oyununun gerçeğe dönüşmesi", "Bir minyatür suç mahalli sanatçısının gerçek bir cinayeti kopyalaması", "Bir DNA veritabanının hacklenmesi", "Bir imparatorun en güvendiği danışmanı tarafından zehirlenmesi", "Bir samurayın efendisinin intikamını almaya yemin etmesi", "Osmanlı sultanının favori cariyesinin öldürülmesi", "Bir Çarlık subayının bir baloda düelloya davet edilmesi", "Sessiz bir film yıldızının sesli filmler çıkınca intihar etmesi", "Bir spor müsabakasında şike yapılması", "Bir rock yıldızının aşırı dozdan ölümü, ama şüphe olması", "Bir belediye başkanının yolsuzluklarının ortaya çıkması", "Bir orman yangınının kundaklama sonucu çıkması", "Nadir bulunan bir mantarın toplayıcısının öldürülmesi", "Bir parfümörün en gizli formülünün çalınması", "Bir mimarın kendi tasarladığı binada tuzağa düşürülmesi", "Bir arı kovanı kolonilerinin gizemli bir şekilde ölmesi", "Bir dondurma üreticisinin yeni lezzetinin sırrı", "Bir çikolata fabrikasında birinin kazana düşmesi", "Bir aile patriğinin vasiyetini açıkladıktan sonra ölmesi", "Bir limandaki kaçakçılık ağının ortaya çıkması", "Bir yarış pilotunun arabasının sabote edilmesi", "Bir tanık koruma programındaki birinin yerinin sızdırılması", "Bir keşişin manastırda öldürülmesi", "Bir gemi kaptanının denize düşerek ölmesi", "Bir kütüphanecinin nadir bir kitabı çalarken yakalanması", "Bir diplomatın çantasının çalınması", "Bir dağ rehberinin çığ altında kalması"],
  location: ["İngiliz kırsalında gotik bir malikane", "Doğu Ekspresi'nde lüks bir kompartıman", "1920'ler New York'unda bir caz kulübü", "Venedik'te bir maskeli balo", "Antarktika'daki izole bir araştırma istasyonu", "Amazon ormanlarının kalbinde bir kazı alanı", "Terk edilmiş bir lunapark", "Sualtı gözlem laboratuvarı", "Bir nükleer denizaltının içi", "Orta Çağ'dan kalma bir kale", "Lüks bir Alp dağ evi", "Paris operasının sahne arkası", "Oxford Üniversitesi'nin antik kütüphanesi", "Mısır'daki bir firavun mezarı kazı alanı", "Transilvanya'da yıkık bir şato", "Bir Hollywood film seti", "Tokyo'da bir kapsül otel", "Bir yük gemisinin konteyner bölümü", "Yasak Alkol döneminden kalma gizli bir bar", "Silikon Vadisi'nde bir teknoloji kampüsü", "Bir dağın zirvesindeki bir manastır", "Vahşi Batı'da bir hayalet kasaba", "Bir Rus oligarkının süper yatı", "Çernobil dışlama bölgesi", "New Orleans'ta eski bir konak", "İskoçya'da sisli bir göl kenarı", "Bir sirk treni", "Roma'daki Kolezyum'un altındaki tüneller", "Dubai'de bir gökdelenin çatı katı", "San Francisco'daki Alcatraz Hapishanesi", "Bir sanat galerisinin açılış gecesi", "Bir borsa binasının işlem salonu", "Bir F1 pistinin pit alanı", "Bir şarap mahzeni ve tadım odası", "Bir aşçılık okulunun mutfağı", "Bir oyuncak bebek fabrikası", "Bir genetik araştırma laboratuvarı", "Bir Mason locasının toplantı odası", "İsviçre'de bir dağ sanatoryumu", "İstanbul'daki Kapalıçarşı", "Fas'ta bir Riad (geleneksel ev)", "Bir botanik bahçesindeki sera", "Bir deniz fenerinin tepesi", "Bir illüzyonistin kulisi", "Bir antika dükkanı", "Bir kukla tiyatrosu", "Bir nükleer santralin kontrol odası", "Bir tohum bankası", "Bir rock konserinin sahne arkası", "Bir gazetenin haber merkezi", "Bir adli tıp morgu", "Bir kumarhanenin VIP odası", "Bir TV yarışma programı stüdyosu", "Bir tarihi canlandırma köyü", "Bir satranç turnuvası salonu", "Bir orkestra konser salonu", "Bir mafya ailesinin sosyal kulübü", "Bir hapishane avlusu", "Bir korsan gemisinin enkazı", "Bir samuray dojosu", "Çin'deki Yasak Şehir", "Osmanlı Sarayı'ndaki bir köşk", "Bir heykeltıraşın atölyesi", "Bir özel dedektifin dumanlı ofisi", "Bir ulusal parktaki korucu kulübesi", "Bir meteor krateri alanı", "Bir yeraltı sanat galerisi", "Kaçış odası temalı bir otel", "Bir diplomatik elçilik binası", "Bir lüks yolcu gemisinin makine dairesi", "Bir çiftlik evindeki mısır tarlası labirenti", "Bir saat kulesinin içi", "Bir film festivali kırmızı halısı", "Bir kayak teleferiği", "Bir hacker'ın dağınık bodrum katı", "Bir minyatür köy sergisi", "Bir DNA analiz laboratuvarı", "Bir imparatorluk sarayının taht odası", "Bir Aztek piramidinin kazı alanı", "Bir Çarlık Rusyası balo salonu", "Bir parfümörün laboratuvarı", "Bir mimarlık ofisi", "Bir arıcılık çiftliği", "Bir çikolata fabrikasının üretim hattı", "Bir manastırın şifalı bitki bahçesi", "Washington D.C.'deki bir düşünce kuruluşu", "Terk edilmiş bir metro istasyonu", "Bir balıkçı köyü", "Bir petrol platformu", "Bir dağ geçidindeki bir otel", "Bir savaş gemisinin güvertesi", "Bir askeri üssün sorgu odası", "Bir safari kampı", "İzlanda'da bir jeotermal kaplıca", "Küba'da bir puro fabrikası", "Bir İrlanda pub'ı", "Bir kütüphanenin nadir eserler bölümü", "Bir planetaryum", "Bir radyo istasyonu stüdyosu", "Bir mezat salonu", "Bir krematoryum", "Bir cam üfleme atölyesi", "Bir terzinin atölyesi", "Bir vergi dairesi arşivi", "Bir hava trafik kontrol kulesi", "Bir yel değirmeni", "Bir sirk eğitim alanı", "Bir şelalenin arkasındaki gizli mağara", "Bir golf sahası", "Bir hidroelektrik santrali barajı", "Bir botanik bahçesindeki labirent", "Bir mankenlik ajansı", "Bir yarış pistinin ahırları", "Bir çocuk hastanesinin terk edilmiş kanadı", "Bir adliye binasının delil odası", "Bir parlamento binası", "Bir lüks apartmanın çatı katı", "Bir demiryolu makas kulübesi", "Bir liman deposu", "Bir teleskop gözlemevi"]
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Bu dizi, yeniden render edilmesini önlemek için component dışında tanımlanmıştır.
const storyFormFields = [
    {label: 'Tema', name: 'theme', placeholder: 'Örn: Kara Film, Kozmik Korku'},
    {label: 'Olay', name: 'eventType', placeholder: 'Örn: Bir CEO\'nun gizemli ölümü'},
    {label: 'Mekan', name: 'location', placeholder: 'Örn: 1920\'ler Londra\'sı'}
];

const ConfigScreen = ({ onGenerate, isLoading }) => {
    const [settings, setSettings] = useState({ theme: '', eventType: '', difficulty: 'Normal', playTime: '1-2 Saat', location: '', suspectCount: 4 });
    const [maxSuspects, setMaxSuspects] = useState(20);
    const [isRolling, setIsRolling] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(null);

    // Zorluk ve süreye göre şüpheli sayısını limitleme
    useEffect(() => {
        const getMaxSuspects = (difficulty, playTime) => {
            switch (difficulty) {
                case 'Kolay': return 20;
                case 'Normal':
                    if (playTime === '1-2 Saat') return 15;
                    if (playTime === '3-4 Saat') return 10;
                    return 6; // 5+ Saat
                case 'Zor':
                    if (playTime === '1-2 Saat') return 10;
                    if (playTime === '3-4 Saat') return 8;
                    return 6; // 5+ Saat
                case 'Uzman': return 6;
                default: return 20;
            }
        };
        const newMax = getMaxSuspects(settings.difficulty, settings.playTime);
        setMaxSuspects(newMax);
        if (settings.suspectCount > newMax) {
            setSettings(prev => ({ ...prev, suspectCount: newMax }));
        }
    }, [settings.difficulty, settings.playTime, settings.suspectCount]);


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setSettings(prev => ({ ...prev, [name]: type === 'range' ? parseInt(value) : value }));
    };
    
    const handleRandomizeAll = () => {
        setIsRolling(true);
        setSettings(prev => ({
            ...prev,
            theme: getRandomElement(localIdeas.theme),
            eventType: getRandomElement(localIdeas.eventType),
            location: getRandomElement(localIdeas.location),
        }));
        setTimeout(() => setIsRolling(false), 500);
    };

    const handleRandomizeField = (fieldName) => {
        setIsRefreshing(fieldName);
        const randomValue = getRandomElement(localIdeas[fieldName]);
        setSettings(prev => ({ ...prev, [fieldName]: randomValue }));
        setTimeout(() => setIsRefreshing(null), 300);
    };

    const FormCategory = ({ title, children }) => (
        <div className="bg-cover p-6 rounded-lg shadow-lg" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/notebook-dark.png')", backgroundColor: '#fdf6e3' }}>
            <h2 className="text-2xl font-bold text-stone-800 mb-4 border-b-2 border-stone-400 pb-2 flex items-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                <Icon name={title} className="w-6 h-6 mr-3 text-stone-700"/>
                {title}
            </h2>
            {children}
        </div>
    );
    
    return (
        <div className="min-h-screen bg-stone-950 p-4 sm:p-8 flex items-center justify-center font-serif" style={{backgroundImage: "url(https://www.transparenttextures.com/patterns/dark-wood.png)", backgroundBlendMode: "multiply", backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
            <div className="w-full max-w-5xl bg-neutral-200 p-8 rounded-lg shadow-2xl border-4 border-stone-500 relative">
                <img src="https://r.resimlink.com/ukai9-Hct.png" alt="Top Secret Stamp" className="absolute top-4 right-4 w-24 h-24 opacity-80 -rotate-12 pointer-events-none" />
                <div className="text-center mb-6">
                    <h1 className="text-6xl font-bold text-stone-900" style={{fontFamily: "'Cormorant Garamond', serif"}}>Dava Jeneratörü</h1>
                    <p className="text-stone-700 mt-2 text-lg">Bir sonraki gizemli maceranızı burada tasarlayın.</p>
                </div>
                
                <form onSubmit={(e) => { e.preventDefault(); onGenerate(settings); }}>
                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                        <FormCategory title="Hikaye Temelleri">
                             <button type="button" onClick={handleRandomizeAll} disabled={isLoading || isRolling} className="flex items-center justify-center gap-2 w-full mb-4 px-4 py-2 bg-stone-700 border border-stone-800 rounded-lg text-white hover:bg-stone-600 transition-all duration-300 disabled:opacity-50 shadow-md">
                                <BrainCircuit className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
                                <span className="font-semibold">Yeni Fikirler Getir</span>
                            </button>
                            
                            {storyFormFields.map(({label, name, placeholder}) => (
                                <div key={name} className="mb-4">
                                    <label className="font-semibold text-stone-700">{label}:</label>
                                    <div className="flex items-center gap-2">
                                        <input type="text" name={name} value={settings[name]} onChange={handleChange} placeholder={placeholder} className="w-full p-2 mt-1 bg-white/70 border border-stone-400 rounded-md shadow-sm"/>
                                        <button type="button" onClick={() => handleRandomizeField(name)} disabled={isRefreshing === name || isLoading} className="p-2 text-stone-600 hover:text-amber-800 transition-colors disabled:opacity-50">
                                            <RefreshCw className={`w-5 h-5 ${isRefreshing === name ? 'animate-spin' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </FormCategory>
                        
                        <FormCategory title="Oyun Mekanikleri">
                            <label className="font-semibold text-stone-700">Zorluk:</label>
                             <select name="difficulty" value={settings.difficulty} onChange={handleChange} className="w-full p-2 mt-1 mb-4 bg-white/70 border border-stone-400 rounded-md shadow-sm">
                                <option>Kolay</option><option>Normal</option><option>Zor</option><option>Uzman</option>
                            </select>
                            <label className="font-semibold text-stone-700">Oyun Süresi:</label>
                            <select name="playTime" value={settings.playTime} onChange={handleChange} className="w-full p-2 mt-1 mb-4 bg-white/70 border border-stone-400 rounded-md shadow-sm">
                                <option>1-2 Saat</option><option>3-4 Saat</option><option>5+ Saat</option>
                            </select>
                             <label className="font-semibold text-stone-700">Şüpheli Sayısı: <span className="text-amber-800 font-bold">{settings.suspectCount}</span></label>
                             <input type="range" name="suspectCount" min="3" max={maxSuspects} value={settings.suspectCount} onChange={handleChange} className="w-full h-2 mt-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-amber-800"/>
                        </FormCategory>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full mt-4 bg-stone-700 hover:bg-stone-600 text-white font-bold py-4 px-4 rounded-lg transition duration-300 text-2xl shadow-xl disabled:bg-stone-500 disabled:cursor-wait" style={{fontFamily: "'Cormorant Garamond', serif"}}>
                        {isLoading ? 'DAVA OLUŞTURULUYOR...' : 'DAVAYI OLUŞTUR'}
                    </button>
                </form>
            </div>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Tinos&display=swap'); body { font-family: 'Tinos', serif; }`}</style>
        </div>
    );
};

const LoadingScreen = () => (
    <div className="min-h-screen bg-stone-800 flex flex-col items-center justify-center text-stone-200 font-serif" style={{backgroundImage: "url(https://www.transparenttextures.com/patterns/dark-wood.png)"}}>
        <img src="https://r.resimlink.com/ukai9-Hct.png" alt="Çok Gizli Damgası" className="w-40 h-40 animate-pulse opacity-80"/>
        <h2 className="text-4xl mt-6" style={{fontFamily: "'Cormorant Garamond', serif"}}>Dava Dosyası Hazırlanıyor...</h2>
    </div>
);

const PasswordModal = ({ doc, onUnlock, onClose, setWrongPassword, wrongPassword }) => {
    const [passwordInput, setPasswordInput] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (doc.password && passwordInput.toLowerCase() === doc.password.toLowerCase()) {
            onUnlock(doc.docId);
        } else {
            setWrongPassword(true);
            setTimeout(() => setWrongPassword(false), 820); // match shake animation
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
            <div className={`bg-stone-800 p-8 rounded-lg shadow-2xl border-2 border-stone-600 w-full max-w-md text-center transform transition-all duration-300 ${wrongPassword ? 'animate-shake' : ''}`}>
                <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-white"><X/></button>
                <Lock className="w-20 h-20 text-amber-500 mx-auto mb-4"/>
                <h2 className="text-3xl font-bold text-stone-100 mb-2" style={{fontFamily: "'Cormorant Garamond', serif"}}>KİLİTLİ DOSYA</h2>
                <p className="text-stone-400 mb-6">Bu belgeye erişim için parola gereklidir.</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} autoFocus
                        className="w-full p-3 text-center bg-stone-700 border-2 border-stone-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg text-white tracking-widest"
                        placeholder="••••••••"
                    />
                     {wrongPassword && <p className="text-red-500 mt-2">ERİŞİM REDDEDİLDİ</p>}
                    <button type="submit" className="w-full mt-4 bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition">Kilidi Aç</button>
                </form>
            </div>
            <style>{`
                @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); } 20%, 40%, 60%, 80% { transform: translateX(10px); } }
                .animate-shake { animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both; }
            `}</style>
        </div>
    );
};

const GameScreen = ({ gameData, onBack }) => {
    const [selectedDocId, setSelectedDocId] = useState(null);
    const [unlockedDocs, setUnlockedDocs] = useState(new Set());
    const [docToUnlock, setDocToUnlock] = useState(null);
    const [wrongPassword, setWrongPassword] = useState(false);
    
    useEffect(() => {
        const initialUnlocked = new Set(gameData.documents.filter(doc => !doc.locked).map(doc => doc.docId));
        setUnlockedDocs(initialUnlocked);
        if (gameData.documents && gameData.documents.length > 0) {
            setSelectedDocId(gameData.documents[0].docId);
        }
    }, [gameData]);

    const handleDocClick = (doc) => {
        if (unlockedDocs.has(doc.docId)) {
            setSelectedDocId(doc.docId);
        } else {
            setDocToUnlock(doc);
        }
    };
    
    const handleUnlock = (docId) => {
        setUnlockedDocs(prev => new Set(prev).add(docId));
        setDocToUnlock(null);
        setSelectedDocId(docId);
    };

    const selectedDocument = gameData.documents.find(d => d.docId === selectedDocId);
    const interrogationReports = gameData.documents.filter(d => d.docType === 'Sorgu Raporu');
    const otherMaterials = gameData.documents.filter(d => d.docType !== 'Sorgu Raporu');

    return (
        <>
            {docToUnlock && <PasswordModal doc={docToUnlock} onClose={() => setDocToUnlock(null)} onUnlock={handleUnlock} setWrongPassword={setWrongPassword} wrongPassword={wrongPassword} />}
            <div className="min-h-screen bg-stone-800 text-stone-800 p-4 font-serif flex flex-col" style={{backgroundImage: "url(https://www.transparenttextures.com/patterns/dark-wood.png)"}}>
                <header className="flex-shrink-0 mb-4 bg-stone-300 p-4 rounded-lg shadow-lg border border-stone-400" style={{backgroundImage: "url(https://www.transparenttextures.com/patterns/old-paper.png)"}}>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-stone-800" style={{fontFamily: "'Cormorant Garamond', serif"}}>{gameData.title}</h1>
                        <button onClick={onBack} className="bg-stone-500 hover:bg-stone-400 text-white font-bold py-2 px-4 rounded-lg transition">Yeni Dava Başlat</button>
                    </div>
                    <p className="text-stone-700 mt-2 border-t border-stone-400 pt-2">{gameData.mainStory}</p>
                </header>

                <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
                    <div className="lg:col-span-1 bg-stone-300 backdrop-blur-sm rounded-lg p-4 border border-stone-400 flex flex-col shadow-lg" style={{backgroundImage: "url(https://www.transparenttextures.com/patterns/old-paper.png)"}}>
                        <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
                            {/* Sorgu Raporları Kategorisi */}
                            <h2 className="text-xl font-bold text-stone-700 border-b-2 border-stone-400 pb-2 mb-3 flex items-center">
                                <Users className="w-6 h-6 mr-3"/> Sorgu Raporları
                            </h2>
                            {interrogationReports.map(doc => (
                                <div key={doc.docId} onClick={() => handleDocClick(doc)} className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition border-2 ${selectedDocId === doc.docId ? 'bg-amber-800/20 border-amber-800' : 'border-transparent hover:bg-stone-400/30'}`}>
                                    <div className="w-10 flex-shrink-0 flex items-center justify-center mr-3">
                                        {unlockedDocs.has(doc.docId) ? <Icon name={doc.docType} type="doc" className="w-7 h-7 text-stone-700"/> : <Lock className="w-6 h-6 text-stone-500"/>}
                                    </div>
                                    <div><h3 className="font-bold text-stone-800 leading-tight">{doc.title}</h3></div>
                                </div>
                            ))}
                            {/* Kanıt ve Belgeler Kategorisi */}
                            <h2 className="text-xl font-bold text-stone-700 border-b-2 border-stone-400 pb-2 mb-3 mt-6 flex items-center">
                                <FolderKanban className="w-6 h-6 mr-3"/> Kanıt & Belgeler
                            </h2>
                             {otherMaterials.map(doc => (
                                <div key={doc.docId} onClick={() => handleDocClick(doc)} className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition border-2 ${selectedDocId === doc.docId ? 'bg-amber-800/20 border-amber-800' : 'border-transparent hover:bg-stone-400/30'}`}>
                                    <div className="w-10 flex-shrink-0 flex items-center justify-center mr-3">
                                        {unlockedDocs.has(doc.docId) ? <Icon name={doc.docType} type="doc" className="w-7 h-7 text-stone-700"/> : <Lock className="w-6 h-6 text-stone-500"/>}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-stone-800 leading-tight">{doc.title}</h3>
                                        <p className="text-sm text-stone-600">{doc.docType}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3 min-h-[50vh] lg:min-h-0 bg-stone-200/90 p-8 rounded-lg overflow-y-auto custom-scrollbar border-2 border-stone-400 shadow-inner" style={{backgroundImage: "url(https://www.transparenttextures.com/patterns/old-paper.png)"}}>
                        {selectedDocument ? (
                            <>
                                <h2 className="text-4xl font-bold text-stone-900 mb-2" style={{fontFamily: "'Cormorant Garamond', serif"}}>{selectedDocument.title}</h2>
                                <p className="text-lg text-stone-600 mb-4 font-semibold border-b-2 border-stone-400 pb-2">{selectedDocument.docType}</p>
                                <div className="text-stone-800 whitespace-pre-wrap leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: selectedDocument.content.replace(/\[([^\]]+)\]:/g, '<strong>[$1]:</strong>') }}></div>
                                
                                {selectedDocument.detectiveHint && (
                                     <div className="mt-6 p-4 bg-yellow-100/80 border-l-4 border-yellow-500 rounded-r-lg">
                                        <h3 className="text-lg font-bold text-yellow-800 flex items-center"><Lightbulb className="w-5 h-5 mr-2"/> Dedektif İpucu</h3>
                                        <p className="mt-1 text-yellow-900"><i>{selectedDocument.detectiveHint}</i></p>
                                    </div>
                                )}

                                {selectedDocument.docType === "Çözüm" && (
                                    <div className="mt-6 p-4 bg-amber-800/20 border-2 border-amber-700/50 rounded-lg">
                                        <h3 className="text-2xl font-bold text-amber-900" style={{fontFamily: "'Cormorant Garamond', serif"}}>Gerçekler Ortaya Çıktı!</h3>
                                        <p className="mt-2 text-stone-800"><strong>Suçlu:</strong> {gameData.culprit}</p>
                                        <p className="mt-4 whitespace-pre-wrap text-stone-800"><strong>Nasıl Çözüldü:</strong> {gameData.solutionDetails}</p>
                                    </div>
                                )}
                            </>
                        ) : <div className="h-full flex items-center justify-center text-stone-500"><p>Bir belge seçin.</p></div>}
                    </div>
                </div>
                <style>{`.custom-scrollbar::-webkit-scrollbar { width: 8px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #a8a29e; border-radius: 10px; }`}</style>
            </div>
        </>
    );
};

export default function App() {
    const [view, setView] = useState('config');
    const [gameData, setGameData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const generateGameWithGemini = async (settings) => {
        setIsLoading(true);
        const prompt = `
        Sen, "Usta Bir Dedektif Hikayesi Yazarı" rolünü üstlenen bir yapay zeka sistemisin. Görevin, sürükleyici anlatılar ve zekice ve kurnazca kurgulanmış bulmacalar yaratmaktır. Lütfen aşağıda belirtilen parametrelere göre, birbiriyle bağlantılı, zekice tasarlanmış ve oynamaya hazır bir dedektiflik macerası için tam bir dava dosyası oluştur. Tüm metinler Türkçe olmalıdır. Çıktın SADECE istenen JSON formatında olmalıdır.

        Kullanıcı Parametreleri:
        - Tema: ${settings.theme || 'Klasik Cinayet Gizemi'}
        - Olay: ${settings.eventType || 'Zengin bir iş adamı malikanesinde ölü bulundu'}
        - Mekan: ${settings.location || 'İngiliz kırsalında bir malikane'}
        - Zorluk: ${settings.difficulty}
        - Tahmini Oyun Süresi: ${settings.playTime}
        - Şüpheli Sayısı: ${settings.suspectCount}
        
        YAPILACAKLAR:
        1.  **Ana Başlık ve Olay Örgüsü:** Oyun için çekici bir başlık ve olayın genel arka planını anlatan kısa bir ana hikaye oluştur.
        2.  **Kilit Obje Yaratımı:** Hikayenin çözümünde önemli rol oynayacak, temayla uyumlu bir 'kilit obje' yarat ve bunu kanıtların içine entegre et.
        3.  **Belge Üretimi:** Toplam belge sayısı en az (şüpheli sayısı + 4) olmalıdır. Her belgeye benzersiz bir 'docId' ata (1'den başlayarak).
            -   **Sorgu Raporu:** Her şüpheli için ayrı bir rapor oluştur. 'content' kısmı, dedektif ve şüpheli arasında geçen **detaylı bir diyalog metni** olmalıdır. Diyalog, şüphelinin kişiliğini, yalanlarını ve potansiyel ipuçlarını yansıtmalıdır. Diyalog formatı şu şekilde olsun: "[Dedektif]: Soru metni...\\n[Şüpheli Adı]: Cevap metni...". 
            -   **Dedektif İpucu:** Eğer zorluk seviyesi 'Kolay' veya 'Normal' ise, her sorgu raporu için oyuncuya yol gösterecek kısa, zekice bir 'detectiveHint' alanı ekle. Bu ipucu, şüphelinin ifadesindeki bir çelişkiye veya dikkat edilmesi gereken bir detaya işaret etmelidir. Eğer zorluk 'Zor' veya 'Uzman' ise, bu alanı boş bırak veya hiç ekleme.
        4.  **Diğer Belgeler:** 'Gazete Küpürü', 'Otopsi Raporu', 'Olay Yeri Raporu', 'Kişisel Not' gibi çeşitli kanıt belgeleri oluştur.
        5.  **Kilitli Dosyalar ve Şifreler:** Belgelerden en az iki tanesini kilitli ('locked': true) yap. Şifreler, diğer AÇIK belgelerin içinde bulunabilecek şekilde zekice gizlenmelidir.
        6.  **Suçlu ve Çözüm:** Şüphelilerden BİRİNİ suçlu olarak belirle. Oyunun sonunda gösterilecek olan, suçlunun kim olduğunu, nedenini ve hangi ipuçlarının birleştirilerek bu sonuca ulaşıldığını detaylıca anlatan bir çözüm metni yaz. Bu çözüm için "Çözüm" adında ve docType'ı "Çözüm" olan özel bir belge oluştur. Bu belge başlangıçta HER ZAMAN kilitli olmalı ve şifresi ('password') zor olmalıdır (örneğin "DAVAYIÇÖZDÜM").
        7.  **JSON Formatı:** Tüm bu çıktıları, aşağıda tanımlanan JSON şemasına %100 uygun olarak TEK BİR JSON nesnesi içinde döndür. JSON dışında hiçbir metin ekleme.
        `;
        const schema = { type: "OBJECT", properties: { "title": { "type": "STRING" }, "mainStory": { "type": "STRING" }, "culprit": { "type": "STRING" }, "solutionDetails": { "type": "STRING" }, "documents": { "type": "ARRAY", "items": { "type": "OBJECT", "properties": { "docId": { "type": "NUMBER" }, "docType": { "type": "STRING", "enum": ["Sorgu Raporu", "Gazete Küpürü", "Otopsi Raporu", "Olay Yeri Raporu", "Kişisel Not", "Harita", "Çözüm"] }, "title": { "type": "STRING" }, "locked": { "type": "BOOLEAN" }, "password": { "type": "STRING" }, "content": { "type": "STRING" }, "detectiveHint": {"type": "STRING"} }, "required": ["docId", "docType", "title", "locked", "content"] } } }, "required": ["title", "mainStory", "culprit", "solutionDetails", "documents"] };
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", responseSchema: schema } };
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API hatası: ${response.status} ${response.statusText}`);
            const result = await response.json();
            if (result.candidates && result.candidates[0] && result.candidates[0].content.parts[0].text) {
                const gameJson = JSON.parse(result.candidates[0].content.parts[0].text);
                setGameData(gameJson);
                setView('game');
            } else { throw new Error("API'den geçerli bir oyun verisi alınamadı."); }
        } catch (error) {
            console.error("Oyun oluşturulurken hata oluştu:", error);
            setView('config');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleBackToConfig = () => {
        setGameData(null);
        setView('config');
    };

    switch (view) {
        case 'loading': return <LoadingScreen />;
        case 'game': return <GameScreen gameData={gameData} onBack={handleBackToConfig}/>;
        case 'config': default: return <ConfigScreen onGenerate={generateGameWithGemini} isLoading={isLoading} />;
    }
}
