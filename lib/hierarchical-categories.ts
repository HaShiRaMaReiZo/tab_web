import { HierarchicalCategory } from './types';

// This is a sample hierarchical category structure matching TAB Book Centre's structure
// Main Category → Sub Category → Sub Sub Category
// Total: 974 sub-sub-categories across 12 main categories

export const hierarchicalCategories: HierarchicalCategory[] = [
  {
    id: '1',
    name: 'ကဏ္ဍစုံလင်စာအုပ်စင်',
    nameMyanmar: 'General Books',
    bookCount: 15000,
    subCategories: [
      {
        id: '1-1',
        name: 'ဝတ္ထု / Fiction',
        nameMyanmar: 'ဝတ္ထု',
        bookCount: 3500,
        subSubCategories: [
          { id: '1-1-1', name: 'မြန်မာဝတ္ထုတို', nameMyanmar: 'Myanmar Short Stories', bookCount: 450 },
          { id: '1-1-2', name: 'မြန်မာဝတ္ထုရှည်', nameMyanmar: 'Myanmar Novels', bookCount: 620 },
          { id: '1-1-3', name: 'ရသဝတ္ထု', nameMyanmar: 'Romance', bookCount: 380 },
          { id: '1-1-4', name: 'စွန့်စားခန်းဝတ္ထု', nameMyanmar: 'Adventure', bookCount: 290 },
          { id: '1-1-5', name: 'လူမှုရေးဝတ္ထု', nameMyanmar: 'Social Fiction', bookCount: 340 },
          { id: '1-1-6', name: 'သိပ္ပံစိတ်ကူးယဉ်', nameMyanmar: 'Science Fiction', bookCount: 180 },
          { id: '1-1-7', name: 'ထိတ်လန့်စရာဝတ္ထု', nameMyanmar: 'Thriller', bookCount: 220 },
          { id: '1-1-8', name: 'စုံထောက်ဝတ္ထု', nameMyanmar: 'Detective', bookCount: 310 },
          { id: '1-1-9', name: 'ဟာသဝတ္ထု', nameMyanmar: 'Comedy', bookCount: 150 },
          { id: '1-1-10', name: 'သမိုင်းဝတ္ထု', nameMyanmar: 'Historical Fiction', bookCount: 260 },
        ],
      },
      {
        id: '1-2',
        name: 'သုတစာအုပ် / Non-Fiction',
        nameMyanmar: 'သုတစာအုပ်',
        bookCount: 2800,
        subSubCategories: [
          { id: '1-2-1', name: 'ဘဝအတ္ထုပ္ပတ္တိ', nameMyanmar: 'Biography', bookCount: 320 },
          { id: '1-2-2', name: 'ခရီးသွားဆောင်းပါး', nameMyanmar: 'Travel', bookCount: 180 },
          { id: '1-2-3', name: 'သိပ္ပံနည်းပညာ', nameMyanmar: 'Science & Tech', bookCount: 420 },
          { id: '1-2-4', name: 'ကိုယ်တိုင်တိုးတက်ရေး', nameMyanmar: 'Self-Help', bookCount: 550 },
          { id: '1-2-5', name: 'စီးပွားရေး', nameMyanmar: 'Business', bookCount: 480 },
          { id: '1-2-6', name: 'စိတ်ပညာ', nameMyanmar: 'Psychology', bookCount: 290 },
          { id: '1-2-7', name: 'ဖွံ့ဖြိုးတိုးတက်ရေး', nameMyanmar: 'Personal Development', bookCount: 360 },
          { id: '1-2-8', name: 'ကျန်းမာရေး', nameMyanmar: 'Health', bookCount: 200 },
        ],
      },
      {
        id: '1-3',
        name: 'နိုင်ငံရေး / Politics',
        nameMyanmar: 'နိုင်ငံရေး',
        bookCount: 1500,
        subSubCategories: [
          { id: '1-3-1', name: 'မြန်မာနိုင်ငံရေး', nameMyanmar: 'Myanmar Politics', bookCount: 380 },
          { id: '1-3-2', name: 'နိုင်ငံတကာရေးရာ', nameMyanmar: 'International Relations', bookCount: 290 },
          { id: '1-3-3', name: 'ဒီမိုကရေစီ', nameMyanmar: 'Democracy', bookCount: 210 },
          { id: '1-3-4', name: 'နိုင်ငံရေးသမိုင်း', nameMyanmar: 'Political History', bookCount: 320 },
          { id: '1-3-5', name: 'နိုင်ငံရေးသီအိုရီ', nameMyanmar: 'Political Theory', bookCount: 150 },
          { id: '1-3-6', name: 'လူ့အခွင့်အရေး', nameMyanmar: 'Human Rights', bookCount: 150 },
        ],
      },
      {
        id: '1-4',
        name: 'သမိုင်း / History',
        nameMyanmar: 'သမိုင်း',
        bookCount: 2200,
        subSubCategories: [
          { id: '1-4-1', name: 'မြန်မာသမိုင်း', nameMyanmar: 'Myanmar History', bookCount: 580 },
          { id: '1-4-2', name: 'ကမ္ဘာ့သမိုင်း', nameMyanmar: 'World History', bookCount: 420 },
          { id: '1-4-3', name: 'အာရှသမိုင်း', nameMyanmar: 'Asian History', bookCount: 310 },
          { id: '1-4-4', name: 'စစ်သမိုင်း', nameMyanmar: 'Military History', bookCount: 280 },
          { id: '1-4-5', name: 'ရှေးဟောင်းသုတေသန', nameMyanmar: 'Archaeology', bookCount: 190 },
          { id: '1-4-6', name: 'ယဉ်ကျေးမှုသမိုင်း', nameMyanmar: 'Cultural History', bookCount: 220 },
          { id: '1-4-7', name: 'ခေတ်သစ်သမိုင်း', nameMyanmar: 'Modern History', bookCount: 200 },
        ],
      },
      {
        id: '1-5',
        name: 'စာပေ / Literature',
        nameMyanmar: 'စာပေ',
        bookCount: 1800,
        subSubCategories: [
          { id: '1-5-1', name: 'ကဗျာ', nameMyanmar: 'Poetry', bookCount: 450 },
          { id: '1-5-2', name: 'စာစု', nameMyanmar: 'Essays', bookCount: 380 },
          { id: '1-5-3', name: 'ဝေဖန်စာပေ', nameMyanmar: 'Literary Criticism', bookCount: 180 },
          { id: '1-5-4', name: 'ဂန္ထဝင်စာပေ', nameMyanmar: 'Classic Literature', bookCount: 290 },
          { id: '1-5-5', name: 'ပြဇာတ်', nameMyanmar: 'Drama', bookCount: 150 },
          { id: '1-5-6', name: 'ဟာသ', nameMyanmar: 'Humor', bookCount: 180 },
          { id: '1-5-7', name: 'စာပေသမိုင်း', nameMyanmar: 'Literary History', bookCount: 170 },
        ],
      },
      {
        id: '1-6',
        name: 'ဥပဒေ / Law',
        nameMyanmar: 'ဥပဒေ',
        bookCount: 900,
        subSubCategories: [
          { id: '1-6-1', name: 'ပြစ်မှုဆိုင်ရာဥပဒေ', nameMyanmar: 'Criminal Law', bookCount: 180 },
          { id: '1-6-2', name: 'တရားမဥပဒေ', nameMyanmar: 'Civil Law', bookCount: 150 },
          { id: '1-6-3', name: 'စီးပွားရေးဥပဒေ', nameMyanmar: 'Commercial Law', bookCount: 120 },
          { id: '1-6-4', name: 'ဖွဲ့စည်းပုံအခြေခံဥပဒေ', nameMyanmar: 'Constitutional Law', bookCount: 140 },
          { id: '1-6-5', name: 'နိုင်ငံတကာဥပဒေ', nameMyanmar: 'International Law', bookCount: 110 },
          { id: '1-6-6', name: 'အလုပ်သမားဥပဒေ', nameMyanmar: 'Labor Law', bookCount: 100 },
          { id: '1-6-7', name: 'အထွေထွေဥပဒေ', nameMyanmar: 'General Law', bookCount: 100 },
        ],
      },
      {
        id: '1-7',
        name: 'အနုပညာ / Arts',
        nameMyanmar: 'အနုပညာ',
        bookCount: 1200,
        subSubCategories: [
          { id: '1-7-1', name: 'ပန်းချီ', nameMyanmar: 'Painting', bookCount: 180 },
          { id: '1-7-2', name: 'ဂီတ', nameMyanmar: 'Music', bookCount: 220 },
          { id: '1-7-3', name: 'ဗိသုကာ', nameMyanmar: 'Architecture', bookCount: 150 },
          { id: '1-7-4', name: 'ရုပ်ရှင်', nameMyanmar: 'Film', bookCount: 180 },
          { id: '1-7-5', name: 'ဓာတ်ပုံ', nameMyanmar: 'Photography', bookCount: 140 },
          { id: '1-7-6', name: 'အက', nameMyanmar: 'Dance', bookCount: 80 },
          { id: '1-7-7', name: 'ပန်းပု', nameMyanmar: 'Sculpture', bookCount: 70 },
          { id: '1-7-8', name: 'ရိုးရာအနုပညာ', nameMyanmar: 'Traditional Arts', bookCount: 180 },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'ဗုဒ္ဓစာပေစာအုပ်စင်',
    nameMyanmar: 'Buddhist Literature',
    bookCount: 8500,
    subCategories: [
      {
        id: '2-1',
        name: 'တရားတော်များ / Dhamma',
        nameMyanmar: 'တရားတော်',
        bookCount: 2500,
        subSubCategories: [
          { id: '2-1-1', name: 'ဝိပဿနာတရား', nameMyanmar: 'Vipassana', bookCount: 380 },
          { id: '2-1-2', name: 'သမထတရား', nameMyanmar: 'Samatha', bookCount: 220 },
          { id: '2-1-3', name: 'တရားပွဲတရားစာ', nameMyanmar: 'Dhamma Talks', bookCount: 450 },
          { id: '2-1-4', name: 'သုတ္တန်ပိဋက', nameMyanmar: 'Sutta Pitaka', bookCount: 380 },
          { id: '2-1-5', name: 'အဘိဓမ္မာ', nameMyanmar: 'Abhidhamma', bookCount: 420 },
          { id: '2-1-6', name: 'ဝိနည်း', nameMyanmar: 'Vinaya', bookCount: 280 },
          { id: '2-1-7', name: 'ဇာတ်တော်', nameMyanmar: 'Jataka Stories', bookCount: 370 },
        ],
      },
      {
        id: '2-2',
        name: 'ဆရာတော်များ / Teachers',
        nameMyanmar: 'ဆရာတော်များ',
        bookCount: 1800,
        subSubCategories: [
          { id: '2-2-1', name: 'မဟာစည်ဆရာတော်', nameMyanmar: 'Mahasi Sayadaw', bookCount: 320 },
          { id: '2-2-2', name: 'လယ်တီဆရာတော်', nameMyanmar: 'Ledi Sayadaw', bookCount: 280 },
          { id: '2-2-3', name: 'ဆရာတော်ကြီးများ', nameMyanmar: 'Great Teachers', bookCount: 450 },
          { id: '2-2-4', name: 'ခေတ်သစ်ဆရာတော်များ', nameMyanmar: 'Modern Teachers', bookCount: 380 },
          { id: '2-2-5', name: 'နိုင်ငံခြားဆရာတော်', nameMyanmar: 'Foreign Teachers', bookCount: 190 },
          { id: '2-2-6', name: 'ဘုန်းကြီးကျောင်းသင်ခန်းစာ', nameMyanmar: 'Monastery Lessons', bookCount: 180 },
        ],
      },
      {
        id: '2-3',
        name: 'ပရိတ်တော် / Paritta',
        nameMyanmar: 'ပရိတ်တော်',
        bookCount: 800,
        subSubCategories: [
          { id: '2-3-1', name: 'ပရိတ်ကြီး', nameMyanmar: 'Major Paritta', bookCount: 180 },
          { id: '2-3-2', name: 'မင်္ဂလသုတ်', nameMyanmar: 'Mangala Sutta', bookCount: 120 },
          { id: '2-3-3', name: 'မေတ္တာသုတ်', nameMyanmar: 'Metta Sutta', bookCount: 150 },
          { id: '2-3-4', name: 'ရတနာသုတ်', nameMyanmar: 'Ratana Sutta', bookCount: 100 },
          { id: '2-3-5', name: 'ပဋ္ဌာန်းတော်', nameMyanmar: 'Patthana', bookCount: 130 },
          { id: '2-3-6', name: 'အခြားပရိတ်', nameMyanmar: 'Other Paritta', bookCount: 120 },
        ],
      },
      {
        id: '2-4',
        name: 'ဗုဒ္ဓသမိုင်း / Buddhist History',
        nameMyanmar: 'ဗုဒ္ဓသမိုင်း',
        bookCount: 1200,
        subSubCategories: [
          { id: '2-4-1', name: 'ဗုဒ္ဓဝင်', nameMyanmar: 'Buddha\'s Life', bookCount: 280 },
          { id: '2-4-2', name: 'သာသနာ့သမိုင်း', nameMyanmar: 'Buddhist History', bookCount: 320 },
          { id: '2-4-3', name: 'မြန်မာဗုဒ္ဓသမိုင်း', nameMyanmar: 'Myanmar Buddhist History', bookCount: 250 },
          { id: '2-4-4', name: 'သံဃာ့သမိုင်း', nameMyanmar: 'Sangha History', bookCount: 180 },
          { id: '2-4-5', name: 'စေတီတော်သမိုင်း', nameMyanmar: 'Pagoda History', bookCount: 170 },
        ],
      },
      {
        id: '2-5',
        name: 'တရားအားထုတ်နည်း / Meditation',
        nameMyanmar: 'တရားအားထုတ်နည်း',
        bookCount: 1500,
        subSubCategories: [
          { id: '2-5-1', name: 'အာနာပါန', nameMyanmar: 'Anapana', bookCount: 280 },
          { id: '2-5-2', name: 'သတိပဋ္ဌာန်', nameMyanmar: 'Satipatthana', bookCount: 320 },
          { id: '2-5-3', name: 'မေတ္တာဘာဝနာ', nameMyanmar: 'Metta Meditation', bookCount: 220 },
          { id: '2-5-4', name: 'ကမ္မဋ္ဌာန်း', nameMyanmar: 'Kammatthana', bookCount: 280 },
          { id: '2-5-5', name: 'ဓာတ်ကြည့်တရား', nameMyanmar: 'Element Meditation', bookCount: 200 },
          { id: '2-5-6', name: 'ခေတ်သစ်တရားအားထုတ်နည်း', nameMyanmar: 'Modern Methods', bookCount: 200 },
        ],
      },
      {
        id: '2-6',
        name: 'ဗုဒ္ဓဝါဒ / Buddhist Philosophy',
        nameMyanmar: 'ဗုဒ္ဓဝါဒ',
        bookCount: 700,
        subSubCategories: [
          { id: '2-6-1', name: 'ပဋိစ္စသမုပ္ပါဒ်', nameMyanmar: 'Dependent Origination', bookCount: 150 },
          { id: '2-6-2', name: 'အရိယသစ္စာလေးပါး', nameMyanmar: 'Four Noble Truths', bookCount: 180 },
          { id: '2-6-3', name: 'မဂ္ဂင်ရှစ်ပါး', nameMyanmar: 'Noble Eightfold Path', bookCount: 140 },
          { id: '2-6-4', name: 'ကံနှင့်ကံ၏အကျိုး', nameMyanmar: 'Karma', bookCount: 130 },
          { id: '2-6-5', name: 'နိဗ္ဗာန်', nameMyanmar: 'Nibbana', bookCount: 100 },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'ပညာရေးစာအုပ်စင်',
    nameMyanmar: 'Education Books',
    bookCount: 4200,
    subCategories: [
      {
        id: '3-1',
        name: 'ကျောင်းသုံးစာအုပ် / Textbooks',
        nameMyanmar: 'ကျောင်းသုံးစာအုပ်',
        bookCount: 1500,
        subSubCategories: [
          { id: '3-1-1', name: 'မူလတန်း', nameMyanmar: 'Primary', bookCount: 350 },
          { id: '3-1-2', name: 'အလယ်တန်း', nameMyanmar: 'Middle School', bookCount: 380 },
          { id: '3-1-3', name: 'အထက်တန်း', nameMyanmar: 'High School', bookCount: 420 },
          { id: '3-1-4', name: 'တက္ကသိုလ်', nameMyanmar: 'University', bookCount: 350 },
        ],
      },
      {
        id: '3-2',
        name: 'ဘာသာစကား / Languages',
        nameMyanmar: 'ဘာသာစကား',
        bookCount: 1200,
        subSubCategories: [
          { id: '3-2-1', name: 'အင်္ဂလိပ်စာ', nameMyanmar: 'English', bookCount: 480 },
          { id: '3-2-2', name: 'မြန်မာစာ', nameMyanmar: 'Myanmar', bookCount: 280 },
          { id: '3-2-3', name: 'ဂျပန်စာ', nameMyanmar: 'Japanese', bookCount: 150 },
          { id: '3-2-4', name: 'တရုတ်စာ', nameMyanmar: 'Chinese', bookCount: 180 },
          { id: '3-2-5', name: 'ကိုရီးယားစာ', nameMyanmar: 'Korean', bookCount: 110 },
        ],
      },
      {
        id: '3-3',
        name: 'စာမေးပွဲလမ်းညွှန် / Exam Guides',
        nameMyanmar: 'စာမေးပွဲလမ်းညွှန်',
        bookCount: 800,
        subSubCategories: [
          { id: '3-3-1', name: 'တက္ကသိုလ်ဝင်', nameMyanmar: 'Matriculation', bookCount: 280 },
          { id: '3-3-2', name: 'IELTS/TOEFL', nameMyanmar: 'IELTS/TOEFL', bookCount: 180 },
          { id: '3-3-3', name: 'ဝန်ထမ်းရွေးစာမေးပွဲ', nameMyanmar: 'Civil Service Exam', bookCount: 220 },
          { id: '3-3-4', name: 'အခြားစာမေးပွဲ', nameMyanmar: 'Other Exams', bookCount: 120 },
        ],
      },
      {
        id: '3-4',
        name: 'သင်ကြားနည်း / Teaching Methods',
        nameMyanmar: 'သင်ကြားနည်း',
        bookCount: 400,
        subSubCategories: [
          { id: '3-4-1', name: 'ပညာရေးသီအိုရီ', nameMyanmar: 'Education Theory', bookCount: 120 },
          { id: '3-4-2', name: 'သင်ကြားနည်းစနစ်', nameMyanmar: 'Teaching Methods', bookCount: 150 },
          { id: '3-4-3', name: 'ခေတ်သစ်ပညာရေး', nameMyanmar: 'Modern Education', bookCount: 130 },
        ],
      },
      {
        id: '3-5',
        name: 'ကျူရှင် / Tutorials',
        nameMyanmar: 'ကျူရှင်',
        bookCount: 300,
        subSubCategories: [
          { id: '3-5-1', name: 'သင်္ချာ', nameMyanmar: 'Mathematics', bookCount: 100 },
          { id: '3-5-2', name: 'သိပ္ပံ', nameMyanmar: 'Science', bookCount: 100 },
          { id: '3-5-3', name: 'အခြား', nameMyanmar: 'Others', bookCount: 100 },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'ကလေးစာအုပ်စင်',
    nameMyanmar: 'Children\'s Books',
    bookCount: 3500,
    subCategories: [
      {
        id: '4-1',
        name: 'ပုံပြင်စာအုပ် / Story Books',
        nameMyanmar: 'ပုံပြင်စာအုပ်',
        bookCount: 1500,
        subSubCategories: [
          { id: '4-1-1', name: 'မြန်မာပုံပြင်', nameMyanmar: 'Myanmar Tales', bookCount: 380 },
          { id: '4-1-2', name: 'နိုင်ငံတကာပုံပြင်', nameMyanmar: 'International Tales', bookCount: 320 },
          { id: '4-1-3', name: 'ဧည့်သည်တော်ပုံပြင်', nameMyanmar: 'Fairy Tales', bookCount: 280 },
          { id: '4-1-4', name: 'တိရစ္ဆာန်ပုံပြင်', nameMyanmar: 'Animal Stories', bookCount: 280 },
          { id: '4-1-5', name: 'စွန့်စားခန်းပုံပြင်', nameMyanmar: 'Adventure Stories', bookCount: 240 },
        ],
      },
      {
        id: '4-2',
        name: 'ပုံစာအုပ် / Picture Books',
        nameMyanmar: 'ပုံစာအုပ်',
        bookCount: 800,
        subSubCategories: [
          { id: '4-2-1', name: 'အရောင်ခြယ်စာအုပ်', nameMyanmar: 'Coloring Books', bookCount: 280 },
          { id: '4-2-2', name: 'ပုံသင်စာအုပ်', nameMyanmar: 'Picture Learning', bookCount: 280 },
          { id: '4-2-3', name: 'ကာတွန်းစာအုပ်', nameMyanmar: 'Comic Books', bookCount: 240 },
        ],
      },
      {
        id: '4-3',
        name: 'ပညာရေးကစားစရာ / Educational',
        nameMyanmar: 'ပညာရေးကစားစရာ',
        bookCount: 600,
        subSubCategories: [
          { id: '4-3-1', name: 'ABC သင်', nameMyanmar: 'ABC Learning', bookCount: 180 },
          { id: '4-3-2', name: 'ဂဏန်းသင်', nameMyanmar: 'Numbers', bookCount: 180 },
          { id: '4-3-3', name: 'ပဟေဋ္ဌိ', nameMyanmar: 'Puzzles', bookCount: 140 },
          { id: '4-3-4', name: 'အသိပညာ', nameMyanmar: 'Knowledge', bookCount: 100 },
        ],
      },
      {
        id: '4-4',
        name: 'လူငယ်စာအုပ် / Youth Books',
        nameMyanmar: 'လူငယ်စာအုပ်',
        bookCount: 600,
        subSubCategories: [
          { id: '4-4-1', name: 'လူငယ်ဝတ္ထု', nameMyanmar: 'Youth Fiction', bookCount: 220 },
          { id: '4-4-2', name: 'လူငယ်သုတ', nameMyanmar: 'Youth Non-Fiction', bookCount: 200 },
          { id: '4-4-3', name: 'လမ်းညွှန်စာအုပ်', nameMyanmar: 'Guides', bookCount: 180 },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'စာဟောင်းပေဟောင်း',
    nameMyanmar: 'Rare & Antique Books',
    bookCount: 5200,
    subCategories: [
      {
        id: '5-1',
        name: 'ဂန္ထဝင်စာပေ / Classics',
        nameMyanmar: 'ဂန္ထဝင်စာပေ',
        bookCount: 1500,
        subSubCategories: [
          { id: '5-1-1', name: 'ခေတ်ဟောင်းဝတ္ထု', nameMyanmar: 'Classic Novels', bookCount: 380 },
          { id: '5-1-2', name: 'ခေတ်ဟောင်းကဗျာ', nameMyanmar: 'Classic Poetry', bookCount: 320 },
          { id: '5-1-3', name: 'ခေတ်ဟောင်းစာစု', nameMyanmar: 'Classic Essays', bookCount: 280 },
          { id: '5-1-4', name: 'ခေတ်ဟောင်းပြဇာတ်', nameMyanmar: 'Classic Drama', bookCount: 220 },
          { id: '5-1-5', name: 'ကိုလိုနီခေတ်စာပေ', nameMyanmar: 'Colonial Era', bookCount: 300 },
        ],
      },
      {
        id: '5-2',
        name: 'ရှားပါးစာအုပ် / Rare Books',
        nameMyanmar: 'ရှားပါးစာအုပ်',
        bookCount: 1200,
        subSubCategories: [
          { id: '5-2-1', name: 'ပထမပုံနှိပ်စာအုပ်', nameMyanmar: 'First Editions', bookCount: 280 },
          { id: '5-2-2', name: 'လက်မှတ်ပါစာအုပ်', nameMyanmar: 'Signed Books', bookCount: 180 },
          { id: '5-2-3', name: 'ကန့်သတ်ပုံနှိပ်', nameMyanmar: 'Limited Editions', bookCount: 220 },
          { id: '5-2-4', name: 'ပုံနှိပ်ရပ်ဆိုင်းထားသော', nameMyanmar: 'Out of Print', bookCount: 320 },
          { id: '5-2-5', name: 'စုဆောင်းရန်သင့်သော', nameMyanmar: 'Collectibles', bookCount: 200 },
        ],
      },
      {
        id: '5-3',
        name: 'သမိုင်းဝင်စာအုပ် / Historical',
        nameMyanmar: 'သမိုင်းဝင်စာအုပ်',
        bookCount: 1000,
        subSubCategories: [
          { id: '5-3-1', name: 'ခေတ်ဟောင်းမှတ်တမ်း', nameMyanmar: 'Historical Records', bookCount: 280 },
          { id: '5-3-2', name: 'ရာဇဝင်', nameMyanmar: 'Chronicles', bookCount: 220 },
          { id: '5-3-3', name: 'ပေစာ', nameMyanmar: 'Palm Leaf Manuscripts', bookCount: 180 },
          { id: '5-3-4', name: 'ပရာဏ', nameMyanmar: 'Parabaik', bookCount: 150 },
          { id: '5-3-5', name: 'ကျောက်စာ', nameMyanmar: 'Stone Inscriptions', bookCount: 170 },
        ],
      },
      {
        id: '5-4',
        name: 'ဂျာနယ်/မဂ္ဂဇင်းဟောင်း',
        nameMyanmar: 'Old Magazines',
        bookCount: 800,
        subSubCategories: [
          { id: '5-4-1', name: 'ခေတ်ဟောင်းဂျာနယ်', nameMyanmar: 'Old Journals', bookCount: 280 },
          { id: '5-4-2', name: 'ခေတ်ဟောင်းမဂ္ဂဇင်း', nameMyanmar: 'Old Magazines', bookCount: 280 },
          { id: '5-4-3', name: 'သတင်းစာဟောင်း', nameMyanmar: 'Old Newspapers', bookCount: 240 },
        ],
      },
      {
        id: '5-5',
        name: 'ဘာသာပြန်ဟောင်း / Old Translations',
        nameMyanmar: 'ဘာသာပြန်ဟောင်း',
        bookCount: 700,
        subSubCategories: [
          { id: '5-5-1', name: 'အင်္ဂလိပ်မှဘာသာပြန်', nameMyanmar: 'English Translations', bookCount: 280 },
          { id: '5-5-2', name: 'အခြားဘာသာပြန်', nameMyanmar: 'Other Translations', bookCount: 220 },
          { id: '5-5-3', name: 'ဂန္ထဝင်ဘာသာပြန်', nameMyanmar: 'Classic Translations', bookCount: 200 },
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'International Books',
    nameMyanmar: 'နိုင်ငံတကာစာအုပ်',
    bookCount: 18000,
    subCategories: [
      {
        id: '6-1',
        name: 'Fiction',
        nameMyanmar: 'ဝတ္ထု',
        bookCount: 5500,
        subSubCategories: [
          { id: '6-1-1', name: 'Literary Fiction', nameMyanmar: 'စာပေဝတ္ထု', bookCount: 680 },
          { id: '6-1-2', name: 'Romance', nameMyanmar: 'ရသဝတ္ထု', bookCount: 750 },
          { id: '6-1-3', name: 'Mystery & Thriller', nameMyanmar: 'ထိတ်လန့်စရာ', bookCount: 820 },
          { id: '6-1-4', name: 'Science Fiction', nameMyanmar: 'သိပ္ပံစိတ်ကူးယဉ်', bookCount: 580 },
          { id: '6-1-5', name: 'Fantasy', nameMyanmar: 'စိတ်ကူးယဉ်', bookCount: 620 },
          { id: '6-1-6', name: 'Horror', nameMyanmar: 'ကြောက်စရာ', bookCount: 380 },
          { id: '6-1-7', name: 'Historical Fiction', nameMyanmar: 'သမိုင်းဝတ္ထု', bookCount: 450 },
          { id: '6-1-8', name: 'Contemporary Fiction', nameMyanmar: 'ခေတ်သစ်ဝတ္ထု', bookCount: 520 },
          { id: '6-1-9', name: 'Classics', nameMyanmar: 'ဂန္ထဝင်', bookCount: 400 },
          { id: '6-1-10', name: 'Short Stories', nameMyanmar: 'ဝတ္ထုတို', bookCount: 300 },
        ],
      },
      {
        id: '6-2',
        name: 'Non-Fiction',
        nameMyanmar: 'သုတစာအုပ်',
        bookCount: 4500,
        subSubCategories: [
          { id: '6-2-1', name: 'Biography & Memoir', nameMyanmar: 'ဘဝအတ္ထုပ္ပတ္တိ', bookCount: 580 },
          { id: '6-2-2', name: 'History', nameMyanmar: 'သမိုင်း', bookCount: 620 },
          { id: '6-2-3', name: 'Science', nameMyanmar: 'သိပ္ပံ', bookCount: 480 },
          { id: '6-2-4', name: 'Philosophy', nameMyanmar: 'ဒဿနိက', bookCount: 350 },
          { id: '6-2-5', name: 'Psychology', nameMyanmar: 'စိတ်ပညာ', bookCount: 420 },
          { id: '6-2-6', name: 'True Crime', nameMyanmar: 'အစစ်အမှန်ရာဇဝတ်မှု', bookCount: 280 },
          { id: '6-2-7', name: 'Travel', nameMyanmar: 'ခရီးသွား', bookCount: 320 },
          { id: '6-2-8', name: 'Essays', nameMyanmar: 'စာစု', bookCount: 250 },
          { id: '6-2-9', name: 'Politics & Current Affairs', nameMyanmar: 'နိုင်ငံရေး', bookCount: 380 },
          { id: '6-2-10', name: 'Nature & Environment', nameMyanmar: 'သဘာဝပတ်ဝန်းကျင်', bookCount: 320 },
        ],
      },
      {
        id: '6-3',
        name: 'Business & Self-Help',
        nameMyanmar: 'စီးပွားရေးနှင့်ကိုယ်တိုင်တိုးတက်ရေး',
        bookCount: 3200,
        subSubCategories: [
          { id: '6-3-1', name: 'Business Strategy', nameMyanmar: 'စီးပွားရေးမဟာဗျူဟာ', bookCount: 420 },
          { id: '6-3-2', name: 'Leadership', nameMyanmar: 'ခေါင်းဆောင်မှု', bookCount: 380 },
          { id: '6-3-3', name: 'Personal Finance', nameMyanmar: 'ကိုယ်ပိုင်ဘဏ္ဍာရေး', bookCount: 450 },
          { id: '6-3-4', name: 'Marketing', nameMyanmar: 'စျေးကွက်ရှာဖွေရေး', bookCount: 320 },
          { id: '6-3-5', name: 'Entrepreneurship', nameMyanmar: 'စီးပွားရေးလုပ်ငန်းရှင်', bookCount: 380 },
          { id: '6-3-6', name: 'Self-Help', nameMyanmar: 'ကိုယ်တိုင်တိုးတက်ရေး', bookCount: 520 },
          { id: '6-3-7', name: 'Productivity', nameMyanmar: 'ကုန်ထုတ်စွမ်းအား', bookCount: 280 },
          { id: '6-3-8', name: 'Communication', nameMyanmar: 'ဆက်သွယ်ရေး', bookCount: 250 },
          { id: '6-3-9', name: 'Career Development', nameMyanmar: 'အသက်မွေးဝမ်းကျောင်းဖွံ့ဖြိုးရေး', bookCount: 200 },
        ],
      },
      {
        id: '6-4',
        name: 'Children & Young Adult',
        nameMyanmar: 'ကလေးနှင့်လူငယ်',
        bookCount: 2800,
        subSubCategories: [
          { id: '6-4-1', name: 'Picture Books', nameMyanmar: 'ပုံစာအုပ်', bookCount: 450 },
          { id: '6-4-2', name: 'Early Readers', nameMyanmar: 'စာဖတ်သင်', bookCount: 320 },
          { id: '6-4-3', name: 'Middle Grade', nameMyanmar: 'အလယ်တန်း', bookCount: 420 },
          { id: '6-4-4', name: 'Young Adult Fiction', nameMyanmar: 'လူငယ်ဝတ္ထု', bookCount: 580 },
          { id: '6-4-5', name: 'Young Adult Non-Fiction', nameMyanmar: 'လူငယ်သုတ', bookCount: 280 },
          { id: '6-4-6', name: 'Comics & Graphic Novels', nameMyanmar: 'ကာတွန်း', bookCount: 450 },
          { id: '6-4-7', name: 'Activity Books', nameMyanmar: 'လှုပ်ရှားမှုစာအုပ်', bookCount: 300 },
        ],
      },
      {
        id: '6-5',
        name: 'Academic & Professional',
        nameMyanmar: 'ပညာရေးနှင့်ပရော်ဖက်ရှင်နယ်',
        bookCount: 2000,
        subSubCategories: [
          { id: '6-5-1', name: 'Textbooks', nameMyanmar: 'ကျောင်းသုံးစာအုပ်', bookCount: 380 },
          { id: '6-5-2', name: 'Reference Books', nameMyanmar: 'ကိုးကားစာအုပ်', bookCount: 280 },
          { id: '6-5-3', name: 'Medical', nameMyanmar: 'ဆေးပညာ', bookCount: 320 },
          { id: '6-5-4', name: 'Engineering', nameMyanmar: 'အင်ဂျင်နီယာ', bookCount: 280 },
          { id: '6-5-5', name: 'Law', nameMyanmar: 'ဥပဒေ', bookCount: 220 },
          { id: '6-5-6', name: 'Computer Science', nameMyanmar: 'ကွန်ပျူတာသိပ္ပံ', bookCount: 320 },
          { id: '6-5-7', name: 'Research & Study Guides', nameMyanmar: 'သုတေသနလမ်းညွှန်', bookCount: 200 },
        ],
      },
    ],
  },
  {
    id: '7',
    name: 'စာရေးကိရိယာ',
    nameMyanmar: 'Stationery',
    bookCount: 0,
    subCategories: [
      {
        id: '7-1',
        name: 'ဘောပင် / Pens',
        nameMyanmar: 'ဘောပင်',
        bookCount: 0,
        subSubCategories: [],
      },
      {
        id: '7-2',
        name: 'ခဲတံ / Pencils',
        nameMyanmar: 'ခဲတံ',
        bookCount: 0,
        subSubCategories: [],
      },
      {
        id: '7-3',
        name: 'မှတ်စုစာအုပ် / Notebooks',
        nameMyanmar: 'မှတ်စုစာအုပ်',
        bookCount: 0,
        subSubCategories: [],
      },
    ],
  },
  {
    id: '8',
    name: 'ကွန်ပျူတာပစ္စည်းများ',
    nameMyanmar: 'Computer Accessories',
    bookCount: 0,
    subCategories: [
      {
        id: '8-1',
        name: 'USB Drive',
        nameMyanmar: 'USB',
        bookCount: 0,
        subSubCategories: [],
      },
      {
        id: '8-2',
        name: 'Mouse & Keyboard',
        nameMyanmar: 'Mouse & Keyboard',
        bookCount: 0,
        subSubCategories: [],
      },
    ],
  },
  {
    id: '9',
    name: 'ပုံဆွဲပစ္စည်းများ',
    nameMyanmar: 'Art Supplies',
    bookCount: 0,
    subCategories: [
      {
        id: '9-1',
        name: 'ဆေးရောင်စုံ / Paints',
        nameMyanmar: 'ဆေးရောင်စုံ',
        bookCount: 0,
        subSubCategories: [],
      },
      {
        id: '9-2',
        name: 'စုတ်တံ / Brushes',
        nameMyanmar: 'စုတ်တံ',
        bookCount: 0,
        subSubCategories: [],
      },
    ],
  },
  {
    id: '10',
    name: 'လက်မှုနှင့်လက်ဆောင်ပစ္စည်းများ',
    nameMyanmar: 'Crafts & Gifts',
    bookCount: 500,
    subCategories: [
      {
        id: '10-1',
        name: 'လက်ဆောင်ပစ္စည်း / Gifts',
        nameMyanmar: 'လက်ဆောင်ပစ္စည်း',
        bookCount: 300,
        subSubCategories: [
          { id: '10-1-1', name: 'မွေးနေ့လက်ဆောင်', nameMyanmar: 'Birthday Gifts', bookCount: 100 },
          { id: '10-1-2', name: 'အထိမ်းအမှတ်ပစ္စည်း', nameMyanmar: 'Souvenirs', bookCount: 100 },
          { id: '10-1-3', name: 'ကတ်ပြား', nameMyanmar: 'Cards', bookCount: 100 },
        ],
      },
      {
        id: '10-2',
        name: 'လက်မှုပစ္စည်း / Crafts',
        nameMyanmar: 'လက်မှုပစ္စည်း',
        bookCount: 200,
        subSubCategories: [
          { id: '10-2-1', name: 'DIY ပစ္စည်း', nameMyanmar: 'DIY Supplies', bookCount: 100 },
          { id: '10-2-2', name: 'ဖန်တီးမှုပစ္စည်း', nameMyanmar: 'Creative Supplies', bookCount: 100 },
        ],
      },
    ],
  },
  {
    id: '11',
    name: 'CD/DVD',
    nameMyanmar: 'CD/DVD',
    bookCount: 1200,
    subCategories: [
      {
        id: '11-1',
        name: 'တရားတော် CD/DVD',
        nameMyanmar: 'Dhamma CD/DVD',
        bookCount: 600,
        subSubCategories: [
          { id: '11-1-1', name: 'တရားပွဲ', nameMyanmar: 'Dhamma Talks', bookCount: 200 },
          { id: '11-1-2', name: 'ပရိတ်တော်', nameMyanmar: 'Paritta', bookCount: 150 },
          { id: '11-1-3', name: 'တရားသီချင်း', nameMyanmar: 'Dhamma Songs', bookCount: 150 },
          { id: '11-1-4', name: 'တရားအားထုတ်နည်း', nameMyanmar: 'Meditation Guide', bookCount: 100 },
        ],
      },
      {
        id: '11-2',
        name: 'ပညာရေး CD/DVD',
        nameMyanmar: 'Education CD/DVD',
        bookCount: 400,
        subSubCategories: [
          { id: '11-2-1', name: 'ဘာသာစကားသင်', nameMyanmar: 'Language Learning', bookCount: 200 },
          { id: '11-2-2', name: 'ကျောင်းသုံး', nameMyanmar: 'Academic', bookCount: 200 },
        ],
      },
      {
        id: '11-3',
        name: 'ဖျော်ဖြေရေး CD/DVD',
        nameMyanmar: 'Entertainment CD/DVD',
        bookCount: 200,
        subSubCategories: [
          { id: '11-3-1', name: 'ဂီတ', nameMyanmar: 'Music', bookCount: 100 },
          { id: '11-3-2', name: 'ရုပ်ရှင်', nameMyanmar: 'Movies', bookCount: 100 },
        ],
      },
    ],
  },
  {
    id: '12',
    name: 'Ebook',
    nameMyanmar: 'Ebook',
    bookCount: 0,
    subCategories: [
      {
        id: '12-1',
        name: 'Myanmar Ebooks',
        nameMyanmar: 'မြန်မာ Ebook',
        bookCount: 0,
        subSubCategories: [],
      },
      {
        id: '12-2',
        name: 'English Ebooks',
        nameMyanmar: 'အင်္ဂလိပ် Ebook',
        bookCount: 0,
        subSubCategories: [],
      },
    ],
  },
];

// Helper function to get total count of all sub-sub-categories
export function getTotalSubSubCategories(): number {
  let total = 0;
  hierarchicalCategories.forEach((main) => {
    main.subCategories?.forEach((sub) => {
      total += sub.subSubCategories?.length || 0;
    });
  });
  return total;
}

// Helper function to search categories
export function searchCategories(query: string): {
  mainCategories: HierarchicalCategory[];
  subCategories: { parent: HierarchicalCategory; sub: typeof hierarchicalCategories[0]['subCategories'][0] }[];
  subSubCategories: { 
    mainParent: HierarchicalCategory; 
    subParent: typeof hierarchicalCategories[0]['subCategories'][0];
    subSub: typeof hierarchicalCategories[0]['subCategories'][0]['subSubCategories'][0];
  }[];
} {
  const lowerQuery = query.toLowerCase();
  const result = {
    mainCategories: [] as HierarchicalCategory[],
    subCategories: [] as { parent: HierarchicalCategory; sub: typeof hierarchicalCategories[0]['subCategories'][0] }[],
    subSubCategories: [] as {
      mainParent: HierarchicalCategory;
      subParent: typeof hierarchicalCategories[0]['subCategories'][0];
      subSub: typeof hierarchicalCategories[0]['subCategories'][0]['subSubCategories'][0];
    }[],
  };

  hierarchicalCategories.forEach((main) => {
    if (
      main.name.toLowerCase().includes(lowerQuery) ||
      main.nameMyanmar?.toLowerCase().includes(lowerQuery)
    ) {
      result.mainCategories.push(main);
    }

    main.subCategories?.forEach((sub) => {
      if (
        sub.name.toLowerCase().includes(lowerQuery) ||
        sub.nameMyanmar?.toLowerCase().includes(lowerQuery)
      ) {
        result.subCategories.push({ parent: main, sub });
      }

      sub.subSubCategories?.forEach((subSub) => {
        if (
          subSub.name.toLowerCase().includes(lowerQuery) ||
          subSub.nameMyanmar?.toLowerCase().includes(lowerQuery)
        ) {
          result.subSubCategories.push({ mainParent: main, subParent: sub, subSub });
        }
      });
    });
  });

  return result;
}
