import { initDb, getDb, saveDb } from './db.js';

await initDb();
const db = getDb();

const diseases = [
  {
    name: 'Diabetes',
    slug: 'diabetes',
    description: 'A metabolic disease that causes high blood sugar. The hormone insulin moves sugar from the blood into your cells to be stored or used for energy.',
    symptoms: 'Increased thirst, frequent urination, hunger, fatigue, blurred vision, slow-healing sores.',
    causes: 'Type 1: immune system attacks insulin-producing cells. Type 2: insulin resistance, lifestyle factors.',
    treatment: 'Insulin therapy, oral medications, blood sugar monitoring, diet and exercise, weight management.',
    prevention: 'Healthy diet, regular physical activity, maintaining healthy weight, avoiding tobacco.',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
    category: 'metabolic'
  },
  {
    name: 'Hypertension',
    slug: 'hypertension',
    description: 'High blood pressure is a common condition where the long-term force of blood against artery walls is high enough to cause health problems.',
    symptoms: 'Often no symptoms; severe cases may show headaches, shortness of breath, nosebleeds.',
    causes: 'Age, family history, obesity, lack of exercise, high salt intake, stress, alcohol.',
    treatment: 'Lifestyle changes, ACE inhibitors, beta-blockers, diuretics, calcium channel blockers.',
    prevention: 'Reduce salt, exercise regularly, maintain healthy weight, limit alcohol, manage stress.',
    image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400',
    category: 'cardiovascular'
  },
  {
    name: 'Asthma',
    slug: 'asthma',
    description: 'A condition in which your airways narrow and swell and may produce extra mucus, making breathing difficult.',
    symptoms: 'Shortness of breath, chest tightness, wheezing, coughing (especially at night).',
    causes: 'Allergies, exercise, cold air, respiratory infections, air pollutants, stress.',
    treatment: 'Inhalers (rescue and controller), avoiding triggers, allergy medications.',
    prevention: 'Identify and avoid triggers, get flu shot, follow action plan, monitor breathing.',
    image_url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400',
    category: 'respiratory'
  },
  {
    name: 'Migraine',
    slug: 'migraine',
    description: 'A neurological condition characterized by intense, debilitating headaches, often on one side of the head.',
    symptoms: 'Throbbing pain, nausea, vomiting, sensitivity to light and sound, aura (visual disturbances).',
    causes: 'Genetics, hormonal changes, stress, certain foods, sleep changes, environmental factors.',
    treatment: 'Pain relievers, triptans, anti-nausea drugs, preventive medications, rest in dark room.',
    prevention: 'Identify triggers, regular sleep, stress management, magnesium supplements, avoid skipping meals.',
    image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    category: 'neurological'
  },
  {
    name: 'Eczema',
    slug: 'eczema',
    description: 'A condition that makes your skin red and itchy. Common in children but can occur at any age.',
    symptoms: 'Dry, itchy skin, red to brownish patches, small raised bumps, thickened cracked skin.',
    causes: 'Genetics, immune system dysfunction, environmental triggers, stress.',
    treatment: 'Moisturizers, corticosteroid creams, antihistamines, avoiding irritants, phototherapy.',
    prevention: 'Moisturize regularly, avoid harsh soaps, identify triggers, use humidifier.',
    image_url: 'https://images.unsplash.com/photo-1612349317150-4133d9e6c71e?w=400',
    category: 'skin'
  },
  {
    name: 'Psoriasis',
    slug: 'psoriasis',
    description: 'A skin disease that causes red, itchy scaly patches, most commonly on knees, elbows, trunk and scalp.',
    symptoms: 'Red patches with silvery scales, dry cracked skin, itching, burning, thickened nails.',
    causes: 'Immune system attacking healthy skin cells, genetics, triggers (stress, infection, injury).',
    treatment: 'Topical corticosteroids, vitamin D analogues, light therapy, oral medications, biologics.',
    prevention: 'Manage stress, avoid skin injury, treat infections promptly, limit alcohol.',
    image_url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400',
    category: 'skin'
  },
  {
    name: 'Conjunctivitis',
    slug: 'conjunctivitis',
    description: 'Pink eye is an inflammation of the conjunctiva, the thin clear tissue over the white part of the eye.',
    symptoms: 'Redness, itching, tearing, discharge, gritty feeling, swollen eyelids.',
    causes: 'Viral or bacterial infection, allergies, irritants (smoke, chlorine).',
    treatment: 'Viral: cool compresses, artificial tears. Bacterial: antibiotic drops. Allergic: antihistamine drops.',
    prevention: 'Wash hands often, avoid touching eyes, don\'t share towels, replace makeup after infection.',
    image_url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    category: 'eye'
  },
  {
    name: 'Acne',
    slug: 'acne',
    description: 'A skin condition that occurs when hair follicles become plugged with oil and dead skin cells.',
    symptoms: 'Whiteheads, blackheads, pimples, cysts, oily skin, scarring in severe cases.',
    causes: 'Excess oil, clogged pores, bacteria, hormones, diet, stress.',
    treatment: 'Topical retinoids, benzoyl peroxide, antibiotics, oral contraceptives, isotretinoin for severe.',
    prevention: 'Wash face twice daily, avoid picking, use non-comedogenic products, manage stress.',
    image_url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400',
    category: 'skin'
  },
  {
    name: 'Common Cold',
    slug: 'common-cold',
    description: 'A viral infection of your nose and throat. Usually harmless, with many virus types causing it.',
    symptoms: 'Runny nose, sore throat, cough, congestion, mild body aches, sneezing, low-grade fever.',
    causes: 'Rhinoviruses and other viruses spread through touch or airborne droplets.',
    treatment: 'Rest, fluids, over-the-counter pain relievers, decongestants, throat lozenges.',
    prevention: 'Wash hands, avoid close contact with sick people, don\'t touch face with unwashed hands.',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    category: 'infectious'
  },
  {
    name: 'Influenza',
    slug: 'influenza',
    description: 'Flu is a contagious respiratory illness caused by influenza viruses that infect the nose, throat, and lungs.',
    symptoms: 'Fever, chills, muscle aches, cough, congestion, fatigue, headache.',
    causes: 'Influenza viruses (A, B, C) spread through droplets when people cough or sneeze.',
    treatment: 'Rest, fluids, antiviral drugs (oseltamivir), pain relievers, stay home to prevent spread.',
    prevention: 'Annual flu vaccine, hand hygiene, avoid sick people, cover coughs and sneezes.',
    image_url: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400',
    category: 'infectious'
  },
  {
    name: 'COVID-19',
    slug: 'covid-19',
    description: 'Coronavirus disease 2019 is an infectious disease caused by the SARS-CoV-2 virus.',
    symptoms: 'Fever, cough, fatigue, loss of taste/smell, shortness of breath, body aches.',
    causes: 'SARS-CoV-2 virus spread through respiratory droplets and aerosols.',
    treatment: 'Rest, fluids, fever reducers; antivirals and monoclonal antibodies for high-risk; oxygen if severe.',
    prevention: 'Vaccination, masking, hand hygiene, ventilation, physical distancing when recommended.',
    image_url: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400',
    category: 'infectious'
  },
  {
    name: 'Arthritis',
    slug: 'arthritis',
    description: 'Inflammation of one or more joints, causing pain and stiffness that can worsen with age.',
    symptoms: 'Joint pain, stiffness, swelling, decreased range of motion, redness around joint.',
    causes: 'Osteoarthritis: wear and tear. Rheumatoid: autoimmune. Other: infection, injury.',
    treatment: 'NSAIDs, physical therapy, steroids, DMARDs (rheumatoid), joint surgery in severe cases.',
    prevention: 'Maintain healthy weight, exercise, avoid injury, protect joints.',
    image_url: 'https://images.unsplash.com/photo-1599901860904-f4b2c8e247b0?w=400',
    category: 'musculoskeletal'
  },
  {
    name: 'Anemia',
    slug: 'anemia',
    description: 'A condition in which you lack enough healthy red blood cells to carry adequate oxygen to body tissues.',
    symptoms: 'Fatigue, weakness, pale skin, shortness of breath, dizziness, cold hands and feet.',
    causes: 'Iron deficiency, vitamin B12 deficiency, blood loss, chronic disease, bone marrow problems.',
    treatment: 'Iron supplements, B12 injections, folate, treat underlying cause, blood transfusion if severe.',
    prevention: 'Iron-rich diet, vitamin C for absorption, B12 and folate in diet, treat heavy periods.',
    image_url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400',
    category: 'blood'
  },
  {
    name: 'Depression',
    slug: 'depression',
    description: 'A mood disorder that causes persistent feeling of sadness and loss of interest in activities.',
    symptoms: 'Sadness, loss of interest, sleep changes, fatigue, appetite changes, difficulty concentrating.',
    causes: 'Brain chemistry, hormones, genetics, early trauma, life events, medical conditions.',
    treatment: 'Psychotherapy, antidepressants, lifestyle changes, exercise, light therapy.',
    prevention: 'Stress management, social support, exercise, sleep hygiene, avoid alcohol and drugs.',
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    category: 'mental'
  },
  {
    name: 'GERD',
    slug: 'gerd',
    description: 'Gastroesophageal reflux disease - stomach acid frequently flows back into the tube connecting mouth and stomach.',
    symptoms: 'Heartburn, regurgitation, chest pain, difficulty swallowing, sensation of lump in throat.',
    causes: 'Weak lower esophageal sphincter, hiatal hernia, obesity, pregnancy, smoking.',
    treatment: 'Antacids, H2 blockers, proton pump inhibitors, lifestyle changes, surgery if severe.',
    prevention: 'Maintain healthy weight, avoid trigger foods, don\'t lie down after eating, elevate head of bed.',
    image_url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400',
    category: 'digestive'
  },
  {
    name: 'Malaria',
    slug: 'malaria',
    description: 'A disease caused by a parasite transmitted through the bite of infected mosquitoes.',
    symptoms: 'Fever, chills, headache, nausea, vomiting, muscle pain, fatigue.',
    causes: 'Plasmodium parasite transmitted by Anopheles mosquitoes.',
    treatment: 'Antimalarial drugs (chloroquine, artemisinin-based), supportive care, hospitalization if severe.',
    prevention: 'Antimalarial prophylaxis in endemic areas, mosquito nets, repellents, eliminate standing water.',
    image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400',
    category: 'infectious'
  },
  {
    name: 'Tuberculosis',
    slug: 'tuberculosis',
    description: 'A serious infectious disease that mainly affects the lungs, caused by Mycobacterium tuberculosis.',
    symptoms: 'Persistent cough (with blood), chest pain, fatigue, fever, night sweats, weight loss.',
    causes: 'Mycobacterium tuberculosis bacteria spread through airborne droplets.',
    treatment: 'Long-term antibiotics (6+ months), directly observed therapy, treatment of latent TB.',
    prevention: 'BCG vaccine in some countries, good ventilation, identify and treat active cases.',
    image_url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400',
    category: 'infectious'
  },
  {
    name: 'Chickenpox',
    slug: 'chickenpox',
    description: 'A highly contagious disease caused by the varicella-zoster virus, characterized by itchy rash and blisters.',
    symptoms: 'Rash that turns into itchy fluid-filled blisters, fever, headache, fatigue, loss of appetite.',
    causes: 'Varicella-zoster virus spread through direct contact or airborne droplets.',
    treatment: 'Rest, calamine lotion, antihistamines, acetaminophen (avoid aspirin), antiviral in at-risk.',
    prevention: 'Varicella vaccine (two doses), avoid contact with infected persons.',
    image_url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400',
    category: 'infectious'
  }
];

const insertDisease = db.prepare(`
  INSERT OR IGNORE INTO diseases (name, slug, description, symptoms, causes, treatment, prevention, image_url, category)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

try {
  for (const d of diseases) {
    insertDisease.run(
      d.name,
      d.slug,
      d.description,
      d.symptoms,
      d.causes,
      d.treatment,
      d.prevention,
      d.image_url,
      d.category
    );
  }
  saveDb();
  console.log('Seeded', diseases.length, 'diseases.');
} catch (err) {
  console.error('Seed error:', err);
}
