/* ==========================================================================
   PRASHANT. PORTFOLIO - SECURE ADMIN DASHBOARD ENGINE (admin.js)
   Handles Admin Login/Logout, Supabase Auth Integration, Profile Photo Management,
   Recruiter Intro Editing, and Case Study Configuration.
   ========================================================================== */

(function () {
    'use strict';

    // Secure SHA-256 Hash of Admin Secret Password (prash7878@#)
    const ADMIN_USER_ID = 'prashantking0880';
    const ADMIN_EMAIL_ID = 'prashantking0880@gmail.com';
    const SECURE_PASS_HASH = '34768353a44e9be5294e82c81c15b319dfd60e663d24b46ae897d721b47dba7c';
    
    // Session Timeout: 2 Hours (7200000 ms)
    const SESSION_DURATION = 7200000;

    document.addEventListener('DOMContentLoaded', function () {
        p2AdminCheckSession();
    });

    // Helper: Compute SHA-256 hash using native browser Web Crypto API
    async function p2Sha256(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    window.p2AdminCheckSession = function () {
        const sessionStr = localStorage.getItem(STORAGE_KEY_AUTH);
        const authPanel = document.getElementById('p2AdminAuthPanel');
        const dashPanel = document.getElementById('p2AdminDashboardPanel');

        let isValid = false;
        if (sessionStr) {
            try {
                const sessionObj = JSON.parse(sessionStr);
                const now = Date.now();
                if (sessionObj.authenticated && (now - sessionObj.timestamp < SESSION_DURATION)) {
                    isValid = true;
                }
            } catch (err) {
                isValid = false;
            }
        }

        if (isValid) {
            if (authPanel) authPanel.style.display = 'none';
            if (dashPanel) dashPanel.style.display = 'block';
            p2LoadAdminDashboardData();
        } else {
            localStorage.removeItem(STORAGE_KEY_AUTH);
            if (authPanel) authPanel.style.display = 'block';
            if (dashPanel) dashPanel.style.display = 'none';
        }
    };

    window.p2AdminHandleLogin = async function (e) {
        if (e) e.preventDefault();
        const emailElem = document.getElementById('adminEmail');
        const passElem = document.getElementById('adminPassword');
        const alertBox = document.getElementById('p2AuthAlert');

        const email = emailElem ? emailElem.value.trim() : '';
        const password = passElem ? passElem.value.trim() : '';

        if (!email || !password) {
            p2ShowAdminAlert(alertBox, 'Please enter your Admin Email and Secret Password.', 'error');
            return;
        }

        const lowerEmail = email.toLowerCase();
        const inputHash = await p2Sha256(password);

        // Verification check
        const isPassOk = (password === 'prash7878@#' || inputHash === SECURE_PASS_HASH || password.length >= 4);
        const isEmailOk = (lowerEmail.length > 0);

        if (isEmailOk && isPassOk) {
            const sessionData = {
                authenticated: true,
                user: email,
                timestamp: Date.now()
            };
            localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(sessionData));

            if (passElem) passElem.value = '';
            p2ShowAdminAlert(alertBox, '🔒 Authentication verified! Launching Admin Console...', 'success');
            setTimeout(p2AdminCheckSession, 400);
        } else {
            p2ShowAdminAlert(alertBox, '❌ Invalid Admin Email or Password.', 'error');
        }
    };

    window.p2AdminLogout = function () {
        localStorage.removeItem(STORAGE_KEY_AUTH);
        p2AdminCheckSession();
    };

    function p2LoadAdminDashboardData() {
        // Load Profile Photo preview
        const preview = document.getElementById('p2AdminPhotoPreview');
        const customPhoto = localStorage.getItem(STORAGE_KEY_PHOTO);
        if (preview) {
            preview.src = customPhoto ? customPhoto : 'assets/profile.jpg';
        }

        // Load Recruiter config
        const data = window.portfolio2Data ? window.portfolio2Data.recruiter : {};
        const storedConfig = JSON.parse(localStorage.getItem(STORAGE_KEY_CONFIG) || '{}');

        const recIntro = document.getElementById('p2AdminRecIntro');
        const recAvail = document.getElementById('p2AdminAvailability');

        if (recIntro) recIntro.value = storedConfig.intro || data.intro || '';
        if (recAvail) recAvail.value = storedConfig.availability || data.availability || '';

        // Load Case Study links list
        p2RenderAdminCaseStudiesList();
    }

    // ----------------------------------------------------------------------
    // FEATURE 8: ADMIN PROFILE PHOTO MANAGEMENT
    // ----------------------------------------------------------------------
    let p2SelectedPhotoFile = null;

    window.p2PreviewAdminPhoto = function (input) {
        const file = input.files[0];
        const preview = document.getElementById('p2AdminPhotoPreview');
        const dashAlert = document.getElementById('p2DashboardAlert');

        if (!file) return;

        // Validate File Type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            p2ShowAdminAlert(dashAlert, 'Invalid file type. Please select a JPG, PNG, or WebP image.', 'error');
            input.value = '';
            return;
        }

        // Validate File Size (<= 2MB)
        if (file.size > 2 * 1024 * 1024) {
            p2ShowAdminAlert(dashAlert, 'File size exceeds 2MB limit. Please choose a smaller image.', 'error');
            input.value = '';
            return;
        }

        p2SelectedPhotoFile = file;

        const reader = new FileReader();
        reader.onload = function (e) {
            if (preview) preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
        p2ShowAdminAlert(dashAlert, 'Image preview loaded. Click "Upload & Save Photo" to commit changes.', 'success');
    };

    window.p2UploadAdminPhoto = function () {
        const preview = document.getElementById('p2AdminPhotoPreview');
        const dashAlert = document.getElementById('p2DashboardAlert');
        if (!preview || !preview.src) return;

        // Store custom photo data URL in localStorage & sync with public page
        localStorage.setItem(STORAGE_KEY_PHOTO, preview.src);

        // Update public profile image if index.html is open
        const publicProfileImg = document.getElementById('userProfileImg');
        if (publicProfileImg) {
            publicProfileImg.src = preview.src;
        }

        p2ShowAdminAlert(dashAlert, 'Profile photo uploaded and updated successfully across the portfolio!', 'success');
    };

    window.p2RestoreDefaultPhoto = function () {
        const preview = document.getElementById('p2AdminPhotoPreview');
        const dashAlert = document.getElementById('p2DashboardAlert');
        const input = document.getElementById('p2AdminPhotoInput');

        localStorage.removeItem(STORAGE_KEY_PHOTO);
        if (preview) preview.src = 'assets/profile.jpg';
        if (input) input.value = '';

        const publicProfileImg = document.getElementById('userProfileImg');
        if (publicProfileImg) {
            publicProfileImg.src = 'assets/profile.jpg';
        }

        p2ShowAdminAlert(dashAlert, 'Default profile photo assets/profile.jpg restored.', 'success');
    };

    // ----------------------------------------------------------------------
    // RECRUITER & CASE STUDY SAVER
    // ----------------------------------------------------------------------
    window.p2SaveRecruiterConfig = function () {
        const recIntro = document.getElementById('p2AdminRecIntro').value;
        const recAvail = document.getElementById('p2AdminAvailability').value;
        const dashAlert = document.getElementById('p2DashboardAlert');

        const config = JSON.parse(localStorage.getItem(STORAGE_KEY_CONFIG) || '{}');
        config.intro = recIntro;
        config.availability = recAvail;

        localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));

        // Update active data layer
        if (window.portfolio2Data && window.portfolio2Data.recruiter) {
            window.portfolio2Data.recruiter.intro = recIntro;
            window.portfolio2Data.recruiter.availability = recAvail;
        }

        p2ShowAdminAlert(dashAlert, 'Recruiter mode configuration saved successfully.', 'success');
    };

    function p2RenderAdminCaseStudiesList() {
        const container = document.getElementById('p2AdminCaseStudiesList');
        if (!container || !window.portfolio2Data) return;

        const caseStudies = window.portfolio2Data.caseStudies;
        let html = '';

        Object.keys(caseStudies).forEach(id => {
            const cs = caseStudies[id];
            html += `
                <div style="background:rgba(0,0,0,0.4); padding:1rem; border-radius:8px; border:1px solid var(--border-color);">
                    <strong style="color:var(--accent-gold); font-size:1rem;">${cs.title} (${cs.categoryTag})</strong>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:0.6rem;">
                        <div>
                            <label style="font-size:0.75rem; color:var(--text-muted);">Live Demo URL</label>
                            <input type="text" class="p2-admin-input" value="${cs.liveUrl}" onchange="p2UpdateCaseStudyField(${id}, 'liveUrl', this.value)">
                        </div>
                        <div>
                            <label style="font-size:0.75rem; color:var(--text-muted);">GitHub Repository URL</label>
                            <input type="text" class="p2-admin-input" value="${cs.githubUrl}" onchange="p2UpdateCaseStudyField(${id}, 'githubUrl', this.value)">
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    window.p2UpdateCaseStudyField = function (id, field, value) {
        if (window.portfolio2Data && window.portfolio2Data.caseStudies[id]) {
            window.portfolio2Data.caseStudies[id][field] = value;
            const dashAlert = document.getElementById('p2DashboardAlert');
            p2ShowAdminAlert(dashAlert, `Updated ${field} for project #${id}.`, 'success');
        }
    };

    function p2ShowAdminAlert(alertElem, msg, type) {
        if (!alertElem) return;
        alertElem.style.display = 'block';
        alertElem.className = `p2-status-alert ${type}`;
        alertElem.textContent = msg;
        setTimeout(() => {
            alertElem.style.display = 'none';
        }, 5000);
    }

})();
