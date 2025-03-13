import React from "react";
import {
  Code,
  LayoutDashboard,
  LineChart,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";

function Features() {
  return (
    <section id="features" className="py-16">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Easily build {" "}
        <span className="bg-gradient-to-r from-green-500 to-green-900 text-transparent bg-clip-text">
          your product
        </span>
      </h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 px-6">
        {/** Feature Items */}
        {featuresList.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="p-3 bg-neutral-900 rounded-full">{feature.icon}</div>
            <div>
              <h4 className="text-xl font-semibold">{feature.title}</h4>
              <p className="text-neutral-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const featuresList = [
  {
    icon: <Code className="text-green-400" />, 
    title: "Custom Web & App Development", 
    description: "We build tailored websites and applications to meet your business needs, ensuring functionality and performance."
  },
  {
    icon: <LayoutDashboard className="text-green-400" />, 
    title: "Responsive & Multi-Platform Compatibility", 
    description: "Our solutions work seamlessly across all devices—mobile, tablet, and desktop—for the best user experience."
  },
  {
    icon: <Rocket className="text-green-400" />, 
    title: "Pre-Designed Templates & Custom UI", 
    description: "Choose from modern, high-quality templates or get a fully customized UI design for your project."
  },
  {
    icon: <ShieldCheck className="text-green-400" />, 
    title: "Real-Time Updates & Fast Deployment", 
    description: "Deploy your website or app quickly with real-time updates and ensure smooth, hassle-free maintenance."
  },
  {
    icon: <Users className="text-green-400" />, 
    title: "Collaborative Project Management", 
    description: "We work closely with clients, providing regular updates, revisions, and collaborative development processes."
  },
  {
    icon: <LineChart className="text-green-400" />, 
    title: "Analytics & SEO Optimization", 
    description: "Track user engagement, optimize SEO, and enhance performance with our built-in analytics tools."
  }
];

export default Features;