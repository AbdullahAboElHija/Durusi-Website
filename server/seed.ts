import mongoose from "mongoose";
import { LessonModel } from "./models/Lesson";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be set.");
}

const SEED_LESSONS = [
  {
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
    whatsappContact: "972500000000",
  },
  {
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
    whatsappContact: "972500000001",
  },
  {
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
    whatsappContact: "972500000002",
  },
  {
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
    whatsappContact: "972500000003",
  },
  {
    type: "online",
    title: "تزكية النفوس وتطهير القلوب",
    sheikh: "د. حسين وليد",
    topic: "تزكية",
    day: "الإثنين",
    time: "20:30 مساءً",
    description: "قراءة في كتاب مدارج السالكين والتوجيهات الربانية لإصلاح القلب.",
    platform: "Zoom",
    link: "https://zoom.us/j/123456789",
    whatsappContact: "972500000004",
  },
  {
    type: "online",
    title: "دورة أساسيات التجويد",
    sheikh: "الشيخ محمد وتد",
    topic: "تجويد",
    day: "الأربعاء",
    time: "19:00 مساءً",
    description: "دورة عملية في أحكام التلاوة والتجويد برواية حفص عن عاصم.",
    platform: "YouTube Live",
    link: "https://youtube.com/channel/example",
    whatsappContact: "972500000005",
  },
  {
    type: "online",
    title: "فقه الأسرة المسلمة",
    sheikh: "د. أحمد جابر",
    topic: "فقه",
    day: "الجمعة",
    time: "21:00 مساءً",
    description: "أحكام الزواج والطلاق والتربية في الإسلام.",
    platform: "تيليغرام",
    link: "https://t.me/example",
    whatsappContact: "972500000006",
  },
  {
    type: "online",
    title: "تأملات في قصص الأنبياء",
    sheikh: "الشيخ عبد الله عياش",
    topic: "تفسير",
    day: "الأحد",
    time: "20:00 مساءً",
    description: "دروس مستفادة من سير الأنبياء والمرسلين في القرآن الكريم.",
    platform: "واتساب",
    link: "https://chat.whatsapp.com/example",
    whatsappContact: "972500000007",
  },
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected!");

  const existing = await LessonModel.countDocuments();
  if (existing > 0) {
    console.log(`Database already has ${existing} lessons, skipping seed.`);
    await mongoose.disconnect();
    process.exit(0);
  }

  await LessonModel.insertMany(SEED_LESSONS);
  console.log(`Seeded ${SEED_LESSONS.length} lessons successfully!`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
