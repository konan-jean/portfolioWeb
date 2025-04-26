// Attend que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function() {

    // Sélectionne tous les liens de navigation
    const navLinks = document.querySelectorAll('.navigation .nav__btn');

    // Sélectionne toutes les sections dans la balise <main>
    const sections = document.querySelectorAll('main section');

    // Fonction pour gérer l'affichage des sections et l'état actif des liens
    function handleNavClick(event) {
        // Empêche le comportement par défaut du lien (saut d'ancre)
        event.preventDefault();

        const clickedLink = event.target.closest('.nav__btn'); // S'assure qu'on a le lien même si on clique sur une icône dedans (pas le cas ici, mais bonne pratique)
        if (!clickedLink) return; // Ne rien faire si le clic n'est pas sur un bouton de nav

        // --- 1. Gérer l'affichage des sections ---

        // Récupère l'ID de la section cible depuis l'attribut href (enlève le #)
        const targetId = clickedLink.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Si la section cible n'existe pas, on arrête
        if (!targetSection) {
            console.warn(`Section with ID "${targetId}" not found.`);
            return;
        }

        // Cache toutes les sections en retirant la classe 'active-section'
        sections.forEach(section => {
            section.classList.remove('active-section');
        });

        // Affiche la section cible en ajoutant la classe 'active-section'
        // Le CSS gère la transition d'opacité et le display
        targetSection.classList.add('active-section');


        // --- 2. Gérer l'état actif des liens de navigation ---

        // Retire la classe 'active' de tous les liens de navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Ajoute la classe 'active' au lien cliqué
        clickedLink.classList.add('active');


        // --- 3. Défilement doux vers la section (Optionnel mais recommandé) ---
        // Cette méthode prend en compte le `scroll-padding-top` défini en CSS
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Aligne le haut de la section avec le haut de la zone visible (après le padding)
        });

    }

    // Ajoute l'écouteur d'événement 'click' à chaque lien de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // --- (Optionnel) Initialisation: S'assurer que l'état initial est correct ---
    // Normalement, le HTML et le CSS gèrent déjà l'affichage de #home et l'état actif
    // du premier lien. Ce code est une double vérification ou utile si l'état initial
    // n'est pas défini dans le HTML.

    // Vérifie si une section est déjà marquée comme active (utile si on arrive sur la page avec une ancre #)
    const currentHash = window.location.hash;
    let activeLinkFound = false;
    if (currentHash) {
        const targetIdFromHash = currentHash.substring(1);
        const targetSectionFromHash = document.getElementById(targetIdFromHash);
        const targetLinkFromHash = document.querySelector(`.nav__btn[href="${currentHash}"]`);

        if (targetSectionFromHash && targetLinkFromHash) {
            // Cache toutes les sections et désactive tous les liens
            sections.forEach(section => section.classList.remove('active-section'));
            navLinks.forEach(link => link.classList.remove('active'));

            // Active la section et le lien correspondants
            targetSectionFromHash.classList.add('active-section');
            targetLinkFromHash.classList.add('active');
            activeLinkFound = true;

             // Scroll immédiat (sans smooth) au chargement si ancre présente
             targetSectionFromHash.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }

    // Si aucune ancre n'était présente ou valide, s'assurer que 'home' est actif
    if (!activeLinkFound) {
        const homeSection = document.getElementById('home');
        const homeLink = document.querySelector('.nav__btn[href="#home"]');

        sections.forEach(section => section.classList.remove('active-section'));
        navLinks.forEach(link => link.classList.remove('active'));

        if (homeSection && homeLink) {
            homeSection.classList.add('active-section'); // Assure que home est visible
            homeLink.classList.add('active'); // Assure que le lien home est actif
        }
    }

     // --- (Optionnel) Script pour le texte dynamique (si vous en avez un) ---
     // Exemple simple (remplacez par une bibliothèque comme Typed.js pour plus d'effets)
     const dynamicTextElement = document.querySelector('.dynamic-text');
     if (dynamicTextElement) {
         const words = ["Développeur Web", "Designer Graphique", "Freelancer"];
         let wordIndex = 0;
         let letterIndex = 0;
         let currentWord = '';
         let isDeleting = false;

         function type() {
             const word = words[wordIndex];
             if (isDeleting) {
                 // Mode suppression
                 currentWord = word.substring(0, letterIndex - 1);
                 letterIndex--;
             } else {
                 // Mode écriture
                 currentWord = word.substring(0, letterIndex + 1);
                 letterIndex++;
             }

             dynamicTextElement.textContent = currentWord;

             let typeSpeed = isDeleting ? 100 : 200; // Vitesse de frappe/suppression

             if (!isDeleting && currentWord === word) {
                 // Mot complet, pause avant de supprimer
                 typeSpeed = 1500;
                 isDeleting = true;
             } else if (isDeleting && currentWord === '') {
                 // Suppression terminée, passer au mot suivant
                 isDeleting = false;
                 wordIndex = (wordIndex + 1) % words.length;
                 typeSpeed = 500; // Pause avant d'écrire le nouveau mot
             }

             setTimeout(type, typeSpeed);
         }

         // Démarre l'animation de frappe après un petit délai
         setTimeout(type, 1000);
     }


     // --- (Optionnel) Script pour la soumission du formulaire de contact ---
     const contactForm = document.getElementById('contact-form');
     if (contactForm) {
         contactForm.addEventListener('submit', function(event) {
             event.preventDefault(); // Empêche la soumission HTML par défaut

             // Récupérer les données du formulaire
             const formData = new FormData(contactForm);

            // Afficher un message de chargement/en cours
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';


             // Simuler un envoi (remplacer par un fetch vers votre backend)
             console.log('Formulaire soumis (simulation)');
             for (let [key, value] of formData.entries()) {
                 console.log(`${key}: ${value}`);
             }

             // Simuler une réponse après 2 secondes
             setTimeout(() => {
                 // Afficher un message de succès ou d'erreur
                 alert('Message envoyé avec succès ! (Simulation)');

                 // Réinitialiser le formulaire
                 contactForm.reset();

                 // Réactiver le bouton
                 submitButton.disabled = false;
                 submitButton.textContent = originalButtonText;

             }, 2000);

             /*
             // VRAI ENVOI AVEC FETCH (Exemple)
             fetch('your_server_endpoint', { // Remplacez par l'URL de votre backend
                 method: 'POST',
                 body: formData
             })
             .then(response => {
                 if (!response.ok) {
                     // Gérer les erreurs HTTP (ex: 404, 500)
                     throw new Error(`HTTP error! status: ${response.status}`);
                 }
                 return response.json(); // ou response.text() si le serveur ne renvoie pas de JSON
             })
             .then(data => {
                 console.log('Success:', data);
                 alert('Message envoyé avec succès !');
                 contactForm.reset();
             })
             .catch(error => {
                 console.error('Error sending form:', error);
                 alert("Une erreur est survenue lors de l'envoi du message.");
             })
             .finally(() => {
                 // Réactiver le bouton dans tous les cas
                 submitButton.disabled = false;
                 submitButton.textContent = originalButtonText;
             });
             */
         });
     }

}); // Fin de l'écouteur DOMContentLoaded

