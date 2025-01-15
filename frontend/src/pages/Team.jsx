import React from "react";
import "../assets/css/team.css";
import sophieProfile from "../assets/images/sophie.png";
import gurtejProfile from "../assets/images/gurtej.jpg";
import lamProfile from "../assets/images/lam.jpg";
import grantProfile from "../assets/images/grant.jpg";
const TeamMember = ({ name, profilePicture, github, linkedin, portfolio }) => {
  return (
    <div className="team-member">
      {/* Profile Picture */}
      <div className="profile-picture">
        <img src={profilePicture} alt={`${name}'s profile`} />
      </div>

      {/* Team Member Name */}
      <h3 className="team-member-name">{name}</h3>
      <p className="team-member-bio">Explore my profiles:</p>

      {/* Social Links */}
      <div className="social-links">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer">
            <button className="button">GitHub</button>
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <button className="button">LinkedIn</button>
          </a>
        )}
        {portfolio && (
          <a href={portfolio} target="_blank" rel="noopener noreferrer">
            <button className="button">Portfolio</button>
          </a>
        )}
      </div>
    </div>
  );
};

const Team = () => {
  const team = [
    {
      name: "Gurtej Grewal",
      profilePicture: gurtejProfile,
      github: "https://github.com/GrewalCreator",
      linkedin: "https://www.linkedin.com/in/gurtej-grewal",
    },
    {
      name: "Sophie Wang",
      profilePicture: sophieProfile,
      github: "https://github.com/sophieynw",
      linkedin: "https://linkedin.com/in/sophie-y-wang",
      portfolio: "https://portfolio-ten-mauve-67.vercel.app/",
    },
    {
      name: "Grant",
      profilePicture: grantProfile,
      github: "https://github.com/grant",
      linkedin: "https://www.linkedin.com/in/grantokawa/",
      portfolio: "https://grant.com",
    },
    {
      name: "Lam",
      profilePicture: lamProfile,
      github: "https://github.com/maxins1211",
    },
  ];

  return (
    <div className="team-page">
      <h1 className="team-title">Meet the Team</h1>
      <div className="team-container">
        {team.map((member) => (
          <TeamMember
            key={member.name}
            name={member.name}
            profilePicture={member.profilePicture}
            github={member.github}
            linkedin={member.linkedin}
            portfolio={member.portfolio}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
