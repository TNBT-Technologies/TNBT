import React from "react";

const projects = [
  {
    id: 1,
    logo: "/logoproject.jpeg", // Replace with actual logo
    title: "Outreach",
    description: "An app for generating and managing receipts with cloud storage.",
  },
];

function Projects() {
  return (
    <div id="projects" className="py-16 bg-neutral-900 text-white min-h-screen">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold mb-6">Our Projects</h2>
        <p className="text-lg text-neutral-400 mb-12">
          Here are some of the amazing projects we've built.
        </p>

        {/* Centering the Project */}
        <a
          href="https://play.google.com/store/apps/details?id=com.outreachllp.net&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
        >
          <div className="flex justify-center">
            <div className="bg-neutral-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 max-w-md">
              <img
                src={projects[0].logo}
                alt={projects[0].title}
                className="h-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{projects[0].title}</h3>
              <p className="text-neutral-400">{projects[0].description}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Projects;