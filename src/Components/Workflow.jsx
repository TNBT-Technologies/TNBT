import React from "react";
import { CheckCircle2 } from "lucide-react";
import codeImg from "../assets/code.jpg";
import { checklistItems } from "../constants";

function Workflow() {
  return (
    <div id="workflow" className="relative scroll-mt-24">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-4 tracking-wide">
        How we build your{" "}
        <span className="bg-gradient-to-r from-green-500 to-green-900 text-transparent bg-clip-text">
          product
        </span>
      </h2>

      <div className="flex flex-wrap justify-center mt-6">
        {/* Image Section */}
        <div className="p-2 w-full lg:w-1/2">
          <img src={codeImg} alt="Code" className="max-w-[90%] mx-auto h-auto" />
        </div>

        {/* Checklist Section */}
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-12">
              <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 flex justify-center items-center rounded-full">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workflow;
