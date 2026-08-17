// ============================================
// EQUANS Patchnotes - Script global
// ============================================

// ---------- Accès sécurisé à localStorage ----------
// Certains environnements (iframe sandbox SharePoint, etc.)
// bloquent localStorage. On protège tous les accès.
function safeGet(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        return null;
    }
}

function safeSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        // Ignoré : le thème ne sera simplement pas persisté
    }
}

// ---------- Toggle mode sombre / clair ----------
(function () {
    const STORAGE_KEY = 'equans-theme';

    // Applique le thème sauvegardé au chargement
    function applySavedTheme() {
        const saved = safeGet(STORAGE_KEY);
        if (saved === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }

    // Met à jour le texte du bouton selon le thème actif
    function updateToggleButton() {
        const isDark = document.documentElement.classList.contains('dark');
        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.textContent = isDark ? '☀️ Mode clair' : '🌙 Mode sombre';
        });
    }

    // Bascule le thème
    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            document.documentElement.classList.remove('dark');
            safeSet(STORAGE_KEY, 'light');
        } else {
            document.documentElement.classList.add('dark');
            safeSet(STORAGE_KEY, 'dark');
        }
        updateToggleButton();
    }

    // Initialisation
    applySavedTheme();

    document.addEventListener('DOMContentLoaded', function () {
        updateToggleButton();

        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.addEventListener('click', toggleTheme);
        });
    });
})();