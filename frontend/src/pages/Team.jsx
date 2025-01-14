import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/team.css";

const TeamMember = ({ name, profilePicture, github, linkedin, portfolio }) => {
  return (
    <div className="team-member">
      {/* Profile Picture */}
      <div className="profile-picture">
        <img src="../assets/images/sophie.png" alt={`${name}'s profile`} />
      </div>

      {/* Team Member Name */}
      <h3 className="team-member-name">{name}</h3>
      <p className="team-member-bio">Bio / social links below</p>

      {/* Social Links */}
      <div className="social-links">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer">
            <button>GitHub</button>
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <button>LinkedIn</button>
          </a>
        )}
        {portfolio && (
          <a href={portfolio} target="_blank" rel="noopener noreferrer">
            <button>Portfolio</button>
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
      profilePicture: "../assets/images/grewal.jpg",
      github: "https://github.com/GrewalCreator",
      linkedin: "https://www.linkedin.com/in/gurtej-grewal",
    },
    {
      name: "Sophie",
      profilePicture: "../assets/images/sophie.png",
      github: "https://github.com/sophieynw",
      linkedin: "https://linkedin.com/in/sophie-y-wang",
      portfolio: "https://portfolio-ten-mauve-67.vercel.app/",
    },
    {
      name: "Grant",
      profilePicture: "../assets/images/grant.jpg",
      github: "https://github.com/grant",
      linkedin: "https://linkedin.com/in/grant",
      portfolio: "https://grant.com",
    },
    {
      name: "Lam",
      profilePicture: "../../assets/images/lam.jpg",
      github: "https://github.com/maxins1211",
    },
  ];

  return (
    <div>
      <NavBar />

      <div className="team-page">
        <main className="team-container">
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
        </main>
      </div>
    </div>
  );
};

export default Team;
