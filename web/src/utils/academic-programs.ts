export interface Program {
  name: string;
  degree?: string;
  concentration?: string;
  school?: string;
}

export interface School {
  name: string;
  shortName: string;
}

export const schools: School[] = [
  { name: "College of Arts and Sciences", shortName: "CAS" },
  { name: "School of Engineering and Applied Sciences", shortName: "SEAS" },
  { name: "School of Management", shortName: "SOM" },
  { name: "School of Architecture and Planning", shortName: "SAP" },
  { name: "School of Law", shortName: "LAW" },
  { name: "School of Dental Medicine", shortName: "SDM" },
  { name: "School of Medicine and Biomedical Sciences", shortName: "SMBS" },
  { name: "School of Nursing", shortName: "SON" },
  { name: "School of Pharmacy and Pharmaceutical Sciences", shortName: "SPPS" },
  {
    name: "School of Public Health and Health Professions",
    shortName: "SPHHP",
  },
  { name: "School of Social Work", shortName: "SSW" },
].sort((a, b) => a.name.localeCompare(b.name));

export const majors: Program[] = [
  { name: "Accounting", degree: "BS", school: "SOM" },
  { name: "Aerospace Engineering", degree: "BS", school: "SEAS" },
  { name: "African-American Studies", degree: "BA" },
  // ... all other majors
].sort((a, b) => a.name.localeCompare(b.name));

export const minors: Program[] = [
  { name: "Addiction Studies" },
  { name: "African-American Studies" },
  { name: "American Sign Language" },
  // ... all other minors
].sort((a, b) => a.name.localeCompare(b.name));
