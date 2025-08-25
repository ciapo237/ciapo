import { Program, NewsItem, Partner, Course, Product, Service, Location } from '../types';
import {Target, BookOpen, ShoppingBag, Wrench } from 'lucide-react';
import Aviculture from '../assets/elevage.jpg';
import Agriculture from '../assets/agriculture.jpg';
import Agroalimentaire from '../assets/transform_cacao.png';
import Pisculture from '../assets/piscicultre.jpg';
import Comptabilité from '../assets/gestion.jpeg';
import Santé from '../assets/sante.jpeg';
import Commerce from '../assets/gestion.jpeg';
import Technologie from '../assets/technologie.jpg';
import Professionnel from '../assets/professionnelle.jpg';
import elevageImage from '../assets/poules.jpeg';
import pommesImage from '../assets/pommes.jpeg';
import tomateImage from '../assets/tomates.jpg';
import mielImage from '../assets/miel.jpg';
import cacaoImage from '../assets/cacao.jpg';
import plantainImage from '../assets/plantain.png';
import maniocImage from '../assets/manioc.jpg';
import maisImage from '../assets/mais.jpg';
import COHIMMSlogo from '../assets/COHIMMS.png';
import SCPTTElogo from '../assets/SCPTTE.png';
import GICAMBYlogo from '../assets/GICAMBY.png';
import APIlogo from '../assets/API.png';
import MINADER from '../assets/MINADER.jpeg';
import FAO from '../assets/FAO.jpeg';
import BAD from '../assets/BAD.jpeg';
import restau from '../assets/restau.jpeg';
import irrigation from '../assets/systeme-irrigation.png';
import gest_Agri from '../assets/compta_agricol.jpeg';
import Techno from '../assets/technologie.jpg';
import Prof from '../assets/dep_pro.jpg';
import EntrepBrochure from '../assets/brochures/ENTREPRENEURIAT_AGRICOLE.pdf';
import AviBrochure from '../assets/brochures/BROCHURE_AVICULTURE.pdf';
import agriBrochure from '../assets/brochures/TRANSFORMATION_AGROALIMENTAIRE.pdf';
import GestBrochure from '../assets/brochures/BROCHURE_GESTION_FINANCIERE_AGRICULTEURS.pdf';
import transfBrochure from '../assets/brochures/TRANSFORMATION_AGROALIMENTAIRE.pdf';
import pisiculBrochure from '../assets/brochures/FORMATION_PISCICULTURE_MODERNE.pdf';
import gestFinBrochure from '../assets/brochures/FORMATION_COMPTABILITE_GESTION_AGRICOLE.pdf';
import Formation from '../assets/missions/formation.jpg';
import Production from '../assets/missions/vente.png';
import Projets from '../assets/missions/mont_projet.jpeg';
import Phytosanitaires from '../assets/missions/phytosanit.jpeg';
import Prestations from '../assets/missions/prestation.jpg';
import Course1 from '../assets/video/ciapo coop-ca.mp4';


export const programs: Program[] = [
  {
    id: '1',
    title: 'Entrepreneuriat Agricole',
    description: 'Formation intensive de 4 semaines combinant 60% de pratique et 40% de théorie appliquée pour acquérir les compétences essentielles de gestion d\'entreprise agricole.',
    duration: '4 semaines',
    cost: '70 000 FCFA',
    imageUrl: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=600',
    pdfUrl: EntrepBrochure,
    modules: [
      {
        title: 'Module 1: Lancer son projet agricole',
        duration: 'Semaine 1',
        objective: 'Clarifier l\'idée d\'entreprise et poser les bases solides',
        topics: [
          'Identification des opportunités agricoles',
          'Étude simplifiée de marché local',
          'Choix de la filière et structuration du projet',
          'Connaissance des acteurs et dispositifs d\'accompagnement'
        ]
      },
      {
        title: 'Module 2: Techniques de production et gestion opérationnelle',
        duration: 'Semaine 2',
        objective: 'Connaître les fondamentaux techniques et organisationnels',
        topics: [
          'Choix et conduite d\'une spéculation',
          'Planification des activités agricoles',
          'Gestion de la main d\'œuvre et de la logistique',
          'Gestion simplifiée des intrants et équipements'
        ]
      },
      {
        title: 'Module 3: Finances et outils de gestion',
        duration: 'Semaine 3',
        objective: 'Maîtriser les bases pour rentabiliser l\'entreprise',
        topics: [
          'Calcul des coûts de production',
          'Fixation du prix de vente',
          'Notions de seuil de rentabilité',
          'Introduction à la gestion de trésorerie et tenue de cahiers de comptes'
        ]
      },
      {
        title: 'Module 4: Marketing, pitch & accès au financement',
        duration: 'Semaine 4',
        objective: 'Valoriser son projet et mobiliser les ressources',
        topics: [
          'Techniques de marketing rural et agricole',
          'Construction d\'un argumentaire de vente',
          'Élaboration d\'un mini business plan',
          'Simulation de présentation à un bailleur ou investisseur'
        ]
      }
    ],
    deliverables: [
      'Mini business plan',
      'Plan d\'exploitation',
      'Fiche de calcul',
      'Présentation de projet',
      'Certificat'
    ],
    targetAudience: [
      'Agripreneurs',
      'Jeunes diplômés',
      'Porteurs de projets',
      'Membres de coopératives'
    ]
  },
  {
    id: '2',
    title: 'Aviculture Moderne',
    description: 'Apprenez les techniques modernes d\'élevage de volailles, de la gestion de l\'alimentation aux stratégies de commercialisation des œufs et poulets.',
    duration: '4 semaines',
    cost: '70 000 FCFA',
    imageUrl: Aviculture,
    pdfUrl: AviBrochure,
    format: '80% pratique | 20% théorie de terrain',
    targetAudience: [
      'Jeunes en insertion',
      'GIC',
      'Coopératives',
      'Techniciens'
    ],
    modules: [
      {
        title: 'Module 1: Mise en place de l\'élevage',
        duration: 'Semaine 1',
        objective: 'Installer un élevage sain, productif et rentable',
        topics: [
          'Choix du site, aménagement du poulailler',
          'Choix des races : Cobb 500, Isa Brown',
          'Matériel de base : abreuvoirs, mangeoires, litière',
          'Réception des poussins, installation en couveuse'
        ]
      },
      {
        title: 'Module 2: Conduite de l\'élevage',
        duration: 'Semaine 2',
        objective: 'Suivre efficacement un cycle de production',
        topics: [
          'Alimentation par phase',
          'Gestion de l\'eau, température, éclairage',
          'Suivi poids, mortalité, sexage, vaccination'
        ]
      },
      {
        title: 'Module 3: Santé animale & biosécurité',
        duration: 'Semaine 3',
        objective: 'Prévenir les maladies, réduire les pertes',
        topics: [
          'Maladies fréquentes, plan de vaccination',
          'Nettoyage, désinfection, gestion des fientes',
          'Tenue des registres sanitaires, gestion des urgences'
        ]
      },
      {
        title: 'Module 4: Commercialisation et gestion',
        duration: 'Semaine 4',
        objective: 'Rendre l\'élevage rentable et évolutif',
        topics: [
          'Calcul des coûts de production',
          'Planification des cycles',
          'Accès au marché, emballage, marketing',
          'Simulation de marché + pitch pro'
        ]
      }
    ],
    deliverables: [
      'Fiche technique',
      'Plan de vaccination',
      'Mini business plan',
      'Certificat'
    ]
  },
  {
    id: '3',
    title: 'Agriculture Durable',
    description: 'Découvrez les pratiques agricoles durables, y compris l\'agroécologie, la conservation des sols et la gestion de l\'eau pour une production respectueuse de l\'environnement.',
    duration: '1 mois',
    cost: '70 000 FCFA',
    imageUrl: Agriculture,
    pdfUrl: agriBrochure
  },
  {
    id: '4',
    title: 'Transformation Agroalimentaire',
    description: 'Maîtrisez les techniques de transformation agroalimentaire pour augmenter leur valeur ajoutée et prolonger leur durée de conservation.',
    duration: '8 semaines',
    cost: '70 000 FCFA',
    imageUrl: Agroalimentaire,
    pdfUrl: transfBrochure,
    format: '70% pratique | 30% théorie appliquée',
    modules: [
      {
        title: 'Module 1: Apprendre en transformant',
        duration: 'Semaine 1',
        objective: 'Comprendre les fondamentaux tout en réalisant une première transformation',
        topics: [
          'Fabrication de gari et farine de manioc',
          'Mise en place d\'un mini-laboratoire',
          'Simulation de respect des normes d\'hygiène',
          'Initiation à l\'analyse sensorielle'
        ],
      },
      {
        title: 'Module 2: Immersion technique dans les produits',
        duration: 'Semaines 2 à 4',
        objective: 'Acquérir les gestes métier sur plusieurs gammes de produits',
        topics: [
          'Produits végétaux',
          'Transformation de fruits (jus, confitures, fruits secs)',
          'Transformation de céréales (farines enrichies, bouillies instantanées)',
          'Fabrication de biscuits ou beignets emballés',
          'Produits animaux',
          'Production laitière',
          'Conservation longue durée des œufs',
          'Techniques de viande/poisson (salaison, fumage, marinade)',
          'Mini-projets',
          'Transformation complète d\'un produit de A à Z',
          'Étiquetage et calcul des coûts',
          'Présentation finale du produit'
        ]
      },
      {
        title: 'Module 3: Emballage & Qualité produit',
        duration: 'Semaines 5 à 6',
        objective: 'Professionnaliser le conditionnement et la présentation',
        topics: [
          'Conception d\'emballages adaptés',
          'Fabrication d\'étiquettes',
          'Mise en sachet sous vide / mise en bocaux',
          'Test de durée de vie'
        ]
      },
      {
        title: 'Module 4: Mon projet, mon entreprise',
        duration: 'Semaines 7 à 8',
        objective: 'Devenir transformateur indépendant ou chef d\'unité',
        topics: [
          'Élaboration d\'un plan de production',
          'Rédaction d\'un mini business plan',
          'Calcul des coûts et marges',
          'Rencontres professionnelles'
        ],
        // postTraining: 'Coaching personnalisé pour 3 mois post-formation'
      }
    ],
    deliverables: [
      'Produit transformé + étiqueté',
      'Mini business plan',
      'Certificat de participation',
      'Pitch enregistré (vidéo/audio)'
    ],
    targetAudience: [
      'Jeunes agripreneurs',
      'Membres de coopératives',
      'Promoteurs agricoles',
      'Techniciens piscicoles'
    ],
  },
  {
    id: '5',
    title: 'Pisciculture Moderne',
    description: 'Apprenez les techniques modernes d\'élevage piscicole, de la gestion de l\'alimentation aux stratégies de commercialisation.',
    duration: '4 semaines',
    cost: '70 000 FCFA',
    imageUrl: Pisculture,
    pdfUrl: pisiculBrochure,
    format: '70% pratique | 30% théorie appliquée',
    targetAudience: [
      'Jeunes agripreneurs',
      'Membres de coopératives',
      'Promoteurs agricoles',
      'Techniciens piscicoles'
    ],
    modules: [
      {
        title: 'Module 1: Installation d\'un élevage piscicole',
        duration: 'Semaine 1',
        objective: 'Concevoir un site piscicole fonctionnel et durable',
        topics: [
          'Choix du site et construction des étangs/bassins (béton, bâches, terre)',
          'Système d\'approvisionnement et d\'évacuation d\'eau',
          'Sélection des espèces (Tilapia, Clarias)',
          'Techniques d\'empoissonnement et acclimatation'
        ]
      },
      {
        title: 'Module 2: Conduite de l\'élevage',
        duration: 'Semaine 2',
        objective: 'Assurer une croissance optimale des poissons',
        topics: [
          'Alimentation : types d\'aliments, fréquence, ration journalière',
          'Suivi de croissance et contrôle de la qualité de l\'eau',
          'Entretien des bassins et infrastructures',
          'Tri des poissons et gestion des densités'
        ]
      },
      {
        title: 'Module 3: Santé des poissons et biosécurité',
        duration: 'Semaine 3',
        objective: 'Réduire les pertes et garantir un élevage sain',
        topics: [
          'Principales maladies et mesures de prévention',
          'Prélèvements et traitements de base',
          'Pratiques de biosécurité et hygiène',
          'Approche durable et respectueuse de l\'environnement'
        ]
      },
      {
        title: 'Module 4: Commercialisation et rentabilité',
        duration: 'Semaine 4',
        objective: 'Booster la productivité et faciliter l\'accès au marché',
        topics: [
          'Calendrier de production et planification des récoltes',
          'Méthodes de récolte, conditionnement et transport',
          'Circuits de commercialisation (marchés locaux, hôtels)',
          'Élaboration d\'un mini business plan piscicole'
        ]
      }
    ],
    deliverables: [
      'Fiche technique par espèce',
      'Plan de production',
      'Modèle de fiche de suivi',
      'Mini business plan piscicole',
      'Attestation de participation'
    ]
  },
  {
    id: '6',
    title: 'Comptabilité et Gestion',
    description: 'Maîtrisez les techniques de transformation des produits agricoles pour augmenter leur valeur ajoutée et prolonger leur durée de conservation.',
    duration: '1 mois',
    cost: '260 000 FCFA',
    imageUrl: Comptabilité,
    pdfUrl: GestBrochure
  },
  {
    id: '7',
    title: 'Santé Médicale',
    description: 'Maîtrisez les techniques de transformation des produits agricoles pour augmenter leur valeur ajoutée et prolonger leur durée de conservation.',
    duration: '12 mois',
    cost: '265 000 FCFA',
    imageUrl: Santé,
    pdfUrl: '../assets/teams/BROCHURE _AVICULTURE.pdf'
  },
  {
    id: '8',
    title: 'Commerce et Gestion',
    description: 'Maîtrisez les techniques de transformation des produits agricoles pour augmenter leur valeur ajoutée et prolonger leur durée de conservation.',
    duration: '12 mois',
    cost: '260 000 FCFA',
    imageUrl: Commerce,
    pdfUrl: GestBrochure
  },
  {
    id: '9',
    title: 'Technologie',
    description: 'Maîtrisez les techniques de transformation des produits agricoles pour augmenter leur valeur ajoutée et prolonger leur durée de conservation.',
    duration: '12 mois',
    cost: '350 000 FCFA',
    imageUrl: Technologie,
    pdfUrl: '../assets/teams/BROCHURE _AVICULTURE.pdf'
  },
  {
    id: '10',
    title: 'Département Professionnel',
    description: 'Maîtrisez les techniques de transformation des produits agricoles pour augmenter leur valeur ajoutée et prolonger leur durée de conservation.',
    duration: '12 mois',
    cost: '265 000 FCFA',
    imageUrl: Professionnel,
    pdfUrl: '../assets/teams/BROCHURE _AVICULTURE.pdf'
  },
  {
    id: '11',
    title: 'Comptabilité et Gestion Agricole',
    description: 'Acquérez les compétences essentielles en gestion financière et comptabilité adaptées aux spécificités des activités agricoles et d\'élevage.',
    duration: '4 semaines',
    cost: '70 000 FCFA',
    imageUrl: gest_Agri,
    pdfUrl: gestFinBrochure,
    format: '60% pratique | 40% théorie appliquée',
    targetAudience: [
      'Agripreneurs',
      'Chefs de coopératives',
      'GIC',
      'Jeunes entrepreneurs agricoles'
    ],
    modules: [
      {
        title: 'Module 1: Fondamentaux de la comptabilité',
        duration: 'Semaine 1',
        objective: 'Maîtriser les bases de l\'enregistrement comptable dans un cadre agricole',
        topics: [
          'Notions de base: actif, passif, charges, produits',
          'Les pièces comptables: factures, reçus, bons de sortie',
          'Initiation à la tenue du cahier de caisse',
          'Principes d\'enregistrement: recettes et dépenses'
        ]
      },
      {
        title: 'Module 2: Outils de gestion simplifiée',
        duration: 'Semaine 2',
        objective: 'Savoir organiser et suivre les flux financiers d\'une activité',
        topics: [
          'Journal de caisse, fiche de stock, registre de ventes',
          'Élaboration d\'un budget prévisionnel',
          'Suivi de la trésorerie et des marges',
          'Cas pratiques d\'activités agricoles et d\'élevage'
        ]
      },
      {
        title: 'Module 3: Analyse financière simplifiée',
        duration: 'Semaine 3',
        objective: 'Comprendre la rentabilité de son activité',
        topics: [
          'Calcul du coût de revient',
          'Analyse de la marge brute et du seuil de rentabilité',
          'Introduction aux tableaux de bord agricoles',
          'Suivi des indicateurs clés (alimentation, rendement, main-d\'œuvre)'
        ]
      },
      {
        title: 'Module 4: Outils numériques et planification',
        duration: 'Semaine 4',
        objective: 'Digitaliser la gestion et planifier son développement',
        topics: [
          'Utilisation d\'Excel pour la comptabilité simplifiée',
          'Initiation aux applications mobiles (e-Farm, KoBo)',
          'Construction d\'un plan d\'affaires simple',
          'Préparation à la recherche de financement'
        ]
      }
    ],
    deliverables: [
      'Cahier de caisse modèle',
      'Tableau de budget',
      'Fiche de suivi financier',
      'Mini business plan',
      'Attestation de participation'
    ],
    // specialFeatures: [
    //   'Focus sur les spécificités agricoles',
    //   'Outils adaptés aux petites exploitations',
    //   'Logiciels gratuits et accessibles'
    // ]
  }
];

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Inauguration du nouveau restaurant bar services à Ebolowa',
    excerpt: 'Le CIAPO COOP-CA renforce sa présence avec un nouveau centre ultramoderne',
    content: 'Le CIAPO COOP-CA a inauguré son nouveau centre de formation agricole à Yamoussoukro. Équipé des dernières technologies, ce centre permettra de former plus de 200 jeunes agriculteurs par an aux techniques agricoles modernes et à l\'entrepreneuriat.',
    date: '2025-05-30',
    category: 'Évènements',
    imageUrl: restau,
    author: 'Admin CIAPO'
  },
  {
    id: '2',
    title: 'Remise de certificats à 50 nouveaux entrepreneurs agricoles',
    excerpt: 'Une nouvelle génération d\'agriculteurs prête à transformer le secteur',
    content: 'Lors d\'une cérémonie officielle à Abidjan, 50 jeunes formés par le CIAPO COOP-CA ont reçu leurs certificats d\'entrepreneur agricole. Ces jeunes ont déjà commencé à mettre en œuvre leurs projets agricoles dans diverses régions du pays.',
    date: '2025-12-30',
    category: 'Succès',
    imageUrl: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Admin CIAPO'
  },
  {
    id: '3',
    title: 'Nouvelle technique d\'irrigation économe en eau adoptée par nos centres',
    excerpt: 'Innovation durable pour faire face aux défis climatiques',
    content: 'Le CIAPO COOP-CA a adopté une nouvelle technique d\'irrigation goutte-à-goutte qui permet d\'économiser jusqu\'à 60% d\'eau par rapport aux méthodes traditionnelles. Cette technique est désormais enseignée dans tous nos programmes de formation.',
    date: '2025-01-10',
    category: 'Innovation',
    imageUrl: irrigation,
    author: 'Admin CIAPO'
  },
  {
    id: "4",
    title: "C1APO COOP-CA - Produits locaux et services traiteur",
    excerpt: "Découvrez nos produits préparés et non préparés, ainsi que nos services de formation et traiteur",
    content: "Le C1APO COOP-CA propose une gamme variée de produits locaux, incluant des plats cuisinés bio, des conserves artisanales, des jus naturels ainsi que des matières premières agricoles brutes. Nous offrons également des services traiteur pour événements et des formations pratiques sur la transformation des produits agricoles, l'hygiène alimentaire et le marketing. Nos produits sont disponibles sur les marchés locaux, en ligne et dans des boutiques partenaires.",
    date: "2025-05-25",
    category: "Évènements",
    imageUrl: "whatsapp_image_2025-05-25_at_20.12.29.jpeg",
    author: "Équipe C1APO",
    // "contact": {
    //     "phone1": "652 49 83 13",
    //     "phone2": "621 75 20 20"
    // }
}
];

export const partners: Partner[] = [
  {
    id: '1',
    name: 'Ministère de l\'Agriculture',
    description: 'Partenaire institutionnel soutenant nos programmes de formation',
    logoUrl: MINADER,
    website: 'https://www.minader.cm/'
  },
  {
    id: '2',
    name: 'Banque Africaine de Développement',
    description: 'Soutien financier pour nos projets d\'expansion',
    logoUrl: BAD,
    website: 'https://www.afdb.org'
  },
  {
    id: '3',
    name: 'Organisation des Nations Unies pour l\'alimentation et l\'agriculture (FAO)',
    description: 'Partenaire technique pour les méthodes agricoles durables',
    logoUrl: FAO,
    website: 'https://www.fao.org'
  },
  {
    id: '4',
    name: 'Cohimms Anglo Saxon Universite Professionnelle De Douala',
    description: 'Centre de formation professionnelle, partenaire reconnu par arrêté ministériel, prévoit d\'ouvrir une succursale dans le village d\'Ebolowa (Sud Cameroun). Conformément à la convention en cours entre les deux structures, l\'exclusivité des responsabilités et des charges sera confiée à la coopérative CIAPO',
    logoUrl: COHIMMSlogo,
    website: 'https://www.cohimms.org'
  },
  {
    id: '5',
    name: 'Société Camerounaises des Postes Télécommunications et Travaux Electrique (SCPTTE Sarl)',
    description: 'Partenaire technique pour la fourniture et installations électriques et travaux de télécommunications et marketing digital et construction des bâtiments et montage des appels d\'offres publics et privés ',
    logoUrl: SCPTTElogo,
    website: 'https://www.scpttesarl.org'
  },
  {
    id: '6',
    name: 'Groupe des Agriculteurs Biologique  de Yemyema\'a (GIC ABMY)',
    description: 'Partenaire soutenant les projets agricoles ',
    logoUrl: GICAMBYlogo,
    website: 'https://www.gicamby.org'
  },
  {
    id: '7',
    name: 'Afripionnier Investissements Sarl (API)',
    description: 'Partenaire pour les prestations de services en transport et logistique travaux publics et privés, bâtiments, énergie solaire, financement des projets, et distribution des produits diverses import-export ',
    logoUrl: APIlogo,
    website: 'https://www.apisarl.org'
  }
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction à l\'Entrepreneuriat Agricole',
    description: 'Ce cours en ligne couvre les bases de l\'entrepreneuriat dans le secteur agricole, avec un focus sur l\'analyse de marché et la planification d\'affaires.',
    level: 'Débutant',
    duration: '4 semaines',
    instructor: 'M. Ndzana Franky Charly',
    imageUrl: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=600',
    modules: 6,
    enrolledStudents: 120,
    videoDuration: '2 hours | 15 lessons',
    thumbnail: 'https://via.placeholder.com/800x450?text=Course+Thumbnail',
    videoUrl: Course1,
    price: 50000,
  },
  {
    id: '2',
    title: 'Techniques Avancées d\'Aviculture',
    description: 'Approfondissez vos connaissances en élevage de volailles avec ce cours couvrant la nutrition, la santé animale et les installations modernes.',
    level: 'Intermédiaire',
    duration: '6 semaines',
    instructor: 'Mme Kowssima Marly Yaya',
    imageUrl: Aviculture,
    modules: 8,
    enrolledStudents: 85,
    videoDuration: '2 hours | 15 lessons',
    thumbnail: 'https://via.placeholder.com/800x450?text=Course+Thumbnail',
    videoUrl: Course1,
    price: 50000,

  },
  {
    id: '3',
    title: 'Gestion Financière pour Agriculteurs',
    description: 'Apprenez à gérer les finances de votre exploitation agricole, y compris la comptabilité de base, la budgétisation et l\'accès au crédit.',
    level: 'Tous niveaux',
    duration: '5 semaines',
    instructor: 'Mme. Touré Fatou',
    imageUrl: gest_Agri,
    modules: 7,
    enrolledStudents: 98,
    videoDuration: '2 hours | 15 lessons',
    thumbnail: 'https://via.placeholder.com/800x450?text=Course+Thumbnail',
    videoUrl: Course1,
    price: 50000,

  },
  {
    id: '4',
    title: 'Formation en Santé Médicale',
    description: 'Formation de base en santé préventive et gestes d\’urgence pour renforcer la résilience communautaire.',
    level: 'Tous niveaux',
    duration: '4 semaines',
    instructor: 'Mme. ',
    imageUrl: Santé,
    modules: 4,
    enrolledStudents: 8,
    videoDuration: '2 hours | 15 lessons',
    thumbnail: 'https://via.placeholder.com/800x450?text=Course+Thumbnail',
    videoUrl: Course1,
    price: 50000,
  },
  {
    id: '5',
    title: 'Formation en Commerce Et Gestion',
    description: 'Développer les compétences essentielles en création, gestion et suivi de petites activités économiques.',
    level: 'Tous niveaux',
    duration: '4 semaines',
    instructor: 'M. ',
    imageUrl: Commerce,
    modules: 4,
    enrolledStudents: 10,
    videoDuration: '2 hours | 15 lessons',
    thumbnail: 'https://via.placeholder.com/800x450?text=Course+Thumbnail',
    videoUrl: Course1,
    price: 50000,
  },
  {
    id: '6',
    title: 'Formation en Technologie',
    description: 'Intégrer les outils numériques dans la gestion, la communication et la productivité quotidienne.',
    level: 'Tous niveaux',
    duration: '4 semaines',
    instructor: 'Mme. Florence',
    imageUrl: Techno,
    modules: 4,
    enrolledStudents: 5,
    videoDuration: '2 hours | 15 lessons',
    thumbnail: 'https://via.placeholder.com/800x450?text=Course+Thumbnail',
    videoUrl: Course1,
    price: 50000,
  },
  {
    id: '7',
    title: 'Formation d\'orientation professionnelle et d\'apprentissage dans le tas entreprenariat',
    description: 'Préparer efficacement l’insertion professionnelle ou le lancement d’un projet personnel viable.',
    level: 'Tous niveaux',
    duration: '4 semaines',
    instructor: 'M. Oyono Platini Michel',
    imageUrl: Prof,
    modules: 4,
    enrolledStudents: 4,
    videoDuration: '2 hours | 15 lessons',
    thumbnail: 'https://via.placeholder.com/800x450?text=Course+Thumbnail',
    videoUrl: Course1,
    price: 50000,
  },
  {
    id: '8',
    title: 'Formation en secrétariat bureautique et administration',
    description: 'Préparer efficacement l’insertion professionnelle ou le lancement d’un projet personnel viable.',
    level: 'Tous niveaux',
    duration: '4 semaines',
    instructor: 'M. Ngo Kona Sandrine',
    imageUrl: Prof,
    modules: 4,
    enrolledStudents: 4,
    videoDuration: '2 hours | 15 lessons',
    thumbnail: 'https://via.placeholder.com/800x450?text=Course+Thumbnail',
    videoUrl: Course1,
    price: 50000,
  },
  {
    id: '9',
    title: 'Formation en secrétariat bureautique, infographie et la ma intenance',
    description: 'Préparer efficacement l’insertion professionnelle ou le lancement d’un projet personnel viable.',
    level: 'Tous niveaux',
    duration: '4 semaines',
    instructor: 'M. Ndongo Mve Andre Boris',
    imageUrl: Prof,
    modules: 4,
    enrolledStudents: 4,
    videoDuration: '2 hours | 15 lessons',
    thumbnail: 'https://via.placeholder.com/800x450?text=Course+Thumbnail',
    videoUrl: Course1,
    price: 50000,
  },
  {
    id: '10',
    title: 'Formation en  droit privé et public',
    description: 'Préparer efficacement l’insertion professionnelle ou le lancement d’un projet personnel viable.',
    level: 'Tous niveaux',
    duration: '4 semaines',
    instructor: 'M. Evina Marie Noëlle',
    imageUrl: Prof,
    modules: 4,
    enrolledStudents: 4,
    videoDuration: '2 hours | 15 lessons',
    thumbnail: 'https://via.placeholder.com/800x450?text=Course+Thumbnail',
    videoUrl: Course1,
    price: 50000,
  },
  {
    id: '11',
    title: 'Formateur en phytosanitaires en génie rural',
    description: 'Préparer efficacement l’insertion professionnelle ou le lancement d’un projet personnel viable.',
    level: 'Tous niveaux',
    duration: '4 semaines',
    instructor: 'M. Gamogha Djantcha Geldas Nickson',
    imageUrl: Prof,
    modules: 4,
    enrolledStudents: 4,
    videoDuration: '2 hours | 15 lessons',
    thumbnail: 'https://via.placeholder.com/800x450?text=Course+Thumbnail',
    videoUrl: Course1,
    price: 50000,
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Poulets de Chair',
    description: 'Poulets de chair élevés naturellement, sans antibiotiques',
    price: 3000,
    unit: 'pièce',
    category: 'Volaille',
    imageUrl: elevageImage,
    seller: {
      id: '101',
      name: 'Ferme Avicole',
      location: 'Ebolowa',
      rating: 4.8
    },
    available: true
  },
  {
    id: '2',
    name: 'pomme de terre bio',
    description: 'Pommes de terre cultivées sans produits chimiques',
    price: 2000,
    unit: 'kg',
    category: 'Légumes',
    imageUrl: pommesImage,
    seller: {
      id: '102',
      name: 'Coopérative Maraîchère',
      location: 'Ebolowa',
      rating: 4.5
    },
    available: true
  },
  {
    id: '8',
    name: 'Tomates Bio',
    description: 'Tomates cultivées sans pesticides chimiques',
    price: 1500,
    unit: 'kg',
    category: 'Légumes',
    imageUrl: tomateImage,
    seller: {
      id: '102',
      name: 'Coopérative Maraîchère',
      location: 'Ebolowa',
      rating: 4.5
    },
    available: true
  },
  {
    id: '3',
    name: 'Miel Naturel',
    description: 'Miel pur récolté dans les forêts du centre-ouest',
    price: 4000,
    unit: 'litre',
    category: 'Produits transformés',
    imageUrl: mielImage,
    seller: {
      id: '103',
      name: 'Apiculteurs d\'Ebolowa',
      location: 'Ebolowa',
      rating: 4.9
    },
    available: true
  },
  {
    id: '4',
    name: 'Cacao (Theobroma cacao)',
    description: 'Cacao pur récolté dans le Sud (Ebolowa, Kribi, Djoum)',
    price: 4000,
    unit: 'kilo',
    category: 'Produits transformés',
    imageUrl: cacaoImage,
    seller: {
      id: '103',
      name: 'Omniprésente dans le Sud',
      location: 'Sud',
      rating: 4.9
    },
    available: true
  },
  {
    id: '5',
    name: 'Banane plantain',
    description: 'Culture vivrière',
    price: 4000,
    unit: 'kilo',
    category: 'Produits transformés',
    imageUrl: plantainImage,
    seller: {
      id: '103',
      name: 'Apiculteurs d\'Ebolowa',
      location: 'Ebolowa',
      rating: 4.9
    },
    available: true
  },
  {
    id: '6',
    name: 'Manioc',
    description: 'Culture attelée ou manuelle',
    price: 4000,
    unit: 'kilo',
    category: 'Produits transformés',
    imageUrl: maniocImage,
    seller: {
      id: '103',
      name: 'Apiculteurs d\'Ebolowa',
      location: 'Ebolowa',
      rating: 4.9
    },
    available: true
  },
  {
    id: '7',
    name: 'Maïs',
    description: 'Semences hybrides, engrais NPK + urée',
    price: 4000,
    unit: 'kilo',
    category: 'Produits transformés',
    imageUrl: maisImage,
    seller: {
      id: '103',
      name: 'Apiculteurs d\'Ebolowa',
      location: 'Ebolowa',
      rating: 4.9
    },
    available: true
  }
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Location de Tracteur',
    description: 'Location de tracteur avec chauffeur pour labour et préparation des sols',
    price: 25000,
    provider: {
      id: '201',
      name: 'Agri-Services Plus',
      location: 'Bouaké',
      rating: 4.7
    },
    category: 'Équipement',
    imageUrl: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    title: 'Conseil en Certification Bio',
    description: 'Services de consultation pour l\'obtention de certifications biologiques',
    price: 50000,
    provider: {
      id: '202',
      name: 'Bio-Cert Consulting',
      location: 'Abidjan',
      rating: 4.6
    },
    category: 'Conseil',
    imageUrl: 'https://images.pexels.com/photos/7599735/pexels-photo-7599735.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export const locations: Location[] = [
  {
    id: '1',
    name: 'Siège CIAPO COOP-CA',
    address: 'Mvan Essakoe',
    city: 'Ebolowa',
    region: 'Sud Cameroun',
    coordinates: {
      lat: 5.341,
      lng: -4.024
    },
    type: 'headquarters',
    phone: '+237 652 498 313 / +237 621 752 020',
    email: 'ciapocoopca@gmail.com'
  },
  {
    id: '2',
    name: 'Centre de Formation Agricole',
    address: 'Mvan Essakoe',
    city: 'Ebolowa',
    region: 'Sud Cameroun',
    coordinates: {
      lat: 5.350,
      lng: -3.885
    },
    type: 'training-center',
    phone: '+237 652 498 313 / +237 621 752 020',
    email: 'formation@ciapo-coop-ca.org'
  },
  {
    id: '3',
    name: 'Centre de Formation COHIMMS',
    address: 'Douala',
    city: 'Douala',
    region: 'Cameroun',
    coordinates: {
      lat: 6.827,
      lng: -5.289
    },
    type: 'training-center',
    phone: '+237 652 498 313 / +237 621 752 020',
    email: 'cohimms@ciapo-coop-ca.org'
  }
];

export const missions = [
  {
    icon: BookOpen,
    imageUrl: Formation,
    title: 'Formation',
    description: 'Formation professionnelle et académique dans le secteur agricole'
  },
  {
    icon: ShoppingBag,
    imageUrl: Production,
    title: 'Production et Commerce',
    description: 'Production, commercialisation, achat et vente en gros et en détail de produits agricoles'
  },
  {
    icon: Target,
    imageUrl: Projets,
    title: 'Montage de Projets',
    description: 'Montage des projets et réalisations dans le secteur agricole'
  },
  {
    icon: Wrench,
    imageUrl: Phytosanitaires,
    title: 'Services Phytosanitaires',
    description: 'Prestations de services et entretien phytosanitaires'
  },
  {
    icon: Wrench,
    imageUrl: Prestations,
    title: 'Prestations Services',
    description: 'Prestations de services et entretien phytosanitaires'
  }
];
