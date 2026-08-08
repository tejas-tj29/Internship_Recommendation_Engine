const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    const fullPath = path.resolve(__dirname, filePath);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf8');
    for (const { search, replace } of replacements) {
        content = content.split(search).join(replace);
    }
    fs.writeFileSync(fullPath, content);
}

const filesWithReact = [
    'src/pages/employer/applicants/AllApplicants.tsx',
    'src/pages/employer/applicants/ApplicantProfile.tsx',
    'src/pages/employer/applicants/InternshipApplicants.tsx',
    'src/pages/employer/internships/CreateInternship.tsx',
    'src/pages/employer/internships/EditInternship.tsx',
    'src/pages/employer/internships/InternshipsList.tsx',
    'src/pages/employer/Register.tsx',
    'src/pages/employer/Settings.tsx',
    'src/components/layout/EmployerLayout.tsx',
    'src/components/layout/EmployerSidebar.tsx',
    'src/pages/employer/CompanyProfile.tsx',
    'src/pages/employer/internships/InternshipPreview.tsx'
];

filesWithReact.forEach(f => {
    replaceInFile(f, [
        { search: "import React, {", replace: "import {" },
        { search: "import React from 'react';\n", replace: "" }
    ]);
});

// AllApplicants
replaceInFile('src/pages/employer/applicants/AllApplicants.tsx', [
    { search: "import { getApplicants", replace: "import type { Application, Applicant, EmployerInternship } from '../../../types';\nimport { getApplicants" },
    { search: "import { Application, Applicant, EmployerInternship } from '../../../types';\n", replace: "" }
]);

// ApplicantProfile
replaceInFile('src/pages/employer/applicants/ApplicantProfile.tsx', [
    { search: "import { getApplicants", replace: "import type { Application, Applicant, EmployerInternship } from '../../../types';\nimport { getApplicants" },
    { search: "import { Application, Applicant, EmployerInternship } from '../../../types';\n", replace: "" },
    { search: "MapPin, Briefcase, ", replace: "" },
    { search: "cn }", replace: "} " },
    { search: "import { cn } from '../../../lib/utils';\n", replace: "" }
]);

// InternshipApplicants
replaceInFile('src/pages/employer/applicants/InternshipApplicants.tsx', [
    { search: "import { getApplicants", replace: "import type { Application, Applicant, EmployerInternship } from '../../../types';\nimport { getApplicants" },
    { search: "import { Application, Applicant, EmployerInternship } from '../../../types';\n", replace: "" },
    { search: "XCircle, Clock }", replace: "XCircle }" }
]);

// InternshipsList
replaceInFile('src/pages/employer/internships/InternshipsList.tsx', [
    { search: "import { getEmployerInternships", replace: "import type { EmployerInternship } from '../../../types';\nimport { getEmployerInternships" },
    { search: "import { EmployerInternship } from '../../../types';\n", replace: "" },
    { search: "CardHeader, CardTitle, ", replace: "" },
    { search: "PlusCircle, MoreHorizontal, Eye, Edit, Users, PauseCircle, PlayCircle, Trash2", replace: "PlusCircle, Eye, Users, PauseCircle, PlayCircle" }
]);

// CreateInternship / EditInternship
const fixHookForm = [
    { search: "resolver: zodResolver(internshipSchema),", replace: "resolver: zodResolver(internshipSchema) as any," },
    { search: "onSubmit={handleSubmit(onSubmit)}", replace: "onSubmit={handleSubmit(onSubmit as any)}" },
    { search: "CardHeader, CardTitle, ", replace: "" }
];
replaceInFile('src/pages/employer/internships/CreateInternship.tsx', fixHookForm);
replaceInFile('src/pages/employer/internships/EditInternship.tsx', fixHookForm);

// Settings
replaceInFile('src/pages/employer/Settings.tsx', [
    { search: "const employerId = getCurrentEmployerId();\n", replace: "" },
    { search: "import { getCurrentEmployerId } from '../../lib/api/employer';\n", replace: "" }
]);

console.log('Lint fixes applied.');
