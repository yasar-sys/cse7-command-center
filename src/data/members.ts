export type Member = {
  name: string;
  roll: string;
  registration: string;
  studentId: string;
  email: string;
  personalEmail?: string;
  image: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  role?: string;
  isPlaceholder?: boolean;
};

/**
 * Real batch members — CSE 7th Batch.
 * Add one object here and the directory, filters, counts, and profile view update automatically.
 *
 * IMAGE INSTRUCTIONS:
 *   • Place each photo in /public/members/ using the filename listed in the `image` field.
 *   • Recommended size: 400 × 400 px (1:1 square), JPG or PNG, max ~150 KB.
 *   • The component will gracefully fall back to initials if the image is missing.
 */
export const members: Member[] = [
  // ── Sl 1 ──
  {
    name: "Arko Biswas",
    roll: "CSE-230304",
    registration: "2023-852-756",
    studentId: "2023-852-756",
    email: "arko.biswas@example.edu",
    image: "/members/arko-biswas.jpg",
  },
  // ── Sl 2 ──
  {
    name: "Md. Maimun Ahmed",
    roll: "CSE-230305",
    registration: "2023-752-757",
    studentId: "2023-752-757",
    email: "maimun.ahmed@example.edu",
    image: "/members/md-maimun-ahmed.jpg",
  },
  // ── Sl 3 ──
  {
    name: "Mithila Talukder",
    roll: "CSE-230306",
    registration: "2023-652-758",
    studentId: "2023-652-758",
    email: "mithila.talukder@example.edu",
    image: "/members/mithila-talukder.jpg",
  },
  // ── Sl 4 ──
  {
    name: "N.M. Ibn Safat Tonmoy",
    roll: "CSE-230307",
    registration: "2023-552-759",
    studentId: "2023-552-759",
    email: "nm.tonmoy@example.edu",
    image: "/members/nm-ibn-safat-tonmoy.jpg",
  },
  // ── Sl 5 ──
  {
    name: "Md. Rakib Sadman Tashin",
    roll: "CSE-230309",
    registration: "2023-252-761",
    studentId: "2023-252-761",
    email: "rakib.tashin@example.edu",
    image: "/members/md-rakib-sadman-tashin.jpg",
  },
  // ── Sl 6 ──
  {
    name: "A.S.J. Sadman Sadik Talukder",
    roll: "CSE-230310",
    registration: "2023-152-762",
    studentId: "2023-152-762",
    email: "sadman.sadik@example.edu",
    image: "/members/asj-sadman-sadik-talukder.jpg",
  },
  // ── Sl 7 ──
  {
    name: "Nuzaima Tarannum Lazmi",
    roll: "CSE-230311",
    registration: "2023-052-763",
    studentId: "2023-052-763",
    email: "nuzaima.lazmi@example.edu",
    image: "/members/nuzaima-tarannum-lazmi.jpg",
  },
  // ── Sl 8 ──
  {
    name: "Sayeem Shahriar Sami",
    roll: "CSE-230313",
    registration: "2023-852-765",
    studentId: "2023-852-765",
    email: "sayeem.sami@example.edu",
    image: "/members/sayeem-shahriar-sami.jpg",
  },
  // ── Sl 9 ──
  {
    name: "Rahiatul Jannat",
    roll: "CSE-230314",
    registration: "2023-752-766",
    studentId: "2023-752-766",
    email: "rahiatuljannat8134@gmail.com",
    image: "/members/rahiatul-jannat.jpg",
  },
  // ── Sl 10 ──
  {
    name: "Shila Sarkar",
    roll: "CSE-230315",
    registration: "2023-652-767",
    studentId: "2023-652-767",
    email: "shila.sarkar@example.edu",
    image: "/members/shila-sarkar.jpg",
  },
  // ── Sl 11 ──
  {
    name: "Niyaz Mohammad Shahariar",
    roll: "CSE-230316",
    registration: "2023-552-768",
    studentId: "2023-552-768",
    email: "niyaz.shahariar@example.edu",
    image: "/members/niyaz-mohammad-shahariar.jpg",
  },
  // ── Sl 12 ──
  {
    name: "Adeba Tafannum",
    roll: "CSE-230317",
    registration: "2023-452-769",
    studentId: "2023-452-769",
    email: "adeba.tafannum@example.edu",
    image: "/members/adeba-tafannum.jpg",
  },
  // ── Sl 13 ──
  {
    name: "Md. Mahmuduzzaman",
    roll: "CSE-230318",
    registration: "2023-252-770",
    studentId: "2023-252-770",
    email: "mahmuduzzaman@example.edu",
    image: "/members/md-mahmuduzzaman.jpg",
  },
  // ── Sl 14 ──
  {
    name: "Md. Abu Bokor Chowdhury",
    roll: "CSE-230319",
    registration: "2023-152-771",
    studentId: "2023-152-771",
    email: "abu.bokor@example.edu",
    image: "/members/md-abu-bokor-chowdhury.jpg",
  },
  // ── Sl 15 ──
  {
    name: "Fatiha Mahjabin",
    roll: "CSE-230320",
    registration: "2023-052-772",
    studentId: "2023-052-772",
    email: "fatiha.mahjabin@example.edu",
    image: "/members/fatiha-mahjabin.jpg",
  },
  // ── Sl 16 ──
  {
    name: "Ananda Sutradhar",
    roll: "CSE-230321",
    registration: "2023-952-773",
    studentId: "2023-952-773",
    email: "ananda.sutradhar@example.edu",
    image: "/members/ananda-sutradhar.jpg",
  },
  // ── Sl 17 ──
  {
    name: "Md. Hasibul Hoque",
    roll: "CSE-230322",
    registration: "2023-852-774",
    studentId: "2023-852-774",
    email: "hasibul.hoque@example.edu",
    image: "/members/md-hasibul-hoque.jpg",
  },
  // ── Sl 18 ──
  {
    name: "Mst. Sayara Khatun Sara",
    roll: "CSE-230323",
    registration: "2023-752-775",
    studentId: "2023-752-775",
    email: "sayara.sara@example.edu",
    image: "/members/mst-sayara-khatun-sara.jpg",
  },
  // ── Sl 19 ──
  {
    name: "Nusrat Jahan Moriom",
    roll: "CSE-230324",
    registration: "2023-652-776",
    studentId: "2023-652-776",
    email: "nusrat.moriom@example.edu",
    image: "/members/nusrat-jahan-moriom.jpg",
  },
  // ── Sl 20 ──
  {
    name: "Mubinul Haque",
    roll: "CSE-230325",
    registration: "2023-552-777",
    studentId: "2023-552-777",
    email: "mubinul.haque@example.edu",
    image: "/members/mubinul-haque.jpg",
  },
  // ── Sl 21 ──
  {
    name: "Sarim Shadman Sami",
    roll: "CSE-230326",
    registration: "2023-452-778",
    studentId: "2023-452-778",
    email: "sarim.sami@example.edu",
    image: "/members/sarim-shadman-sami.jpg",
  },
  // ── Sl 22 ──
  {
    name: "Mahamuda Habib Mati",
    roll: "CSE-230328",
    registration: "2023-152-780",
    studentId: "2023-152-780",
    email: "mahamuda.mati@example.edu",
    image: "/members/mahamuda-habib-mati.jpg",
  },
  // ── Sl 23 ──
  {
    name: "Md. Mahafuj Ahmed",
    roll: "CSE-230330",
    registration: "2023-952-782",
    studentId: "2023-952-782",
    email: "mahafuj.ahmed@example.edu",
    image: "/members/md-mahafuj-ahmed.jpg",
  },
  // ── Sl 24 ──
  {
    name: "Md. Hamidul Haque Hridoy",
    roll: "CSE-230331",
    registration: "2023-852-783",
    studentId: "2023-852-783",
    email: "hamidul.hridoy@example.edu",
    image: "/members/md-hamidul-haque-hridoy.jpg",
  },
  // ── Sl 25 ──
  {
    name: "Marufa Yeasmin Mou",
    roll: "CSE-230332",
    registration: "2023-752-784",
    studentId: "2023-752-784",
    email: "marufa.mou@example.edu",
    image: "/members/marufa-yeasmin-mou.jpg",
  },
  // ── Sl 26 ──
  {
    name: "Iffat Humayra Refa",
    roll: "CSE-230334",
    registration: "2023-552-786",
    studentId: "2023-552-786",
    email: "iffat.refa@example.edu",
    image: "/members/iffat-humayra-refa.jpg",
  },
  // ── Sl 27 ──
  {
    name: "Tirtho Paul",
    roll: "CSE-230336",
    registration: "2023-352-788",
    studentId: "2023-352-788",
    email: "tirtho.paul@example.edu",
    image: "/members/tirtho-paul.jpg",
  },
  // ── Sl 28 ──
  {
    name: "Maisha Osman Umama",
    roll: "CSE-230338",
    registration: "2023-052-790",
    studentId: "2023-052-790",
    email: "maisha.umama@example.edu",
    image: "/members/maisha-osman-umama.jpg",
  },
  // ── Sl 29 ──
  {
    name: "Nusrat Jahan Aparna",
    roll: "CSE-230340",
    registration: "2023-852-792",
    studentId: "2023-852-792",
    email: "nusrat.aparna@example.edu",
    image: "/members/nusrat-jahan-aparna.jpg",
  },
  // ── Sl 30 ──
  {
    name: "Kamal Hossain Shamim",
    roll: "CSE-230342",
    registration: "2023-652-794",
    studentId: "2023-652-794",
    email: "kamal.shamim@example.edu",
    image: "/members/kamal-hossain-shamim.jpg",
  },
  // ── Sl 31 ──
  {
    name: "Md. Hasibur Rashid",
    roll: "CSE-230344",
    registration: "2023-452-796",
    studentId: "2023-452-796",
    email: "hasibur.rashid@example.edu",
    image: "/members/md-hasibur-rashid.jpg",
  },
  // ── Sl 32 ──
  {
    name: "Zahin Tasnim Raisa",
    roll: "CSE-230345",
    registration: "2023-352-797",
    studentId: "2023-352-797",
    email: "zahin.raisa@example.edu",
    image: "/members/zahin-tasnim-raisa.jpg",
  },
  // ── Sl 33 ──
  {
    name: "Md. Said Al Sahaf",
    roll: "CSE-230346",
    registration: "2023-252-798",
    studentId: "2023-252-798",
    email: "said.sahaf@example.edu",
    image: "/members/md-said-al-sahaf.jpg",
  },
  // ── Sl 34 ──
  {
    name: "Somaiya Khondokar Moon",
    roll: "CSE-230347",
    registration: "2023-152-799",
    studentId: "2023-152-799",
    email: "somaiya.moon@example.edu",
    image: "/members/somaiya-khondokar-moon.jpg",
  },
  // ── Sl 35 ──
  {
    name: "Azra Afia Disha",
    roll: "CSE-230348",
    registration: "2023-852-800",
    studentId: "2023-852-800",
    email: "azra.disha@example.edu",
    image: "/members/azra-afia-disha.jpg",
  },
  // ── Sl 36 ──
  {
    name: "Mohshina Mohona",
    roll: "CSE-230349",
    registration: "2023-752-801",
    studentId: "2023-752-801",
    email: "mohshina.mohona@example.edu",
    image: "/members/mohshina-mohona.jpg",
  },
  // ── Sl 37 ──
  {
    name: "Samin Yasar Sunny",
    roll: "CSE-230351",
    registration: "2023-552-803",
    studentId: "2023-552-803",
    email: "saminyasarsunny@gmail.com",
    image: "/members/samin-yasar-sunny.jpg",
  },
  // ── Sl 38 ──
  {
    name: "Montasir Billah",
    roll: "CSE-230353",
    registration: "2023-352-805",
    studentId: "2023-352-805",
    email: "montasir.billah@example.edu",
    image: "/members/montasir-billah.jpg",
  },
  // ── Sl 39 ──
  {
    name: "Sahad Bhuiyan",
    roll: "CSE-230355",
    registration: "2023-152-807",
    studentId: "2023-152-807",
    email: "sahad.bhuiyan@example.edu",
    image: "/members/sahad-bhuiyan.jpg",
  },
  // ── Sl 40 ──
  {
    name: "Tanak Chakma",
    roll: "CSE-230356",
    registration: "2023-052-808",
    studentId: "2023-052-808",
    email: "tanak.chakma@example.edu",
    image: "/members/tanak-chakma.jpg",
  },
  // ── Sl 42 ──
  {
    name: "Sadik Haque Alif",
    roll: "CSE-230362",
    registration: "2022-355-010",
    studentId: "2022-355-010",
    email: "sadik.alif@example.edu",
    image: "/members/sadik-haque-alif.jpg",
  },
  // ── Sl 43 ──
  {
    name: "Maruf Al Fahim",
    roll: "CSE-230363",
    registration: "2022-755-061",
    studentId: "2022-755-061",
    email: "maruf.fahim@example.edu",
    image: "/members/maruf-al-fahim.jpg",
  },
  // ── Sl 45 ──
  {
    name: "Md. Tanvir Ahmed Mohsin",
    roll: "CSE-230365",
    registration: "2022-855-024",
    studentId: "2022-855-024",
    email: "tanvir.mohsin@example.edu",
    image: "/members/md-tanvir-ahmed-mohsin.jpg",
  },
  // ── Sl 46 ──
  {
    name: "Manik Robi Das",
    roll: "CSE-230366",
    registration: "2022-455-019",
    studentId: "2022-455-019",
    email: "manik.das@example.edu",
    image: "/members/manik-robi-das.jpg",
  },
];
