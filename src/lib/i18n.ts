import { Locale } from "@/types";

const dictionaries: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.report": "File a Report",
    "nav.track": "Track Report",
    "nav.help": "Help",
    "nav.language": "Français",
    "nav.privacy": "Privacy Policy",
    "nav.accessibility": "Accessibility",
    "nav.terms": "Terms of Use",
    "nav.contact": "Contact",

    // Landing
    "landing.title": "Online Police Reporting",
    "landing.subtitle": "File non-emergency police reports 24/7 from anywhere. No phone call or in-person visit required.",
    "landing.cta": "File a Report",
    "landing.track_cta": "Track Existing Report",
    "landing.emergency": "If this is an emergency, call 911 immediately.",
    "landing.feature1.title": "File Online 24/7",
    "landing.feature1.desc": "Submit non-emergency reports anytime, anywhere from your device.",
    "landing.feature2.title": "Track Your Report",
    "landing.feature2.desc": "Check the status of your report in real time with your tracking number.",
    "landing.feature3.title": "Secure & Private",
    "landing.feature3.desc": "Your information is encrypted and handled in compliance with Ontario privacy laws.",
    "landing.feature4.title": "Get Updates",
    "landing.feature4.desc": "Receive email and SMS notifications as your report progresses.",
    "landing.how.title": "How It Works",
    "landing.how.step1": "Select Report Type",
    "landing.how.step1.desc": "Choose the category that best matches your incident.",
    "landing.how.step2": "Answer Eligibility Questions",
    "landing.how.step2.desc": "Confirm that your incident qualifies for online reporting.",
    "landing.how.step3": "Complete the Report",
    "landing.how.step3.desc": "Fill in the details with our guided step-by-step form.",
    "landing.how.step4": "Receive Confirmation",
    "landing.how.step4.desc": "Get a tracking number and email confirmation instantly.",

    // Report
    "report.select_type": "Select Report Type",
    "report.select_type_desc": "Choose the category that best describes your incident.",
    "report.eligibility": "Eligibility Check",
    "report.eligibility_desc": "Please answer the following questions to confirm your incident can be reported online.",
    "report.step": "Step",
    "report.of": "of",
    "report.next": "Next",
    "report.back": "Back",
    "report.submit": "Submit Report",
    "report.review": "Review & Submit",
    "report.review_desc": "Please review all information before submitting.",
    "report.evidence": "Upload Evidence",
    "report.evidence_desc": "Attach photos, videos, or documents related to your incident.",
    "report.evidence_drag": "Drag and drop files here, or click to browse",
    "report.evidence_types": "Accepted: JPEG, PNG, MP4, MOV, PDF, DOCX (max 25 MB per file)",
    "report.required": "Required",

    // Track
    "track.title": "Track Your Report",
    "track.desc": "Enter your tracking number to view the current status of your report.",
    "track.placeholder": "e.g. WRPS-2026-0001",
    "track.button": "Track Report",
    "track.status": "Report Status",
    "track.submitted_at": "Submitted",
    "track.updated_at": "Last Updated",
    "track.occurrence": "Occurrence Number",
    "track.timeline": "Status Timeline",

    // Confirmation
    "confirmation.title": "Report Submitted Successfully",
    "confirmation.desc": "Your report has been received and is being processed.",
    "confirmation.tracking": "Your Tracking Number",
    "confirmation.email_sent": "A confirmation email has been sent to",
    "confirmation.what_next": "What Happens Next?",
    "confirmation.next1": "Your report will be reviewed by an officer.",
    "confirmation.next2": "You will receive email updates as the status changes.",
    "confirmation.next3": "You may be contacted if additional information is needed.",
    "confirmation.track_btn": "Track Your Report",
    "confirmation.new_btn": "File Another Report",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.export": "Export",
    "common.close": "Close",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.report": "Déposer un rapport",
    "nav.track": "Suivre un rapport",
    "nav.help": "Aide",
    "nav.language": "English",
    "nav.privacy": "Politique de confidentialité",
    "nav.accessibility": "Accessibilité",
    "nav.terms": "Conditions d'utilisation",
    "nav.contact": "Contact",

    "landing.title": "Signalement policier en ligne",
    "landing.subtitle": "Déposez des rapports de police non urgents 24h/24, 7j/7, de n'importe où. Aucun appel téléphonique ou visite en personne requis.",
    "landing.cta": "Déposer un rapport",
    "landing.track_cta": "Suivre un rapport existant",
    "landing.emergency": "S'il s'agit d'une urgence, appelez le 911 immédiatement.",
    "landing.feature1.title": "Déposez en ligne 24/7",
    "landing.feature1.desc": "Soumettez des rapports non urgents à tout moment depuis votre appareil.",
    "landing.feature2.title": "Suivez votre rapport",
    "landing.feature2.desc": "Vérifiez l'état de votre rapport en temps réel avec votre numéro de suivi.",
    "landing.feature3.title": "Sécurisé et privé",
    "landing.feature3.desc": "Vos informations sont chiffrées et traitées conformément aux lois ontariennes.",
    "landing.feature4.title": "Recevez des mises à jour",
    "landing.feature4.desc": "Recevez des notifications par courriel et SMS au fur et à mesure.",
    "landing.how.title": "Comment ça fonctionne",
    "landing.how.step1": "Sélectionnez le type de rapport",
    "landing.how.step1.desc": "Choisissez la catégorie qui correspond le mieux à votre incident.",
    "landing.how.step2": "Répondez aux questions d'admissibilité",
    "landing.how.step2.desc": "Confirmez que votre incident est admissible au signalement en ligne.",
    "landing.how.step3": "Remplissez le rapport",
    "landing.how.step3.desc": "Entrez les détails avec notre formulaire guidé étape par étape.",
    "landing.how.step4": "Recevez une confirmation",
    "landing.how.step4.desc": "Obtenez un numéro de suivi et une confirmation par courriel instantanément.",

    "report.select_type": "Sélectionner le type de rapport",
    "report.select_type_desc": "Choisissez la catégorie qui décrit le mieux votre incident.",
    "report.eligibility": "Vérification d'admissibilité",
    "report.eligibility_desc": "Veuillez répondre aux questions suivantes pour confirmer que votre incident peut être signalé en ligne.",
    "report.step": "Étape",
    "report.of": "de",
    "report.next": "Suivant",
    "report.back": "Retour",
    "report.submit": "Soumettre le rapport",
    "report.review": "Réviser et soumettre",
    "report.review_desc": "Veuillez vérifier toutes les informations avant de soumettre.",
    "report.evidence": "Téléverser des preuves",
    "report.evidence_desc": "Joignez des photos, vidéos ou documents liés à votre incident.",
    "report.evidence_drag": "Glissez-déposez des fichiers ici, ou cliquez pour parcourir",
    "report.evidence_types": "Acceptés : JPEG, PNG, MP4, MOV, PDF, DOCX (max 25 Mo par fichier)",
    "report.required": "Obligatoire",

    "track.title": "Suivre votre rapport",
    "track.desc": "Entrez votre numéro de suivi pour voir l'état actuel de votre rapport.",
    "track.placeholder": "ex. WRPS-2026-0001",
    "track.button": "Suivre le rapport",
    "track.status": "État du rapport",
    "track.submitted_at": "Soumis",
    "track.updated_at": "Dernière mise à jour",
    "track.occurrence": "Numéro d'occurrence",
    "track.timeline": "Chronologie des états",

    "confirmation.title": "Rapport soumis avec succès",
    "confirmation.desc": "Votre rapport a été reçu et est en cours de traitement.",
    "confirmation.tracking": "Votre numéro de suivi",
    "confirmation.email_sent": "Un courriel de confirmation a été envoyé à",
    "confirmation.what_next": "Quelle est la suite ?",
    "confirmation.next1": "Votre rapport sera examiné par un agent.",
    "confirmation.next2": "Vous recevrez des mises à jour par courriel.",
    "confirmation.next3": "Vous pourriez être contacté si des informations supplémentaires sont nécessaires.",
    "confirmation.track_btn": "Suivre votre rapport",
    "confirmation.new_btn": "Déposer un autre rapport",

    "common.loading": "Chargement...",
    "common.error": "Une erreur est survenue",
    "common.save": "Sauvegarder",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.export": "Exporter",
    "common.close": "Fermer",
  },
};

export function t(key: string, locale: Locale = "en"): string {
  return dictionaries[locale][key] ?? key;
}

export function getLocaleFromCookie(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = document.cookie
    .split("; ")
    .find((c) => c.startsWith("locale="));
  return (stored?.split("=")[1] as Locale) || "en";
}

export function setLocaleCookie(locale: Locale) {
  document.cookie = `locale=${locale};path=/;max-age=31536000;SameSite=Lax`;
}
