export const CITIES = [
  "الناصرة", "أم الفحم", "باقة الغربية", "الطيبة", "كفر قاسم", "كفر كنا", 
  "سخنين", "عرابة", "دير حنا", "شفاعمرو", "الطيرة", "قلنسوة", "يافا (تل أبيب)", 
  "حيفا", "عكا", "اللد", "الرملة", "المثلث (منطقة)", "تل السبع", "رهط", 
  "لقية", "حورة", "عرعرة النقب", "كفر مندا", "مجد الكروم", "ترشيحا", 
  "جديدة-مكر", "نحف", "البعنة", "دالية الكرمل", "عسفيا", "المغار", "جت", 
  "زيمر", "كفر قرع", "عرعرة", "بسمة", "معاوية", "برطعة", "عين السهلة", 
  "الفريديس", "إكسال", "عين ماهل", "يافة الناصرة", "الرينة", "المشهد", 
  "كفر مصر", "دبورية", "الشبلي - أم الغنم", "بئر المكسور", "طمرة", 
  "كابول", "شعب", "دير الأسد", "مزرعة", "أبو سنان", "كفر ياسيف", "يركا", 
  "جولس", "يانوح-جت", "كسرى-سميع", "البقيعة", "حرفيش", "فسوطة", "بيت جن", 
  "الرامة", "عيلبون", "طرعان", "الزرازير", "كعبية-طباش-حجاجرة", "عبلين", 
  "جسر الزرقاء", "جلجولية", "كفر برا", "زلفة", "سالم", "العزير", "رمانة", "عرب الهيب"
];

export const TOPICS = ["فقه", "تفسير", "سيرة", "حديث", "تزكية", "تجويد"];
export const PLATFORMS = ["Zoom", "YouTube Live", "واتساب", "تيليغرام", "غيره"];

export type LessonType = 'mosque' | 'online';

export interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  sheikh: string;
  topic: string;
  day: string;
  time: string;
  description: string;
  whatsappContact?: string;
  
  // Mosque specific
  mosqueName?: string;
  city?: string;
  address?: string;
  
  // Online specific
  platform?: string;
  link?: string;
}

export const MOCK_LESSONS: Lesson[] = [
  {
    id: "1",
    type: "mosque",
    title: "شرح كتاب رياض الصالحين",
    sheikh: "الشيخ رائد صلاح",
    topic: "حديث",
    day: "الأحد",
    time: "بعد صلاة المغرب",
    description: "درس أسبوعي في شرح أحاديث كتاب رياض الصالحين للإمام النووي رحمه الله.",
    mosqueName: "مسجد السلام",
    city: "الناصرة",
    address: "حي الكروم، الناصرة",
    whatsappContact: "972500000000"
  },
  {
    id: "2",
    type: "mosque",
    title: "تفسير سورة البقرة",
    sheikh: "د. مشهور فواز",
    topic: "تفسير",
    day: "الثلاثاء",
    time: "بعد صلاة العشاء",
    description: "سلسلة دروس في التفسير الموضوعي والتحليلي لسورة البقرة.",
    mosqueName: "مسجد أبو عبيدة",
    city: "أم الفحم",
    address: "حي المحاميد",
    whatsappContact: "972500000001"
  },
  {
    id: "3",
    type: "mosque",
    title: "فقه المعاملات المالية",
    sheikh: "الشيخ كمال خطيب",
    topic: "فقه",
    day: "السبت",
    time: "صباحاً 10:00",
    description: "أحكام البيوع والشركات في الفقه الإسلامي وتطبيقاتها المعاصرة.",
    mosqueName: "مسجد النور",
    city: "سخنين",
    address: "الشارع الرئيسي",
    whatsappContact: "972500000002"
  },
  {
    id: "4",
    type: "mosque",
    title: "السيرة النبوية - العهد المكي",
    sheikh: "الشيخ علي أبو شيخة",
    topic: "سيرة",
    day: "الخميس",
    time: "بعد صلاة العصر",
    description: "استخلاص العبر والعظات من حياة النبي صلى الله عليه وسلم قبل الهجرة.",
    mosqueName: "مسجد خالد بن الوليد",
    city: "الطيبة",
    address: "المنطقة الغربية",
    whatsappContact: "972500000003"
  },
  {
    id: "5",
    type: "online",
    title: "تزكية النفوس وتطهير القلوب",
    sheikh: "د. حسين وليد",
    topic: "تزكية",
    day: "الإثنين",
    time: "20:30 مساءً",
    description: "قراءة في كتاب مدارج السالكين والتوجيهات الربانية لإصلاح القلب.",
    platform: "Zoom",
    link: "https://zoom.us/j/123456789",
    whatsappContact: "972500000004"
  },
  {
    id: "6",
    type: "online",
    title: "دورة أساسيات التجويد",
    sheikh: "الشيخ محمد وتد",
    topic: "تجويد",
    day: "الأربعاء",
    time: "19:00 مساءً",
    description: "دورة عملية في أحكام التلاوة والتجويد برواية حفص عن عاصم.",
    platform: "YouTube Live",
    link: "https://youtube.com/channel/example",
    whatsappContact: "972500000005"
  },
  {
    id: "7",
    type: "online",
    title: "فقه الأسرة المسلمة",
    sheikh: "د. أحمد جابر",
    topic: "فقه",
    day: "الجمعة",
    time: "21:00 مساءً",
    description: "أحكام الزواج والطلاق والتربية في الإسلام.",
    platform: "تيليغرام",
    link: "https://t.me/example",
    whatsappContact: "972500000006"
  },
  {
    id: "8",
    type: "online",
    title: "تأملات في قصص الأنبياء",
    sheikh: "الشيخ عبد الله عياش",
    topic: "تفسير",
    day: "الأحد",
    time: "20:00 مساءً",
    description: "دروس مستفادة من سير الأنبياء والمرسلين في القرآن الكريم.",
    platform: "واتساب",
    link: "https://chat.whatsapp.com/example",
    whatsappContact: "972500000007"
  }
];
