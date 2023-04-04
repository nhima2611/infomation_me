import type { NextPage } from "next";
import { ISkills } from "../typings";
import { Skill } from "./Skill";

interface ISKillsProps {
  skills: ISkills[];
}

const languageData = [
  {
    fieldType: "Languages",
    id: "cl3xb84u408r70bplt1h2c6vc",
    image: { url: "https://media.graphassets.com/sQ6uEQTRuTpexUYrVCIA" },

    proficient: true,
    skill: "JavaScript",
    uniqueId: 3,
    url: "https://en.wikipedia.org/wiki/JavaScript",
  },
  {
    fieldType: "Languages",
    id: "cl3xb9ppc08un0boe7453x09a",
    image: { url: "https://media.graphassets.com/fWy4g0nISqOMbQhGj4eN" },

    proficient: true,
    skill: "TypeScript",
    uniqueId: 4,
    url: "https://www.typescriptlang.org/",
  },
];

export const Skills: NextPage<ISKillsProps> = ({ skills }) => {
  const languages = languageData?.filter(skill => skill?.fieldType?.toLowerCase() === "languages");
  const frontend = skills?.filter(skill => skill?.fieldType?.toLowerCase() === "frontend");
  const uilibraries = skills?.filter(skill => skill?.fieldType?.toLowerCase() === "uilibraries");
  const headlessCms = skills?.filter(skill => skill?.fieldType?.toLowerCase() === "headless cms");
  const testing_tools = skills?.filter(
    skill =>
      skill?.fieldType?.toLowerCase() === "testing" || skill?.fieldType?.toLowerCase() === "tools"
  );
  const familiar = skills?.filter(skill => skill?.proficient === false);
  console.log(skills);

  return (
    <>
      <h1 className="skills_heading">Skills</h1>
      <div className="skills_box">
        <Skill skills={languages} skill="Languages" />
        <Skill skills={frontend} skill="Frontend" />
        <Skill skills={uilibraries} skill="UI Libraries" />
        {/* <Skill skills={headlessCms} skill="Headless CMS" /> */}
        <Skill skills={testing_tools} skill="Testing &amp; Tools" />
        <Skill skills={familiar} skill="Familiar" />
      </div>
    </>
  );
};
