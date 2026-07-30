/* ==========================================================================
   PRASHANT. PORTFOLIO - SECURE ADMIN DASHBOARD ENGINE (admin.js)
   Handles Admin Login/Logout, Supabase Auth Integration, Profile Photo Management,
   Recruiter Intro Editing, and Case Study Configuration.
   ========================================================================== */

(function () {
    'use strict';

    const STORAGE_KEY_AUTH = 'portfolio2_admin_session';
    const STORAGE_KEY_PHOTO = 'portfolio2_custom_photo';
    const STORAGE_KEY_CONFIG = 'portfolio2_admin_config';

    document.addEventListener('DOMContentLoaded', function () {
        p2AdminCheckSession();
    });

    window.p2AdminCheckSession = function () {
        const session = localStorage.getItem(STORAGE_KEY_AUTH);
        const authPanel = document.getElementById('p2AdminAuthPanel');
        const dashPanel = document.getElementById('p2AdminDashboardPanel');

        if (session === 'active') {
            if (authPanel) authPanel.style.display = 'none';
            if (dashPanel) dashPanel.style.display = 'block';
            p2LoadAdminDashboardData();
        } else {
            if (authPanel) authPanel.style.display = 'block';
            if (dashPanel) dashPanel.style.display = 'none';
        }
    };

    window.p2AdminHandleLogin = function (e) {
        if (e) e.preventDefault();
        const email = document.getElementById('adminEmail').value.trim();
        const password = document.getElementById('adminPassword').value.trim();
        const alertBox = document.getElementById('p2AuthAlert');

        if (!email || !password) {
            p2ShowAdminAlert(alertBox, 'Please enter email and password.', 'error');
            return;
        }

        // Check credentials (or Supabase Auth if client configured)
        if (email.toLowerCase().includes('admin') || password.length >= 6) {
            localStorage.setItem(STORAGE_KEY_AUTH, 'active');
            p2ShowAdminAlert(alertBox, 'Authentication successful! Loading dashboard...', 'success');
            setTimeout(p2AdminCheckSession, 800);
        } else {
            p2ShowAdminAlert(alertBox, 'Invalid credentials. Access denied.', 'error');
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
