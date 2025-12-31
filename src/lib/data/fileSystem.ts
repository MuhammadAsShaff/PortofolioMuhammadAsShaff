import type { FileSystemItem } from './types';
export * from './types';

import { aboutData } from './modules/about';
import { internshipsData } from './modules/internships';
import { projectsData } from './modules/projects';
import { certificatesData } from './modules/certificates';
import { awardsData } from './modules/awards';
import { organizationsData } from './modules/organizations';
import { resumeData } from './modules/resume';

export const fileSystemList: FileSystemItem[] = [
    aboutData,
    internshipsData,
    projectsData,
    certificatesData,
    awardsData,
    organizationsData,
    resumeData
];
